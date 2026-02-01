"use client";

import React, { type ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

interface SplitTextCompProps {
  children: ReactNode;
  className?: string;
  animationProps?: gsap.TweenVars;
  variant?: "chars" | "words" | "lines" | string;
  maskType?: "lines" | "words" | "chars";
  autoSplit?: boolean;
  ScrollTriggerEnable?: boolean;
  markers?: boolean;
}

export default function SplitTextComp({
  children,
  className,
  animationProps = {},
  variant = "words",
  maskType = "words",
  autoSplit = false,
  ScrollTriggerEnable = false,
  markers = false,
}: SplitTextCompProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const defaultAnimationProps: gsap.TweenVars = {
    yPercent: 120,
    rotate: 5,
    stagger: 0.2,
    duration: 1,
  };

  const mergedAnimationProps = { ...defaultAnimationProps, ...animationProps };

  useGSAP(
    () => {
      const containerEl = containerRef.current;
      if (!containerEl) return;

      const tl = gsap.timeline();

      if (ScrollTriggerEnable) {
        ScrollTrigger.create({
          trigger: containerEl,
          start: "top 85%",
          animation: tl,
          markers: markers,
        });
      }

      gsap.set(containerEl, { opacity: 1 });

      // pick up the direct child element(s) you intend to split & animate
      // e.g. assume the first child is the target
      const targetEl = containerEl.firstElementChild as HTMLElement | null;
      if (!targetEl) return;

      const split = SplitText.create(targetEl, {
        type: variant,
        mask: maskType,
        autoSplit: autoSplit,
      });
      // Split the variant string into an array of active types
      const activeVariants = variant.split(",").map((s) => s.trim()) as (
        | "chars"
        | "words"
        | "lines"
      )[];

      // Iterate over the active variants and apply the animation to each
      activeVariants.forEach((key) => {
        if (split[key]) {
          // Check if the property exists and is populated
          tl.from(split[key], mergedAnimationProps);
        }
      });

      // optional: return cleanup function (though useGSAP handles context cleanup)
      return () => {
        split.revert(); // revert SplitText instance if needed
        tl.kill(); // kill timeline
      };
    },
    {
      dependencies: [{ ...mergedAnimationProps }],
      scope: containerRef,
      revertOnUpdate: true,
    },
  );

  return (
    <div ref={containerRef} className={cn("split opacity-0", className)}>
      {children}
    </div>
  );
}
