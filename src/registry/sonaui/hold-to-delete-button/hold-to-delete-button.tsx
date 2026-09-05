"use client";

import { Check, Trash2 } from "lucide-react";
import {
  animate,
  motion,
  useAnimationControls,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
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
  const startedAtRef = useRef(0);
  const buttonControls = useAnimationControls();
  const progress = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();
  const resolvedHoldDuration = Math.max(0, holdDuration);
  const resolvedSuccessDuration = Math.max(0, successDuration);
  const progressClipPath = useTransform(
    progress,
    (value) => `inset(0 ${100 - value * 100}% 0 0)`,
  );

  const clearHoldTimer = () => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    holdTimerRef.current = null;
  };

  const cancelHold = () => {
    if (!holdTimerRef.current) return;
    const heldRatio =
      resolvedHoldDuration === 0
        ? 1
        : Math.min(
            (performance.now() - startedAtRef.current) / resolvedHoldDuration,
            1,
          );

    clearHoldTimer();
    setIsHolding(false);
    animate(progress, 0, {
      type: "spring",
      duration: 0.3,
      bounce: 0,
    });

    if (shouldReduceMotion || heldRatio < 0.15) {
      buttonControls.start({ transform: "translateX(0) scale(1)" });
      return;
    }

    const isPastHalfway = heldRatio >= 0.5;
    buttonControls.start(
      {
        transform: isPastHalfway
          ? [
              "translateX(0) rotate(0deg) scale(1)",
              "translateX(-7px) rotate(-1.2deg) scale(0.985)",
              "translateX(6px) rotate(1deg) scale(0.99)",
              "translateX(-4px) rotate(-0.6deg) scale(0.995)",
              "translateX(2px) rotate(0.3deg) scale(1)",
              "translateX(0) rotate(0deg) scale(1)",
            ]
          : [
              "translateX(0) scale(1)",
              "translateX(-3px) scale(0.99)",
              "translateX(3px) scale(0.995)",
              "translateX(0) scale(1)",
            ],
      },
      {
        duration: isPastHalfway ? 0.38 : 0.24,
        ease: [0.23, 1, 0.32, 1],
      },
    );
  };

  const resetState = () => {
    clearHoldTimer();
    if (successTimerRef.current) clearTimeout(successTimerRef.current);
    successTimerRef.current = null;
    setIsCompleted(false);
    buttonControls.start({ transform: "translateX(0) scale(1)" });
    animate(progress, 0, {
      type: "spring",
      duration: 0.3,
      bounce: 0,
    });
  };

  const handlePointerDown = () => {
    if (isCompleted || disabled) return;
    clearHoldTimer();
    startedAtRef.current = performance.now();
    setIsHolding(true);
    buttonControls.start({
      transform: shouldReduceMotion
        ? "translateX(0) scale(1)"
        : "translateX(0) scale(0.97)",
      transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] },
    });
    animate(progress, 1, {
      duration: resolvedHoldDuration / 1000,
      ease: "linear",
    });
    holdTimerRef.current = setTimeout(() => {
      holdTimerRef.current = null;
      setIsHolding(false);
      setIsCompleted(true);
      buttonControls.start({
        transform: "translateX(0) scale(1)",
        transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] },
      });
      progress.set(1);
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
      clearHoldTimer();
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    },
    [],
  );

  const renderVisualContent = () => (
    <>
      <span className="relative grid size-4 shrink-0 place-items-center">
        {isCompleted ? (
          <Check aria-hidden="true" className="size-4" strokeWidth={2.25} />
        ) : (
          <Trash2 aria-hidden="true" className="size-4" strokeWidth={2} />
        )}
      </span>
      <span className="relative grid text-sm leading-none [&>*]:col-start-1 [&>*]:row-start-1">
        <span
          className={cn(isHolding || isCompleted ? "opacity-0" : "opacity-100")}
        >
          {label}
        </span>
        <span
          className={cn(
            isHolding && !isCompleted ? "opacity-100" : "opacity-0",
          )}
        >
          Keep holding
        </span>
        <span className={cn(isCompleted ? "opacity-100" : "opacity-0")}>
          Deleted
        </span>
      </span>
    </>
  );

  return (
    <motion.button
      type="button"
      className={cn(
        "relative flex h-12 min-w-48 touch-none cursor-pointer select-none items-center justify-center gap-2 overflow-clip rounded-full bg-danger/10 px-5 font-medium text-danger shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-danger)_40%,transparent),0_1px_2px_rgb(0_0_0/0.06)] outline-none transition-[background-color,color,box-shadow] duration-150 focus-visible:ring-2 focus-visible:ring-danger/50 disabled:cursor-not-allowed disabled:opacity-50",
        isCompleted &&
          "bg-success/10 text-success shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-success)_40%,transparent),0_1px_2px_rgb(0_0_0/0.06)] focus-visible:ring-success/50",
        className,
      )}
      disabled={disabled}
      aria-busy={isHolding}
      animate={buttonControls}
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
      onBlur={cancelHold}
    >
      <span className="relative flex items-center justify-center gap-2">
        {renderVisualContent()}
      </span>
      <motion.span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 flex items-center justify-center gap-2 bg-danger text-white",
          isCompleted && "bg-success",
        )}
        style={{ clipPath: progressClipPath }}
      >
        {renderVisualContent()}
      </motion.span>
      <span aria-live="polite" className="sr-only">
        {isCompleted ? "Deleted" : isHolding ? "Keep holding" : label}
      </span>
    </motion.button>
  );
}
