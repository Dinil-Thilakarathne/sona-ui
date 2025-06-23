"use client";

import type { ReactNode } from "react";
import {
  motion,
  MotionConfig,
  MotionConfigProps,
  useAnimation,
} from "motion/react";
import { cn } from "@/lib/utils";

interface BubbleUpButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  motionControls?: MotionConfigProps;
}
export default function BubbleUpButton({
  children = "Hover me!",
  motionControls = {
    transition: { type: "spring", stiffness: 200, damping: 40 },
  },
  className = "",
  ...props
}: BubbleUpButtonProps) {
  const controls = useAnimation();

  const handleMouseEnter = async () => {
    await controls.start({
      clipPath: "ellipse(120% 120% at 50% 100%)",
      transition: {
      },
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
      className={cn(
        "relative flex h-fit w-fit cursor-pointer overflow-clip rounded-2xl border bg-black px-16 py-2",
        className,
      )}
      {...props}
    >
      <MotionConfig {...motionControls}>
        <motion.div
          animate={controls}
          initial={{ scale: 1, clipPath: "ellipse(0% 0% at 50% 100%)" }}
          className="absolute top-0 left-0 h-full w-full bg-white"
        />
      </MotionConfig>
      <span className="relative text-white mix-blend-difference">
        {children}
      </span>
    </button>
  );
}
