"use client";

import { useClock } from "@/hooks/useClock";
import { cn } from "@/lib/utils";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { forwardRef, useEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";

// Constants
const DEFAULT_DURATION = 10; // Default duration in seconds

// Helper function to calculate the number of marquee items
const calculateItemCount = (
  containerWidth: number,
  itemWidth: number,
): number => {
  return Math.ceil(containerWidth / itemWidth);
};

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  duration?: number;
  reverse?: boolean;
  activeScroll?: boolean;
  activeHover?: boolean;
}

export default function Marquee({
  children,
  className,
  containerClassName,
  duration = DEFAULT_DURATION,
  reverse = false,
  activeScroll = false,
  activeHover = false,
}: MarqueeProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [parentBounds, setParentBounds] = useState({ width: 0, height: 0 });
  const [marqueeItemRef, marqueeItemBounds] = useMeasure();
  const [count, setCount] = useState(0);
  const [activeDirection, setActiveDirection] = useState<boolean>(false);
  const [speed, setSpeed] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  useEffect(() => {
    if (ref.current && isClient) {
      if (ref.current.parentElement) {
        const { width, height } =
          ref.current.parentElement.getBoundingClientRect();
        setParentBounds({ width, height });
      }
    }
  }, [ref, isClient]);

  // Update item count when dimensions change
  useEffect(() => {
    if (marqueeItemBounds.width > 0 && parentBounds.width > 0) {
      setCount(calculateItemCount(parentBounds.width, marqueeItemBounds.width));
    }
  }, [marqueeItemBounds, parentBounds, children]);

  // Update active direction based on velocity
  useEffect(() => {
    return velocityFactor.on("change", (value) => {
      setActiveDirection(value < 0);
    });
  }, [velocityFactor]);

  // Update speed dynamically based on velocity factor
  useEffect(() => {
    const unsubscribe = velocityFactor.on("change", (value) => {
      setSpeed(activeScroll && value > 0 ? value : 1);
    });

    return () => unsubscribe();
  }, [velocityFactor, activeScroll]);

  // Update speed when hovered
  useEffect(() => {
    if (!activeHover) return;
    if (isHovered) {
      setSpeed(0);
    } else {
      setSpeed(activeScroll ? velocityFactor.get() : 1);
    }
  }, [isHovered, activeScroll, velocityFactor, activeHover]);

  const clock = useClock({
    defaultValue: Date.now(),
    reverse: activeScroll ? activeDirection : reverse,
    speed,
  }).value;

  const progress = useTransform(clock, (time) => (time % duration) / duration);
  const percentage = useTransform(progress, (t) => t * 100);
  const translateX = useMotionTemplate`-${percentage}%`;

  return (
    isClient && (
      <motion.div
        style={{ translateX }}
        className={cn("flex w-fit space-x-16", containerClassName)}
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <MarqueeItem className={className} ref={marqueeItemRef}>
          {children}
        </MarqueeItem>
        {Array.from({ length: count }).map((_, i) => (
          <MarqueeItem
            key={i}
            isCopy
            style={{ left: `calc(${(i + 1) * 100}%)` }}
          >
            {children}
          </MarqueeItem>
        ))}
      </motion.div>
    )
  );
}

interface MarqueeItemProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  isCopy?: boolean;
}

const MarqueeItem = forwardRef<HTMLDivElement, MarqueeItemProps>(
  ({ children, className, isCopy, style }, ref) => {
    return (
      <div
        className={cn("w-full text-nowrap", isCopy && "absolute", className)}
        style={style}
        ref={ref}
      >
        {children}
      </div>
    );
  },
);

MarqueeItem.displayName = "MarqueeItem";
