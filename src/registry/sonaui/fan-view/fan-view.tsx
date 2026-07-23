"use client";

import {
  AnimatePresence,
  MotionConfig,
  type Transition,
  useReducedMotion,
} from "motion/react";
import * as m from "motion/react-m";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/sona-utils";

export interface FanViewItem {
  /** Display label shown on the card. */
  label: string;
  /**
   * Width of the card pill in pixels.
   * @default 160
   */
  width?: number;
  /** Called when the item is selected. */
  onSelect?: () => void;
}

export interface FanViewProps {
  /**
   * Items displayed as fanned cards when open.
   */
  items?: FanViewItem[];
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state for uncontrolled usage. @default false */
  defaultOpen?: boolean;
  /** Called when the view opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Spring stiffness for the fan animation.
   * @default 540
   */
  stiffness?: number;
  /**
   * Spring damping for the fan animation.
   * @default 28
   */
  damping?: number;
  /** Additional CSS classes for the root container. */
  className?: string;
}

const DEFAULT_ITEMS: FanViewItem[] = [];

function getFanPoint(index: number, total: number) {
  const progress = total <= 1 ? 0 : index / (total - 1);
  const angle = (progress - 0.5) * 80 * (Math.PI / 180);
  const radius = 190;
  return {
    x: Math.sin(angle) * radius,
    y: -(Math.cos(angle) * radius * 0.65 + 110),
    rotate: (progress - 0.5) * 28,
    zIndex: total - index,
  };
}

export default function FanView({
  items = DEFAULT_ITEMS,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  stiffness = 540,
  damping = 28,
  className,
}: FanViewProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const springConfig: Transition = useMemo(
    () => ({ type: "spring", stiffness, damping, mass: 0.95 }),
    [stiffness, damping],
  );
  const resolvedTransition: Transition = shouldReduceMotion
    ? { duration: 0 }
    : springConfig;
  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) setInternalOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const positionedItems = useMemo(
    () =>
      items.map((item, index) => ({
        ...item,
        ...getFanPoint(index, items.length),
      })),
    [items],
  );

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen, setOpen]);

  return (
    <MotionConfig transition={resolvedTransition}>
      <div
        className={cn(
          "flex min-h-[420px] w-full items-end justify-center px-4 pb-16 pt-8",
          className,
        )}
      >
        <div ref={rootRef} className="relative flex items-end justify-center">
          <AnimatePresence initial={false}>
            {isOpen &&
              positionedItems.map(
                (
                  { label, onSelect, width = 160, x, y, rotate, zIndex },
                  index,
                ) => (
                  <m.button
                    key={label}
                    type="button"
                    title={label}
                    aria-label={label}
                    className="absolute bottom-0 left-1/2 cursor-pointer -translate-x-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    style={{ width, zIndex }}
                    initial={{
                      x: 0,
                      y: 0,
                      opacity: 0,
                      scale: 0.55,
                      rotate: 0,
                      filter: "blur(10px)",
                    }}
                    animate={{
                      x,
                      y,
                      opacity: 1,
                      scale: 1,
                      rotate,
                      filter: "blur(0px)",
                      transition: {
                        ...(shouldReduceMotion
                          ? { duration: 0 }
                          : springConfig),
                        delay: shouldReduceMotion ? 0 : index * 0.04,
                      },
                    }}
                    exit={{
                      x: 0,
                      y: 0,
                      opacity: 0,
                      scale: 0.45,
                      rotate: 0,
                      filter: "blur(10px)",
                      transition: shouldReduceMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.18,
                            ease: "easeInOut",
                            delay: (items.length - index - 1) * 0.025,
                          },
                    }}
                    whileHover={
                      shouldReduceMotion ? {} : { scale: 1.05, zIndex: 30 }
                    }
                    whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                    onClick={() => {
                      onSelect?.();
                      setOpen(false);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") {
                        event.preventDefault();
                        setOpen(false);
                        triggerRef.current?.focus();
                      }
                    }}
                  >
                    <span
                      className={cn(
                        "flex h-12 w-full items-center justify-center rounded-xl border px-5",
                        "border-border bg-foreground text-background shadow-sm",
                        "text-[17px] font-medium whitespace-nowrap",
                      )}
                    >
                      {label}
                    </span>
                  </m.button>
                ),
              )}
          </AnimatePresence>

          <m.button
            ref={triggerRef}
            type="button"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close fan view" : "Open fan view"}
            onClick={() => setOpen(!isOpen)}
            className={cn(
              "relative z-20 flex h-16 w-16 items-center justify-center rounded-full border",
              "border-border bg-background text-foreground shadow-lg",
              "hover:border-border/80 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            )}
            whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
          >
            <m.span
              className="block relative size-8"
              animate={isOpen ? "open" : "closed"}
              initial={false}
            >
              <m.span
                className="absolute left-0 top-1/2 h-1 w-full bg-foreground rounded-full -translate-y-1/2"
                variants={{ closed: { rotate: 0 }, open: { rotate: 45 } }}
              />
              <m.span
                className="absolute left-0 top-1/2 h-1 w-full bg-foreground rounded-full -translate-y-1/2"
                variants={{ closed: { rotate: 90 }, open: { rotate: -45 } }}
              />
            </m.span>
          </m.button>
        </div>
      </div>
    </MotionConfig>
  );
}
