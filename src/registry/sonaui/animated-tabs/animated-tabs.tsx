"use client";

import { Tabs } from "@base-ui/react/tabs";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { type ReactNode, useId, useState } from "react";

import { motionTransition } from "@/lib/sona-motion";
import { cn } from "@/lib/sona-utils";

export interface AnimatedTabItem {
  /** Stable value used to identify the tab. */
  value: string;
  /** Content displayed inside the tab trigger. */
  title: ReactNode;
  /** Whether the tab is unavailable. @default false */
  disabled?: boolean;
  /** ID of the external tab panel controlled by this tab. */
  ariaControls?: string;
}

export interface AnimatedTabsProps {
  /** Tabs displayed in the horizontal tab list. */
  tabs: AnimatedTabItem[];
  /** Controlled active tab value. */
  value?: string;
  /** Initially active tab for uncontrolled usage. */
  defaultValue?: string;
  /** Called when the active tab changes. */
  onValueChange?: (value: string) => void;
  /** Accessible label for the tab list. @default "Tabs" */
  ariaLabel?: string;
  /** Background class for the shared active indicator. @default "bg-accent" */
  indicatorClassName?: string;
  /** Background class for the active tab. @default "bg-muted" */
  activeTabClassName?: string;
  /** Additional classes for the root container. */
  className?: string;
  /** Additional classes for the tab list. */
  listClassName?: string;
}

export default function AnimatedTabs({
  tabs,
  value,
  defaultValue,
  onValueChange,
  ariaLabel = "Tabs",
  indicatorClassName = "bg-accent",
  activeTabClassName = "bg-muted",
  className,
  listClassName,
}: AnimatedTabsProps) {
  const fallbackValue = tabs.find((tab) => !tab.disabled)?.value;
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? fallbackValue,
  );
  const activeValue = value ?? internalValue;
  const layoutId = useId();
  const shouldReduceMotion = useReducedMotion();

  return (
    <Tabs.Root
      value={value}
      defaultValue={defaultValue ?? fallbackValue}
      orientation="horizontal"
      onValueChange={(nextValue) => {
        if (typeof nextValue !== "string") return;
        if (value === undefined) setInternalValue(nextValue);
        onValueChange?.(nextValue);
      }}
      className={cn("relative w-fit overflow-x-auto border-b p-2", className)}
    >
      <LayoutGroup id={layoutId}>
        <Tabs.List
          aria-label={ariaLabel}
          className={cn("flex gap-2", listClassName)}
        >
          {tabs.map((tab) => (
            <Tabs.Tab
              key={tab.value}
              value={tab.value}
              disabled={tab.disabled}
              aria-controls={tab.ariaControls}
              className={(state) =>
                cn(
                  "relative flex cursor-pointer items-center rounded-xl p-2",
                  "transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "disabled:pointer-events-none disabled:opacity-50",
                  state.active && activeTabClassName,
                )
              }
            >
              {activeValue === tab.value && (
                <motion.span
                  aria-hidden="true"
                  layoutId={`${layoutId}-active`}
                  className={cn(
                    "pointer-events-none absolute inset-0 rounded-xl",
                    indicatorClassName,
                  )}
                  transition={
                    shouldReduceMotion
                      ? motionTransition.reduced
                      : motionTransition.spatial
                  }
                />
              )}
              <span className="relative">{tab.title}</span>
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </LayoutGroup>
    </Tabs.Root>
  );
}
