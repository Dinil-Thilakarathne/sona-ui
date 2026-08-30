"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useCallback, useRef, useState } from "react";

import { cn } from "@/lib/sona-utils";

export interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The content to be displayed inside the button. */
  children: ReactNode;
  /**
   * The scale amount for the ripple effect.
   * @default 25
   */
  scaleAmount?: number;
  /** Additional CSS classes for the button. */
  className?: string;
  /**
   * Duration of the ripple animation in seconds.
   * @default 0.5
   */
  duration?: number;
  /** Additional CSS classes for the ripple effect. */
  rippleStyle?: string;
}

interface RippleProps {
  x: number;
  y: number;
  key: number;
}

const RIPPLE_SIZE = 10;

export default function RippleButton({
  children,
  className,
  scaleAmount = 25,
  duration = 0.5,
  rippleStyle,
  disabled,
  onPointerEnter,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  onPointerCancel,
  ...props
}: RippleButtonProps) {
  const [ripple, setRipple] = useState<RippleProps | null>(null);
  const [isHover, setIsHover] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const rippleKey = useRef(0);

  const showRipple = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      rippleKey.current += 1;
      setRipple({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        key: rippleKey.current,
      });
      setIsHover(true);
    },
    [],
  );

  return (
    <button
      className={cn(
        "relative overflow-hidden rounded-full border border-border bg-background px-6 py-3 leading-[16px] transition-[transform,background-color,border-color] duration-200 ease-out hover:cursor-pointer active:scale-[0.97] motion-reduce:active:scale-100",
        className,
      )}
      disabled={disabled}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        if (disabled) return;
        // Touch pointers fire enter on tap — let pointerdown handle those.
        if (e.pointerType === "mouse") showRipple(e);
      }}
      onPointerDown={(e) => {
        onPointerDown?.(e);
        if (disabled) return;
        if (e.pointerType !== "mouse") showRipple(e);
      }}
      onPointerUp={(e) => {
        onPointerUp?.(e);
        if (e.pointerType !== "mouse") setIsHover(false);
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        setIsHover(false);
      }}
      onPointerCancel={(e) => {
        onPointerCancel?.(e);
        setIsHover(false);
      }}
      {...props}
    >
      {ripple && (
        <motion.span
          key={ripple.key}
          className={cn(
            "pointer-events-none absolute rounded-full bg-foreground",
            rippleStyle,
          )}
          style={{
            left: ripple.x - RIPPLE_SIZE / 2,
            top: ripple.y - RIPPLE_SIZE / 2,
            width: RIPPLE_SIZE,
            height: RIPPLE_SIZE,
          }}
          initial={{ scale: 0 }}
          animate={isHover ? { scale: scaleAmount } : { scale: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  duration: isHover ? duration : 0.4,
                  ease: [0.23, 1, 0.32, 1],
                }
          }
        />
      )}
      {children}
    </button>
  );
}

export interface RippleButtonTextProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  className?: string;
}

export function RippleButtonText({ text, className }: RippleButtonTextProps) {
  return (
    <span
      className={cn(
        "text-background dark:text-foreground mix-blend-difference",
        className,
      )}
    >
      {text}
    </span>
  );
}
