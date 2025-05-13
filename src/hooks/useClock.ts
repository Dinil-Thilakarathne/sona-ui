"use client";

import { useRef, useEffect } from "react";
import { MotionValue, useAnimationFrame, useMotionValue } from "motion/react";

type UseClockProps = {
  defaultValue?: number;
  reverse?: boolean;
  speed?: number;
};

type UseClockReturn = {
  value: MotionValue<number>;
  stop: () => void;
  start: () => void;
};

export const useClock = ({
  defaultValue = 0,
  reverse = true,
  speed = 10,
}: UseClockProps = {}): UseClockReturn => {
  const clock = useMotionValue(defaultValue);
  const paused = useRef(false);
  const reverseRef = useRef(reverse);

  useEffect(() => {
    reverseRef.current = reverse;
  }, [reverse]);

  useAnimationFrame((t, dt) => {
    if (paused.current) {
      return;
    }
    // Update clock value based on the current reverse setting
    clock.set(clock.get() + ((reverseRef.current ? -dt : dt) * speed) / 1000);
  });

  return {
    value: clock,
    stop: () => {
      paused.current = true;
    },
    start: () => {
      paused.current = false;
    },
  };
};
