"use client";

import {
  type MotionConfigProps,
  motion,
  useAnimation,
  useReducedMotion,
} from "motion/react";
import { type ReactNode, useRef } from "react";
import { cn } from "@/lib/sona-utils";

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
    transition: { type: "spring", stiffness: 300, damping: 32 },
  },
  className = "",
  disabled = false,
  ...props
}: BubbleUpButtonProps) {
  const controls = useAnimation();
  const shouldReduceMotion = useReducedMotion();
  // Tracks the latest intent so a re-enter during the exit animation
  // doesn't get clobbered by the post-exit reset.
  const hoverIntent = useRef(false);

  const fill = async () => {
    hoverIntent.current = true;
    await controls.start({
      clipPath: "ellipse(120% 120% at 50% 100%)",
      transition: shouldReduceMotion ? { duration: 0 } : undefined,
    });
  };

  const drain = async () => {
    hoverIntent.current = false;
    await controls.start({
      clipPath: "ellipse(120% 120% at 50% -120%)",
      transition: shouldReduceMotion ? { duration: 0 } : undefined,
    });
    if (!hoverIntent.current) {
      controls.set({ clipPath: "ellipse(0% 0% at 50% 100%)" });
    }
  };

  return (
    <button
      onMouseEnter={fill}
      onMouseLeave={drain}
      onFocus={fill}
      onBlur={drain}
      disabled={disabled}
      className={cn(
        "relative isolate flex h-fit w-fit cursor-pointer overflow-clip rounded-2xl bg-background text-foreground px-16 py-2",
        "transition-opacity duration-200",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus:outline-none",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      {...props}
    >
      <motion.div
        animate={controls}
        initial={{ clipPath: "ellipse(0% 0% at 50% 100%)" }}
        transition={motionControls.transition}
        className="absolute left-0 top-0 h-full w-full bg-foreground"
        aria-hidden="true"
      />
      <span className="relative text-white mix-blend-difference">
        {children}
      </span>
    </button>
  );
}
