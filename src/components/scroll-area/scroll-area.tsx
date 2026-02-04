import * as React from "react";
import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";

import { cn } from "@/lib/utils";

import "./scroll-area.css";

type FadeEdge = "top" | "bottom" | "left" | "right" | "x" | "y";
type FadeEdges = boolean | FadeEdge | FadeEdge[];

function parseFadeEdges(fadeEdges: FadeEdges): {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
} {
  if (fadeEdges === true) {
    return { top: true, bottom: true, left: true, right: true };
  }
  if (fadeEdges === false) {
    return { top: false, bottom: false, left: false, right: false };
  }

  const edges = Array.isArray(fadeEdges) ? fadeEdges : [fadeEdges];
  const result = { top: false, bottom: false, left: false, right: false };

  for (const edge of edges) {
    if (edge === "x") {
      result.left = true;
      result.right = true;
    } else if (edge === "y") {
      result.top = true;
      result.bottom = true;
    } else {
      result[edge] = true;
    }
  }

  return result;
}

type OverscrollBehavior = "auto" | "contain" | "none";

interface ScrollAreaProps extends BaseScrollArea.Root.Props {
  fadeEdges?: FadeEdges;
  scrollbarGutter?: boolean;
  persistScrollbar?: boolean;
  hideScrollbar?: boolean;
  nativeScroll?: boolean;
  overscrollBehavior?: OverscrollBehavior;
  /** Ref callback for the scrollable viewport element. Useful for virtualization. */
  viewportRef?: (element: HTMLDivElement | null) => void;
  /** Additional className for the viewport element */
  viewportClassName?: string;
}

function ScrollArea({
  className,
  children,
  fadeEdges = false,
  scrollbarGutter = false,
  persistScrollbar = false,
  hideScrollbar = false,
  nativeScroll = false,
  overscrollBehavior = "contain",
  viewportRef,
  viewportClassName,
  ...props
}: ScrollAreaProps) {
  if (process.env.NODE_ENV !== "production") {
    if (persistScrollbar && hideScrollbar) {
      console.error(
        "ScrollArea: `persistScrollbar` and `hideScrollbar` cannot be used together.",
      );
    }
    if (nativeScroll && persistScrollbar) {
      console.error(
        "ScrollArea: `persistScrollbar` is not supported with `nativeScroll`.",
      );
    }
  }

  if (nativeScroll) {
    // NativeScrollArea only accepts string className, not the function variant from Base UI
    const nativeClassName =
      typeof className === "string" ? className : undefined;
    return (
      <NativeScrollArea
        ref={viewportRef}
        className={nativeClassName}
        viewportClassName={viewportClassName}
        fadeEdges={fadeEdges}
        hideScrollbar={hideScrollbar}
        scrollbarGutter={scrollbarGutter}
        overscrollBehavior={overscrollBehavior}
      >
        {children}
      </NativeScrollArea>
    );
  }

  const fade = parseFadeEdges(fadeEdges);
  const hasFade = fade.top || fade.bottom || fade.left || fade.right;

  return (
    <BaseScrollArea.Root
      data-slot="scroll-area"
      className={cn("flex size-full min-h-0 flex-col", className)}
      {...props}
    >
      <BaseScrollArea.Viewport
        ref={viewportRef}
        data-slot="scroll-area-viewport"
        className={cn(
          "h-full rounded-[inherit]",
          "focus-visible:outline-ring/50 outline-0 outline-offset-0 outline-transparent transition-[outline-width,outline-offset,outline-color] duration-100 ease-out outline-solid focus-visible:outline-2 focus-visible:outline-offset-2",
          hasFade && "[--scroll-fade-size:1.5rem]",
          fade.top &&
            "mask-t-from-[calc(100%-min(var(--scroll-fade-size),var(--scroll-area-overflow-y-start,0px)))]",
          fade.bottom &&
            "mask-b-from-[calc(100%-min(var(--scroll-fade-size),var(--scroll-area-overflow-y-end,var(--scroll-fade-size))))]",
          fade.left &&
            "mask-l-from-[calc(100%-min(var(--scroll-fade-size),var(--scroll-area-overflow-x-start,0px)))]",
          fade.right &&
            "mask-r-from-[calc(100%-min(var(--scroll-fade-size),var(--scroll-area-overflow-x-end,var(--scroll-fade-size))))]",
          scrollbarGutter &&
            "data-has-overflow-x:pb-2.5 data-has-overflow-y:pe-2.5",
          overscrollBehavior === "contain" && "overscroll-contain",
          overscrollBehavior === "none" && "overscroll-none",
          viewportClassName,
        )}
      >
        {children}
      </BaseScrollArea.Viewport>
      {!hideScrollbar && (
        <>
          <ScrollBar orientation="vertical" persist={persistScrollbar} />
          <ScrollBar orientation="horizontal" persist={persistScrollbar} />
          <BaseScrollArea.Corner />
        </>
      )}
    </BaseScrollArea.Root>
  );
}

