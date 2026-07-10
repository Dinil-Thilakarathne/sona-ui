"use client";

import {
  AnimatePresence,
  MotionConfig,
  type MotionConfigProps,
  motion,
  useReducedMotion,
} from "motion/react";
import { useState } from "react";
import type { IconType } from "react-icons";

import { cn } from "@/lib/utils";

export type TabsData = {
  title: string;
  icon: IconType;
};

interface ExpandableTabsProps {
  /** An array of tab objects, each containing a title and an icon. */
  tabs: TabsData[];
  /**
   * Additional class names for the container element.
   * @default ""
   */
  containerClassName?: string;
  /**
   * The index of the tab that is active by default.
   * @default 0
   */
  defaultActiveIndex?: number;
  /** Motion configuration for the transition animations. */
  motionConfig?: MotionConfigProps;
}

export default function ExpandableTabs({
  tabs,
  containerClassName = "",
  defaultActiveIndex = 0,
  motionConfig = {
    transition: { duration: 0.2, ease: "easeOut" },
  },
}: ExpandableTabsProps) {
  const [isActive, setIsActive] = useState(defaultActiveIndex);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      role="tablist"
      className={cn(
        "flex space-x-2 rounded-full border bg-transparent p-2",
        containerClassName,
      )}
    >
      <MotionConfig
        {...(shouldReduceMotion
          ? { transition: { duration: 0 } }
          : motionConfig)}
      >
        {tabs.map((tab, index) => (
          <motion.button
            type="button"
            role="tab"
            aria-selected={isActive === index}
            key={tab.title}
            layout
            className={cn(
              "flex cursor-pointer items-center gap-x-2 overflow-clip rounded-full p-2",
              "transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive === index && "bg-accent text-accent-foreground",
            )}
            onClick={() => setIsActive(index)}
          >
            <motion.span
              layout
              className="grow items-center justify-center h-full"
            >
              <tab.icon className="text-lg" aria-hidden="true" />
            </motion.span>
            <AnimatePresence initial={false}>
              {isActive === index && (
                <motion.span
                  layout
                  className="overflow-hidden leading-[1] text-sm whitespace-nowrap"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </MotionConfig>
    </div>
  );
}
