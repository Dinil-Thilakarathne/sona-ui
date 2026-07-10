"use client";

import { Dialog } from "@base-ui/react/dialog";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { createContext, type ReactNode, useContext, useState } from "react";
import { cn } from "@/lib/utils";

// ─── Context ─────────────────────────────────────────────────────────────────

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error(
      "AnimatedDialog subcomponents must be used within <AnimatedDialog>",
    );
  }
  return ctx;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AnimatedDialogProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface AnimatedDialogContentProps {
  children: ReactNode;
  /**
   * Direction the dialog slides in from.
   * @default "bottom"
   */
  from?: "top" | "bottom" | "left" | "right" | "center";
  /**
   * Direction the dialog slides out to. Defaults to reversing the entrance.
   */
  exitTo?: "top" | "bottom" | "left" | "right" | "center";
  className?: string;
  /**
   * Class name for the backdrop overlay.
   */
  backdropClassName?: string;
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export function AnimatedDialog({
  children,
  open: controlledOpen,
  onOpenChange,
}: AnimatedDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        {children}
      </Dialog.Root>
    </DialogContext.Provider>
  );
}

// ─── Trigger ──────────────────────────────────────────────────────────────────

export function AnimatedDialogTrigger({
  children,
  className,
  ...props
}: Dialog.Trigger.Props) {
  return (
    <Dialog.Trigger
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2",
        "bg-primary text-primary-foreground text-sm font-medium",
        "hover:bg-primary/90 transition-colors duration-150",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      {children}
    </Dialog.Trigger>
  );
}

// ─── Content ──────────────────────────────────────────────────────────────────

const motionVariants = {
  initial: (from: string) => {
    switch (from) {
      case "top":
        return { y: -24, opacity: 0, scale: 0.97 };
      case "bottom":
        return { y: 24, opacity: 0, scale: 0.97 };
      case "left":
        return { x: -24, opacity: 0, scale: 0.97 };
      case "right":
        return { x: 24, opacity: 0, scale: 0.97 };
      case "center":
      default:
        return { scale: 0.95, opacity: 0 };
    }
  },
  animate: {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
  },
  exit: (exitTo: string) => {
    switch (exitTo) {
      case "top":
        return { y: -20, opacity: 0, scale: 0.97 };
      case "bottom":
        return { y: 20, opacity: 0, scale: 0.97 };
      case "left":
        return { x: -20, opacity: 0, scale: 0.97 };
      case "right":
        return { x: 20, opacity: 0, scale: 0.97 };
      case "center":
      default:
        return { scale: 0.95, opacity: 0 };
    }
  },
};

export function AnimatedDialogContent({
  children,
  from = "bottom",
  exitTo,
  className,
  backdropClassName,
}: AnimatedDialogContentProps) {
  const { open } = useDialogContext();
  const shouldReduceMotion = useReducedMotion();
  const resolvedExitTo = exitTo ?? from;

  return (
    <AnimatePresence custom={resolvedExitTo}>
      {open && (
        <Dialog.Portal keepMounted>
          {/* Backdrop Overlay */}
          <Dialog.Backdrop
            render={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.2, ease: "easeOut" }
                }
                className={cn(
                  "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
                  backdropClassName,
                )}
              />
            }
          />

          {/* Positioner centering the popup */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <Dialog.Popup
              className="pointer-events-auto"
              render={
                <motion.div
                  custom={from}
                  variants={shouldReduceMotion ? {} : motionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 400,
                          damping: 32,
                        }
                  }
                  className={cn(
                    "w-full max-w-md overflow-hidden rounded-2xl p-6",
                    "bg-popover text-popover-foreground shadow-2xl",
                    "border border-border/80",
                    className,
                  )}
                >
                  {children}
                </motion.div>
              }
            />
          </div>
        </Dialog.Portal>
      )}
    </AnimatePresence>
  );
}

// ─── Title ────────────────────────────────────────────────────────────────────

export function AnimatedDialogTitle({
  className,
  ...props
}: Dialog.Title.Props) {
  return (
    <Dialog.Title
      className={cn(
        "text-lg font-semibold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  );
}

// ─── Description ──────────────────────────────────────────────────────────────

export function AnimatedDialogDescription({
  className,
  ...props
}: Dialog.Description.Props) {
  return (
    <Dialog.Description
      className={cn("mt-1.5 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

// ─── Close ────────────────────────────────────────────────────────────────────

export function AnimatedDialogClose({
  className,
  ...props
}: Dialog.Close.Props) {
  return (
    <Dialog.Close
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2",
        "bg-secondary text-secondary-foreground text-sm font-medium",
        "hover:bg-muted transition-colors duration-150",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        className,
      )}
      {...props}
    />
  );
}