function ScrollBar({
  className,
  persist = false,
  ...props
}: BaseScrollArea.Scrollbar.Props & { persist?: boolean }) {
  return (
    <BaseScrollArea.Scrollbar
      data-slot="scroll-area-scrollbar"
      className={cn(
        "m-1 flex select-none",
        !persist &&
          "opacity-0 transition-opacity delay-200 data-hovering:opacity-100 data-hovering:delay-0 data-hovering:duration-100 data-scrolling:opacity-100 data-scrolling:delay-0 data-scrolling:duration-100",
        "data-[orientation=vertical]:w-1.5",
        "data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:flex-col",
        className,
      )}
      {...props}
    >
      <BaseScrollArea.Thumb
        data-slot="scroll-area-thumb"
        className="bg-scrollbar/50 hover:bg-scrollbar relative flex-1 rounded-full"
      />
    </BaseScrollArea.Scrollbar>
  );
}

/**
 * Native scroll implementation using CSS scroll-driven animations for fade edges.
 * Uses browser's native scrolling with styled scrollbars.
 * Fade edges are animated based on scroll position (Chrome 115+, static fallback elsewhere).
 */
function NativeScrollArea({
  className,
  viewportClassName,
  children,
  fadeEdges = false,
  hideScrollbar = false,
  scrollbarGutter = false,
  overscrollBehavior,
  ref,
  style,
  ...props
}: Omit<
  React.ComponentProps<"div">,
  "onScroll" | "onScrollCapture" | "onWheel" | "onWheelCapture"
> & {
  fadeEdges?: FadeEdges;
  hideScrollbar?: boolean;
  scrollbarGutter?: boolean;
  overscrollBehavior?: OverscrollBehavior;
  viewportClassName?: string;
  ref?: (element: HTMLDivElement | null) => void;
}) {
  const fade = parseFadeEdges(fadeEdges);
  const hasFade = fade.top || fade.bottom || fade.left || fade.right;
  const hasVerticalFade = fade.top || fade.bottom;
  const hasHorizontalFade = fade.left || fade.right;

  // Build animation styles for scroll-driven fade
  const animationStyle: React.CSSProperties | undefined = hasFade
    ? {
        animationName: [
          hasVerticalFade && "scroll-fade-y",
          hasHorizontalFade && "scroll-fade-x",
        ]
          .filter(Boolean)
          .join(", "),
        animationTimeline: [
          hasVerticalFade && "scroll(y self)",
          hasHorizontalFade && "scroll(x self)",
        ]
          .filter(Boolean)
          .join(", "),
        animationTimingFunction: "linear",
        animationFillMode: "both",
      }
    : undefined;

  return (
    <div
      ref={ref}
      data-slot="scroll-area"
      data-native-scroll
      className={cn(
        "size-full min-h-0 overflow-auto rounded-[inherit]",
        "focus-visible:outline-ring/50 outline-0 outline-offset-0 outline-transparent transition-[outline-width,outline-offset,outline-color] duration-100 ease-out outline-solid focus-visible:outline-2 focus-visible:outline-offset-2",
        hasFade && "[--scroll-fade-size:1.5rem]",
        // Native scroll uses scroll-driven animation CSS variables
        // Fallbacks: top/left default to hidden (at start), bottom/right default to visible (more content)
        fade.top &&
          "supports-[animation-timeline:scroll()]:mask-t-from-[calc(100%-var(--scroll-fade-top))]",
        fade.bottom &&
          "supports-[animation-timeline:scroll()]:mask-b-from-[calc(100%-var(--scroll-fade-bottom))]",
        fade.left &&
          "supports-[animation-timeline:scroll()]:mask-l-from-[calc(100%-var(--scroll-fade-left))]",
        fade.right &&
          "supports-[animation-timeline:scroll()]:mask-r-from-[calc(100%-var(--scroll-fade-right))]",
        hideScrollbar ? "[scrollbar-width:none]" : "[scrollbar-width:thin]",
        scrollbarGutter && "[scrollbar-gutter:stable]",
        "[scrollbar-color:var(--color-scrollbar)_transparent]",
        overscrollBehavior === "contain" && "overscroll-contain",
        overscrollBehavior === "none" && "overscroll-none",
        className,
        viewportClassName,
      )}
      style={{ ...animationStyle, ...style }}
      tabIndex={0}
      {...props}
    >
      {children}
    </div>
  );
}

export { ScrollArea };
export type { ScrollAreaProps, FadeEdges, FadeEdge, OverscrollBehavior };
