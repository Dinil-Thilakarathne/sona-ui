"use client";

import {
  motion,
  type Transition,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { type CSSProperties, useMemo } from "react";

import { cn } from "@/lib/utils";

type SpinningTextProps = {
  /** The text content to be animated. Can be a single string or an array of strings. */
  children: string | string[];
  /** Custom styles for the container. */
  style?: CSSProperties;
  /**
   * Duration of the spinning animation in seconds.
   * @default 10
   */
  duration?: number;
  /** Additional CSS classes for the container. */
  className?: string;
  /**
   * Reverses the spinning direction when set to `true`.
   * @default false
   */
  reverse?: boolean;
  /**
   * Radius of the circular path in `ch` units.
   * @default 5
   */
  radius?: number;
  /** Custom transition settings for the animation. Merges with the default transition. */
  transition?: Transition;
  /** Custom animation variants for the container and individual characters. */
  variants?: {
    container?: Variants;
    item?: Variants;
  };
};

const BASE_TRANSITION = {
  repeat: Infinity,
  ease: "linear" as const,
};

const BASE_ITEM_VARIANTS = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
  },
};

export default function SpinningText({
  children,
  duration = 10,
  style,
  className,
  reverse = false,
  radius = 5,
  transition,
  variants,
}: SpinningTextProps) {
  const shouldReduceMotion = useReducedMotion();

  const textContent = useMemo(
    () => (Array.isArray(children) ? children.join("") : children),
    [children],
  );

  const characters = useMemo(() => {
    const chars = textContent.split("");
    chars.push(" ");
    return chars;
  }, [textContent]);

  const finalTransition = useMemo(
    () => ({
      ...BASE_TRANSITION,
      ...transition,
      duration: (transition as { duration?: number })?.duration ?? duration,
    }),
    [transition, duration],
  );

  const containerVariants = useMemo(
    () => ({
      // Reduced motion: hold the ring static instead of spinning forever.
      visible: { rotate: shouldReduceMotion ? 0 : reverse ? -360 : 360 },
      ...variants?.container,
    }),
    [reverse, variants, shouldReduceMotion],
  );

  const itemVariants = useMemo(
    () => ({
      ...BASE_ITEM_VARIANTS,
      ...variants?.item,
    }),
    [variants],
  );

  return (
    <motion.div
      className={cn("relative", className)}
      // Give the ring an intrinsic footprint so it doesn't collapse to 0x0.
      style={{
        width: `${radius * 2 + 1}ch`,
        height: `${radius * 2 + 1}ch`,
        ...style,
      }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={finalTransition}
    >
      {characters.map((char, index) => (
        <motion.span
          aria-hidden="true"
          // biome-ignore lint/suspicious/noArrayIndexKey: chars repeat; position is the identity
          key={`${index}-${char}`}
          variants={itemVariants}
          className="inline-block absolute left-1/2 top-1/2"
          style={
            {
              "--index": index,
              "--total": characters.length,
              "--radius": radius,
              transform: `
              translate(-50%, -50%)
              rotate(calc(360deg / var(--total) * var(--index)))
              translateY(calc(var(--radius, 5) * -1ch))
            `,
              transformOrigin: "center",
            } as React.CSSProperties
          }
        >
          {char}
        </motion.span>
      ))}
      <span className="sr-only">{textContent}</span>
    </motion.div>
  );
}
