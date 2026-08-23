"use client";

import { Tooltip } from "@base-ui/react/tooltip";
import {
  type CSSProperties,
  createContext,
  type FocusEventHandler,
  forwardRef,
  type KeyboardEventHandler,
  type PointerEventHandler,
  type ReactElement,
  type ReactNode,
  type Ref,
  type RefObject,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/sona-utils";

type FluidTooltipOrientation = "horizontal" | "vertical" | "auto";
type FluidTooltipSide = "top" | "right" | "bottom" | "left";
type FluidTooltipAlign = "start" | "center" | "end";
type FluidTooltipDirection = -1 | 0 | 1;

interface FluidTooltipPayload {
  id: string;
  contentRef: RefObject<ReactNode>;
  side: FluidTooltipSide;
  align: FluidTooltipAlign;
  sideOffset: number;
  showArrowRef: RefObject<boolean>;
  contentClassNameRef: RefObject<string | undefined>;
}

interface FluidTooltipGroupContextValue {
  handle: Tooltip.Handle<FluidTooltipPayload>;
  disabled: boolean;
  defaultSide: FluidTooltipSide;
  direction: FluidTooltipDirection;
  keyboardNavigation: boolean;
  registerPointerTarget: (element: HTMLElement) => void;
  registerKeyboardTarget: () => void;
}

interface FluidTooltipRootContextValue {
  id: string;
  contentRef: RefObject<ReactNode>;
  disabled: boolean;
  side?: FluidTooltipSide;
  align: FluidTooltipAlign;
  sideOffset: number;
  showArrowRef: RefObject<boolean>;
  contentClassNameRef: RefObject<string | undefined>;
}

const GroupContext = createContext<FluidTooltipGroupContextValue | null>(null);
const RootContext = createContext<FluidTooltipRootContextValue | null>(null);

const tokenStyle = {
  "--fluid-tooltip-surface": "var(--foreground)",
  "--fluid-tooltip-label": "var(--background)",
  "--fluid-tooltip-shadow": "rgb(0 0 0 / 0.28)",
} as CSSProperties;

function useGroupContext(component: string) {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error(`${component} must be used inside FluidTooltip.Group.`);
  }
  return context;
}

function useRootContext(component: string) {
  const context = useContext(RootContext);
  if (!context) {
    throw new Error(`${component} must be used inside FluidTooltip.Root.`);
  }
  return context;
}

export interface FluidTooltipGroupProps {
  /** Related tooltip roots rendered inside the group. */
  children: ReactNode;
  /** Axis used to calculate directional content entry. @default "auto" */
  orientation?: FluidTooltipOrientation;
  /** Delay before the first pointer tooltip opens, in milliseconds. @default 350 */
  openDelay?: number;
  /** Grace period before a pointer tooltip closes, in milliseconds. @default 100 */
  closeDelay?: number;
  /** Disables tooltip behavior for every trigger in the group. @default false */
  disabled?: boolean;
  /** Additional CSS classes for the positioned tooltip surface. @default undefined */
  className?: string;
}

