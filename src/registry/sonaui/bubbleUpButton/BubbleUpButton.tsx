"use client";

import type { ReactNode } from "react";
import { motion, MotionConfigProps, useAnimation } from "motion/react";
import { cn } from "@/lib/utils";

interface BubbleUpButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Content to display inside the button */
  children?: ReactNode;
  /** Motion configuration for animations */
  motionControls?: MotionConfigProps;
  /** Additional CSS classes */
  className?: string;
}
export default function BubbleUpButton({
  children = "Hover me!",
  motionControls = {
    transition: { type: "spring", stiffness: 200, damping: 40 },
  },
  className = "",
  disabled = false,
  ...props
}: BubbleUpButtonProps) {
  const controls = useAnimation();

  const handleMouseEnter = async () => {
    await controls.start({
      clipPath: "ellipse(120% 120% at 50% 100%)",
    });
  };

  const handleMouseLeave = async () => {
    await controls.start({
      clipPath: "ellipse(120% 120% at 50% -120%)",
    });
    controls.set({ clipPath: "ellipse(0% 0% at 50% 100%)" });
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      className={cn(
        "relative flex h-fit w-fit cursor-pointer overflow-clip rounded-2xl border bg-black px-16 py-2",
        "transition-opacity duration-200",
        "focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black focus:outline-none",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      aria-label={typeof children === "string" ? children : "Bubble up button"}
      {...props}
    >
      <motion.div
        animate={controls}
        initial={{ clipPath: "ellipse(0% 0% at 50% 100%)" }}
        transition={motionControls.transition}
        className="absolute top-0 left-0 h-full w-full bg-white"
        aria-hidden="true"
      />
      <span className="relative text-white mix-blend-difference">
        {children}
      </span>
    </button>
  );
}
