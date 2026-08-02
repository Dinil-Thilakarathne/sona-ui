"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/sona-utils";

export interface AvatarShowcaseItem {
  /** Stable identifier used to preserve the supplied item order. */
  id: string;
  /** Accessible name for the person or profile. */
  name: string;
  /** Avatar image URL. */
  imageUrl: string;
}

export interface AvatarShowcaseProps extends React.HTMLAttributes<HTMLElement> {
  /** Ordered people to present. The first item is treated as the most recent. */
  items: AvatarShowcaseItem[];
  /** Number of vertically staggered lanes used by the moving strip.
   * @default 1
   */
  lanes?: 1 | 2 | 3;
  /** Total community size when `items` contains only a recent subset.
   * @default items.length
   */
  totalCount?: number;
  /** Optional message revealed with the final count. Omit it for a count-only ending.
   * @default undefined
   */
  message?: string;
  /** Maximum number of avatars rendered before deterministic sampling is applied.
   * @default 80
   */
  maxItems?: number;
  /** Fixed playback duration in seconds. When omitted, duration is derived from the total count.
   * @default undefined
   */
  duration?: number;
  /** Avatar diameter in pixels.
   * @default 56
   */
  avatarSize?: number;
  /** Called after the strip finishes and the ending is revealed.
   * @default undefined
   */
  onComplete?: () => void;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function sampleItems(items: AvatarShowcaseItem[], limit: number) {
  if (items.length <= limit) return items;

  const recentCount = Math.min(12, Math.ceil(limit / 3));
  const recentItems = items.slice(0, recentCount);
  const remainingSlots = limit - recentCount;
  const remainingItems = items.slice(recentCount);

  const sampledItems = Array.from({ length: remainingSlots }, (_, index) => {
    const sampleIndex = Math.floor(
      (index * (remainingItems.length - 1)) / Math.max(1, remainingSlots - 1),
    );
    return remainingItems[sampleIndex];
  });

  return [...recentItems, ...sampledItems];
}

function getInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "?"
  );
}

function ShowcaseAvatar({
  item,
  size,
}: {
  item: AvatarShowcaseItem;
  size: number;
}) {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <div
      className="relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-muted font-medium text-muted-foreground shadow-[0_0_0_1px_color-mix(in_oklab,var(--border)_80%,transparent),0_8px_24px_-12px_color-mix(in_oklab,var(--foreground)_24%,transparent)]"
      style={{ width: size, height: size }}
      title={item.name}
    >
      {hasImageError ? (
        <span
          aria-hidden="true"
          style={{ fontSize: Math.max(11, size * 0.28) }}
        >
          {getInitials(item.name)}
        </span>
      ) : (
        // biome-ignore lint/performance/noImgElement: registry consumers may provide any remote image source
        <img
          alt=""
          className="size-full object-cover"
          draggable={false}
          loading="eager"
          onError={() => setHasImageError(true)}
          src={item.imageUrl}
        />
      )}
    </div>
  );
}

export default function AvatarShowcase({
  items,
  lanes = 1,
  totalCount = items.length,
  message,
  maxItems = 80,
  duration,
  avatarSize = 56,
  className,
  onComplete,
  ...props
}: AvatarShowcaseProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [measurement, setMeasurement] = useState({ container: 0, track: 0 });
  const [isComplete, setIsComplete] = useState(false);

  const safeLaneCount = clamp(Math.round(lanes), 1, 3);
  const safeAvatarSize = clamp(avatarSize, 32, 96);
  const safeLimit = Math.max(1, Math.floor(maxItems));
  const visibleItems = useMemo(
    () => sampleItems(items, safeLimit),
    [items, safeLimit],
  );
  const effectiveLanes = Math.min(safeLaneCount, visibleItems.length || 1);
  const laneOffset = safeAvatarSize * 0.58;
  const containerHeight = safeAvatarSize + laneOffset * (effectiveLanes - 1);
  const measurementKey = `${visibleItems.map((item) => item.id).join(":")}-${effectiveLanes}-${safeAvatarSize}`;
  const resolvedCount = Math.max(totalCount, items.length);
  const resolvedDuration =
    duration ?? clamp(8 + Math.log10(Math.max(1, resolvedCount)) * 1.2, 8, 12);

  useEffect(() => {
    // Reconnect the observer when the rendered strip geometry changes.
    void measurementKey;
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const measure = () => {
      const nextMeasurement = {
        container: container.clientWidth,
        track: track.scrollWidth,
      };
      // Removing the completed track reports a transient zero width. Ignoring
      // that observation keeps the final count visible instead of restarting.
      if (nextMeasurement.container === 0 || nextMeasurement.track === 0)
        return;
      setMeasurement(nextMeasurement);
      setIsComplete(false);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measurementKey]);

  if (visibleItems.length === 0) {
    return (
      <section
        aria-label="No people to showcase yet"
        className={cn(
          "grid min-h-28 place-items-center overflow-hidden rounded-xl border border-border bg-background px-6 text-center text-muted-foreground text-sm",
          className,
        )}
        {...props}
      >
        No people to showcase yet.
      </section>
    );
  }

  const summary = `Showing ${visibleItems.length.toLocaleString()} of ${resolvedCount.toLocaleString()} people.`;
  const staticItems = visibleItems.slice(0, Math.min(8, visibleItems.length));
  const canAnimate =
    !shouldReduceMotion && measurement.container > 0 && measurement.track > 0;

  return (
    <section
      ref={containerRef}
      aria-label={summary}
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-border bg-background px-4 py-8",
        className,
      )}
      {...props}
    >
      <span className="sr-only">{summary}</span>

      {shouldReduceMotion ? (
        <div
          className="flex items-center justify-center -space-x-3"
          aria-hidden="true"
        >
          {staticItems.map((item) => (
            <ShowcaseAvatar item={item} key={item.id} size={safeAvatarSize} />
          ))}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              aria-hidden="true"
              animate={
                canAnimate
                  ? { x: -measurement.track - safeAvatarSize }
                  : { x: 0 }
              }
              className="flex w-max items-start gap-3 will-change-transform"
              initial={{ x: measurement.container + safeAvatarSize }}
              key={`${measurement.container}-${measurement.track}-${measurementKey}`}
              onAnimationComplete={() => {
                if (!canAnimate) return;
                setIsComplete(true);
                onComplete?.();
              }}
              ref={trackRef}
              style={{ height: containerHeight }}
              transition={{ duration: resolvedDuration, ease: "linear" }}
            >
              {visibleItems.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    transform: `translateY(${(index % effectiveLanes) * laneOffset}px)`,
                  }}
                >
                  <ShowcaseAvatar item={item} size={safeAvatarSize} />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              className="grid min-h-20 place-items-center text-center"
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              key="summary"
              transition={{ type: "spring", duration: 0.45, bounce: 0 }}
            >
              <div>
                <p className="font-semibold tabular-nums text-2xl text-foreground">
                  {resolvedCount.toLocaleString()}
                </p>
                {message ? (
                  <p className="mt-1 text-muted-foreground text-sm">
                    {message}
                  </p>
                ) : null}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
