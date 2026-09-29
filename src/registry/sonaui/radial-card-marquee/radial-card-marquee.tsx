"use client";

import {
  type MotionValue,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { type PointerEvent, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/sona-utils";

export interface RadialCardMarqueeItem {
  /** Stable identifier used when labels or images repeat. */
  id?: string;
  /** The image URL shown by the card. */
  image: string;
  /** Accessible description for the image. */
  alt: string;
  /** Label shown beneath the image. */
  label: string;
}

export interface RadialCardMarqueeProps {
  /** Cards distributed evenly around the circular path. @default [] */
  items: RadialCardMarqueeItem[];
  /** Travel speed measured in card positions per second. @default 0.12 */
  speed?: number;
  /** Direction of continuous travel. @default "forward" */
  direction?: "forward" | "reverse";
  /** Pause movement while the pointer is over or pressing the marquee. @default true */
  pauseOnHover?: boolean;
  /** Pause movement through controlled application state. @default false */
  paused?: boolean;
  /** Additional classes for the marquee root. @default undefined */
  className?: string;
}

const FULL_TURN = Math.PI * 2;

function OrbitCard({
  item,
  index,
  itemCount,
  phase,
  cardWidth,
  cardHeight,
  radiusX,
  radiusY,
}: {
  item: RadialCardMarqueeItem;
  index: number;
  itemCount: number;
  phase: MotionValue<number>;
  cardWidth: number;
  cardHeight: number;
  radiusX: number;
  radiusY: number;
}) {
  const baseAngle = (index / itemCount) * FULL_TURN;
  const angle = useTransform(phase, (value) => baseAngle + value);
  const depth = useTransform(angle, (value) => Math.cos(value));
  const x = useTransform(angle, (value) => Math.sin(value) * radiusX);
  const y = useTransform(
    angle,
    (value) => (1 - Math.cos(value)) * radiusY - radiusY * 0.72,
  );
  const rotate = useTransform(angle, (value) => Math.sin(value) * 14);
  const scale = useTransform(depth, [-1, 1], [0.82, 1]);
  const zIndex = useTransform(depth, (value) => Math.round((value + 1) * 50));

  return (
    <motion.article
      suppressHydrationWarning
      aria-label={item.label}
      className="pointer-events-none absolute left-1/2 top-1/2 origin-center overflow-hidden rounded-[1.35rem] bg-[#f3f2ec] p-2 text-[#252824] shadow-[0_20px_55px_rgba(0,0,0,0.22)] sm:rounded-[1.6rem] sm:p-3"
      style={{
        width: cardWidth,
        height: cardHeight,
        marginLeft: -cardWidth / 2,
        marginTop: -cardHeight / 2,
        x,
        y,
        rotate,
        scale,
        zIndex,
      }}
    >
      <img
        src={item.image}
        alt={item.alt}
        draggable={false}
        className="h-[calc(100%-3.5rem)] w-full rounded-[1rem] object-cover sm:rounded-[1.2rem]"
      />
      <span className="flex h-14 items-center justify-center text-center text-lg font-black uppercase tracking-tight sm:text-2xl">
        {item.label}
      </span>
    </motion.article>
  );
}

export function RadialCardMarquee({
  items,
  speed = 0.12,
  direction = "forward",
  pauseOnHover = true,
  paused = false,
  className,
}: RadialCardMarqueeProps) {
  const shouldReduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const pointerOverRef = useRef(false);
  const pointerDownRef = useRef(false);
  const mountedRef = useRef(false);
  const speedMultiplierRef = useRef(shouldReduceMotion ? 0 : 1);
  const phase = useMotionValue(0);
  const [viewportWidth, setViewportWidth] = useState(900);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const updateWidth = (width: number) => {
      setViewportWidth((current) =>
        Math.abs(current - width) >= 1 ? width : current,
      );
    };
    updateWidth(root.getBoundingClientRect().width);

    const observer = new ResizeObserver(([entry]) => {
      updateWidth(entry.contentRect.width);
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (!mountedRef.current) return;

    const interactionPaused =
      pauseOnHover && (pointerOverRef.current || pointerDownRef.current);
    const targetMultiplier =
      shouldReduceMotion || paused || interactionPaused ? 0 : 1;

    speedMultiplierRef.current +=
      (targetMultiplier - speedMultiplierRef.current) *
      Math.min(delta / 120, 1);

    if (items.length < 2 || speedMultiplierRef.current < 0.001) return;

    const directionSign = direction === "forward" ? 1 : -1;
    const radiansPerMillisecond =
      (Math.max(speed, 0) * FULL_TURN) / items.length / 1000;
    let next =
      phase.get() +
      directionSign *
        radiansPerMillisecond *
        Math.min(delta, 64) *
        speedMultiplierRef.current;

    if (next >= FULL_TURN) next -= FULL_TURN;
    if (next <= -FULL_TURN) next += FULL_TURN;
    phase.set(next);
  });

  const cardWidth =
    viewportWidth < 540
      ? Math.min(viewportWidth * 0.52, 236)
      : Math.min(viewportWidth * 0.25, 300);
  const cardHeight = cardWidth * 1.24;
  const cardGap = viewportWidth < 540 ? 16 : viewportWidth < 820 ? 28 : 44;
  const minimumRadius =
    items.length > 1
      ? (cardWidth + cardGap) /
        (2 * Math.sin(Math.PI / Math.max(items.length, 2)))
      : 0;
  const radiusX = Math.max(minimumRadius, cardWidth * 1.05);
  const radiusY = Math.min(cardHeight * 0.62, radiusX * 0.58);

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    pointerDownRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerEnd = (event: PointerEvent<HTMLElement>) => {
    pointerDownRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  if (items.length === 0) return null;

  return (
    <section
      ref={rootRef}
      aria-label="Radial card marquee"
      className={cn("w-full min-h-[70vh] xl:min-h-[60vh]", className)}
      onPointerEnter={() => {
        pointerOverRef.current = true;
      }}
      onPointerLeave={() => {
        pointerOverRef.current = false;
        pointerDownRef.current = false;
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
    >
      <div className="absolute inset-0 h-full ">
        {items.map((item, index) => (
          <OrbitCard
            key={item.id ?? `${item.label}-${item.image}`}
            item={item}
            index={index}
            itemCount={items.length}
            phase={phase}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            radiusX={radiusX}
            radiusY={radiusY}
          />
        ))}
      </div>
    </section>
  );
}

export default RadialCardMarquee;
