"use client";

import { PreviewCard } from "@base-ui/react/preview-card";
import { useReducedMotion } from "motion/react";
import {
  createContext,
  type ReactElement,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/sona-utils";

type CursorPoint = { x: number; y: number };
type CursorHoverCardSide = "top" | "right" | "bottom" | "left";
type CursorHoverCardAlign = "start" | "center" | "end";
export type CursorHoverCardReducedMotion = "user" | "always" | "never";

interface CursorHoverCardContextValue {
  cursorPoint: CursorPoint | null;
  pointerVelocity: number;
  shouldReduceMotion: boolean;
  setCursorPoint: (point: CursorPoint | null) => void;
  setPointerVelocity: (velocity: number) => void;
}

const CursorHoverCardContext =
  createContext<CursorHoverCardContextValue | null>(null);

function useCursorHoverCardContext(component: string) {
  const context = useContext(CursorHoverCardContext);
  if (!context) {
    throw new Error(`${component} must be used inside CursorHoverCard.Root.`);
  }
  return context;
}

/** Props for the state-owning cursor hover card root. */
export interface CursorHoverCardRootProps {
  /** Trigger and content parts associated with the card. */
  children: ReactNode;
  /** Whether the card is open when uncontrolled. @default false */
  defaultOpen?: boolean;
  /** Controlled open state. @default undefined */
  open?: boolean;
  /** Called whenever the card requests an open-state change. @default undefined */
  onOpenChange?: PreviewCard.Root.Props["onOpenChange"];
  /** Controls whether motion follows, forces, or ignores the user's reduced-motion preference. @default "user" */
  reducedMotion?: CursorHoverCardReducedMotion;
}

export function CursorHoverCardRoot({
  children,
  defaultOpen = false,
  open,
  onOpenChange,
  reducedMotion = "user",
}: CursorHoverCardRootProps) {
  const userPrefersReducedMotion = useReducedMotion();
  const shouldReduceMotion =
    reducedMotion === "always" ||
    (reducedMotion === "user" && userPrefersReducedMotion === true);
  const [cursorPoint, setCursorPoint] = useState<CursorPoint | null>(null);
  const [pointerVelocity, setPointerVelocity] = useState(0);
  const value = useMemo(
    () => ({
      cursorPoint,
      pointerVelocity,
      shouldReduceMotion,
      setCursorPoint,
      setPointerVelocity,
    }),
    [cursorPoint, pointerVelocity, shouldReduceMotion],
  );

  return (
    <CursorHoverCardContext.Provider value={value}>
      <PreviewCard.Root
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={(nextOpen, details) => {
          if (!nextOpen) {
            setCursorPoint(null);
            setPointerVelocity(0);
          }
          onOpenChange?.(nextOpen, details);
        }}
      >
        {children}
      </PreviewCard.Root>
    </CursorHoverCardContext.Provider>
  );
}

/** Props for the element that opens the cursor hover card. */
export interface CursorHoverCardTriggerProps
  extends Omit<PreviewCard.Trigger.Props, "children" | "render"> {
  /** Existing link or element used as the actual trigger. */
  children: ReactElement;
  /** Delay before opening from pointer or keyboard focus, in milliseconds. @default 300 */
  openDelay?: number;
  /** Grace period before closing, in milliseconds. @default 120 */
  closeDelay?: number;
}

export function CursorHoverCardTrigger({
  children,
  openDelay = 300,
  closeDelay = 120,
  onPointerMove,
  onPointerLeave,
  onFocus,
  ...props
}: CursorHoverCardTriggerProps) {
  const context = useCursorHoverCardContext("CursorHoverCard.Trigger");
  const frameRef = useRef<number | null>(null);
  const pointRef = useRef<CursorPoint | null>(null);
  const velocityRef = useRef(0);
  const previousPointRef = useRef<CursorPoint | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      if (settleTimerRef.current !== null) clearTimeout(settleTimerRef.current);
    },
    [],
  );

  const updatePointer: NonNullable<
    CursorHoverCardTriggerProps["onPointerMove"]
  > = (event) => {
    onPointerMove?.(event);
    if (event.defaultPrevented || event.pointerType === "touch") return;

    const nextPoint = { x: event.clientX, y: event.clientY };
    const previousPoint = previousPointRef.current;
    const previousTime = previousTimeRef.current;
    pointRef.current = nextPoint;
    previousPointRef.current = nextPoint;
    previousTimeRef.current = event.timeStamp;

    if (previousPoint && previousTime !== null) {
      const deltaX = nextPoint.x - previousPoint.x;
      const deltaY = nextPoint.y - previousPoint.y;
      const elapsed = Math.max(1, event.timeStamp - previousTime);
      const speed = Math.hypot(deltaX, deltaY) / elapsed;
      velocityRef.current = Math.sign(deltaX) * speed;
      if (settleTimerRef.current !== null) clearTimeout(settleTimerRef.current);
      settleTimerRef.current = setTimeout(() => {
        velocityRef.current = 0;
        context.setPointerVelocity(0);
      }, 80);
    }
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      context.setCursorPoint(pointRef.current);
      context.setPointerVelocity(velocityRef.current);
    });
  };

  return (
    <PreviewCard.Trigger
      {...props}
      delay={Math.max(0, openDelay)}
      closeDelay={Math.max(0, closeDelay)}
      onFocus={(event) => {
        context.setCursorPoint(null);
        context.setPointerVelocity(0);
        onFocus?.(event);
      }}
      onPointerLeave={(event) => {
        if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
        pointRef.current = null;
        previousPointRef.current = null;
        previousTimeRef.current = null;
        velocityRef.current = 0;
        if (settleTimerRef.current !== null)
          clearTimeout(settleTimerRef.current);
        settleTimerRef.current = null;
        context.setPointerVelocity(0);
        onPointerLeave?.(event);
      }}
      onPointerMove={updatePointer}
      render={children}
    />
  );
}

