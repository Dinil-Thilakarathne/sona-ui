"use client";

import {
  animate,
  type MotionValue,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/sona-utils";

export interface DepthTileItem {
  /** Stable identifier used to preserve the tile across reorders. */
  id: string;
  /** Image URL rendered by the tile. */
  image: string;
  /** Accessible description for the image. */
  alt: string;
  /** Small label shown at the bottom of the tile. */
  label: string;
}

export interface DepthTilesProps {
  /** Tiles shown in the infinite stack. */
  items: DepthTileItem[];
  /** Controlled active tile index. @default undefined */
  index?: number;
  /** Initial active tile index when uncontrolled. @default 0 */
  defaultIndex?: number;
  /** Called after the active tile changes. @default undefined */
  onIndexChange?: (index: number) => void;
  /** Enables automatic forward movement. @default true */
  autoplay?: boolean;
  /** Time between automatic advances in milliseconds. @default 3200 */
  interval?: number;
  /** Pauses autoplay while the pointer is over the component. @default true */
  pauseOnHover?: boolean;
  /** Enables horizontal pointer drag and touch swipe. @default true */
  draggable?: boolean;
  /** Accessible label for the carousel region. @default "Depth tiles" */
  ariaLabel?: string;
  /** Additional classes for the component. @default undefined */
  className?: string;
}

const SPRING = {
  type: "spring",
  stiffness: 330,
  damping: 36,
  mass: 0.85,
} as const;
const TAU = Math.PI * 2;

const wrapIndex = (value: number, length: number) =>
  ((value % length) + length) % length;

const roundStyleValue = (value: number) => Math.round(value * 1000) / 1000;

function getShortestDelta(itemIndex: number, progress: number, length: number) {
  if (length <= 1) return 0;
  const half = length / 2;
  return ((((itemIndex - progress + half) % length) + length) % length) - half;
}

function DepthTile({
  item,
  itemIndex,
  itemCount,
  progress,
  orbitRadius,
  hydrated,
}: {
  item: DepthTileItem;
  itemIndex: number;
  itemCount: number;
  progress: MotionValue<number>;
  orbitRadius: number;
  hydrated: boolean;
}) {
  const phase = useTransform(
    progress,
    (value) => ((itemIndex - value) / itemCount) * TAU,
  );
  const depth = useTransform(phase, (value) => (1 - Math.cos(value)) / 2);
  const x = useTransform(phase, (value) => Math.sin(value) * orbitRadius);
  const y = useTransform(depth, (value) => value * 28);
  const scale = useTransform(depth, (value) => 1 - value * 0.2);
  const opacity = useTransform(depth, (value) => 1 - value * 0.64);
  const zIndex = useTransform(depth, (value) => Math.round((1 - value) * 100));
  const initialPhase = ((itemIndex - progress.get()) / itemCount) * TAU;
  const initialDepth = (1 - Math.cos(initialPhase)) / 2;
  const initialStyle = {
    opacity: roundStyleValue(1 - initialDepth * 0.64),
    transform: `translateX(${roundStyleValue(Math.sin(initialPhase) * orbitRadius)}px) translateY(${roundStyleValue(initialDepth * 28)}px) scale(${roundStyleValue(1 - initialDepth * 0.2)})`,
    zIndex: Math.round((1 - initialDepth) * 100),
  };

  return (
    <motion.article
      aria-hidden="true"
      className="pointer-events-none absolute aspect-[1.12] w-[min(68vw,25rem)] overflow-hidden rounded-[1.4rem] bg-muted shadow-[0_2px_8px_rgba(0,0,0,.08),0_24px_64px_rgba(0,0,0,.18)] will-change-transform sm:rounded-[1.75rem]"
      style={hydrated ? { x, y, scale, opacity, zIndex } : initialStyle}
    >
      {/* biome-ignore lint/performance/noImgElement: framework-neutral registry component */}
      <img
        src={item.image}
        alt=""
        draggable={false}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/72 via-black/22 to-transparent px-5 pb-5 pt-20 text-white">
        <span className="text-base font-medium tracking-[-0.015em] sm:text-lg">
          {item.label}
        </span>
      </div>
    </motion.article>
  );
}

export default function DepthTiles({
  items,
  index,
  defaultIndex = 0,
  onIndexChange,
  autoplay = true,
  interval = 3200,
  pauseOnHover = true,
  draggable = true,
  ariaLabel = "Depth tiles",
  className,
}: DepthTilesProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const descriptionId = useId();
  const isControlled = index !== undefined;
  const [uncontrolledIndex, setUncontrolledIndex] = useState(defaultIndex);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(960);
  const viewportRef = useRef<HTMLDivElement>(null);
  const itemCount = items.length;
  const activeIndex = itemCount
    ? wrapIndex(isControlled ? index : uncontrolledIndex, itemCount)
    : 0;
  const progress = useMotionValue(activeIndex);
  const dragStartProgress = useRef(activeIndex);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => setHydrated(true), []);

  const stopAnimation = useCallback(() => {
    animationRef.current?.stop();
    animationRef.current = null;
  }, []);

  const commitIndex = useCallback(
    (nextIndex: number) => {
      if (!itemCount) return;
      const wrapped = wrapIndex(nextIndex, itemCount);
      if (!isControlled) setUncontrolledIndex(wrapped);
      if (wrapped !== activeIndex) onIndexChange?.(wrapped);
    },
    [activeIndex, isControlled, itemCount, onIndexChange],
  );

  const settleTo = useCallback(
    (targetProgress: number) => {
      stopAnimation();
      const targetIndex = Math.round(targetProgress);
      if (reduceMotion) {
        progress.set(targetIndex);
        commitIndex(targetIndex);
        return;
      }
      animationRef.current = animate(progress, targetIndex, {
        ...SPRING,
        onComplete: () => {
          animationRef.current = null;
          commitIndex(targetIndex);
        },
      });
    },
    [commitIndex, progress, reduceMotion, stopAnimation],
  );

  const moveBy = useCallback(
    (direction: 1 | -1) => settleTo(progress.get() + direction),
    [progress, settleTo],
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(([entry]) => {
      setViewportWidth(entry.contentRect.width);
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () =>
      setIsDocumentVisible(document.visibilityState === "visible");
    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (!itemCount) return;
    const current = progress.get();
    if (wrapIndex(Math.round(current), itemCount) === activeIndex) return;
    stopAnimation();
    const target = current + getShortestDelta(activeIndex, current, itemCount);
    if (reduceMotion) progress.set(target);
    else animationRef.current = animate(progress, target, SPRING);
  }, [activeIndex, itemCount, progress, reduceMotion, stopAnimation]);

  useEffect(() => {
    if (
      !autoplay ||
      reduceMotion ||
      !isDocumentVisible ||
      isDragging ||
      isFocused ||
      (pauseOnHover && isHovered) ||
      itemCount < 2
    )
      return;
    const timer = window.setTimeout(() => moveBy(1), Math.max(interval, 800));
    return () => window.clearTimeout(timer);
  }, [
    autoplay,
    interval,
    isDocumentVisible,
    isDragging,
    isFocused,
    isHovered,
    itemCount,
    moveBy,
    pauseOnHover,
    reduceMotion,
  ]);

  useEffect(() => stopAnimation, [stopAnimation]);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveBy(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveBy(-1);
    }
  };

  if (!itemCount) return null;
  const activeItem = items[activeIndex];
  const orbitRadius = Math.min(292, Math.max(126, viewportWidth * 0.31));
  const dragStep = Math.min(280, Math.max(180, viewportWidth * 0.34));

  return (
    <section
      aria-label={ariaLabel}
      aria-describedby={descriptionId}
      aria-roledescription="carousel"
      tabIndex={itemCount > 1 ? 0 : undefined}
      className={cn("w-full", className)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setIsFocused(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={viewportRef}
        className="relative mx-auto flex h-[22rem] w-full max-w-5xl items-center justify-center overflow-hidden sm:h-[31rem]"
      >
        {!reduceMotion &&
          items.map((item, itemIndex) => (
            <DepthTile
              key={item.id}
              item={item}
              itemIndex={itemIndex}
              itemCount={itemCount}
              progress={progress}
              orbitRadius={orbitRadius}
              hydrated={hydrated}
            />
          ))}

        {reduceMotion && (
          <article className="pointer-events-none absolute aspect-[1.12] w-[min(68vw,25rem)] overflow-hidden rounded-[1.4rem] bg-muted shadow-[0_2px_8px_rgba(0,0,0,.08),0_24px_64px_rgba(0,0,0,.18)] sm:rounded-[1.75rem]">
            {/* biome-ignore lint/performance/noImgElement: framework-neutral registry component */}
            <img
              src={activeItem.image}
              alt=""
              draggable={false}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/72 via-black/22 to-transparent px-5 pb-5 pt-20 text-white">
              <span className="text-base font-medium tracking-[-0.015em] sm:text-lg">
                {activeItem.label}
              </span>
            </div>
          </article>
        )}

        {draggable && itemCount > 1 && !reduceMotion && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 z-[120] cursor-grab touch-pan-y active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.08}
            onDragStart={() => {
              stopAnimation();
              dragStartProgress.current = progress.get();
              setIsDragging(true);
            }}
            onDrag={(_, info) =>
              progress.set(dragStartProgress.current - info.offset.x / dragStep)
            }
            onDragEnd={(_, info) => {
              const distance = Math.abs(info.offset.x);
              const velocity = Math.abs(info.velocity.x);
              const shouldAdvance = distance > 44 || velocity > 420;
              const direction =
                velocity > 420
                  ? info.velocity.x < 0
                    ? 1
                    : -1
                  : info.offset.x < 0
                    ? 1
                    : -1;
              setIsDragging(false);
              settleTo(
                shouldAdvance
                  ? Math.round(dragStartProgress.current) + direction
                  : Math.round(dragStartProgress.current),
              );
            }}
          />
        )}
      </div>

      <div
        id={descriptionId}
        className="sr-only"
        aria-live={isFocused ? "polite" : "off"}
        aria-atomic="true"
      >
        {activeItem.alt}. {activeItem.label}, item {activeIndex + 1} of{" "}
        {itemCount}
        {itemCount > 1
          ? ". Use the left and right arrow keys to navigate."
          : ""}
      </div>
    </section>
  );
}

export { DepthTiles };
