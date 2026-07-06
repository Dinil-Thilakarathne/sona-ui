"use client";

import { AnimatePresence, MotionConfig, type Transition } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface DockMenuItem {
  /** Display label shown on the item pill. */
  label: string;
  /** Icon component (e.g. from lucide-react). */
  icon: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
    "aria-hidden"?: boolean | "true" | "false";
  }>;
}

export interface CircularDockMenuProps {
  /**
   * Items rendered as arc pills when the menu is open.
   */
  items?: DockMenuItem[];
  /**
   * Spring stiffness for the open/close animation.
   * @default 420
   */
  stiffness?: number;
  /**
   * Spring damping for the open/close animation.
   * @default 32
   */
  damping?: number;
  /** Additional CSS classes for the root container. */
  className?: string;
}

const DEFAULT_ITEMS: DockMenuItem[] = [];

function getArcPosition(index: number, total: number) {
  const progress = total <= 1 ? 0 : index / (total - 1);
  const radius = 500 - progress * 270;
  const angle = (-140 + progress * 36) * (Math.PI / 180);
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    rotate: -12 + progress * 9,
  };
}

export default function CircularDockMenu({
  items = DEFAULT_ITEMS,
  stiffness = 420,
  damping = 32,
  className,
}: CircularDockMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const springConfig: Transition = useMemo(
    () => ({ type: "spring", stiffness, damping, mass: 0.8 }),
    [stiffness, damping],
  );

  const positionedItems = useMemo(
    () =>
      items.map((item, index) => ({
        ...item,
        ...getArcPosition(index, items.length),
      })),
    [items],
  );

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  return (
    <MotionConfig transition={springConfig}>
      <div
        className={cn(
          "flex min-h-[520px] w-full items-center justify-center overflow-hidden px-4 py-10",
          className,
        )}
      >
        <div ref={rootRef} className="relative h-[440px] w-full max-w-[520px]">
          <AnimatePresence initial={false}>
            {isOpen &&
              positionedItems.map(
                ({ label, icon: Icon, x, y, rotate }, index) => (
                  <m.div
                    key={label}
                    className="absolute bottom-12 left-1/2 z-10"
                    initial={{
                      x: 0,
                      y: 0,
                      opacity: 0,
                      scale: 0.56,
                      rotate: 8,
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
                        ...springConfig,
                        delay: (items.length - index - 1) * 0.045,
                      },
                    }}
                    exit={{
                      x: 0,
                      y: 0,
                      opacity: 0,
                      scale: 0.48,
                      rotate: 10,
                      filter: "blur(10px)",
                      transition: {
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: index * 0.025,
                      },
                    }}
                  >
                    <m.button
                      type="button"
                      className={cn(
                        "relative flex h-14 -translate-x-1/2 items-center gap-3 rounded-full border px-5",
                        "border-border bg-background text-foreground shadow-lg",
                        "cursor-pointer text-lg font-semibold whitespace-nowrap",
                        "hover:border-border/80",
                      )}
                      whileHover={{ scale: 1.05, zIndex: 20 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <Icon
                        aria-hidden="true"
                        className="text-muted-foreground size-6"
                        strokeWidth={2}
                      />
                      <span>{label}</span>
                    </m.button>
                  </m.div>
                ),
              )}
          </AnimatePresence>

          <m.button
            type="button"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((v) => !v)}
            className={cn(
              "absolute bottom-12 left-1/2 z-20 flex size-24 -translate-x-1/2 items-center justify-center rounded-full border",
              "border-border bg-background text-foreground shadow-lg",
              "hover:border-border/80 cursor-pointer",
            )}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
          >
            <m.span
              className="relative block size-9"
              animate={isOpen ? "open" : "closed"}
              initial={false}
            >
              <m.span
                className="bg-foreground absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 rounded-full"
                variants={{ closed: { rotate: 0 }, open: { rotate: 45 } }}
              />
              <m.span
                className="bg-foreground absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 rounded-full"
                variants={{ closed: { rotate: 90 }, open: { rotate: -45 } }}
              />
            </m.span>
          </m.button>
        </div>
      </div>
    </MotionConfig>
  );
}