export function FluidTooltipGroup({
  children,
  orientation = "auto",
  openDelay = 350,
  closeDelay = 100,
  disabled = false,
  className,
}: FluidTooltipGroupProps) {
  const handle = useMemo(() => Tooltip.createHandle<FluidTooltipPayload>(), []);
  const previousCenter = useRef<{ x: number; y: number } | null>(null);
  const [direction, setDirection] = useState<FluidTooltipDirection>(0);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);

  const context = useMemo<FluidTooltipGroupContextValue>(
    () => ({
      handle,
      disabled,
      defaultSide: orientation === "vertical" ? "right" : "top",
      direction,
      keyboardNavigation,
      registerPointerTarget(element) {
        const bounds = element.getBoundingClientRect();
        const center = {
          x: bounds.left + bounds.width / 2,
          y: bounds.top + bounds.height / 2,
        };
        const previous = previousCenter.current;

        if (!previous) {
          setDirection(0);
        } else {
          const deltaX = center.x - previous.x;
          const deltaY = center.y - previous.y;
          const resolvedAxis =
            orientation === "horizontal"
              ? "x"
              : orientation === "vertical"
                ? "y"
                : Math.abs(deltaX) >= Math.abs(deltaY)
                  ? "x"
                  : "y";
          const delta = resolvedAxis === "x" ? deltaX : deltaY;
          setDirection(delta === 0 ? 0 : delta > 0 ? 1 : -1);
        }

        previousCenter.current = center;
        setKeyboardNavigation(false);
      },
      registerKeyboardTarget() {
        previousCenter.current = null;
        setDirection(0);
        setKeyboardNavigation(true);
      },
    }),
    [disabled, direction, handle, keyboardNavigation, orientation],
  );

  return (
    <Tooltip.Provider
      delay={Math.max(0, openDelay)}
      closeDelay={Math.max(0, closeDelay)}
      timeout={50}
    >
      <GroupContext.Provider value={context}>{children}</GroupContext.Provider>

      <Tooltip.Root
        handle={handle}
        disabled={disabled}
        onOpenChange={(open) => {
          if (!open) {
            previousCenter.current = null;
            setDirection(0);
          }
        }}
      >
        {({ payload }) => (
          <Tooltip.Portal>
            {payload ? (
              <Tooltip.Positioner
                align={payload.align}
                className={cn(
                  "z-50 h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] transition-[top,left,right,bottom,transform] duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] data-instant:transition-none motion-reduce:transition-none",
                )}
                collisionPadding={8}
                side={payload.side}
                sideOffset={payload.sideOffset}
              >
                <Tooltip.Popup
                  className={cn(
                    "relative origin-[var(--transform-origin)] rounded-lg bg-[var(--fluid-tooltip-surface)] text-[12px] font-medium leading-none text-[var(--fluid-tooltip-label)] shadow-[0_8px_24px_-8px_var(--fluid-tooltip-shadow)]",
                    "h-[var(--popup-height,auto)] w-[var(--popup-width,auto)] max-w-[var(--available-width)] transition-[width,height,transform,opacity] duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-ending-style:duration-100 data-starting-style:scale-[0.96] data-starting-style:translate-y-1 data-starting-style:opacity-0 data-instant:transition-none motion-reduce:transition-none",
                    className,
                    payload.contentClassNameRef.current,
                  )}
                  style={tokenStyle}
                >
                  <Tooltip.Viewport
                    className={cn(
                      "relative box-border h-full w-full overflow-clip px-2 py-1",
                      "[&_[data-previous]]:w-[calc(var(--popup-width)-1rem)] [&_[data-previous]]:translate-x-0 [&_[data-previous]]:opacity-0 [&_[data-previous]]:pointer-events-none [&_[data-previous]]:transition-none",
                      "[&_[data-current]]:w-[calc(var(--popup-width)-1rem)] [&_[data-current]]:translate-x-0 [&_[data-current]]:opacity-100 [&_[data-current]]:transition-[translate,opacity] [&_[data-current]]:duration-[200ms,120ms]",
                      "data-[activation-direction~='left']:[&_[data-current][data-starting-style]]:-translate-x-2 data-[activation-direction~='right']:[&_[data-current][data-starting-style]]:translate-x-2",
                      "data-[activation-direction~='up']:[&_[data-current][data-starting-style]]:-translate-y-2 data-[activation-direction~='down']:[&_[data-current][data-starting-style]]:translate-y-2",
                      "data-[activation-direction~='left']:[&_[data-previous][data-ending-style]]:translate-x-2 data-[activation-direction~='right']:[&_[data-previous][data-ending-style]]:-translate-x-2",
                      "data-[activation-direction~='up']:[&_[data-previous][data-ending-style]]:translate-y-2 data-[activation-direction~='down']:[&_[data-previous][data-ending-style]]:-translate-y-2",
                      "[[data-instant]_&_[data-previous]]:transition-none [[data-instant]_&_[data-current]]:transition-none motion-reduce:[&_[data-current]]:transition-none motion-reduce:[&_[data-previous]]:transition-none",
                    )}
                  >
                    {payload.contentRef.current}
                  </Tooltip.Viewport>

                  {payload.showArrowRef.current ? (
                    <Tooltip.Arrow className="absolute size-2 rotate-45 bg-[var(--fluid-tooltip-surface)] data-[side=bottom]:-top-1 data-[side=left]:-right-1 data-[side=right]:-left-1 data-[side=top]:-bottom-1" />
                  ) : null}
                </Tooltip.Popup>
              </Tooltip.Positioner>
            ) : null}
          </Tooltip.Portal>
        )}
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export interface FluidTooltipRootProps {
  /** Stable identifier used to key directional content transitions. */
  id: string;
  /** Trigger and content parts associated with this tooltip. */
  children: ReactNode;
  /** Preferred side of the trigger. Overrides the group default when provided. @default undefined */
  side?: FluidTooltipSide;
  /** Alignment relative to the trigger. @default "center" */
  align?: FluidTooltipAlign;
  /** Distance between the trigger and tooltip, in pixels. @default 8 */
  sideOffset?: number;
  /** Disables this tooltip without disabling its trigger. @default false */
  disabled?: boolean;
}

export function FluidTooltipRoot({
  id,
  children,
  side,
  align = "center",
  sideOffset = 8,
  disabled = false,
}: FluidTooltipRootProps) {
  const contentRef = useRef<ReactNode>(null);
  const showArrowRef = useRef(true);
  const contentClassNameRef = useRef<string | undefined>(undefined);
  const context = useMemo<FluidTooltipRootContextValue>(
    () => ({
      id,
      contentRef,
      disabled,
      side,
      align,
      sideOffset,
      showArrowRef,
      contentClassNameRef,
    }),
    [align, disabled, id, side, sideOffset],
  );

  return (
    <RootContext.Provider value={context}>{children}</RootContext.Provider>
  );
}

export interface FluidTooltipTriggerProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  /** Existing button or link used as the actual trigger. */
  children: ReactElement;
  /** Uses the child element without introducing a wrapper. @default true */
  asChild?: boolean;
  /** Keeps the tooltip open when the trigger is activated. @default false */
  keepOpenOnClick?: boolean;
}

