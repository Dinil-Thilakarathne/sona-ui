"use client";
// import { useContext, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedPlusMinusButtonProps {
  size?: number;
  isOpen?: boolean;
}
const AnimatedPlusMinusButton = ({
  size = 24,
  isOpen = false,
}: AnimatedPlusMinusButtonProps) => {
  return (
    <span
      role="button"
      aria-pressed="true"
      className="flex items-center justify-center"
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        {/* Horizontal line */}
        <motion.line
          x1="1"
          y1="12"
          x2="23"
          y2="12"
          stroke="currentColor"
          strokeWidth="1"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Vertical line */}
        <motion.line
          x1="12"
          y1="1"
          x2="12"
          y2="23"
          stroke="currentColor"
          strokeWidth="1"
          variants={{
            closed: { rotate: 0, opacity: 1 },
            open: { rotate: 90, opacity: 1 },
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.svg>
    </span>
  );
};

export default AnimatedPlusMinusButton;
