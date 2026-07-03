"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface SpotlightCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** The content rendered inside the card. */
  children: ReactNode;
  /** Additional CSS classes for the card. */
  className?: string;
  /**
   * The color of the spotlight glow. Accepts any CSS color value.
   * @default "rgba(255,255,255,0.15)"
   */
  spotlightColor?: string;
  /**
   * The radius of the spotlight in pixels.
   * @default 350
   */
  spotlightSize?: number;
  /**
   * Disables the spotlight effect.
   * @default false
   */
  disabled?: boolean;
}

export default function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(255,255,255,0.15)",
  spotlightSize = 350,
  disabled = false,
  ...props
}: SpotlightCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  const background = useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "group border-border bg-secondary relative overflow-hidden rounded-xl border p-8",
        className,
      )}
      {...props}
    >
      {!disabled && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
