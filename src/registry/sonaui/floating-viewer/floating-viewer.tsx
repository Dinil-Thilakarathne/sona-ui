"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import {
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/sona-utils";

export type FloatingViewerCorner =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export interface FloatingViewerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Media or reference content that remains mounted while the viewer moves. */
  children: ReactNode;
  /** Accessible name announced for the floating viewer. @default "Floating media viewer" */
  ariaLabel?: string;
  /** CSS aspect-ratio value used by both viewer states. @default "16 / 9" */
  aspectRatio?: string;
  /** Width of the floating surface in pixels. @default 320 */
  floatingWidth?: number;
  /** Gap between the floating surface and viewport edges in pixels. @default 16 */
  viewportPadding?: number;
  /** Corner used when the viewer first detaches. @default "bottom-right" */
  defaultCorner?: FloatingViewerCorner;
  /** Automatically detach when the inline viewer leaves the viewport. @default true */
  floatOnExit?: boolean;
  /** Shows the built-in Float button while the viewer is inline. @default true */
  showFloatControl?: boolean;
  /** Called whenever the viewer enters or leaves its floating state. @default undefined */
  onFloatingChange?: (floating: boolean) => void;
  /** Additional CSS classes for the media surface. @default undefined */
  surfaceClassName?: string;
}

type Size = { width: number; height: number };
type FloatingReason = "auto" | "manual" | null;

const corners: FloatingViewerCorner[] = [
  "top-left",
  "top-right",
  "bottom-right",
  "bottom-left",
];

function getCornerPosition(
  corner: FloatingViewerCorner,
  viewport: Size,
  viewer: Size,
  padding: number,
) {
  return {
    x: corner.endsWith("right")
      ? Math.max(padding, viewport.width - viewer.width - padding)
      : padding,
    y: corner.startsWith("bottom")
      ? Math.max(padding, viewport.height - viewer.height - padding)
      : padding,
  };
}

