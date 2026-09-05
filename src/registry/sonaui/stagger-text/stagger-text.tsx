"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { type ReactNode, useState } from "react";

import { cn } from "@/lib/sona-utils";

type StaggerTextEleType = "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type StaggerTextProps<T extends StaggerTextEleType> =
  React.ComponentPropsWithoutRef<T> & {
    /** The text content to be displayed with staggered animation. */
    text: string;
    /** Additional CSS classes for the container. */
    className?: string;
    /**
     * The HTML tag to be used for the text container.
     * @default "h3"
     */
    as?: T;
  };

export default function StaggerText({
  text = "text",
  className,
  as = "h3",
  ...props
}: StaggerTextProps<StaggerTextEleType>) {
  const Tag = as; // Explicitly type as a React component
  const [activeIndex, setActiveIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <Tag className={cn("tracking-wide", className)} {...props}>
        {text}
      </Tag>
    );
  }

  const characters = [...new Intl.Segmenter().segment(text)].map(
    (segment) => segment.segment,
  );

  return (
    <Tag
      className={cn("overflow-clip tracking-wide select-text", className)}
      aria-label={text}
      onCopy={(e) => {
        e.preventDefault();
        e.clipboardData.setData("text/plain", text);
      }}
      {...props}
    >
      {characters.map((char, i) => {
        const delay = Math.abs(activeIndex - i);
        return (
          <StaggerTextItem
            char={char}
            // biome-ignore lint/suspicious/noArrayIndexKey: chars repeat; position is the identity
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
      className="inline-flex relative flex-col"
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
        className="absolute left-0 top-[0] h-fit w-full select-text"
        style={{ translate: "0 100%" }}
        {...props}
      >
        {content}
      </motion.span>
    );
  }

  return (
    <motion.span className="h-fit select-none" aria-hidden="true" {...props}>
      {content}
    </motion.span>
  );
};

const variants: Variants = {
  initial: { y: 0 },
  animate: (i: number) => ({
    y: "-100%",
    transition: {
      delay: i * 0.04,
      duration: 0.4,
      ease: "easeInOut",
      type: "tween" as const,
    },
  }),
  exit: (i: number) => ({
    y: 0,
    transition: { delay: i * 0.02, duration: 0.3 },
  }),
};
