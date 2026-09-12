"use client";

import * as SwipeActionsPrimitive from "@ncdai/react-swipe-actions";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/sona-utils";

export type SwipeActionRowSide = SwipeActionsPrimitive.SwipeSide;
export type SwipeActionRowState = SwipeActionsPrimitive.SwipeState;

export interface SwipeActionRowRootProps
  extends ComponentProps<typeof SwipeActionsPrimitive.SwipeRoot> {
  /** Rows coordinated so only one can remain open. */
  children?: ReactNode;
}

export interface SwipeActionRowProps
  extends ComponentProps<typeof SwipeActionsPrimitive.SwipeItem> {
  /** Fraction of the action strip crossed before the row opens. @default 0.5 */
  threshold?: number;
  /** Seconds of release velocity projected onto the resting position. @default 0.2 */
  velocityFactor?: number;
  /** Fraction of row width crossed before a full-swipe action arms. @default 0.5 */
  fullSwipeThreshold?: number;
  /** Prevents pointer and keyboard gesture interaction. @default false */
  disabled?: boolean;
  /** Closes an open row when the page scrolls. @default false */
  closeOnScroll?: boolean;
  /** Called when the row becomes closed, left-open, or right-open. @default undefined */
  onOpenChange?: (state: SwipeActionRowState) => void;
}

export type SwipeActionRowItemProps = SwipeActionRowProps;

export interface SwipeActionRowActionsProps
  extends ComponentProps<typeof SwipeActionsPrimitive.SwipeActions> {
  /** Physical side where this action strip is revealed. */
  side: SwipeActionRowSide;
}

export interface SwipeActionRowActionProps
  extends ComponentProps<typeof SwipeActionsPrimitive.SwipeAction> {
  /** Action label, icon, or composed button content. */
  children?: ReactNode;
  /** Closes the row after the click handler runs. @default true */
  closeOnClick?: boolean;
  /** Runs this action when the row crosses its full-swipe threshold. @default false */
  fullSwipe?: boolean;
  /** Semantic visual treatment for the action. @default "default" */
  variant?: "default" | "destructive";
}

export interface SwipeActionRowContentProps
  extends ComponentProps<typeof SwipeActionsPrimitive.SwipeContent> {
  /** Opaque foreground content that moves to reveal the action strips. */
  children?: ReactNode;
}

/** Coordinates sibling rows so opening one closes the previously open row. */
export function SwipeActionRowRoot({
  className,
  ...props
}: SwipeActionRowRootProps) {
  return (
    <SwipeActionsPrimitive.SwipeRoot
      className={cn("relative", className)}
      {...props}
    />
  );
}

/** Owns the gesture, open state, keyboard behavior, and dismissal lifecycle. */
export function SwipeActionRowItem({
  className,
  ...props
}: SwipeActionRowItemProps) {
  return (
    <SwipeActionsPrimitive.SwipeItem
      className={cn("group/swipe-row", className)}
      {...props}
    />
  );
}

/** Positions and measures a strip of actions behind the row content. */
export function SwipeActionRowActions({
  className,
  ...props
}: SwipeActionRowActionsProps) {
  return (
    <SwipeActionsPrimitive.SwipeActions
      className={cn("items-stretch overflow-hidden", className)}
      {...props}
    />
  );
}

/** A contextual action that can optionally own the side's full swipe. */
export function SwipeActionRowAction({
  children,
  className,
  variant = "default",
  ...props
}: SwipeActionRowActionProps) {
  return (
    <SwipeActionsPrimitive.SwipeAction
      className={cn(
        "flex min-w-20 select-none flex-col items-center justify-center gap-1.5 whitespace-nowrap px-4 font-medium text-xs",
        "bg-secondary text-secondary-foreground transition-[filter] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-foreground",
        "data-armed:brightness-90 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        variant === "destructive" && "bg-destructive text-white",
        className,
      )}
      {...props}
    >
      {children}
    </SwipeActionsPrimitive.SwipeAction>
  );
}

/** The opaque foreground surface that tracks pointer and touch movement. */
export function SwipeActionRowContent({
  className,
  ...props
}: SwipeActionRowContentProps) {
  return (
    <SwipeActionsPrimitive.SwipeContent
      className={cn("bg-background data-dragging:cursor-grabbing", className)}
      {...props}
    />
  );
}

export const SwipeActionRow = {
  Root: SwipeActionRowRoot,
  Item: SwipeActionRowItem,
  Actions: SwipeActionRowActions,
  Action: SwipeActionRowAction,
  Content: SwipeActionRowContent,
};

export default SwipeActionRow;
