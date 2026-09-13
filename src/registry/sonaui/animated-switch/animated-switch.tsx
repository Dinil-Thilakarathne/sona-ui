"use client";

import { Switch } from "@base-ui/react/switch";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

import { motionTransition } from "@/lib/sona-motion";
import { cn } from "@/lib/sona-utils";

export interface AnimatedSwitchProps
  extends Omit<
    Switch.Root.Props,
    "checked" | "defaultChecked" | "onCheckedChange" | "className"
  > {
  /** Controlled checked state. */
  checked?: boolean;
  /** Initial checked state for uncontrolled usage. @default false */
  defaultChecked?: boolean;
  /** Callback fired when the checked state changes. */
  onCheckedChange?: (checked: boolean) => void;
  /** Whether the switch is disabled. @default false */
  disabled?: boolean;
  /**
   * Whether the switch is in an error state and cannot be changed. @default false
   * The switch remains focusable so assistive technology can announce its invalid state.
   */
  error?: boolean;
  /** The size of the switch. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Whether the thumb can be dragged between states. @default true */
  enableDrag?: boolean;
  /** Additional classes for the switch track. */
  className?: string;
}

const PRESS_SCALE_X = 1.14;
const BLOCKED_FEEDBACK = [0, -3, 3, -2, 2, 0];
const BLOCKED_FEEDBACK_TIMES = [0, 0.2, 0.45, 0.65, 0.82, 1];

const sizeTokens = {
  sm: {
    track: "h-[16px] w-[36px] p-[1.5px]",
    thumb: "h-[13px] w-[21px]",
    surfaceWidth: 36,
    surfacePadding: 1.5,
    indicatorWidth: 21,
    xTranslate: 36 - 1.5 * 2 - 21,
  },
  md: {
    track: "h-6 w-[54px] p-0.5",
    thumb: "h-5 w-8",
    surfaceWidth: 54,
    surfacePadding: 2,
    indicatorWidth: 32,
    xTranslate: 54 - 2 * 2 - 32,
  },
  lg: {
    track: "h-9 w-20 p-[3px]",
    thumb: "h-[30px] w-[47px]",
    surfaceWidth: 80,
    surfacePadding: 3,
    indicatorWidth: 47,
    xTranslate: 80 - 3 * 2 - 47,
  },
};

