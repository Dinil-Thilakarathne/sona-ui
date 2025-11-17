"use client";

import { type ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, SplitText);

interface FadeInCompProps {
  children: ReactNode;
  className?: string;
  animationProps?: gsap.TweenVars;
}

export default function FadeInComp({
  children,
  className,
  animationProps = {},
}: FadeInCompProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const defaultAnimationProps: gsap.TweenVars = {
    yPercent: 100,
    filter: "blur(0px)",
    opacity: 0,
    stagger: 0.2,
    duration: 1,
  };

  const mergedAnimationProps = { ...defaultAnimationProps, ...animationProps };

  useGSAP(
    () => {
      const containerEl = containerRef.current;
      if (!containerEl) return;

      gsap.set(containerEl, { opacity: 1 });

      // pick up the direct child element(s) you intend to split & animate
      // e.g. assume the first child is the target
      const targetEl = containerEl.firstElementChild as HTMLElement | null;
      if (!targetEl) return;

      gsap.from(targetEl, mergedAnimationProps);

      // optional: return cleanup function (though useGSAP handles context cleanup)
      return () => {};
    },
    {
      dependencies: [{ ...mergedAnimationProps }],
      scope: containerRef,
      revertOnUpdate: true,
    },
  );

  return (
    <div
      ref={containerRef}
      className={cn("overflow-clip opacity-0", className)}
    >
      {children}
    </div>
  );
}
