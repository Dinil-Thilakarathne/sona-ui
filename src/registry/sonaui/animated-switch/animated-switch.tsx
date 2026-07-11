"use client";

import { Switch } from "@base-ui/react/switch";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { motionTransition } from "@/lib/sona-motion";
import { cn } from "@/lib/sona-utils";

export interface AnimatedSwitchProps
  extends Omit<
    Switch.Root.Props,
    "checked" | "defaultChecked" | "onCheckedChange" | "className"
  > {
  /** Controlled checked state. */
  checked?: boolean;
  /** Initial checked state for uncontrolled usage. @default false */
  defaultChecked?: boolean;
  /** Callback fired when the checked state changes. */
  onCheckedChange?: (checked: boolean) => void;
  /** Whether the switch is disabled. @default false */
  disabled?: boolean;
  /** The size of the switch. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Additional classes for the switch track. */
  className?: string;
}

const sizeClasses = {
  sm: { track: "h-5 w-9 p-0.5", thumb: "h-4 w-4", xTranslate: 16 },
  md: { track: "h-6 w-11 p-0.5", thumb: "h-5 w-5", xTranslate: 20 },
  lg: { track: "h-8 w-14 p-0.5", thumb: "h-7 w-7", xTranslate: 24 },
};

export default function AnimatedSwitch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  size = "md",
  className,
  onPointerDownCapture,
  onPointerUpCapture,
  onPointerCancelCapture,
  onLostPointerCapture,
  ...props
}: AnimatedSwitchProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isPressing, setIsPressing] = useState(false);
  const [visualChecked, setVisualChecked] = useState(defaultChecked);
  const sizes = sizeClasses[size];
  const resolvedChecked = checked ?? visualChecked;
  const accessibleLabel =
    props["aria-label"] ?? (props["aria-labelledby"] ? undefined : "Toggle");

  return (
    <Switch.Root
      {...props}
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      aria-label={accessibleLabel}
      onCheckedChange={(nextChecked) => {
        setVisualChecked(nextChecked);
        onCheckedChange?.(nextChecked);
      }}
      onPointerDownCapture={(event) => {
        onPointerDownCapture?.(event);
        if (event.button !== 0 || disabled) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        setIsPressing(true);
      }}
      onPointerUpCapture={(event) => {
        onPointerUpCapture?.(event);
        setIsPressing(false);
      }}
      onPointerCancelCapture={(event) => {
        onPointerCancelCapture?.(event);
        setIsPressing(false);
      }}
      onLostPointerCapture={(event) => {
        onLostPointerCapture?.(event);
        setIsPressing(false);
      }}
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent",
        "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        sizes.track,
        "data-[checked]:bg-foreground data-[unchecked]:bg-foreground/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
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
              transformOrigin: resolvedChecked ? "right center" : "left center",
            }}
            animate={{
              x: resolvedChecked ? sizes.xTranslate : 0,
              scaleX: isPressing && !shouldReduceMotion ? 1.18 : 1,
              scaleY: isPressing && !shouldReduceMotion ? 0.92 : 1,
            }}
            transition={
              shouldReduceMotion
                ? motionTransition.instant
                : motionTransition.feedback
            }
          />
        }
      />
    </Switch.Root>
  );
}