export default function AnimatedSwitch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  error = false,
  size = "md",
  enableDrag = true,
  className,
  onClickCapture,
  onPointerDownCapture,
  onPointerUpCapture,
  onPointerCancelCapture,
  onLostPointerCapture,
  onPointerMoveCapture,
  onKeyDownCapture,
  ...props
}: AnimatedSwitchProps) {
  const sizes = sizeTokens[size];
  const shouldReduceMotion = useReducedMotion();
  const [isPressing, setIsPressing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [visualChecked, setVisualChecked] = useState(defaultChecked);
  const dragStartRef = useRef<number | null>(null);
  const dragXRef = useRef<number | null>(null);
  const didDragRef = useRef(false);
  const suppressClickRef = useRef(false);
  const blockedInteractionRef = useRef<"pointer" | "keyboard" | null>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const thumbAnimationRef = useRef<ReturnType<typeof animate> | null>(null);
  const blockedFeedbackAnimationRef = useRef<ReturnType<typeof animate> | null>(
    null,
  );
  const thumbX = useMotionValue(defaultChecked ? sizes.xTranslate : 0);
  const blockedFeedbackX = useMotionValue(0);
  const resolvedChecked = checked ?? visualChecked;
  const restingX = resolvedChecked ? sizes.xTranslate : 0;
  const pressedInset = (sizes.indicatorWidth * (PRESS_SCALE_X - 1)) / 2;
  const accessibleLabel =
    props["aria-label"] ?? (props["aria-labelledby"] ? undefined : "Toggle");

  useEffect(() => {
    thumbAnimationRef.current?.stop();
    if (dragStartRef.current !== null || shouldReduceMotion) {
      if (shouldReduceMotion) thumbX.set(restingX);
      return;
    }

    thumbAnimationRef.current = animate(
      thumbX,
      restingX,
      motionTransition.feedback,
    );
  }, [restingX, shouldReduceMotion, thumbX]);

  useEffect(
    () => () => {
      thumbAnimationRef.current?.stop();
      blockedFeedbackAnimationRef.current?.stop();
    },
    [],
  );

  const playBlockedFeedback = () => {
    if (shouldReduceMotion) return;

    blockedFeedbackAnimationRef.current?.stop();
    blockedFeedbackAnimationRef.current = animate(
      blockedFeedbackX,
      BLOCKED_FEEDBACK,
      {
        duration: 0.22,
        ease: [0.22, 1, 0.36, 1],
        times: BLOCKED_FEEDBACK_TIMES,
      },
    );
  };

  const resetPointerState = () => {
    dragStartRef.current = null;
    dragXRef.current = null;
    didDragRef.current = false;
    setIsPressing(false);
    setIsDragging(false);
  };

  return (
    <motion.span
      className="inline-flex"
      style={{ x: blockedFeedbackX }}
      onPointerDownCapture={() => {
        if (disabled) playBlockedFeedback();
      }}
    >
      <Switch.Root
        {...props}
        checked={resolvedChecked}
        disabled={disabled}
        aria-disabled={error || undefined}
        aria-invalid={error || undefined}
        aria-label={accessibleLabel}
        onCheckedChange={(nextChecked) => {
          if (error) {
            if (blockedInteractionRef.current !== "keyboard") {
              playBlockedFeedback();
            }
            blockedInteractionRef.current = null;
            return;
          }
          setVisualChecked(nextChecked);
          onCheckedChange?.(nextChecked);
        }}
        onClickCapture={(event) => {
          onClickCapture?.(event);
          if (!suppressClickRef.current) return;

          suppressClickRef.current = false;
          event.preventDefault();
          event.stopPropagation();
        }}
        onPointerDownCapture={(event) => {
          onPointerDownCapture?.(event);
          if (event.button !== 0 || disabled) return;
          if (error) {
            blockedInteractionRef.current = "pointer";
            playBlockedFeedback();
            return;
          }
          event.currentTarget.setPointerCapture(event.pointerId);
          setIsPressing(true);

          if (
            !enableDrag ||
            !thumbRef.current?.contains(event.target as Node)
          ) {
            return;
          }

          thumbAnimationRef.current?.stop();
          dragStartRef.current = event.clientX;
        }}
        onPointerMoveCapture={(event) => {
          onPointerMoveCapture?.(event);
          if (dragStartRef.current === null) return;

          const offset = event.clientX - dragStartRef.current;
          if (Math.abs(offset) > 3 && !didDragRef.current) {
            didDragRef.current = true;
            setIsDragging(true);
          }
          if (!didDragRef.current) return;

          const rawDragX = Math.min(
            sizes.xTranslate,
            Math.max(0, restingX + offset),
          );
          const nextDragX = Math.min(
            sizes.xTranslate - pressedInset,
            Math.max(pressedInset, rawDragX),
          );

          dragXRef.current = nextDragX;
          thumbX.set(nextDragX);
        }}
        onPointerUpCapture={(event) => {
          onPointerUpCapture?.(event);
          if (didDragRef.current) {
            const nextChecked =
              (dragXRef.current ?? restingX) >= sizes.xTranslate / 2;
            suppressClickRef.current = nextChecked === resolvedChecked;
            if (nextChecked === resolvedChecked) {
              thumbAnimationRef.current?.stop();
              if (shouldReduceMotion) {
                thumbX.set(restingX);
              } else {
                thumbAnimationRef.current = animate(
                  thumbX,
                  restingX,
                  motionTransition.feedback,
                );
              }
            }
          }
          resetPointerState();
        }}
        onPointerCancelCapture={(event) => {
          onPointerCancelCapture?.(event);
          thumbAnimationRef.current?.stop();
          if (shouldReduceMotion) {
            thumbX.set(restingX);
          } else {
            thumbAnimationRef.current = animate(
              thumbX,
              restingX,
              motionTransition.feedback,
            );
          }
          resetPointerState();
        }}
        onLostPointerCapture={(event) => {
          onLostPointerCapture?.(event);
          if (dragStartRef.current !== null) {
            thumbAnimationRef.current?.stop();
            if (shouldReduceMotion) {
              thumbX.set(restingX);
            } else {
              thumbAnimationRef.current = animate(
                thumbX,
                restingX,
                motionTransition.feedback,
              );
            }
          }
          resetPointerState();
        }}
        onKeyDownCapture={(event) => {
          onKeyDownCapture?.(event);
          if (error && (event.key === " " || event.key === "Enter")) {
            blockedInteractionRef.current = "keyboard";
          }
        }}
        className={cn(
          "relative inline-flex shrink-0 touch-pan-y cursor-pointer items-center rounded-full border-none",
          "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          sizes.track,
          "data-[checked]:bg-foreground data-[unchecked]:bg-foreground/20",
          "[&[aria-invalid=true]]:bg-destructive/20 [&[aria-invalid=true]]:ring-1 [&[aria-invalid=true]]:ring-destructive",
          "[&[aria-disabled=true]]:cursor-not-allowed",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      >
        <Switch.Thumb
          className={cn(
            "block rounded-full bg-background shadow-lg ring-0",
            sizes.thumb,
          )}
          render={
            <motion.span
              ref={thumbRef}
              style={{
                x: thumbX,
                transformOrigin: "center center",
              }}
              animate={{
                scaleX: isDragging && !shouldReduceMotion ? PRESS_SCALE_X : 1,
                scaleY: isPressing && !shouldReduceMotion ? 0.94 : 1,
              }}
              transition={
                shouldReduceMotion
                  ? motionTransition.instant
                  : motionTransition.feedback
              }
            />
          }
        />
      </Switch.Root>
    </motion.span>
  );
}
