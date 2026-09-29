"use client";

import { motion, useReducedMotionConfig } from "motion/react";
import { useId, useState } from "react";
import { cn } from "@/lib/sona-utils";

export interface AnimatedSegmentedControlItem {
  /** Stable option value. */ value: string /** Visible option label. */;
  label: string /** Prevents selection. */;
  disabled?: boolean;
}
export interface AnimatedSegmentedControlProps {
  /** Options rendered in the control. */ items: AnimatedSegmentedControlItem[];
  /** Controlled selected value. */ value?: string;
  /** Initial selected value for uncontrolled usage. */ defaultValue?: string;
  /** Called after an option is selected. */ onValueChange?: (
    value: string,
  ) => void;
  /** Additional CSS classes. */ className?: string;
  /** Accessible name for the group of options. @default "View mode" */ ariaLabel?: string;
}
export default function AnimatedSegmentedControl({
  items,
  value,
  defaultValue,
  onValueChange,
  className,
  ariaLabel = "View mode",
}: AnimatedSegmentedControlProps) {
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? items.find((item) => !item.disabled)?.value ?? "",
  );
  const [keyboard, setKeyboard] = useState(false);
  const selectedValue =
    value ??
    (items.some((item) => item.value === internalValue && !item.disabled)
      ? internalValue
      : items.find((item) => !item.disabled)?.value);
  const shouldReduceMotion = useReducedMotionConfig() || keyboard;
  const layoutId = useId();
  return (
    <fieldset
      aria-label={ariaLabel}
      className={cn("inline-flex rounded-xl bg-muted p-1", className)}
    >
      {items.map((item) => {
        const selected = item.value === selectedValue;
        return (
          <button
            key={item.value}
            type="button"
            aria-pressed={selected}
            disabled={item.disabled}
            onPointerDown={() => setKeyboard(false)}
            onKeyDown={() => setKeyboard(true)}
            onClick={() => {
              if (selected) return;
              if (value === undefined) setInternalValue(item.value);
              onValueChange?.(item.value);
            }}
            className="relative isolate rounded-lg px-3 py-1.5 font-medium text-sm outline-none transition-colors duration-150 motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-45"
          >
            {selected && (
              <motion.span
                layoutId={layoutId}
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-lg bg-background shadow-sm"
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 420, damping: 32, mass: 0.7 }
                }
              />
            )}
            <span
              className={selected ? "text-foreground" : "text-muted-foreground"}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </fieldset>
  );
}
