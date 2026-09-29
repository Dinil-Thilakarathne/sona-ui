"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  type PointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
  type WheelEvent,
} from "react";
import { cn } from "@/lib/sona-utils";

export interface RadialCardSliderItem {
  /** The image URL shown by the card. */
  image: string;
  /** Accessible description for the image. */
  alt: string;
  /** Label shown beneath the image. */
  label: string;
}

export interface RadialCardSliderProps {
  /** Cards to browse. @default [] */
  items: RadialCardSliderItem[];
  /** Initial active card index. @default 0 */
  defaultIndex?: number;
  /** Controlled active card index. @default undefined */
  index?: number;
  /** Called whenever navigation settles on a card. @default undefined */
  onIndexChange?: (index: number) => void;
  /** Additional classes for the slider. @default undefined */
  className?: string;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function RadialCardSlider({
  items,
  defaultIndex = 0,
  index: controlledIndex,
  onIndexChange,
  className,
}: RadialCardSliderProps) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(() =>
    clamp(defaultIndex, 0, Math.max(items.length - 1, 0)),
  );
  const [viewportWidth, setViewportWidth] = useState(900);
  const rootRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, offset: 0 });
  const [visualOffset, setVisualOffset] = useState(activeIndex);
  const currentIndex =
    controlledIndex === undefined
      ? activeIndex
      : clamp(controlledIndex, 0, Math.max(items.length - 1, 0));

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new ResizeObserver(([entry]) =>
      setViewportWidth(entry.contentRect.width),
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const visibleRadius =
    viewportWidth < 540 ? 1.2 : viewportWidth < 820 ? 1.55 : 2;
  const cardWidth =
    viewportWidth < 540
      ? Math.min(viewportWidth * 0.58, 260)
      : Math.min(viewportWidth * 0.3, 340);
  const cardHeight = cardWidth * 1.24;
  const cardGap = viewportWidth < 540 ? 18 : viewportWidth < 820 ? 28 : 48;
  const cardStep = cardWidth + cardGap;
  const maxOffset = Math.max(items.length - 1, 0);

  const settle = (next: number) => {
    const target = clamp(Math.round(next), 0, maxOffset);
    setActiveIndex(target);
    setVisualOffset(target);
    onIndexChange?.(target);
  };

  const moveBy = (delta: number) => settle(activeIndex + delta);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStart.current = { x: event.clientX, offset: visualOffset };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const sensitivity = Math.max(cardWidth * 0.72, 180);
    setVisualOffset(
      clamp(
        dragStart.current.offset -
          (event.clientX - dragStart.current.x) / sensitivity,
        0,
        maxOffset,
      ),
    );
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    settle(visualOffset);
  };

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (
      Math.abs(event.deltaX) < Math.abs(event.deltaY) &&
      Math.abs(event.deltaY) < 8
    )
      return;
    event.preventDefault();
    moveBy((event.deltaX || event.deltaY) > 0 ? 1 : -1);
  };

  const cards = useMemo(
    () => items.map((item, index) => ({ item, index })),
    [items],
  );
  if (!items.length) return null;

  return (
    <section
      ref={rootRef}
      className={cn("w-full", { className })}
      aria-label="Radial card slider"
    >
      <div
        className="relative isolate flex min-h-[31rem] w-full touch-pan-y select-none items-center justify-center overflow-hidden rounded-[2rem] bg-secondary px-4 py-12 text-[#f4f3ee] sm:min-h-[38rem] sm:rounded-[2.5rem]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
      >
        <div className="relative h-[25rem] w-full sm:h-[31rem]">
          {cards.map(({ item, index }) => (
            <motion.button
              key={`${item.label}-${index}`}
              type="button"
              aria-label={`Show ${item.label}`}
              className="absolute left-1/2 top-1/2 origin-center cursor-grab overflow-hidden rounded-[1.35rem] bg-[#f3f2ec] p-2 text-left text-[#252824] shadow-[0_20px_55px_rgba(0,0,0,.22)] active:cursor-grabbing sm:rounded-[1.6rem] sm:p-3"
              style={{
                width: cardWidth,
                height: cardHeight,
                marginLeft: -cardWidth / 2,
                marginTop: -cardHeight / 2,
              }}
              animate={{
                x:
                  (index -
                    (controlledIndex === undefined
                      ? visualOffset
                      : currentIndex)) *
                  cardStep,
                y:
                  Math.abs(
                    index -
                      (controlledIndex === undefined
                        ? visualOffset
                        : currentIndex),
                  ) **
                    2 *
                  34,
                rotate:
                  clamp(
                    (index -
                      (controlledIndex === undefined
                        ? visualOffset
                        : currentIndex)) /
                      visibleRadius,
                    -1,
                    1,
                  ) * 15,
                scale:
                  1 -
                  Math.min(
                    Math.abs(
                      index -
                        (controlledIndex === undefined
                          ? visualOffset
                          : currentIndex),
                    ) * 0.12,
                    0.24,
                  ),
                opacity:
                  Math.abs(
                    index -
                      (controlledIndex === undefined
                        ? visualOffset
                        : currentIndex),
                  ) > 3
                    ? 0
                    : 1,
                zIndex:
                  20 -
                  Math.round(
                    Math.abs(
                      index -
                        (controlledIndex === undefined
                          ? visualOffset
                          : currentIndex),
                    ) * 4,
                  ),
              }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 330, damping: 34, mass: 0.85 }
              }
              onClick={() => settle(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  moveBy(-1);
                }
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  moveBy(1);
                }
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
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RadialCardSlider;
