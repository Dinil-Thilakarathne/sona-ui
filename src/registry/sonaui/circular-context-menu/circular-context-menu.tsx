"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Children,
  cloneElement,
  createContext,
  type ReactElement,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/sona-utils";

type Point = { x: number; y: number };
export type CircularContextMenuPlacement = "top" | "right" | "bottom" | "left";

const PLACEMENT_ANGLES: Record<CircularContextMenuPlacement, number> = {
  top: -Math.PI / 2,
  right: 0,
  bottom: Math.PI / 2,
  left: Math.PI,
};

type ContextValue = {
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  contentId: string;
  disabled: boolean;
  itemRefs: React.MutableRefObject<Array<HTMLButtonElement | null>>;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CircularContext = createContext<ContextValue | null>(null);

function useCircularContext() {
  const context = useContext(CircularContext);
  if (!context) {
    throw new Error(
      "CircularContextMenu subcomponents must be used within Root.",
    );
  }
  return context;
}

function pointsFor(
  placement: CircularContextMenuPlacement,
  count: number,
  radius: number,
  spread: number,
) {
  const direction = PLACEMENT_ANGLES[placement];
  return Array.from({ length: count }, (_, index) => {
    const progress = count <= 1 ? 0.5 : index / (count - 1);
    const angle = direction + (progress - 0.5) * ((spread * Math.PI) / 180);
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
  });
}

/** Owns the selected anchor, open state, dismissal, and focus recovery. */
export interface CircularContextMenuRootProps {
  /** The Anchor and Content subcomponents. */
  children: ReactNode;
  /** Controlled open state. */
  open?: boolean;
  /** Initial uncontrolled open state. @default false */
  defaultOpen?: boolean;
  /** Called whenever the menu opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** Prevents opening the menu. @default false */
  disabled?: boolean;
}

function Root({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
}: CircularContextMenuRootProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const rootRef = useRef<HTMLSpanElement>(null);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const contentId = useId();
  const isOpen = open ?? internalOpen;
  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (disabled) return;
      if (open === undefined) setInternalOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [disabled, onOpenChange, open],
  );

  useEffect(() => {
    if (!isOpen) return;
    const dismiss = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !rootRef.current?.contains(target) &&
        !contentRef.current?.contains(target)
      )
        setOpen(false);
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      anchorRef.current?.focus();
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, setOpen]);

  return (
    <CircularContext.Provider
      value={{
        anchorRef,
        contentRef,
        contentId,
        disabled,
        itemRefs,
        open: isOpen,
        setOpen,
      }}
    >
      <span ref={rootRef} className="inline-flex">
        {children}
      </span>
    </CircularContext.Provider>
  );
}

