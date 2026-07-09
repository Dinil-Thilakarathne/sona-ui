"use client";

import { Menu } from "@base-ui/react/menu";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  createContext,
  useContext,
  useId,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

// ─── Context ─────────────────────────────────────────────────────────────────

interface DropdownContextValue {
  /** Unique layoutId prefix for the hover highlight — scoped per Root instance. */
  layoutId: string;
  /** Currently highlighted item id (for keyboard + mouse parity). */
  activeId: string | null;
  setActiveId: (id: string | null) => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const ctx = useContext(DropdownContext);
  if (!ctx)
    throw new Error(
      "AnimatedDropdown subcomponents must be used within <AnimatedDropdown>",
    );
  return ctx;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AnimatedDropdownProps {
  children: ReactNode;
  /** Controlled open state. */
  open?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
}

export interface AnimatedDropdownContentProps {
  children: ReactNode;
  className?: string;
  /**
   * Side the menu opens on.
   * @default "bottom"
   */
  side?: "bottom" | "top" | "left" | "right";
  /**
   * Alignment along the side.
   * @default "center"
   */
  align?: "start" | "center" | "end";
  /**
   * Gap between trigger and popup in px.
   * @default 6
   */
  sideOffset?: number;
}

export interface AnimatedDropdownItemProps {
  children: ReactNode;
  /** Icon to display before the label (any ReactNode — no HugeIcons dependency). */
  icon?: ReactNode;
  /**
   * Visual variant.
   * @default "default"
   */
  variant?: "default" | "danger";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface AnimatedDropdownTriggerProps {
  children: ReactNode;
  className?: string;
}

// ─── Root ─────────────────────────────────────────────────────────────────────

/**
 * Root dropdown — owns open state and the hover-highlight layout group.
 * Wrap all other AnimatedDropdown subcomponents inside this.
 */
export function AnimatedDropdown({
  children,
  open,
  onOpenChange,
}: AnimatedDropdownProps) {
  const layoutId = useId();
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <DropdownContext.Provider value={{ layoutId, activeId, setActiveId }}>
      <LayoutGroup id={layoutId}>
        <Menu.Root open={open} onOpenChange={onOpenChange}>
          {children}
        </Menu.Root>
      </LayoutGroup>
    </DropdownContext.Provider>
  );
}

// ─── Trigger ──────────────────────────────────────────────────────────────────

/**
 * The element that opens the dropdown when clicked.
 * Renders as a `<button>` by default via Base UI.
 */
export function AnimatedDropdownTrigger({
  children,
  className,
}: AnimatedDropdownTriggerProps) {
  return (
    <Menu.Trigger
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5",
        "bg-secondary text-secondary-foreground text-sm font-medium",
        "hover:bg-muted transition-colors duration-150",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        "data-[popup-open]:bg-muted",
        className,
      )}
    >
      {children}
    </Menu.Trigger>
  );
}

// ─── Content ──────────────────────────────────────────────────────────────────

/**
 * The animated popup panel containing menu items.
 * Scales in from its trigger origin using Base UI's `--transform-origin` variable.
 */
export function AnimatedDropdownContent({
  children,
  className,
  side = "bottom",
  align = "center",
  sideOffset = 6,
}: AnimatedDropdownContentProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Menu.Portal>
      <Menu.Positioner side={side} align={align} sideOffset={sideOffset}>
        <Menu.Popup
          className={cn(
            // Layout
            "z-50 min-w-[160px] rounded-xl p-1",
            // Surface
            "bg-popover text-popover-foreground shadow-lg",
            "border border-border/60",
            // Origin-aware transform — Base UI injects --transform-origin
            "origin-[var(--transform-origin)]",
            // Enter animation (CSS @starting-style + transition)
            "transition-[opacity,transform]",
            "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
            shouldReduceMotion
              ? "duration-0"
              : "duration-150 data-[ending-style]:duration-100",
            className,
          )}
        >
          {children}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  );
}

// ─── Item ─────────────────────────────────────────────────────────────────────

/**
 * A single menu item with an animated hover-highlight background.
 * The highlight uses a shared `layoutId` so it glides between items on mouse-over.
 */
export function AnimatedDropdownItem({
  children,
  icon,
  variant = "default",
  disabled,
  onClick,
  className,
}: AnimatedDropdownItemProps) {
  const { layoutId, activeId, setActiveId } = useDropdownContext();
  const itemId = useId();
  const shouldReduceMotion = useReducedMotion();

  const isActive = activeId === itemId;

  return (
    <Menu.Item
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2.5",
        "rounded-lg px-2.5 py-2 text-sm outline-none",
        "transition-colors duration-75",
        variant === "danger"
          ? "text-danger-foreground focus:text-danger-foreground"
          : "text-popover-foreground",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      onMouseEnter={() => setActiveId(itemId)}
      onFocus={() => setActiveId(itemId)}
      onMouseLeave={() => setActiveId(null)}
      onBlur={() => setActiveId(null)}
    >
      {/* Animated highlight — shared across all items in this dropdown instance */}
      <AnimatePresence>
        {isActive && (
          <motion.span
            layoutId={`${layoutId}-highlight`}
            className={cn(
              "absolute inset-0 rounded-lg",
              variant === "danger" ? "bg-danger" : "bg-accent",
            )}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                    // layout transition for the sliding effect
                    layout: { type: "spring", stiffness: 380, damping: 30 },
                  }
            }
          />
        )}
      </AnimatePresence>

      {/* Icon */}
      {icon && (
        <span className="relative z-10 shrink-0 [&_svg]:size-4 text-muted-foreground">
          {icon}
        </span>
      )}

      {/* Label */}
      <span className="relative z-10 flex-1">{children}</span>
    </Menu.Item>
  );
}

// ─── Separator ────────────────────────────────────────────────────────────────

/** A thin visual divider between groups of items. */
export function AnimatedDropdownSeparator({ className }: { className?: string }) {
  return (
    <Menu.Separator
      className={cn("my-1 h-px bg-border/60 mx-1", className)}
    />
  );
}
