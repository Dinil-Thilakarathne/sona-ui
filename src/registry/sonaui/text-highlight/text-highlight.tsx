"use client";

import { useInView, useReducedMotion } from "motion/react";
import { type ReactNode, useRef } from "react";

import styles from "./text-highlight.module.css";

export type TextHighlightVariant = "marker" | "underline" | "block";
export type TextHighlightTrigger = "immediate" | "in-view";

export interface TextHighlightProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** The text or inline content to emphasize. */
  children: ReactNode;
  /** The visual treatment used for the highlight.
   * @default "marker"
   */
  variant?: TextHighlightVariant;
  /** Controls when the highlight animation starts.
   * @default "in-view"
   */
  trigger?: TextHighlightTrigger;
  /** The highlight color. Accepts any CSS color value.
   * @default "#facc15"
   */
  color?: string;
  /** The animation duration in milliseconds.
   * @default 520
   */
  duration?: number;
  /** The animation delay in milliseconds.
   * @default 0
   */
  delay?: number;
  /** Whether an in-view highlight should play only once.
   * @default true
   */
  once?: boolean;
}

export default function TextHighlight({
  children,
  className,
  variant = "marker",
  trigger = "in-view",
  color = "#facc15",
  duration = 520,
  delay = 0,
  once = true,
  style,
  ...props
}: TextHighlightProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, amount: 0.65 });
  const shouldReduceMotion = useReducedMotion();
  const active = shouldReduceMotion || trigger === "immediate" || inView;

  return (
    <span
      ref={ref}
      className={[
        styles.highlight,
        styles[variant],
        active && styles.active,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          ...style,
          "--highlight-color": color,
          "--highlight-duration": `${duration}ms`,
          "--highlight-delay": `${delay}ms`,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </span>
  );
}
