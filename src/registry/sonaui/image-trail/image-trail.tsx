"use client";

import {
  AnimatePresence,
  motion,
  type TargetAndTransition,
  useReducedMotion,
} from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type ImageTrailVariant = "scale" | "fade" | "blur" | "rise" | "tilt";

export interface ImageTrailProps {
  /** Image sources spawned in order as the pointer moves. */
  images: string[];
  /** The content the effect is scoped to; the trail only spawns over this area. */
  children: ReactNode;
  /** Additional CSS classes for the container. */
  className?: string;
  /** Extra classes for each trail image (use for sizing, e.g. `"w-48"`). @default "w-40" */
  itemClassName?: string;
  /**
   * Pointer distance in pixels travelled before the next image spawns.
   * @default 80
   */
  threshold?: number;
  /**
   * Maximum number of images alive at once.
   * @default 8
   */
  maxImages?: number;
  /**
   * How long an image stays before it animates out, in milliseconds.
   * @default 600
   */
  lifetime?: number;
  /**
   * Entrance and exit animation style.
   * @default "scale"
   */
  variant?: "scale" | "fade" | "blur" | "rise" | "tilt";
  /**
   * CSS selector for elements that suppress the effect when hovered, keeping
   * interactive UI unobstructed.
   * @default "a, button, input, [data-image-trail-ignore]"
   */
  ignoreSelector?: string;
  /**
   * z-index of the trail layer.
   * @default 10
   */
  zIndex?: number;
}

interface TrailItem {
  id: number;
  src: string;
  x: number;
  y: number;
  rotate: number;
}

const VARIANTS: Record<
  ImageTrailVariant,
  {
    initial: TargetAndTransition;
    animate: TargetAndTransition;
    exit: TargetAndTransition;
  }
> = {
  scale: {
    initial: { opacity: 0, scale: 0.4 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  blur: {
    initial: { opacity: 0, filter: "blur(12px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(8px)" },
  },
  rise: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -24 },
  },
  tilt: {
    initial: { opacity: 0, scale: 0.6 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
};

export default function ImageTrail({
  images,
  children,
  className,
  itemClassName = "w-40",
  threshold = 80,
  maxImages = 8,
  lifetime = 600,
  variant = "scale",
  ignoreSelector = "a, button, input, [data-image-trail-ignore]",
  zIndex = 10,
}: ImageTrailProps) {
  const prefersReducedMotion = useReducedMotion();
  const [trail, setTrail] = useState<TrailItem[]>([]);

  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const imageIndex = useRef(0);
  const idCounter = useRef(0);
  const timers = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  // Clear any pending removals when the component unmounts.
  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
      pending.clear();
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;

    // Over interactive UI: stop spawning and fast-clear live images so they
    // don't obstruct it. Their exit animation still plays via AnimatePresence.
    if ((event.target as Element).closest(ignoreSelector)) {
      timers.current.forEach(clearTimeout);
      timers.current.clear();
      lastPos.current = null;
      setTrail((prev) => (prev.length ? [] : prev));
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const last = lastPos.current;
    if (last && Math.hypot(x - last.x, y - last.y) < threshold) return;
    lastPos.current = { x, y };

    const src = images[imageIndex.current % images.length];
    imageIndex.current += 1;
    const id = idCounter.current++;
    const rotate = (Math.random() - 0.5) * (variant === "tilt" ? 24 : 8);

    setTrail((prev) => {
      const next = [...prev, { id, src, x, y, rotate }];
      return next.length > maxImages
        ? next.slice(next.length - maxImages)
        : next;
    });

    const timer = setTimeout(() => {
      setTrail((prev) => prev.filter((item) => item.id !== id));
      timers.current.delete(timer);
    }, lifetime);
    timers.current.add(timer);
  };

  const active = VARIANTS[variant];

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        lastPos.current = null;
      }}
      className={cn("relative overflow-hidden", className)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ zIndex }}
      >
        <AnimatePresence>
          {trail.map((item) => (
            // biome-ignore lint/performance/noImgElement: registry components stay framework-agnostic — no next/image dependency
            <motion.img
              key={item.id}
              src={item.src}
              alt=""
              draggable={false}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 rounded-lg object-cover shadow-lg",
                itemClassName,
              )}
              style={{ left: item.x, top: item.y, rotate: item.rotate }}
              initial={active.initial}
              animate={active.animate}
              exit={active.exit}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            />
          ))}
        </AnimatePresence>
      </div>
      {children}
    </div>
  );
}