export default function FloatingViewer({
  children,
  ariaLabel = "Floating media viewer",
  aspectRatio = "16 / 9",
  floatingWidth = 320,
  viewportPadding = 16,
  defaultCorner = "bottom-right",
  floatOnExit = true,
  showFloatControl = true,
  onFloatingChange,
  className,
  surfaceClassName,
  ...props
}: FloatingViewerProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [floatingReason, setFloatingReason] = useState<FloatingReason>(null);
  const [corner, setCorner] = useState(defaultCorner);
  const [dismissedUntilVisible, setDismissedUntilVisible] = useState(false);
  const [viewport, setViewport] = useState<Size>({ width: 0, height: 0 });
  const [viewer, setViewer] = useState<Size>({ width: 0, height: 0 });

  const floating = floatingReason !== null;

  const setFloatingState = useCallback(
    (reason: FloatingReason) => {
      setFloatingReason((current) => {
        if ((current !== null) !== (reason !== null)) {
          onFloatingChange?.(reason !== null);
        }
        return reason;
      });
    },
    [onFloatingChange],
  );

  const moveToCorner = useCallback(
    (nextCorner: FloatingViewerCorner, immediate = false) => {
      const target = getCornerPosition(
        nextCorner,
        viewport,
        viewer,
        viewportPadding,
      );
      setCorner(nextCorner);

      if (immediate || shouldReduceMotion) {
        x.set(target.x);
        y.set(target.y);
        return;
      }

      const transition = { type: "spring" as const, bounce: 0, duration: 0.4 };
      animate(x, target.x, transition);
      animate(y, target.y, transition);
    },
    [shouldReduceMotion, viewport, viewer, viewportPadding, x, y],
  );

  useEffect(() => {
    const updateViewport = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const borderSize = entry.borderBoxSize[0];
      setViewer({
        width: borderSize?.inlineSize ?? entry.contentRect.width,
        height: borderSize?.blockSize ?? entry.contentRect.height,
      });
    });
    observer.observe(surface);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!floating || viewport.width === 0 || viewer.width === 0) return;
    moveToCorner(corner);
  }, [corner, floating, moveToCorner, viewer.width, viewport.width]);

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor || !floatOnExit) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setDismissedUntilVisible(false);
          if (floatingReason === "auto") setFloatingState(null);
        } else if (!dismissedUntilVisible && floatingReason === null) {
          setFloatingState("auto");
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(anchor);
    return () => observer.disconnect();
  }, [dismissedUntilVisible, floatOnExit, floatingReason, setFloatingState]);

  const restore = () => {
    anchorRef.current?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "center",
    });
    setFloatingState(null);
  };

  const closeFloating = () => {
    setDismissedUntilVisible(true);
    setFloatingState(null);
  };

  const cycleCorner = () => {
    const currentIndex = corners.indexOf(corner);
    moveToCorner(corners[(currentIndex + 1) % corners.length]);
  };

  const surface = (
    <motion.div
      aria-label={floating ? ariaLabel : undefined}
      className={cn(
        "group/viewer relative isolate overflow-hidden rounded-2xl bg-black",
        !floating && "absolute inset-0",
        floating &&
          "fixed top-0 left-0 z-50 cursor-grab touch-none shadow-black/20 shadow-xl active:cursor-grabbing",
        surfaceClassName,
      )}
      drag={floating}
      dragConstraints={
        floating
          ? {
              left: viewportPadding,
              right: Math.max(
                viewportPadding,
                viewport.width - viewer.width - viewportPadding,
              ),
              top: viewportPadding,
              bottom: Math.max(
                viewportPadding,
                viewport.height - viewer.height - viewportPadding,
              ),
            }
          : undefined
      }
      dragElastic={0.08}
      dragMomentum={false}
      layout={!shouldReduceMotion}
      onDragEnd={(_, info) => {
        const nextCorner: FloatingViewerCorner = `${
          info.point.y < viewport.height / 2 ? "top" : "bottom"
        }-${info.point.x < viewport.width / 2 ? "left" : "right"}`;
        moveToCorner(nextCorner);
      }}
      ref={surfaceRef}
      role={floating ? "region" : undefined}
      style={{
        aspectRatio,
        width: floating
          ? Math.min(floatingWidth, viewport.width - viewportPadding * 2)
          : "100%",
        x: floating ? x : 0,
        y: floating ? y : 0,
      }}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
    >
      <div className="size-full">{children}</div>

      {floating ? (
        <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/60 p-1 text-white backdrop-blur-md">
          <ViewerButton
            label={`Move viewer from ${corner}`}
            onClick={cycleCorner}
          >
            <path d="M8 3H3v5M16 3h5v5M8 21H3v-5m13 5h5v-5" />
          </ViewerButton>
          <ViewerButton label="Restore viewer to the page" onClick={restore}>
            <path d="M8 8h8v8H8zM5 12H3V5h7v2m9 5h2v7h-7v-2" />
          </ViewerButton>
          <ViewerButton label="Close floating viewer" onClick={closeFloating}>
            <path d="m7 7 10 10M17 7 7 17" />
          </ViewerButton>
        </div>
      ) : showFloatControl ? (
        <button
          className="absolute top-3 right-3 inline-flex cursor-pointer items-center gap-2 rounded-full bg-black/60 px-3 py-2 font-medium text-white text-xs opacity-0 backdrop-blur-md transition-[opacity,background-color] duration-150 group-hover/viewer:opacity-100 hover:bg-black/75 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          onClick={() => setFloatingState("manual")}
          type="button"
        >
          <svg
            aria-hidden="true"
            className="size-3.5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M14 5h5v5m0-5-6 6M10 19H5v-5m0 5 6-6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
          </svg>
          Float
        </button>
      ) : null}
    </motion.div>
  );

  return (
    <div className={cn("relative w-full", className)} {...props}>
      <div aria-hidden="true" ref={anchorRef} style={{ aspectRatio }}>
        {floating ? (
          <div className="size-full rounded-2xl bg-muted/45" />
        ) : null}
      </div>
      {surface}
    </div>
  );
}

function ViewerButton({
  children,
  label,
  onClick,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-150 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
      onClick={onClick}
      onPointerDown={(event) => event.stopPropagation()}
      type="button"
    >
      <svg
        aria-hidden="true"
        className="size-4"
        fill="none"
        viewBox="0 0 24 24"
      >
        <g
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        >
          {children}
        </g>
      </svg>
    </button>
  );
}
