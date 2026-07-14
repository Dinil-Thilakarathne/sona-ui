"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { motion, useReducedMotion } from "motion/react";
import { forwardRef } from "react";
import { motionTransition } from "@/lib/sona-motion";
import { cn } from "@/lib/sona-utils";

export const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium select-none outline-none transition-colors hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-foreground/90",
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

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof motion.button>,
    VariantProps<typeof buttonVariants> {
  /** Content rendered inside the button. */
  children: React.ReactNode;
  /**
   * Visual style of the button.
   * @default "default"
   */
  variant?: "default" | "outlined" | "secondary";
  /**
   * Controls the button height, padding, and text size.
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "default",
      size = "md",
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();

    return (
      <motion.button
        ref={ref}
        disabled={disabled}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
        transition={
          shouldReduceMotion
            ? motionTransition.reduced
            : motionTransition.spatial
        }
        className={cn(buttonVariants({ variant, size }), "w-fit", className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
export default Button;
