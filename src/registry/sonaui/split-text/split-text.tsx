"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { type ReactNode, useMemo, useRef } from "react";

import { cn } from "@/lib/sona-utils";

gsap.registerPlugin(useGSAP, GSAPSplitText, ScrollTrigger);

type SplitUnit = "chars" | "words" | "lines";

export interface SplitTextProps {
  /** A single text element (e.g. a heading or paragraph) to split and animate. */
  children: ReactNode;
  /** Additional CSS classes for the wrapper. */
  className?: string;
  /**
   * Which unit the text is split into and animated.
   * @default "words"
   */
  variant?: SplitUnit;
  /**
   * Mask each split piece (clip it) so it reveals from behind an edge instead
   * of animating in fully visible. Masks by the same unit set in `variant`.
   * @default true
   */
  mask?: boolean;
  /**
   * GSAP tween vars merged over the defaults, e.g. `{ duration: 1.2 }`.
   * @default { yPercent: 120, rotate: 5, stagger: 0.2, duration: 0.4 }
   */
  animationProps?: gsap.TweenVars;
  /**
   * Play the animation when the element scrolls into view instead of on mount.
   * @default false
   */
  scrollTrigger?: boolean;
  /**
   * ScrollTrigger start position (only used when `scrollTrigger` is true).
   * @default "top 85%"
   */
  start?: string;
  /**
   * Re-split on resize so line breaks stay correct. Note: this replays the
   * animation on every resize, so it suits looping reveals more than one-shot
   * entrances. Font-load correctness is handled automatically either way.
   * @default false
   */
  autoSplit?: boolean;
  /**
   * Show ScrollTrigger debug markers.
   * @default false
   */
  markers?: boolean;
}

const defaultAnimationProps: gsap.TweenVars = {
  yPercent: 120,
  rotate: 5,
  stagger: 0.2,
  duration: 0.4,
};

export default function SplitText({
  children,
  className,
  variant = "words",
  mask = true,
  animationProps = {},
  scrollTrigger = false,
  start = "top 85%",
  autoSplit = false,
  markers = false,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mergedAnimationProps = useMemo(
    () => ({ ...defaultAnimationProps, ...animationProps }),
    [animationProps],
  );

  useGSAP(
    () => {
      const containerEl = containerRef.current;
      if (!containerEl) return;

      // Reveal the wrapper (it starts hidden to avoid a flash of unsplit text).
      gsap.set(containerEl, { opacity: 1 });

      // Reduced motion: show the final text, skip the animation entirely.
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      const targetEl = containerEl.firstElementChild as HTMLElement | null;
      if (!targetEl) {
        console.warn(
          "[SplitText] Expected a single wrapping element as children (e.g. an <h2>), but found none. Nothing will animate.",
        );
      }
      if (!targetEl) return;

      let split: GSAPSplitText | undefined;

      // Build the split + animation. Kept in a closure so it can run after fonts
      // load, and re-run per re-split when `autoSplit` is on.
      const build = () => {
        split = GSAPSplitText.create(targetEl, {
          type: variant,
          mask: mask ? variant : undefined,
          autoSplit,
          // Create the tween inside onSplit and return it so GSAP re-runs it on
          // every re-split (font swap / resize when autoSplit is enabled).
          onSplit: (self) => {
            const tl = gsap.timeline(
              scrollTrigger
                ? { scrollTrigger: { trigger: containerEl, start, markers } }
                : {},
            );
            tl.from(self[variant], mergedAnimationProps);
            return tl;
          },
        });
      };

      // Wait for web fonts before splitting so `lines` and masks measure against
      // the real font metrics, not the fallback. Resolves immediately if loaded.
      let cancelled = false;
      const fonts = typeof document !== "undefined" ? document.fonts : null;
      if (fonts && fonts.status !== "loaded") {
        fonts.ready.then(() => {
          if (!cancelled) build();
        });
      } else {
        build();
      }

      return () => {
        cancelled = true;
        split?.revert();
      };
    },
    {
      dependencies: [
        JSON.stringify(mergedAnimationProps),
        variant,
        mask,
        scrollTrigger,
      ],
      scope: containerRef,
      revertOnUpdate: true,
    },
  );

  return (
    <div ref={containerRef} className={cn("opacity-0", className)}>
      {children}
    </div>
  );
}
