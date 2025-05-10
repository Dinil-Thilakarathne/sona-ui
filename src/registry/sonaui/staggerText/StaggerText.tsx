"use client";

import { motion } from "motion/react";
import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type StaggerTextEleType = "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface StaggerTextProps extends React.ComponentPropsWithoutRef<"span"> {
  text: string;
  className?: string;
  as?: StaggerTextEleType;
}

export default function StaggerText({
  text = "text",
  className,
  as = "h1",
}: StaggerTextProps) {
  const Tag = as; // Explicitly type as a React component
  const [activeIndex, setActiveIndex] = useState(5);
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <h1 className="sr-only" aria-hidden="true">
        {text}
      </h1>
      <Tag
        className={cn("overflow-clip tracking-wide select-text", className)}
        aria-label={text}
        onCopy={(e) => {
          e.preventDefault();
          e.clipboardData.setData("text/plain", text as string);
          navigator.clipboard.writeText(text as string);
        }}
      >
        {text.split("").map((char, i) => {
          const delay = Math.abs(activeIndex - i);
          return (
            <StaggerTextItem
              char={char}
              key={i}
              onMouseEnter={() => {
                setActiveIndex(i);
                setIsActive(true);
              }}
              onMouseLeave={() => {
                setActiveIndex(-1);
                setIsActive(false);
              }}
              delay={delay}
              isHovered={isActive}
            />
          );
        })}
      </Tag>
    </>
  );
}

interface StaggerTextItemProps
  extends React.ComponentPropsWithoutRef<typeof motion.span> {
  char: string;
  delay?: number;
  isHovered?: boolean;
}

const StaggerTextItem = ({
  char,
  delay,
  isHovered,
  ...props
}: StaggerTextItemProps) => {
  return (
    <motion.span
      {...props}
      className="relative inline-flex flex-col"
      role="presentation"
    >
      <StaggerItemSegment
        variants={variants}
        custom={delay}
        initial="initial"
        animate={isHovered ? "animate" : "exit"}
        aria-hidden="true"
      >
        {char}
      </StaggerItemSegment>
      <StaggerItemSegment
        isCopy
        variants={variants}
        custom={delay}
        initial="initial"
        animate={isHovered ? "animate" : "exit"}
        aria-hidden="true"
      >
        {char}
      </StaggerItemSegment>
    </motion.span>
  );
};

interface StaggerItemSegmentProps
  extends React.ComponentPropsWithoutRef<typeof motion.span> {
  children: ReactNode;
  isCopy?: boolean;
}

const StaggerItemSegment = ({
  children,
  isCopy,
  ...props
}: StaggerItemSegmentProps) => {
  const content = children === " " ? "\u00A0" : children;

  if (isCopy) {
    return (
      <motion.span
        className="absolute top-[0] left-0 h-fit w-full uppercase select-text"
        style={{ translate: "0 100%" }}
        {...props}
      >
        {content}
      </motion.span>
    );
  }

  return (
    <motion.span
      className="h-fit uppercase select-none"
      aria-hidden="true"
      {...props}
    >
      {content}
    </motion.span>
  );
};

const variants = {
  initial: { y: 0 },
  animate: (i: number) => ({
    y: "-100%",
    transition: {
      delay: i * 0.04,
      duration: 0.4,
      ease: "easeInOut",
      type: "tween",
    },
  }),
  exit: (i: number) => ({
    y: 0,
    transition: { delay: i * 0.02, duration: 0.3 },
  }),
};
