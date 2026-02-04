"use client";

import { motion } from "framer-motion";

interface ScrollUpButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function ScrollUpButton({ text }: ScrollUpButtonProps) {
  return (
    <motion.button
      className="bg-foreground relative flex cursor-pointer flex-col overflow-hidden rounded-2xl px-6 py-3 text-background select-none"
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
