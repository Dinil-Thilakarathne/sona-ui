"use client";

import * as m from "motion/react-m";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

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
  /** Additional CSS classes for the button. */
  className?: string;
}

export default function HoldToDeleteButton({
  label = "Hold To Delete",
  holdDuration = 2000,
  successDuration = 1200,
  onDelete,
  className,
}: HoldToDeleteButtonProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    if (isCompleted) return;
    cancelHold();
    setIsHolding(true);
    holdTimerRef.current = setTimeout(() => {
      setIsHolding(false);
      setIsCompleted(true);
      onDelete?.();
    }, holdDuration);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: successDuration is stable per render
  useEffect(() => {
    if (!isCompleted) return;
    successTimerRef.current = setTimeout(resetState, successDuration);
    return () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, [isCompleted]);

  useEffect(
    () => () => {
      cancelHold();
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    },
    [],
  );

  return (
    <m.button
      layout
      layoutId="hold-to-delete-button"
      type="button"
      className={cn(
        "relative cursor-pointer overflow-clip rounded-full border-2 px-6 py-3 font-medium",
        className,
      )}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      onPointerDown={handlePointerDown}
      onPointerUp={cancelHold}
      onPointerLeave={cancelHold}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 h-full w-full bg-red-400"
        style={{
          clipPath: isHolding ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          transition: isHolding
            ? `clip-path ${holdDuration}ms linear`
            : "clip-path 200ms ease-out",
        }}
      />
      <span className="relative text-xl">
        {isCompleted ? "Deleted!" : label}
      </span>
    </m.button>
  );
}
