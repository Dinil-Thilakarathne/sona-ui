"use client";

import type { MotionValue } from "motion/react";
import { motion } from "motion/react";

type HeroAmbientBackgroundProps = {
  lightX: MotionValue<number>;
  lightY: MotionValue<number>;
  lightOpacity: MotionValue<number>;
};

export function HeroAmbientBackground({
  lightX,
  lightY,
  lightOpacity,
}: HeroAmbientBackgroundProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(var(--foreground) 0.7px, transparent 0.7px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 45%, black 10%, transparent 78%)",
        }}
      />

      <div className="absolute top-[22%] left-[7%] hidden h-10 w-36 rounded-full border border-foreground/10 opacity-70 md:block">
        <span className="absolute top-1/2 left-1 h-7 w-16 -translate-y-1/2 rounded-full bg-foreground/[0.045]" />
      </div>

      <div className="absolute top-[26%] right-[9%] hidden h-8 w-14 rounded-full border border-foreground/10 opacity-70 md:block">
        <span className="absolute top-1/2 left-1 size-6 -translate-y-1/2 rounded-full border border-foreground/10 bg-background" />
      </div>

      <div className="absolute bottom-[21%] left-[11%] hidden h-px w-44 bg-foreground/10 md:block">
        <span className="absolute top-1/2 left-[62%] size-3 -translate-y-1/2 rounded-full border border-foreground/15 bg-background" />
        <span className="absolute top-1/2 right-0 h-3 w-px -translate-y-1/2 bg-foreground/15" />
      </div>

      <div className="absolute right-[12%] bottom-[17%] hidden size-16 rounded-2xl border border-foreground/[0.08] opacity-70 md:block" />

      <div className="absolute top-1/2 left-1/2 size-[min(42rem,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.035] blur-3xl" />

      <motion.div
        className="absolute top-0 left-0 size-[36rem] rounded-full bg-primary blur-3xl will-change-transform"
        style={{
          x: lightX,
          y: lightY,
          opacity: lightOpacity,
        }}
      />

      <div className="absolute top-1/2 left-1/2 h-[28rem] w-[min(52rem,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-background/55 blur-3xl" />
    </div>
  );
}
