"use client";

import {
  motion,
  type SpringOptions,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/sona-utils";

const SPRING_CONFIG = { stiffness: 30, damping: 6, mass: 0.6 };

export interface MagneticProps {
  /** The content to be rendered inside the magnetic button. */
  children: ReactNode;
  /**
   * The intensity of the magnetic pull effect.
   * @default 0.6
   */
  magneticIntensity?: number;
  /**
   * The range within which the magnetic effect is active.
   * @default 100
   */
  magneticRange?: number;
  /**
   * Defines the area of interaction for the magnetic effect.
   * @default "self"
   */
  interactionArea?: "self" | "parent";
  /** Configuration for the spring animation. */
  springConfig?: SpringOptions;
  /** Additional class names for custom styling. */
  customClassName?: string;
  /** Additional classes for the wrapper. Prefer this for new usage. */
  className?: string;
}

export default function Magnetic({
  children,
  magneticIntensity = 0.6,
  magneticRange = 100,
  interactionArea = "self",
  springConfig = SPRING_CONFIG,
  customClassName,
  className,
}: MagneticProps) {
  const [isMouseHovered, setMouseHovered] = useState(false);
  const magneticRef = useRef<HTMLDivElement>(null);
  const hoveredRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);

  const springMotionX = useSpring(motionX, springConfig);
  const springMotionY = useSpring(motionY, springConfig);
  const resolvedRange = Math.max(1, magneticRange);

  // Only listen while hovered — no idle document-wide mousemove work.
  useEffect(() => {
    if (!isMouseHovered || shouldReduceMotion) return;

    const calculateMouseDistance = (event: MouseEvent) => {
      if (!hoveredRef.current) {
        motionX.set(0);
        motionY.set(0);
        return;
      }
      if (magneticRef.current) {
        const rect = magneticRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = event.clientX - centerX;
        const distanceY = event.clientY - centerY;

        const absoluteDistance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (absoluteDistance <= resolvedRange) {
          const scale = 1 - absoluteDistance / resolvedRange;

          motionX.set(distanceX * magneticIntensity * scale);
          motionY.set(distanceY * magneticIntensity * scale);
        } else {
          motionX.set(0);
          motionY.set(0);
        }
      }
    };

    document.addEventListener("mousemove", calculateMouseDistance);

    return () => {
      document.removeEventListener("mousemove", calculateMouseDistance);
      motionX.set(0);
      motionY.set(0);
    };
  }, [
    isMouseHovered,
    shouldReduceMotion,
    magneticIntensity,
    resolvedRange,
    motionX,
    motionY,
  ]);

  useEffect(() => {
    if (shouldReduceMotion) {
      setMouseHovered(false);
      motionX.set(0);
      motionY.set(0);
    }
  }, [motionX, motionY, shouldReduceMotion]);

  useEffect(() => {
    if (interactionArea === "parent" && magneticRef.current?.parentElement) {
      const parentElement = magneticRef.current.parentElement;

      const handleParentMouseEnter = () => {
        hoveredRef.current = true;
        setMouseHovered(true);
      };
      const handleParentMouseLeave = () => {
        hoveredRef.current = false;
        setMouseHovered(false);
        motionX.set(0);
        motionY.set(0);
      };

      parentElement.addEventListener("mouseenter", handleParentMouseEnter);
      parentElement.addEventListener("mouseleave", handleParentMouseLeave);

      return () => {
        parentElement.removeEventListener("mouseenter", handleParentMouseEnter);
        parentElement.removeEventListener("mouseleave", handleParentMouseLeave);
      };
    }
  }, [interactionArea, motionX, motionY]);

  const handleMouseEnter = () => {
    if (interactionArea === "self") {
      hoveredRef.current = true;
      setMouseHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (interactionArea === "self") {
      hoveredRef.current = false;
      setMouseHovered(false);
      motionX.set(0);
      motionY.set(0);
    }
  };

  return (
    <motion.div
      ref={magneticRef}
      onMouseEnter={interactionArea === "self" ? handleMouseEnter : undefined}
      onMouseLeave={interactionArea === "self" ? handleMouseLeave : undefined}
      style={{
        x: springMotionX,
        y: springMotionY,
      }}
      role="presentation"
      className={cn(customClassName, className)}
    >
      {children}
    </motion.div>
  );
}
