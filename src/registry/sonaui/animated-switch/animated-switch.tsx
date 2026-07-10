"use client";

import { Switch } from "@base-ui/react/switch";
import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedSwitchProps {
  /** Controlled checked state. */
  checked?: boolean;
  /** Default checked state. */
  defaultChecked?: boolean;
  /** Callback fired when the state changes. */
  onCheckedChange?: (checked: boolean) => void;
  /** Whether the switch is disabled. */
  disabled?: boolean;
  /**
   * The size of the switch.
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: {
    track: "w-9 h-5 p-0.5",
    thumb: "w-4 h-4",
    xTranslate: 16, // px offset to slide right
    squishScale: 1.15,
  },
  md: {
    track: "w-11 h-6 p-0.5",
    thumb: "w-5 h-5",
    xTranslate: 20,
    squishScale: 1.2,
  },
  lg: {
    track: "w-14 h-8 p-0.5",
    thumb: "w-7 h-7",
    xTranslate: 24,
    squishScale: 1.2,
  },
};

export default function AnimatedSwitch({
  checked: controlledChecked,
  defaultChecked,
  onCheckedChange,
  disabled = false,
  size = "md",
  className,
}: AnimatedSwitchProps) {
  const [internalChecked, setInternalChecked] = useState(
    defaultChecked ?? false,
  );
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const shouldReduceMotion = useReducedMotion();

  // Track if we are dragging or actively pressing (via pointer events)
  const [isPressing, setIsPressing] = useState(false);
  const trackRef = useRef<HTMLButtonElement>(null);

  const handleCheckedChange = (nextChecked: boolean) => {
    if (!isControlled) {
      setInternalChecked(nextChecked);
    }
    onCheckedChange?.(nextChecked);
  };

  const sizes = sizeClasses[size];

  // We determine the horizontal origin of the stretch based on target state:
  // If checked, pressing down should stretch from left to right.
  // If not checked, pressing down should stretch from right to left.
  const transformOrigin = checked ? "right center" : "left center";

  return (
    <Switch.Root
      ref={trackRef}
      checked={checked}
      onCheckedChange={handleCheckedChange}
      disabled={disabled}
      onPointerDown={(e) => {
        if (e.button === 0 && !disabled) {
          setIsPressing(true);
          const handleRelease = () => {
            setIsPressing(false);
            window.removeEventListener("pointerup", handleRelease);
          };
          window.addEventListener("pointerup", handleRelease);
        }
      }}
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        sizes.track,
        checked ? "bg-foreground" : "bg-foreground/20",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <Switch.Thumb
        className={cn(
          "block rounded-full bg-background shadow-lg ring-0",
          sizes.thumb,
        )}
        render={
          <motion.span
            style={{
              transformOrigin,
            }}
            animate={{
              x: checked ? sizes.xTranslate : 0,
              scaleX: isPressing && !disabled ? sizes.squishScale : 1,
              scaleY: isPressing && !disabled ? 0.9 : 1,
            }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 500,
                    damping: 32,
                  }
            }
          />
        }
      />
    </Switch.Root>
  );
}
