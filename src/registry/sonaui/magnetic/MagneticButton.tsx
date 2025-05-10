"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
} from "motion/react";
import { cn } from "@/lib/utils";

const SPRING_CONFIG = { stiffness: 30, damping: 6, mass: 0.6 };

interface MagneticProps {
  children: ReactNode;
  magneticIntensity?: number;
  magneticRange?: number;
  interactionArea?: "self" | "parent";
  springConfig?: SpringOptions;
  customClassName?: string;
}

export default function Magnetic({
  children,
  magneticIntensity = 0.6,
  magneticRange = 100,
  interactionArea = "self",
  springConfig,
  customClassName,
}: MagneticProps) {
  const [isMouseHovered, setMouseHovered] = useState(false);
  const magneticRef = useRef<HTMLDivElement>(null);

  springConfig = springConfig || SPRING_CONFIG;

  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);

  const springMotionX = useSpring(motionX, springConfig);
  const springMotionY = useSpring(motionY, springConfig);

  useEffect(() => {
    const calculateMouseDistance = (event: MouseEvent) => {
      if (magneticRef.current) {
        const rect = magneticRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = event.clientX - centerX;
        const distanceY = event.clientY - centerY;

        const absoluteDistance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (isMouseHovered && absoluteDistance <= magneticRange) {
          const scale = 1 - absoluteDistance / magneticRange;

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
    };
  }, [
    magneticRef,
    isMouseHovered,
    magneticIntensity,
    magneticRange,
    motionX,
    motionY,
    interactionArea,
  ]);

  useEffect(() => {
    if (interactionArea === "parent" && magneticRef.current?.parentElement) {
      const parentElement = magneticRef.current.parentElement;

      const handleParentMouseEnter = () => setMouseHovered(true);
      const handleParentMouseLeave = () => setMouseHovered(false);

      parentElement.addEventListener("mouseenter", handleParentMouseEnter);
      parentElement.addEventListener("mouseleave", handleParentMouseLeave);

      return () => {
        parentElement.removeEventListener("mouseenter", handleParentMouseEnter);
        parentElement.removeEventListener("mouseleave", handleParentMouseLeave);
      };
    }
  }, [interactionArea]);

  const handleMouseEnter = () => {
    if (interactionArea === "self") {
      setMouseHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (interactionArea === "self") {
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
      className={cn("", customClassName)}
    >
      {children}
    </motion.div>
  );
}
