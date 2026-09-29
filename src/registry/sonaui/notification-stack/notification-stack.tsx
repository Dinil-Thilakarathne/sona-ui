"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotionConfig,
  useIsPresent,
} from "motion/react";
import { type ReactNode, useRef } from "react";
import {
  CheckCircle2,
  Info,
  OctagonAlert,
  TriangleAlert,
  X,
} from "lucide-react";

import { cn } from "@/lib/sona-utils";

export type NotificationVariant = "default" | "success" | "warning" | "error";

export interface NotificationStackAction {
  /** The label displayed on the secondary notification action. */
  label: string;
  /** Called when the secondary action is selected. */
  onClick?: () => void;
}

export interface NotificationStackItem {
  /** A stable identifier used to preserve each notification during reordering. */
  id: string;
  /** The primary notification message. */
  title: string;
  /** Optional supporting detail. */
  description?: string;
  /**
   * Semantic presentation for the notification.
   * @default "default"
   */
  variant?: NotificationVariant;
  /** Optional visible secondary action. Requires onClick to be enabled. */
  action?: NotificationStackAction;
}

export interface NotificationStackProps {
  /** Notifications displayed from newest to oldest. */
  notifications: NotificationStackItem[];
  /** Called when a notification's dismiss button is selected. */
  onDismiss?: (id: string) => void;
  /**
   * Controls whether the stack is fixed to the viewport's top-right corner or placed by its parent.
   * @default "top-right"
   */
  placement?: "top-right" | "inline";
  /**
   * Caps the number of visible notifications.
   * @default 4
   */
  maxVisible?: number;
  /** Additional CSS classes for the stack container. */
  className?: string;
}

const variants = {
  default: {
    icon: Info,
    iconClassName: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  success: {
    icon: CheckCircle2,
    iconClassName: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  warning: {
    icon: TriangleAlert,
    iconClassName: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  error: {
    icon: OctagonAlert,
    iconClassName: "bg-destructive/10 text-destructive",
  },
} as const;

const enterTransition = {
  type: "spring",
  stiffness: 420,
  damping: 32,
  mass: 0.72,
} as const;
const exitTransition = { duration: 0.16, ease: [0.32, 0.72, 0, 1] } as const;

function NotificationContent({ children }: { children: ReactNode }) {
  const isPresent = useIsPresent();
  return (
    <div
      className="contents"
      inert={!isPresent}
      aria-hidden={!isPresent || undefined}
    >
      {children}
    </div>
  );
}

export default function NotificationStack({
  notifications,
  onDismiss,
  placement = "top-right",
  maxVisible = 4,
  className,
}: NotificationStackProps) {
  const shouldReduceMotion = useReducedMotionConfig();
  const listRef = useRef<HTMLOListElement>(null);
  const visibleNotifications = notifications.slice(0, Math.max(0, maxVisible));

  return (
    <ol
      ref={listRef}
      tabIndex={-1}
      aria-label="Notifications"
      aria-live="polite"
      className={cn(
        "z-50 flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2",
        placement === "top-right"
          ? "fixed top-4 right-4"
          : "relative max-w-full",
        className,
      )}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {visibleNotifications.map((notification, index) => {
          const variant = notification.variant ?? "default";
          const Icon = variants[variant].icon;

          return (
            <motion.li
              key={notification.id}
              layout={!shouldReduceMotion}
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      x: 20,
                      y: -8,
                      scale: 0.98,
                      filter: "blur(5px)",
                    }
              }
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                transition: shouldReduceMotion
                  ? { duration: 0.12 }
                  : { ...enterTransition, delay: Math.min(index, 3) * 0.035 },
              }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0, transition: { duration: 0.1 } }
                  : {
                      opacity: 0,
                      x: 12,
                      y: -4,
                      scale: 0.99,
                      filter: "blur(2px)",
                      transition: exitTransition,
                    }
              }
              className="group relative grid grid-cols-[auto_1fr_auto] gap-x-3 rounded-2xl bg-background/95 p-3 smooth-shadow-ring-lg backdrop-blur-xl"
            >
              <NotificationContent>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 grid size-8 place-items-center rounded-full",
                    variants[variant].iconClassName,
                  )}
                >
                  <Icon className="size-4" strokeWidth={2} />
                </span>
                <div className="min-w-0 pr-1">
                  <p className="font-medium text-foreground text-sm leading-5">
                    {notification.title}
                  </p>
                  {notification.description && (
                    <p className="mt-0.5 text-muted-foreground text-sm leading-5">
                      {notification.description}
                    </p>
                  )}
                  {notification.action && (
                    <button
                      type="button"
                      disabled={!notification.action.onClick}
                      className="mt-2 rounded-md font-medium text-foreground text-xs outline-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      onClick={notification.action.onClick}
                    >
                      {notification.action.label}
                    </button>
                  )}
                </div>
                {onDismiss && (
                  <button
                    type="button"
                    aria-label={`Dismiss ${notification.title}`}
                    className="grid size-7 place-items-center rounded-md text-muted-foreground outline-none transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    data-dismiss=""
                    onClick={(event) => {
                      if (document.activeElement === event.currentTarget) {
                        const buttons = Array.from(
                          listRef.current?.querySelectorAll<HTMLButtonElement>(
                            "button[data-dismiss]",
                          ) ?? [],
                        );
                        const currentIndex = buttons.indexOf(
                          event.currentTarget,
                        );
                        const target =
                          buttons[currentIndex + 1] ??
                          buttons[currentIndex - 1] ??
                          listRef.current;
                        target?.focus({ preventScroll: true });
                      }
                      onDismiss(notification.id);
                    }}
                  >
                    <X
                      aria-hidden="true"
                      className="size-4"
                      strokeWidth={1.8}
                    />
                  </button>
                )}
              </NotificationContent>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ol>
  );
}