/** The selected object that opens the contextual action arc. */
export interface CircularContextMenuAnchorProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Anchor content. */ children: ReactNode;
}
function Anchor({
  children,
  className,
  onClick,
  onKeyDown,
  ...props
}: CircularContextMenuAnchorProps) {
  const { anchorRef, contentId, disabled, itemRefs, open, setOpen } =
    useCircularContext();
  return (
    <button
      ref={anchorRef}
      type="button"
      aria-controls={contentId}
      aria-expanded={open}
      className={cn(
        "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(!open);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (
          (event.key === "ArrowDown" || event.key === "ArrowRight") &&
          !event.defaultPrevented
        ) {
          event.preventDefault();
          setOpen(true);
          requestAnimationFrame(() => itemRefs.current[0]?.focus());
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}

/** Positions a small action arc from a consumer-selected anchor direction. */
export interface CircularContextMenuContentProps {
  /** Action items. */ children: ReactNode /** Arc radius in pixels. @default 92 */;
  radius?: number /** Arc angle in degrees. @default 68 */;
  spread?: number /** Accessible menu label. @default "Context actions" */;
  /** Direction the action arc opens from its anchor. @default "right" */
  placement?: CircularContextMenuPlacement;
  "aria-label"?: string /** Additional CSS classes. */;
  className?: string;
}
function Content({
  children,
  radius = 92,
  spread = 68,
  placement = "right",
  "aria-label": ariaLabel = "Context actions",
  className,
}: CircularContextMenuContentProps) {
  const { anchorRef, contentId, contentRef, open } = useCircularContext();
  const [anchor, setAnchor] = useState<Point | null>(null);
  const reduce = useReducedMotion();
  const items = Children.toArray(children) as ReactElement[];
  const measure = useCallback(() => {
    const rect = anchorRef.current?.getBoundingClientRect();
    if (rect)
      setAnchor({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
  }, [anchorRef]);
  useLayoutEffect(() => {
    if (!open) return;
    measure();
    const observer = new ResizeObserver(measure);
    if (anchorRef.current) observer.observe(anchorRef.current);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [measure, open, anchorRef]);
  const points = pointsFor(placement, items.length, radius, spread);
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence initial={false}>
      {open && anchor && (
        <motion.div
          ref={contentRef}
          id={contentId}
          role="menu"
          aria-label={ariaLabel}
          className={cn("pointer-events-none fixed inset-0 z-50", className)}
        >
          {items.map((item, index) =>
            cloneElement(item, {
              __anchor: anchor,
              __index: index,
              __point: points[index],
              __reduce: reduce,
            } as never),
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/** One icon or compact action in the contextual arc. */
export interface CircularContextMenuItemProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    | "onAnimationEnd"
    | "onAnimationIteration"
    | "onAnimationStart"
    | "onDrag"
    | "onDragEnd"
    | "onDragStart"
  > {
  /** Icon or concise action content. */ children: ReactNode /** Called before the menu closes. */;
  onSelect?: () => void /** Marks the action destructive. @default false */;
  destructive?: boolean;
}
function Item({
  children,
  className,
  destructive = false,
  onClick,
  onKeyDown,
  onSelect,
  __index = 0,
  __anchor = { x: 0, y: 0 },
  __point = { x: 0, y: 0 },
  __reduce = false,
  ...props
}: CircularContextMenuItemProps & {
  __anchor?: Point;
  __index?: number;
  __point?: Point;
  __reduce?: boolean;
}) {
  const { anchorRef, itemRefs, setOpen } = useCircularContext();
  const index = __index;
  const point = __point;
  const reduce = __reduce;
  return (
    <motion.button
      ref={(node) => {
        itemRefs.current[index] = node;
      }}
      type="button"
      role="menuitem"
      className={cn(
        "pointer-events-auto absolute top-0 left-0 flex size-11 cursor-pointer items-center justify-center rounded-full border border-border bg-popover text-popover-foreground shadow-lg outline-none focus-visible:ring-1.5 focus-visible:ring-ring focus-visible:ring-offset-2",
        destructive && "text-destructive hover:border-destructive/45",
        className,
      )}
      initial={{
        opacity: 0,
        scale: 0.72,
        filter: "blur(4px)",
        x: __anchor.x - 22,
        y: __anchor.y - 22,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        x: __anchor.x - 22 + point.x,
        y: __anchor.y - 22 + point.y,
        transition: reduce
          ? { duration: 0 }
          : {
              type: "spring",
              stiffness: 480,
              damping: 34,
              mass: 0.7,
              delay: index * 0.035,
            },
      }}
      exit={{
        opacity: 0,
        scale: 0.72,
        filter: "blur(4px)",
        x: __anchor.x - 22,
        y: __anchor.y - 22,
        transition: reduce ? { duration: 0 } : { duration: 0.16 },
      }}
      whileHover={reduce ? undefined : { scale: 1.06 }}
      whileTap={reduce ? undefined : { scale: 0.94 }}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          onSelect?.();
          setOpen(false);
          anchorRef.current?.focus();
        }
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (
          ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(
            event.key,
          )
        ) {
          event.preventDefault();
          const delta =
            event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
          itemRefs.current[
            (index + delta + itemRefs.current.length) % itemRefs.current.length
          ]?.focus();
        }
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

const CircularContextMenu = { Root, Anchor, Content, Item };

export {
  Anchor as CircularContextMenuAnchor,
  Content as CircularContextMenuContent,
  Item as CircularContextMenuItem,
  Root as CircularContextMenuRoot,
};
export default CircularContextMenu;
