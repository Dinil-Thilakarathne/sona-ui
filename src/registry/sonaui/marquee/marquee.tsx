"use client";

import {
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useVelocity,
} from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps {
  /** Content of one marquee segment. Can be a single small element or a long strip. */
  children: React.ReactNode;
  className?: string;
  /** Class for the outer clipping container. */
  containerClassName?: string;
  /**
   * Scroll speed in pixels per second. Higher = faster.
   * @default 80
   */
  speed?: number;
  /**
   * Gap between repeated segments, any CSS length string.
   * @default "4rem"
   */
  gap?: string;
  /**
   * Scroll direction.
   * @default "left"
   */
  direction?: "left" | "right" | "up" | "down";
  /**
   * Multiply speed by scroll velocity (and flip direction on scroll-up).
   * @default false
   */
  scrollVelocity?: boolean;
  /**
   * Max speed multiplier when scrollVelocity is enabled.
   * @default 5
   */
  maxVelocity?: number;
  /**
   * Pause (with easing, not a snap) on hover.
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * How many segment copies to render.
   * "auto" measures the container and fills 2× it.
   * @default "auto"
   */
  repeat?: number | "auto";
}

export default function Marquee({
  children,
  className,
  containerClassName,
  speed = 80,
  gap = "4rem",
  direction = "left",
  scrollVelocity = false,
  maxVelocity = 5,
  pauseOnHover = false,
  repeat = "auto",
}: MarqueeProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const segmentRef = useRef<HTMLDivElement>(null);

  // How many copies are rendered (updated by ResizeObserver)
  const countRef = useRef<number>(typeof repeat === "number" ? repeat : 4);

  // Motion value for translation — never stored in React state
  const baseX = useMotionValue(0);
  const isHovered = useRef(false);
  // 0 = fully paused, 1 = full speed — lerped in rAF
  const speedMultiplier = useRef(1);

  // Scroll velocity pipeline (motion values only — no setState)
  const { scrollY } = useScroll();
  const scrollVelocityMV = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocityMV, {
    damping: 50,
    stiffness: 400,
  });

  const isVertical = direction === "up" || direction === "down";
  const directionSign = direction === "left" || direction === "up" ? 1 : -1;

  // ResizeObserver — recompute copy count when container or segment resize
  useEffect(() => {
    if (repeat !== "auto" || shouldReduceMotion) return;

    const container = containerRef.current;
    const segment = segmentRef.current;
    if (!container || !segment) return;

    function recompute() {
      if (!container || !segment) return;
      const containerSize = isVertical
        ? container.offsetHeight
        : container.offsetWidth;
      const segmentSize = isVertical
        ? segment.offsetHeight
        : segment.offsetWidth;
      if (segmentSize > 0) {
        countRef.current = Math.max(
          2,
          Math.ceil((containerSize * 2) / segmentSize) + 1,
        );
      }
    }

    recompute();
    const ro = new ResizeObserver(recompute);
    ro.observe(container);
    ro.observe(segment);
    return () => ro.disconnect();
  }, [repeat, isVertical, shouldReduceMotion]);

  // Hover handlers
  const onMouseEnter = () => {
    if (pauseOnHover) isHovered.current = true;
  };
  const onMouseLeave = () => {
    if (pauseOnHover) isHovered.current = false;
  };

  // Main animation loop — all in motion values, zero React state
  useAnimationFrame((_, delta) => {
    if (shouldReduceMotion) return;

    const segment = segmentRef.current;
    if (!segment) return;

    const segmentSize = isVertical ? segment.offsetHeight : segment.offsetWidth;
    if (segmentSize === 0) return;

    // Lerp speedMultiplier toward target (eased pause on hover)
    const targetMultiplier = isHovered.current ? 0 : 1;
    speedMultiplier.current +=
      (targetMultiplier - speedMultiplier.current) * 0.1;

    // Velocity boost from scroll
    let velocityBoost = 1;
    let velocityFlip = 1;
    if (scrollVelocity) {
      const v = smoothVelocity.get();
      velocityBoost = Math.min(Math.abs(v) / 200, maxVelocity);
      velocityBoost = Math.max(velocityBoost, 1);
      if (v < -50) velocityFlip = -1;
    }

    const pxPerMs = speed / 1000;
    const delta_px =
      pxPerMs *
      delta *
      directionSign *
      velocityFlip *
      speedMultiplier.current *
      velocityBoost;

    let next = baseX.get() - delta_px;

    // Wrap: keep translation within [-segmentSize, 0)
    if (directionSign > 0) {
      // moving left/up — translate goes negative
      if (next <= -segmentSize) next += segmentSize;
    } else {
      // moving right/down — translate goes positive
      if (next >= 0) next -= segmentSize;
      if (next < -segmentSize) next += segmentSize;
    }

    baseX.set(next);
  });

  const copies = repeat !== "auto" ? repeat : countRef.current;
  const items = Array.from({ length: copies });

  if (shouldReduceMotion) {
    // Static strip — no animation
    return (
      <div
        ref={containerRef}
        className={cn("overflow-hidden", containerClassName)}
      >
        <div
          className={cn(
            isVertical ? "flex flex-col" : "flex flex-row",
            "w-max",
            className,
          )}
          style={{ gap }}
        >
          <div ref={segmentRef}>{children}</div>
          {items.map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static decorative copies
            <div key={i} aria-hidden="true">
              {children}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden", containerClassName)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* The track: a flex row/col of copies, translated as a unit */}
      <MotionTrack
        baseX={baseX}
        isVertical={isVertical}
        gap={gap}
        className={className}
        segmentRef={segmentRef}
        items={items}
      >
        {children}
      </MotionTrack>
    </div>
  );
}

// Split into a separate component to isolate motion subscription
import { type MotionValue, motion } from "motion/react";

function MotionTrack({
  baseX,
  isVertical,
  gap,
  className,
  segmentRef,
  items,
  children,
}: {
  baseX: MotionValue<number>;
  isVertical: boolean;
  gap: string;
  className?: string;
  segmentRef: React.RefObject<HTMLDivElement | null>;
  items: unknown[];
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={isVertical ? { y: baseX } : { x: baseX }}
      className={cn(
        isVertical ? "flex flex-col" : "flex flex-row",
        "w-max will-change-transform",
        className,
      )}
    >
      {/* First segment — measured for loop math */}
      <div
        ref={segmentRef}
        style={{
          paddingRight: isVertical ? 0 : gap,
          paddingBottom: isVertical ? gap : 0,
        }}
      >
        {children}
      </div>
      {/* Copies — decorative, aria-hidden */}
      {items.map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: decorative animation copies
        <div
          key={i}
          aria-hidden="true"
          style={{
            paddingRight: isVertical ? 0 : gap,
            paddingBottom: isVertical ? gap : 0,
          }}
        >
          {children}
        </div>
      ))}
    </motion.div>
  );
}
