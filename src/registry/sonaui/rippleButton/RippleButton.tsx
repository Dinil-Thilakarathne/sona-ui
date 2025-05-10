"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  scaleAmount?: number;
  className?: string;
  duration?: number;
  rippleStyle?: string;
}

interface RippleProps {
  x: number;
  y: number;
  key: number;
}

export default function RippleButton({
  children,
  className,
  scaleAmount = 25,
  duration = 0.5,
  rippleStyle,
  ...props
}: RippleButtonProps) {
  const [ripple, setRipple] = useState<RippleProps | null>(null);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setRipple({ x, y, key: Date.now() });
    },
    [],
  );

  const buttonClasses = useMemo(
    () =>
      cn(
        "relative overflow-hidden rounded-full border border-slate-950 bg-slate-100 dark:bg-slate-50 px-4 py-2 leading-[16px] transition-all duration-300 ease-in-out hover:cursor-pointer",
        className,
      ),
    [className],
  );

  return (
    <button
      className={buttonClasses}
      onMouseEnter={handleMouseEnter}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      {...props}
    >
      {ripple && (
        <motion.span
          key={ripple.key}
          className={cn(
            "pointer-events-none absolute rounded-full bg-slate-900 dark:bg-gray-300",
            rippleStyle,
          )}
          style={{
            left: ripple.x,
            top: ripple.y,
            width: "10px",
            height: "10px",
            transform: "translate(-50%, -50%) scale(0)",
          }}
          animate={isHover ? { scale: scaleAmount } : { scale: 0 }}
          transition={{
            duration: isHover ? duration : 0.4,
            ease: "easeIn",
          }}
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
    <span className={cn("text-white mix-blend-difference", className)}>
      {text}
    </span>
  );
}
