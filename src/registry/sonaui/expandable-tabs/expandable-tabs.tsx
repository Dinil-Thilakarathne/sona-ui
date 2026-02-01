"use client";

import { useState } from "react";
import { motion, MotionConfig, type MotionConfigProps } from "motion/react";
import { IconType } from "react-icons";

import { cn } from "@/lib/utils";

export type TabsData = {
  title: string;
  icon: IconType;
};

interface ExpandableTabsProps {
  tabs: TabsData[];
  containerClassName?: string;
  defaultActiveIndex?: number;
  motionConfig?: MotionConfigProps;
}

export default function ExpandableTabs({
  tabs,
  containerClassName = "",
  defaultActiveIndex = 0,
  motionConfig = {
    transition: { duration: 0.2, ease: "easeInOut" },
  },
}: ExpandableTabsProps) {
  const [isActive, setIsActive] = useState(defaultActiveIndex);

  return (
    <motion.div
      className={cn(
        "flex space-x-2 rounded-full border bg-transparent p-2 transition-[width] will-change-[width,_contents]",
        containerClassName,
      )}
      layout
    >
      <MotionConfig {...motionConfig}>
        {tabs.map((tab, index) => (
          <motion.div
            key={index}
            role="button"
            className={cn(
              "flex cursor-pointer items-center space-x-2 overflow-clip rounded-full p-2",
              "transition-[width,_background-color] duration-300 ease-in-out",
              isActive === index && "bg-slate-300 dark:text-slate-800",
            )}
            onClick={() => setIsActive(index)}
            tabIndex={0}
          >
            <div className="h-full grow items-center justify-center">
              <tab.icon className="text-lg" aria-label={`${tab.title}-icon`} />
            </div>
            <motion.span
              className="overflow-hidden text-sm leading-[1]"
              key={tab.title}
              initial={isActive === index ? "" : "inactive"}
              animate={isActive === index ? "active" : "inactive"}
              variants={TabItemVariants}
            >
              {tab.title}
            </motion.span>
          </motion.div>
        ))}
      </MotionConfig>
    </motion.div>
  );
}

const TabItemVariants = {
  active: {
    opacity: 1,
    width: "auto",
    y: 0,
  },
  inactive: {
    opacity: 0,
    width: 0,
    y: 20,
  },
};
