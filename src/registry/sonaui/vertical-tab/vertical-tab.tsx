"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface VerticalTabProps {
  /** An array of tab objects, each containing a title for the tab. */
  tabs: {
    title: string;
  }[];
  /**
   * The background color of the hover indicator. Accepts Tailwind CSS classes.
   * @default "bg-accent"
   */
  indicatorBgColor?: string;
  /**
   * The background color of the active tab. Accepts Tailwind CSS classes.
   * @default "bg-muted"
   */
  activeTabBgColor?: string;
  /**
   * Additional class names for the container element.
   * @default ""
   */
  containerClassName?: string;
}

export default function VerticalTab({
  tabs,
  indicatorBgColor = "bg-accent",
  activeTabBgColor = "bg-muted",
  containerClassName = "",
}: VerticalTabProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const layoutId = useId();
  const shouldReduceMotion = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (index: number) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        focusTab((currentIndex + 1) % tabs.length);
        break;
      case "ArrowLeft":
        e.preventDefault();
        focusTab((currentIndex - 1 + tabs.length) % tabs.length);
        break;
      case "Home":
        e.preventDefault();
        focusTab(0);
        break;
      case "End":
        e.preventDefault();
        focusTab(tabs.length - 1);
        break;
    }
  };

  return (
    <div
      role="presentation"
      className={cn(
        "relative flex w-fit overflow-x-auto border-b p-2",
        containerClassName,
      )}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className="flex space-x-2" role="tablist">
        {tabs.map((tab, index) => (
          <button
            type="button"
            role="tab"
            key={tab.title}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            tabIndex={index === activeIndex ? 0 : -1}
            aria-selected={index === activeIndex}
            className={cn(
              "relative flex cursor-pointer items-center p-2",
              "rounded-xl transition-colors duration-300",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              index === activeIndex && activeTabBgColor,
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onFocus={() => setHoveredIndex(index)}
            onBlur={() => setHoveredIndex(null)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onClick={() => setActiveIndex(index)}
          >
            {/* Hover indicator — glides between tabs via shared layoutId */}
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.span
                  layoutId={`${layoutId}-hover`}
                  className={cn(
                    "absolute inset-0 rounded-xl",
                    indicatorBgColor,
                  )}
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 300, damping: 30 }
                  }
                />
              )}
            </AnimatePresence>
            <span className="relative">{tab.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
