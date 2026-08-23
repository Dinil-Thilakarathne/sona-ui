"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import {
  type FocusEvent,
  forwardRef,
  type PointerEvent,
  type ReactNode,
  useState,
} from "react";
import { ComponentShowcaseVideoPlayer } from "./component-showcase-video";
import type { ComponentShowcaseItem } from "./types";

type ComponentShowcaseCardProps = {
  item: ComponentShowcaseItem;
  preview: ReactNode;
};

export const ComponentShowcaseCard = forwardRef<
  HTMLElement,
  ComponentShowcaseCardProps
>(function ComponentShowcaseCard({ item, preview }, ref) {
  const shouldReduceMotion = useReducedMotion();
  const [isActive, setIsActive] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const isVideo = Boolean(item.video && !videoFailed);

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
      ref={ref}
      layout="position"
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={
        shouldReduceMotion
          ? { opacity: 0, transition: { duration: 0.12 } }
          : {
              opacity: 0,
              transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] },
            }
      }
      transition={{
        layout: shouldReduceMotion
          ? { duration: 0.12 }
          : { duration: 0.32, ease: [0.23, 1, 0.32, 1] },
        opacity: { duration: shouldReduceMotion ? 0 : 0.18 },
        y: { duration: shouldReduceMotion ? 0 : 0.18 },
      }}
      onBlurCapture={deactivateWhenLeaving}
      onFocusCapture={() => setIsActive(true)}
      onPointerEnter={activateOnPointerEnter}
      onMouseLeave={() => setIsActive(false)}
      className="group flex min-w-0 flex-col overflow-hidden rounded-2xl bg-card smooth-shadow-ring-sm"
    >
      <Link
        href={item.href}
        aria-label={`View ${item.name} documentation`}
        className="flex h-full flex-1 flex-col rounded-[inherit] p-2 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-foreground"
      >
        <div className="relative flex aspect-[5/3] items-center justify-center overflow-hidden rounded-xl">
          {isVideo && item.video ? (
            <ComponentShowcaseVideoPlayer
              isActive={isActive}
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
            <p className="mb-1 truncate font-mono text-[0.625rem] text-muted-foreground uppercase tracking-[0.12em]">
              {item.category}
            </p>
            <h2 className="truncate font-semibold text-sm tracking-[-0.015em]">
              {item.name}
            </h2>
          </div>
          <ArrowUpRight
            className="size-4 shrink-0 text-muted-foreground transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-within:-translate-y-0.5 group-focus-within:translate-x-0.5"
            aria-hidden="true"
          />
        </div>
      </Link>
    </motion.article>
  );
});