/** Props for the floating card surface. */
export interface CursorHoverCardContentProps {
  /** Rich preview content rendered inside the card. */
  children: ReactNode;
  /** Preferred side of the cursor or focused trigger. @default "top" */
  side?: CursorHoverCardSide;
  /** Alignment relative to the cursor or focused trigger. @default "center" */
  align?: CursorHoverCardAlign;
  /** Fixed distance between the cursor and card, in pixels. @default 14 */
  cursorOffset?: number;
  /** Maximum directional tilt while the pointer moves, in degrees. @default 3 */
  maxRotation?: number;
  /** Space kept between the card and collision boundary, in pixels. @default 8 */
  collisionPadding?: number;
  /** Additional CSS classes for the card surface. @default undefined */
  className?: string;
}

export function CursorHoverCardContent({
  children,
  side = "top",
  align = "center",
  cursorOffset = 14,
  maxRotation = 3,
  collisionPadding = 8,
  className,
}: CursorHoverCardContentProps) {
  const context = useCursorHoverCardContext("CursorHoverCard.Content");
  const { shouldReduceMotion } = context;
  const anchor = useMemo(() => {
    if (!context.cursorPoint) return undefined;
    const { x, y } = context.cursorPoint;
    return {
      getBoundingClientRect: () => new DOMRect(x, y, 0, 0),
    };
  }, [context.cursorPoint]);

  return (
    <PreviewCard.Portal>
      <PreviewCard.Positioner
        anchor={anchor}
        align={align}
        collisionAvoidance={{ side: "flip", align: "shift" }}
        collisionPadding={Math.max(0, collisionPadding)}
        positionMethod="fixed"
        side={side}
        sideOffset={Math.max(0, cursorOffset)}
        className={cn(
          "z-9999 h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)]",
          shouldReduceMotion
            ? "!transition-none"
            : "transition-transform duration-100 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] data-instant:transition-none",
        )}
      >
        <PreviewCard.Popup
          className={cn(
            "relative origin-[var(--transform-origin)] rounded-xl bg-popover text-popover-foreground shadow-[0_0_0_1px_rgb(0_0_0/0.08),0_12px_36px_-12px_rgb(0_0_0/0.3)] outline-none",
            shouldReduceMotion
              ? "!transition-none data-ending-style:scale-100 data-ending-style:opacity-100 data-ending-style:blur-none data-starting-style:scale-100 data-starting-style:opacity-100 data-starting-style:blur-none"
              : "will-change-transform transition-[scale,rotate,opacity,filter] duration-240 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-ending-style:scale-[0.985] data-ending-style:opacity-0 data-ending-style:blur-[2px] data-ending-style:duration-140 data-starting-style:scale-[0.94] data-starting-style:opacity-0 data-starting-style:blur-[5px]",
            className,
          )}
          style={{
            rotate: shouldReduceMotion
              ? "0deg"
              : `${Math.max(-1, Math.min(1, context.pointerVelocity / 1.25)) * Math.min(12, Math.max(0, maxRotation))}deg`,
          }}
        >
          {children}
        </PreviewCard.Popup>
      </PreviewCard.Positioner>
    </PreviewCard.Portal>
  );
}

export const CursorHoverCard = {
  Root: CursorHoverCardRoot,
  Trigger: CursorHoverCardTrigger,
  Content: CursorHoverCardContent,
};

export default CursorHoverCard;
