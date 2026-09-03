"use client";

import { ChevronLeft } from "lucide-react";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import { type CSSProperties, type ReactNode, useState } from "react";
import useMeasure from "react-use-measure";

import { cn } from "@/lib/sona-utils";

export interface ExpandingActionItem {
  /** Stable value passed to `onValueSelect` when the item is chosen. */
  value: string;
  /** Content displayed inside the choice button. */
  label: ReactNode;
  /** Whether the choice is unavailable. @default false */
  disabled?: boolean;
}

export interface ExpandingActionProps {
  /** Short choices revealed when the action expands. */
  items: ExpandingActionItem[];
  /** Content displayed inside the collapsed trigger. */
  trigger: ReactNode;
  /** Optional icon displayed before the trigger content. @default undefined */
  triggerIcon?: ReactNode;
  /** Controlled expanded state. @default undefined */
  open?: boolean;
  /** Initial expanded state for uncontrolled usage. @default false */
  defaultOpen?: boolean;
  /** Called whenever the expanded state changes. @default undefined */
  onOpenChange?: (open: boolean) => void;
  /** Called with the selected item value before the action collapses. @default undefined */
  onValueSelect?: (value: string) => void;
  /** Accessible label for the control that returns to the trigger. @default "Back" */
  backLabel?: string;
  /** Whether the trigger and choices are unavailable. @default false */
  disabled?: boolean;
  /** Additional classes for the rendered state container. @default undefined */
  className?: string;
  /** Additional classes for the collapsed trigger. @default undefined */
  triggerClassName?: string;
  /** Additional classes applied to every choice button. @default undefined */
  optionClassName?: string;
}

const surfaceTransition = {
  type: "spring",
  stiffness: 260,
  damping: 22,
  mass: 0.9,
} as const;

const tokenStyle = {
  "--expanding-action-surface": "var(--background)",
  "--expanding-action-foreground": "var(--foreground)",
  "--expanding-action-muted": "var(--muted-foreground)",
  "--expanding-action-hover":
    "color-mix(in oklab, var(--accent) 55%, transparent)",
  "--expanding-action-border": "var(--border)",
  "--expanding-action-ring": "var(--ring)",
} as CSSProperties;

export default function ExpandingAction({
  items,
  trigger,
  triggerIcon,
  open,
  defaultOpen = false,
  onOpenChange,
  onValueSelect,
  backLabel = "Back",
  disabled = false,
  className,
  triggerClassName,
  optionClassName,
}: ExpandingActionProps) {
  const [contentRef, contentBounds] = useMeasure();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const shouldReduceMotion = useReducedMotion();
  const isOpen = open ?? internalOpen;
  const hasEnabledItem = items.some((item) => !item.disabled);
  const motionTransition = shouldReduceMotion
    ? { duration: 0 }
    : surfaceTransition;

  const setOpen = (nextOpen: boolean) => {
    if (open === undefined) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={false}
        animate={
          contentBounds.width ? { width: contentBounds.width } : undefined
        }
        className={cn(
          "relative inline-flex max-w-full items-center overflow-x-auto rounded-full",
          className,
        )}
        style={tokenStyle}
        transition={motionTransition}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full border border-(--expanding-action-border) bg-(--expanding-action-surface)/70 shadow-sm"
        />
        <div
          ref={contentRef}
          className={cn("relative inline-flex shrink-0", isOpen && "p-1")}
        >
          {!isOpen ? (
            <button
              type="button"
              disabled={disabled || !hasEnabledItem}
              onClick={() => setOpen(true)}
              className={cn(
                "relative flex h-12 cursor-pointer items-center gap-2 rounded-full px-5 text-sm font-medium text-(--expanding-action-foreground) active:scale-[0.97] disabled:pointer-events-none disabled:opacity-45",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--expanding-action-ring)",
                triggerClassName,
              )}
            >
              {triggerIcon ? (
                <span
                  aria-hidden="true"
                  className="grid size-4 shrink-0 place-items-center"
                >
                  {triggerIcon}
                </span>
              ) : null}
              <span className="whitespace-nowrap">{trigger}</span>
            </button>
          ) : (
            <div className="relative flex items-center gap-1">
              <button
                type="button"
                disabled={disabled}
                onClick={() => setOpen(false)}
                aria-label={backLabel}
                className={cn(
                  "grid size-10 shrink-0 cursor-pointer place-items-center rounded-full text-(--expanding-action-muted) transition-colors hover:bg-(--expanding-action-hover) hover:text-(--expanding-action-foreground) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--expanding-action-ring) active:scale-[0.97] disabled:pointer-events-none disabled:opacity-45",
                )}
              >
                <ChevronLeft
                  aria-hidden="true"
                  className="size-4"
                  strokeWidth={1.75}
                />
              </button>
              <span
                aria-hidden="true"
                className="h-5 w-px shrink-0 bg-(--expanding-action-border)"
              />
              {items.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  disabled={disabled || item.disabled}
                  onClick={() => {
                    onValueSelect?.(item.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "h-10 shrink-0 cursor-pointer whitespace-nowrap rounded-full px-3 text-sm text-(--expanding-action-foreground) transition-colors hover:bg-(--expanding-action-hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--expanding-action-ring) active:scale-[0.97] disabled:pointer-events-none disabled:opacity-45",
                    optionClassName,
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </MotionConfig>
  );
}
