"use client";
import { useMemo, useRef, type ReactNode } from "react";
import { motion, useInView, Variants } from "motion/react";

import { cn } from "@/lib/utils";

type Preset = "Fade-in" | "Fade-up" | "Fade-down";

interface FadeProps {
  children: ReactNode;
  preset: Preset;
  fadeVariants?: Variants;
  containerClasses?: string;
  delay?: number;
  once?: boolean;
  bottomMargin?: number;
  className?: string;
}

const presetVariants: Record<Preset, Variants> = {
  "Fade-in": { initial: { opacity: 0 }, animate: { opacity: 1 } },
  "Fade-up": { initial: { opacity: 0, y: 100 }, animate: { opacity: 1, y: 0 } },
  "Fade-down": {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
  },
};

const Fade = ({
  children,
  preset = "Fade-in",
  containerClasses = "",
  fadeVariants,
  delay = 0,
  once = false,
  bottomMargin = -50,
  className = "",
}: FadeProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: once,
    margin: `0px 0px ${bottomMargin}px 0px`,
  });

  // Memoize the variants to avoid unnecessary recalculations
  const currentPreset = useMemo(
    () => fadeVariants || presetVariants[preset],
    [fadeVariants, preset],
  );

  return (
    <div
      className={cn("relative overflow-hidden", containerClasses)}
      ref={ref}
      aria-hidden={!isInView}
    >
      <motion.div
        variants={currentPreset}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        transition={{ type: "tween", duration: 0.75, delay: delay }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Fade;
