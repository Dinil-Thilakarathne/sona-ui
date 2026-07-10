"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

// ─── Button Variants (CVA) ───────────────────────────────────────────────────

export const animatedButtonVariants = cva(
  "relative inline-flex items-center justify-center font-medium rounded-xl select-none outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outlined:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-10 px-5 text-sm",
        lg: "h-11 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AnimatedButtonProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof motion.button>,
      "children"
    >,
    VariantProps<typeof animatedButtonVariants> {
  children: React.ReactNode;
  /**
   * Key identifying the current label/content state. Change it to trigger the transition.
   * If omitted, it will fall back to deriving from children when they are simple strings.
   */
  contentKey?: string | number;
  /**
   * Swap animation transition style.
   * @default "slide-up"
   */
  swap?: "slide-up" | "slide-down" | "fade" | "blur";
  /**
   * Whether to animate a text-swap effect vertically on hover.
   * Replaces the dedicated ScrollUpButton with a unified hover interaction.
   * @default false
   */
  hoverSwap?: boolean;
}

// ─── Motion Variants ──────────────────────────────────────────────────────────

const swapVariants = {
  "slide-up": {
    initial: { y: "60%", opacity: 0 },
    animate: { y: "0%", opacity: 1 },
    exit: { y: "-60%", opacity: 0 },
  },
  "slide-down": {
    initial: { y: "-60%", opacity: 0 },
    animate: { y: "0%", opacity: 1 },
    exit: { y: "60%", opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  blur: {
    initial: { filter: "blur(4px)", opacity: 0 },
    animate: { filter: "blur(0px)", opacity: 1 },
    exit: { filter: "blur(4px)", opacity: 0 },
  },
};

export const AnimatedButton = forwardRef<
  HTMLButtonElement,
  AnimatedButtonProps
>(
  (
    {
      children,
      contentKey,
      swap = "slide-up",
      variant = "default",
      size = "md",
      hoverSwap = false,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();

    // Fallback key: string representation of children, if applicable
    const resolvedKey =
      contentKey ?? (typeof children === "string" ? children : undefined);

    const isHoverSwap = hoverSwap && !shouldReduceMotion;

    // Hover swap variants (two layers y-shifting)
    const containerHoverVariants = {
      initial: {},
      hover: {},
    };

    const firstLayerVariants = {
      initial: { y: "0%" },
      hover: { y: "-150%" },
    };

    const secondLayerVariants = {
      initial: { y: "150%" },
      hover: { y: "0%" },
    };

    // If using hoverSwap, render a dual-layer sliding structure
    if (isHoverSwap) {
      return (
        <motion.button
          ref={ref}
          disabled={disabled}
          initial="initial"
          whileHover="hover"
          whileTap={{ scale: 0.97 }}
          variants={containerHoverVariants}
          className={cn(
            animatedButtonVariants({ variant, size }),
            "overflow-hidden flex flex-col items-center justify-center w-fit",
            className,
          )}
          {...props}
        >
          {/* Main Label Layer */}
          <motion.span
            variants={firstLayerVariants}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="flex items-center justify-center w-full"
          >
            {children}
          </motion.span>

          {/* Incoming Hover Label Layer */}
          <motion.span
            variants={secondLayerVariants}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="absolute flex items-center justify-center w-full"
          >
            {children}
          </motion.span>
        </motion.button>
      );
    }

    // Default button with layout animations on state changes
    return (
      <motion.button
        ref={ref}
        disabled={disabled}
        layout={shouldReduceMotion ? false : "size"}
        whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 500, damping: 35 }
        }
        className={cn(
          animatedButtonVariants({ variant, size }),
          "overflow-hidden flex items-center justify-center w-fit",
          className,
        )}
        {...props}
      >
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden py-0.5">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={resolvedKey}
              variants={
                shouldReduceMotion ? swapVariants.fade : swapVariants[swap]
              }
              initial="initial"
              animate="animate"
              exit="exit"
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 450, damping: 30 }
              }
              className="flex items-center justify-center gap-2 whitespace-nowrap min-w-max"
            >
              {children}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.button>
    );
  },
);

AnimatedButton.displayName = "AnimatedButton";
export default AnimatedButton;
