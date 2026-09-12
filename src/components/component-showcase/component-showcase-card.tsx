"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  type FocusEvent,
  forwardRef,
  type PointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "@/components/common/link";
import Chip from "@/registry/sonaui/chip/chip";
import { ComponentShowcaseVideoPlayer } from "./component-showcase-video";
import type { ComponentShowcaseItem } from "./types";

type ComponentShowcaseCardProps = {
  item: ComponentShowcaseItem;
  preview: ReactNode;
  autoPlayVideo?: boolean;
};

export const ComponentShowcaseCard = forwardRef<
  HTMLElement,
  ComponentShowcaseCardProps
>(function ComponentShowcaseCard(
  { item, preview, autoPlayVideo = false },
  ref,
) {
  const shouldReduceMotion = useReducedMotion();
  const card = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const isVideo = Boolean(item.video && !videoFailed);
  const setCardRefs = useCallback(
    (node: HTMLElement | null) => {
      card.current = node;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref],
  );

  useEffect(() => {
    const currentCard = card.current;
    if (!currentCard || !isVideo) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      { rootMargin: "240px 0px" },
    );

    observer.observe(currentCard);
    return () => observer.disconnect();
  }, [isVideo]);

  const deactivateWhenLeaving = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsActive(false);
    }
  };

  const activateOnPointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "touch") {
      setIsActive(true);
    }
  };

  return (
    <motion.article
      ref={setCardRefs}
      layout="position"
      initial={false}
      animate={{ opacity: 1 }}
      exit={
        shouldReduceMotion
          ? { opacity: 0, transition: { duration: 0 } }
          : {
              opacity: 0,
              transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] },
            }
      }
      transition={{
        layout: shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.22, ease: [0.23, 1, 0.32, 1] },
        opacity: { duration: shouldReduceMotion ? 0 : 0.18 },
      }}
      onBlurCapture={deactivateWhenLeaving}
      onFocusCapture={() => setIsActive(true)}
      onPointerEnter={activateOnPointerEnter}
      onMouseLeave={() => setIsActive(false)}
      className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl bg-card p-2 smooth-shadow-ring-sm"
    >
      <div className="relative flex aspect-[5/3] items-center justify-center overflow-hidden rounded-xl">
        {isVideo && item.video ? (
          <ComponentShowcaseVideoPlayer
            isActive={isNearViewport && (autoPlayVideo || isActive)}
            onError={() => setVideoFailed(true)}
            video={item.video}
          />
        ) : (
          <>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--foreground)/0.08),transparent_55%)]" />
            <div className="relative flex min-h-0 max-w-full items-center justify-center p-5">
              {preview}
            </div>
          </>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 p-2 pt-3">
        <div className="min-w-0">
          <h2 className="truncate font-semibold text-sm tracking-[-0.015em]">
            {item.name}
          </h2>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {item.tag && (
            <Chip
              size="sm"
              tone={
                item.tag === "new"
                  ? "success"
                  : item.tag === "updated" || item.tag === "beta"
                    ? "warning"
                    : "neutral"
              }
              variant="soft"
            >
              <Chip.Label>{item.tag}</Chip.Label>
            </Chip>
          )}
          {/*<ArrowUpRight
            className="size-4 text-muted-foreground transition-colors duration-150 group-hover:text-foreground group-focus-within:text-foreground motion-reduce:transition-none"
            aria-hidden="true"
          />*/}
        </div>
      </div>

      <Link
        href={item.href}
        aria-label={`View ${item.name} documentation`}
        className="absolute inset-0 z-10 rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-foreground"
      >
        <span className="sr-only">View {item.name} documentation</span>
      </Link>
    </motion.article>
  );
});