export const FluidTooltipTrigger = forwardRef<
  HTMLElement,
  FluidTooltipTriggerProps
>(function FluidTooltipTrigger(
  {
    children,
    asChild = true,
    keepOpenOnClick = false,
    onPointerEnter,
    onFocus,
    onKeyDown,
    ...props
  },
  ref,
) {
  const group = useGroupContext("FluidTooltip.Trigger");
  const root = useRootContext("FluidTooltip.Trigger");

  const payload: FluidTooltipPayload = {
    id: root.id,
    contentRef: root.contentRef,
    side: root.side ?? group.defaultSide,
    align: root.align,
    sideOffset: root.sideOffset,
    showArrowRef: root.showArrowRef,
    contentClassNameRef: root.contentClassNameRef,
  };

  const handlePointerEnter: PointerEventHandler<HTMLElement> = (event) => {
    if (event.pointerType !== "touch") {
      group.registerPointerTarget(event.currentTarget);
    }
    onPointerEnter?.(event);
  };
  const handleFocus: FocusEventHandler<HTMLElement> = (event) => {
    group.registerKeyboardTarget();
    onFocus?.(event);
  };
  const handleKeyDown: KeyboardEventHandler<HTMLElement> = (event) => {
    group.registerKeyboardTarget();
    onKeyDown?.(event);
  };

  return (
    <Tooltip.Trigger
      {...props}
      ref={ref as Ref<HTMLButtonElement>}
      closeOnClick={!keepOpenOnClick}
      disabled={group.disabled || root.disabled}
      handle={group.handle}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onPointerEnter={handlePointerEnter}
      payload={payload}
      render={asChild ? children : undefined}
    >
      {asChild ? undefined : children}
    </Tooltip.Trigger>
  );
});

export interface FluidTooltipContentProps {
  /** Short, non-interactive tooltip label. */
  children: ReactNode;
  /** Additional CSS classes for this tooltip's surface. @default undefined */
  className?: string;
  /** Shows the arrow connecting the surface to its trigger. @default true */
  showArrow?: boolean;
}

export function FluidTooltipContent({
  children,
  className,
  showArrow = true,
}: FluidTooltipContentProps) {
  const root = useRootContext("FluidTooltip.Content");
  useLayoutEffect(() => {
    root.contentRef.current = children;
    root.contentClassNameRef.current = className;
    root.showArrowRef.current = showArrow;
  }, [children, className, root, showArrow]);
  return null;
}

export const FluidTooltip = {
  Group: FluidTooltipGroup,
  Root: FluidTooltipRoot,
  Trigger: FluidTooltipTrigger,
  Content: FluidTooltipContent,
};

export default FluidTooltip;
