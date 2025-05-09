"use client";

import { motion } from "motion/react";
import React, { useRef, useState } from "react";
import useMeasure from "react-use-measure";

import { cn } from "@/lib/utils";

interface VerticalTabProps {
  tabs: {
    title: string;
  }[];
  indicatorBgColor?: string;
  activeTabBgColor?: string;
  containerClassName?: string;
}

export default function VerticalTab({
  tabs,
  indicatorBgColor = "bg-slate-300",
  activeTabBgColor = "bg-slate-400 dark:bg-slate-600",
  containerClassName = "",
}: VerticalTabProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showIndicator, setShowIndicator] = useState(false);

  const [ref, bounds] = useMeasure();
  const tabRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = (tabElement: HTMLDivElement) => {
    setShowIndicator(true);
    tabRef.current = tabElement;
    ref(tabElement); // Update the ref dynamically
  };

  const handleMoueLeave = () => {
    setShowIndicator(false);
  };

  const handleMouseClick = (i: number) => {
    setActiveIndex(i);
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    currentIndex: number,
  ) => {
    if (e.key === "ArrowRight") {
      setActiveIndex((prev) => (prev + 1) % tabs.length);
    } else if (e.key === "ArrowLeft") {
      setActiveIndex((prev) => (prev - 1 + tabs.length) % tabs.length);
    }
    if (e.key === "Enter" || e.key === " ") {
      setActiveIndex(currentIndex);
    }
  };

  return (
    <div
      className={cn(
        "relative flex w-fit overflow-x-scroll border-b p-2",
        containerClassName,
      )}
      onMouseLeave={() => handleMoueLeave()}
    >
      {showIndicator && (
        <motion.div
          className={cn(
            "absolute rounded-xl bg-slate-300 will-change-[transform_width_height] dark:bg-slate-400",
            indicatorBgColor,
          )}
          initial={{
            opacity: 0,
            width: bounds.width,
            height: bounds.height,
          }}
          animate={{
            opacity: 1,
            left: tabRef.current ? tabRef.current.offsetLeft : 0,
            width: bounds.width,
            height: bounds.height,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <div className="flex space-x-2" role="tablist">
        {tabs.map((tab, index) => (
          <TabItem
            key={index}
            title={tab.title}
            data-tab-index={index}
            className={cn(
              "relative flex cursor-pointer items-center p-2",
              "rounded-xl transition-colors duration-300",
              "focus:ring-2 focus:ring-slate-300 focus:outline-none",
              index === activeIndex ? `${activeTabBgColor}` : "",
            )}
            onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onClick={() => handleMouseClick(index)}
            aria-selected={index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}

interface TabItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

const TabItem = ({ title, ...props }: TabItemProps) => {
  return (
    <div {...props} role="tab" tabIndex={0}>
      <span>{title}</span>
    </div>
  );
};
