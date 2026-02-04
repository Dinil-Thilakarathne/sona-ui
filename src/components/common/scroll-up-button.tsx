"use client";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";

interface ScrollUpButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: "default" | "outlined" | "secondary";
}

const scroollUpButtonVariants = cva(
  "relative flex cursor-pointer flex-col overflow-hidden rounded-2xl px-6 py-3 select-none",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background",
        outlined: "border border-foreground text-foreground",
        secondary: "bg-secondary text-secondary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export default function ScrollUpButton({ text, variant }: ScrollUpButtonProps) {
  return (
    <motion.button
      className={cn(scroollUpButtonVariants({ variant }))}
      initial="initial"
      whileHover="hover"
      animate="initial"
    >
      <motion.span
        className="w-full"
        variants={{
          initial: { y: "0%", scale: 1 },
          hover: { y: "-150%", scale: 0.8 },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 w-full translate-y-full"
        variants={{
          initial: { y: "100%", scale: 0.8 },
          hover: { y: "-50%", scale: 1 },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {text}
      </motion.span>
    </motion.button>
  );
}
