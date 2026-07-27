"use client";

import { Tabs } from "@base-ui/react/tabs";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import {
  type CSSProperties,
  type ReactNode,
  useId,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/sona-utils";

export interface FluidTabItem {
  /** Stable value used to identify the tab. */
  value: string;
  /** Content displayed inside the tab trigger. */
  title: ReactNode;
  /** Whether the tab is unavailable. @default false */
  disabled?: boolean;
  /** ID of the external tab panel controlled by this tab. */
  ariaControls?: string;
}

export interface FluidTabsProps {
  /** Tabs displayed in the horizontal tab list. */
  tabs: FluidTabItem[];
  /** Controlled active tab value. */
  value?: string;
  /** Initially active tab for uncontrolled usage. */
  defaultValue?: string;
  /** Called when the active tab changes. */
  onValueChange?: (value: string) => void;
  /** Visual treatment for the active surface. @default "capsule" */
  variant?: "capsule" | "underline";
  /** Size of the tab triggers. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Accessible label for the tab list. @default "Tabs" */
  ariaLabel?: string;
  /**
   * Styling hook for the active surface.
   * @default Capsule uses the active surface token; underline uses foreground.
   */
  activeIndicatorClassName?: string;
  /** Optional styling hook for the supporting hover cue. @default "bg-[var(--fluid-tabs-hover)]" */
  hoverClassName?: string;
  /** Additional classes for the root container. */
  className?: string;
  /** Additional classes for the tab list. */
  listClassName?: string;
}

const sizeClasses = {
  sm: "min-h-8 px-2.5 text-xs",
  md: "min-h-9 px-3 text-sm",
  lg: "min-h-11 px-4 text-base",
} as const;

const tokenStyle = {
  "--fluid-tabs-surface": "var(--tabs-surface)",
  "--fluid-tabs-surface-active": "var(--tabs-indicator)",
  "--fluid-tabs-label": "var(--muted-foreground)",
  "--fluid-tabs-label-active": "var(--foreground)",
  "--fluid-tabs-hover": "color-mix(in oklab, var(--accent) 35%, transparent)",
  "--fluid-tabs-focus-ring": "var(--ring)",
  "--fluid-tabs-border": "var(--border)",
  "--fluid-tabs-capsule-border-radius": "var(--radius-lg)",
} as CSSProperties;

export default function FluidTabs({
  tabs,
  value,
  defaultValue,
  onValueChange,
  variant = "capsule",
  size = "md",
  ariaLabel = "Tabs",
  activeIndicatorClassName,
  hoverClassName = "bg-[var(--fluid-tabs-hover)]",
  className,
  listClassName,
}: FluidTabsProps) {
  const layoutId = useId();
  const keyboardSelectionRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const fallbackValue = tabs.find((tab) => !tab.disabled)?.value;
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? fallbackValue,
  );
  const activeValue = value ?? internalValue;

  return (
    <Tabs.Root
      value={value}
      defaultValue={defaultValue ?? fallbackValue}
      orientation="horizontal"
      onValueChange={(nextValue) => {
        if (typeof nextValue !== "string") return;
        if (value === undefined) setInternalValue(nextValue);
        onValueChange?.(nextValue);
        keyboardSelectionRef.current = false;
      }}
      className={cn("relative w-fit max-w-full overflow-x-auto", className)}
      style={tokenStyle}
    >
      <LayoutGroup id={layoutId}>
        <Tabs.List
          aria-label={ariaLabel}
          className={cn(
            "flex w-max gap-1 p-1",
            variant === "capsule" && "rounded-xl bg-(--fluid-tabs-surface)",
            listClassName,
          )}
        >
          {tabs.map((tab) => (
            <Tabs.Tab
              key={tab.value}
              value={tab.value}
              disabled={tab.disabled}
              aria-controls={tab.ariaControls}
              onKeyDown={() => {
                keyboardSelectionRef.current = true;
              }}
              className={(state) =>
                cn(
                  "group relative flex cursor-pointer items-center justify-center whitespace-nowrap rounded-lg font-medium text-(--fluid-tabs-label) transition-colors duration-150",
                  sizeClasses[size],
                  "hover:text-(--fluid-tabs-label-active) focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--fluid-tabs-focus-ring)",
                  "disabled:pointer-events-none disabled:opacity-45",
                  variant === "underline" && "rounded-none",
                  state.active && "text-(--fluid-tabs-label-active)",
                )
              }
            >
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100",
                  hoverClassName,
                  variant === "underline" &&
                    "inset-x-1 top-auto h-0.5 rounded-full",
                  variant === "capsule" &&
                    "rounded-(--fluid-tabs-capsule-border-radius)",
                )}
              />
              {activeValue === tab.value && (
                <motion.span
                  aria-hidden="true"
                  layoutId={`${layoutId}-active`}
                  className={cn(
                    "pointer-events-none absolute",
                    variant === "capsule" &&
                      "inset-0 rounded-lg border border-(--tabs-indicator-border)",
                    variant === "underline" &&
                      "inset-x-1 bottom-0 h-0.5 rounded-full",
                    activeIndicatorClassName ??
                      (variant === "underline"
                        ? "bg-foreground"
                        : "bg-[var(--fluid-tabs-surface-active)]"),
                  )}
                  transition={
                    shouldReduceMotion || keyboardSelectionRef.current
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 320,
                          damping: 40,
                          mass: 0.9,
                        }
                  }
                />
              )}
              <span className="relative z-1">{tab.title}</span>
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </LayoutGroup>
    </Tabs.Root>
  );
}
