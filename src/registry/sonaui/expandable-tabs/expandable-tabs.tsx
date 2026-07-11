"use client";

import { Tabs } from "@base-ui/react/tabs";
import {
  AnimatePresence,
  MotionConfig,
  type MotionConfigProps,
  motion,
  useReducedMotion,
} from "motion/react";
import { useState } from "react";
import type { IconType } from "react-icons";

import { motionTransition } from "@/lib/sona-motion";
import { cn } from "@/lib/sona-utils";

export interface ExpandableTabItem {
  /** Stable value used to identify the tab. */
  value: string;
  /** Text revealed when the tab is active. */
  title: string;
  /** Icon displayed for the tab. */
  icon: IconType;
  /** Whether the tab is unavailable. @default false */
  disabled?: boolean;
  /** ID of the external tab panel controlled by this tab. */
  ariaControls?: string;
}

export interface ExpandableTabsProps {
  /** Tabs displayed in the expandable horizontal tab list. */
  tabs: ExpandableTabItem[];
  /** Controlled active tab value. */
  value?: string;
  /** Initially active tab for uncontrolled usage. */
  defaultValue?: string;
  /** Called when the active tab changes. */
  onValueChange?: (value: string) => void;
  /** Accessible label for the tab list. @default "Expandable tabs" */
  ariaLabel?: string;
  /** Additional classes for the root container. */
  className?: string;
  /** Additional classes for the tab list. */
  listClassName?: string;
  /** Additional classes for the active tab. */
  activeTabClassName?: string;
  /** Motion configuration applied to the layout and label transitions. */
  motionConfig?: MotionConfigProps;
}

export default function ExpandableTabs({
  tabs,
  value,
  defaultValue,
  onValueChange,
  ariaLabel = "Expandable tabs",
  className,
  listClassName,
  activeTabClassName = "bg-accent text-accent-foreground",
  motionConfig,
}: ExpandableTabsProps) {
  const fallbackValue = tabs.find((tab) => !tab.disabled)?.value;
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? fallbackValue,
  );
  const [inputModality, setInputModality] = useState<"keyboard" | "pointer">(
    "pointer",
  );
  const shouldReduceMotion = useReducedMotion();
  const activeValue = value ?? internalValue;
  const transition =
    shouldReduceMotion || inputModality === "keyboard"
      ? motionTransition.instant
      : (motionConfig?.transition ?? motionTransition.spatial);

  return (
    <Tabs.Root
      value={activeValue}
      orientation="horizontal"
      onValueChange={(nextValue) => {
        if (typeof nextValue !== "string") return;
        if (value === undefined) setInternalValue(nextValue);
        onValueChange?.(nextValue);
      }}
      className={className}
    >
      <MotionConfig transition={transition}>
        <Tabs.List
          aria-label={ariaLabel}
          className={cn(
            "flex gap-2 rounded-full border bg-transparent p-2",
            listClassName,
          )}
          onKeyDownCapture={() => setInputModality("keyboard")}
          onPointerDownCapture={() => setInputModality("pointer")}
        >
          {tabs.map((tab) => {
            const isActive = activeValue === tab.value;
            return (
              <Tabs.Tab
                key={tab.value}
                value={tab.value}
                disabled={tab.disabled}
                aria-label={tab.title}
                aria-controls={tab.ariaControls}
                render={<motion.button layout />}
                className={cn(
                  "flex cursor-pointer items-center gap-2 overflow-clip rounded-full p-2",
                  "transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "disabled:pointer-events-none disabled:opacity-50",
                  isActive && activeTabClassName,
                )}
              >
                <motion.span
                  layout
                  className="flex h-full grow items-center justify-center"
                >
                  <tab.icon className="text-lg" aria-hidden="true" />
                </motion.span>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.span
                      layout
                      className="overflow-hidden whitespace-nowrap text-sm leading-none"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                    >
                      {tab.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Tabs.Tab>
            );
          })}
        </Tabs.List>
      </MotionConfig>
    </Tabs.Root>
  );
}
