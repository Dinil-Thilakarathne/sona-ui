"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/sona-utils";

export interface HoldToDeleteButtonProps {
  /** Text displayed inside the button. */
  label?: string;
  /**
   * Duration in milliseconds the user must hold before the action triggers.
   * @default 2000
   */
  holdDuration?: number;
  /**
   * Duration in milliseconds the success state is visible before auto-resetting.
   * @default 1200
   */
  successDuration?: number;
  /** Called once when the hold completes. */
  onDelete?: () => void;
  /** Whether the button ignores interaction. @default false */
  disabled?: boolean;
  /** Additional CSS classes for the button. */
  className?: string;
}

export default function HoldToDeleteButton({
  label = "Hold To Delete",
  holdDuration = 2000,
  successDuration = 1200,
  onDelete,
  disabled = false,
  className,
}: HoldToDeleteButtonProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const resolvedHoldDuration = Math.max(0, holdDuration);
  const resolvedSuccessDuration = Math.max(0, successDuration);

  const cancelHold = () => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    holdTimerRef.current = null;
    setIsHolding(false);
  };

  const resetState = () => {
    cancelHold();
    if (successTimerRef.current) clearTimeout(successTimerRef.current);
    successTimerRef.current = null;
    setIsCompleted(false);
  };

  const handlePointerDown = () => {
    if (isCompleted || disabled) return;
    cancelHold();
    setIsHolding(true);
    holdTimerRef.current = setTimeout(() => {
      setIsHolding(false);
      setIsCompleted(true);
      onDelete?.();
    }, resolvedHoldDuration);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: successDuration is stable per render
  useEffect(() => {
    if (!isCompleted) return;
    successTimerRef.current = setTimeout(resetState, resolvedSuccessDuration);
    return () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, [isCompleted, resolvedSuccessDuration]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: unmount-only cleanup
  useEffect(
    () => () => {
      cancelHold();
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    },
    [],
  );

  return (
    <motion.button
      type="button"
      className={cn(
        "relative cursor-pointer overflow-clip rounded-full border-2 px-6 py-3 font-medium",
        className,
      )}
      disabled={disabled}
      aria-busy={isHolding}
      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
      onPointerDown={(event) => {
        if (disabled) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        handlePointerDown();
      }}
      onPointerUp={cancelHold}
      onPointerLeave={cancelHold}
      onPointerCancel={cancelHold}
      onKeyDown={(e) => {
        if ((e.key === " " || e.key === "Enter") && !e.repeat) {
          e.preventDefault();
          handlePointerDown();
        }
      }}
      onKeyUp={(e) => {
        if (e.key === " " || e.key === "Enter") cancelHold();
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 h-full w-full bg-danger-foreground"
        style={{
          clipPath: isHolding ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          transition: shouldReduceMotion
            ? "none"
            : isHolding
              ? `clip-path ${resolvedHoldDuration}ms linear`
              : "clip-path 200ms ease-out",
        }}
      />
      <span aria-live="polite" className="relative text-xl">
        {isCompleted ? "Deleted!" : label}
      </span>
    </motion.button>
  );
}
