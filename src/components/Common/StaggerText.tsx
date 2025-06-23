"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

interface StaggerTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}

const StaggerText: React.FC<StaggerTextProps> = ({
  text,
  className,
  as = "h3",
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const Tag = as;

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Tag
      className={cn("overflow-clip leading-[1] select-text", className)}
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <StaggerTextItem
          key={i}
          char={char}
          delay={activeIndex !== null ? Math.abs(activeIndex - i) : 0}
          isHovered={activeIndex !== null}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </Tag>
  );
};

interface StaggerTextItemProps {
  char: string;
  delay: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const StaggerTextItem: React.FC<StaggerTextItemProps> = ({
  char,
  delay,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}) => {
  const content = char === " " ? "\u00A0" : char;

  return (
    <motion.span
      className="relative inline-flex flex-col"
      role="presentation"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {[false, true].map((isCopy) => (
        <StaggerItemSegment
          key={isCopy ? "copy" : "original"}
          isCopy={isCopy}
          delay={delay}
          isHovered={isHovered}
        >
          {content}
        </StaggerItemSegment>
      ))}
    </motion.span>
  );
};

interface StaggerItemSegmentProps {
  children: React.ReactNode;
  isCopy: boolean;
  delay: number;
  isHovered: boolean;
}

const StaggerItemSegment: React.FC<StaggerItemSegmentProps> = ({
  children,
  isCopy,
  delay,
  isHovered,
}) => {
  const variants = useMemo(
    () => ({
      initial: { y: 0 },
      animate: {
        y: "-100%",
        transition: { delay: delay * 0.04, duration: 0.4, ease: "easeInOut" },
      },
      exit: {
        y: 0,
        transition: { delay: delay * 0.02, duration: 0.3 },
      },
    }),
    [delay],
  );

  const content = children === " " ? "\u00A0" : children;

  return (
    <motion.span
      className={cn(
        "h-fit text-slate-900 select-none dark:text-slate-200",
        isCopy && "absolute top-0 left-0 h-fit w-full",
        isCopy && "translate-y-full",
      )}
      variants={variants}
      initial="initial"
      animate={isHovered ? "animate" : "exit"}
      aria-hidden="true"
    >
      {content}
    </motion.span>
  );
};

export default StaggerText;
