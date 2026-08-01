"use client";

import { type RefObject, useCallback, useLayoutEffect, useState } from "react";

export interface InspectionRect {
  height: number;
  width: number;
  x: number;
  y: number;
}

export interface InspectionTarget {
  id: string;
  resolve: (root: HTMLElement) => Element | null;
}

export interface InspectionAnnotation {
  box?: boolean;
  id: string;
  label: string;
  note?: string;
  target: string;
  x: number;
  y: number;
  tone?: "blue" | "gold" | "neutral";
}

interface InspectionOverlayProps {
  annotations: InspectionAnnotation[];
  height: number;
  rects: Record<string, InspectionRect>;
  width: number;
}

const toneStyles = {
  blue: {
    border: "border-sky-300/45",
    line: "rgba(125, 211, 252, 0.5)",
    text: "text-sky-100",
  },
  gold: {
    border: "border-amber-200/45",
    line: "rgba(253, 230, 138, 0.5)",
    text: "text-amber-100",
  },
  neutral: {
    border: "border-white/20",
    line: "rgba(255, 255, 255, 0.28)",
    text: "text-white/80",
  },
} as const;

function rectsMatch(
  current: Record<string, InspectionRect>,
  next: Record<string, InspectionRect>,
) {
  const keys = Object.keys(next);
  if (keys.length !== Object.keys(current).length) return false;

  return keys.every((key) => {
    const a = current[key];
    const b = next[key];
    return (
      a !== undefined &&
      Math.abs(a.x - b.x) < 0.2 &&
      Math.abs(a.y - b.y) < 0.2 &&
      Math.abs(a.width - b.width) < 0.2 &&
      Math.abs(a.height - b.height) < 0.2
    );
  });
}

export function useInspectionTargets(
  rootRef: RefObject<HTMLElement | null>,
  targets: InspectionTarget[],
) {
  const [rects, setRects] = useState<Record<string, InspectionRect>>({});

  const measure = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;

    const rootRect = root.getBoundingClientRect();
    const next: Record<string, InspectionRect> = {};

    for (const target of targets) {
      const element = target.resolve(root);
      if (!element) continue;
      const rect = element.getBoundingClientRect();
      next[target.id] = {
        height: rect.height,
        width: rect.width,
        x: rect.left - rootRect.left,
        y: rect.top - rootRect.top,
      };
    }

    setRects((current) => (rectsMatch(current, next) ? current : next));
  }, [rootRef, targets]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let frame = 0;
    const track = () => {
      measure();
      frame = requestAnimationFrame(track);
    };
    frame = requestAnimationFrame(track);

    const observer = new ResizeObserver(measure);
    observer.observe(root);
    for (const target of targets) {
      const element = target.resolve(root);
      if (element instanceof HTMLElement) observer.observe(element);
    }

    document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, rootRef, targets]);

  return rects;
}

export function InspectionOverlay({
  annotations,
  height,
  rects,
  width,
}: InspectionOverlayProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <svg
        className="absolute inset-0 size-full overflow-visible"
        role="presentation"
        viewBox={`0 0 ${width} ${height}`}
      >
        {annotations.map((annotation) => {
          const rect = rects[annotation.target];
          if (!rect) return null;
          const tone = toneStyles[annotation.tone ?? "neutral"];
          const labelX = annotation.x * width;
          const labelY = annotation.y * height;
          const targetX = rect.x + rect.width / 2;
          const targetY = rect.y + rect.height / 2;

          return (
            <g key={annotation.id}>
              {annotation.box === false ? null : (
                <rect
                  fill="none"
                  height={rect.height}
                  rx="4"
                  stroke={tone.line}
                  strokeDasharray="3 3"
                  width={rect.width}
                  x={rect.x}
                  y={rect.y}
                />
              )}
              <path
                d={`M ${targetX} ${targetY} L ${labelX} ${targetY} L ${labelX} ${labelY}`}
                fill="none"
                stroke={tone.line}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <circle cx={targetX} cy={targetY} fill={tone.line} r="2" />
            </g>
          );
        })}
      </svg>

      {annotations.map((annotation) => {
        if (!rects[annotation.target]) return null;
        const tone = toneStyles[annotation.tone ?? "neutral"];
        return (
          <div
            key={annotation.id}
            className="absolute -translate-y-1/2"
            style={{
              left: `${annotation.x * 100}%`,
              top: `${annotation.y * 100}%`,
            }}
          >
            <div
              className={`rounded-[5px] border bg-black/90 px-2.5 py-1 font-mono text-[11px] leading-none tracking-[0.02em] shadow-[0_4px_16px_rgba(0,0,0,0.24)] ${tone.border} ${tone.text}`}
            >
              {annotation.label}
            </div>
            {annotation.note ? (
              <div className="mt-1.5 max-w-40 font-mono text-[9px] leading-relaxed text-white/30">
                {annotation.note}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
