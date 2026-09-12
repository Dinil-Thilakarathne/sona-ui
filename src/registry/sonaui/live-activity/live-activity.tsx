"use client";

import {
  animate,
  type MotionValue,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import {
  type ComponentPropsWithoutRef,
  createContext,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/sona-utils";

type View = "compact" | "expanded";
type Size = { width: number; height: number };
type Point = { x: number; y: number };
const emptySize: Size = { width: 0, height: 0 };
const spring = {
  type: "spring",
  stiffness: 380,
  damping: 38,
  mass: 1,
} as const;
const clamp = (value: number) => Math.min(1, Math.max(0, value));
const interpolate = (from: number, to: number, progress: number) =>
  from + (to - from) * clamp(progress);

export interface LiveActivityProps extends ComponentPropsWithoutRef<"div"> {
  /** The composed activity surface and views. */
  children: ReactNode;
  /** Controlled expansion state. @default undefined */
  expanded?: boolean;
  /** Initial uncontrolled expansion state. @default false */
  defaultExpanded?: boolean;
  /** Called when a control or gesture requests a state change. @default undefined */
  onExpandedChange?: (expanded: boolean) => void;
  /** Direction of growth and the opening touch gesture. @default "down" */
  direction?: "down" | "up";
  /** Horizontal edge or center kept anchored during resizing. @default "center" */
  align?: "start" | "center" | "end";
  /** Enable touch dragging on Trigger and Handle, or disable gestures. @default "touch" */
  gestures?: "touch" | false;
  /** Respect reduced motion automatically, or disable all transitions. @default "auto" */
  motion?: "auto" | "none";
}

type ActivityContext = {
  expanded: boolean;
  direction: "down" | "up";
  align: "start" | "center" | "end";
  gestures: "touch" | false;
  reduced: boolean;
  progress: MotionValue<number>;
  width: number;
  sizes: Record<View, Size>;
  offsets: Record<string, Partial<Record<View, Point>>>;
  panelId: string;
  rootRef: React.RefObject<HTMLDivElement | null>;
  views: React.RefObject<Record<View, HTMLDivElement | null>>;
  register: (id: string, view: View, node: HTMLSpanElement | null) => void;
  measure: () => void;
  request: (next: boolean, immediate?: boolean) => void;
  settle: (next: boolean, velocity?: number) => void;
};
const Context = createContext<ActivityContext | null>(null);
const ViewContext = createContext<View | null>(null);
function useActivity() {
  const value = useContext(Context);
  if (!value)
    throw new Error("LiveActivity parts must be inside LiveActivity.Root.");
  return value;
}

// offset coordinates exclude animated transforms, so measurement never feeds
// the current animation back into its own destination.
function position(node: HTMLElement, boundary: HTMLElement): Point {
  let x = 0;
  let y = 0;
  let current: HTMLElement | null = node;
  while (current && current !== boundary) {
    x += current.offsetLeft;
    y += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

export function LiveActivityRoot({
  children,
  expanded: controlled,
  defaultExpanded = false,
  onExpandedChange,
  direction = "down",
  align = "center",
  gestures = "touch",
  motion: motionPreference = "auto",
  className,
  style,
  ...props
}: LiveActivityProps) {
  const [internal, setInternal] = useState(defaultExpanded);
  const expanded = controlled ?? internal;
  const prefersReducedMotion = useReducedMotion();
  const reduced = Boolean(prefersReducedMotion) || motionPreference === "none";
  const progress = useMotionValue(expanded ? 1 : 0);
  const rootRef = useRef<HTMLDivElement>(null);
  const views = useRef<Record<View, HTMLDivElement | null>>({
    compact: null,
    expanded: null,
  });
  const shared = useRef(
    new Map<string, Partial<Record<View, HTMLSpanElement>>>(),
  );
  const observer = useRef<ResizeObserver | null>(null);
  const [width, setWidth] = useState(0);
  const [sizes, setSizes] = useState<Record<View, Size>>({
    compact: emptySize,
    expanded: emptySize,
  });
  const [offsets, setOffsets] = useState<ActivityContext["offsets"]>({});
  const panelId = useId();
  const immediate = useRef(false);
  const previous = useRef(expanded);
  const reservedHeight = useMotionValue(0);
  const reservedHeightReady = useRef(false);

  const measure = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    setWidth(root.clientWidth);
    const nextSizes = { compact: emptySize, expanded: emptySize };
    for (const view of ["compact", "expanded"] as const) {
      const node = views.current[view];
      if (node)
        nextSizes[view] = {
          width: node.offsetWidth,
          height: node.offsetHeight,
        };
    }
    setSizes((old) =>
      JSON.stringify(old) === JSON.stringify(nextSizes) ? old : nextSizes,
    );
    const nextOffsets: ActivityContext["offsets"] = {};
    shared.current.forEach((pair, id) => {
      nextOffsets[id] = {};
      for (const view of ["compact", "expanded"] as const) {
        const node = pair[view];
        const boundary = views.current[view];
        if (node && boundary) nextOffsets[id][view] = position(node, boundary);
      }
    });
    setOffsets((old) =>
      JSON.stringify(old) === JSON.stringify(nextOffsets) ? old : nextOffsets,
    );
  }, []);

  const register = useCallback(
    (id: string, view: View, node: HTMLSpanElement | null) => {
      const pair = shared.current.get(id) ?? {};
      if (pair[view]) observer.current?.unobserve(pair[view]);
      if (node) {
        pair[view] = node;
        observer.current?.observe(node);
      } else delete pair[view];
      if (pair.compact || pair.expanded) shared.current.set(id, pair);
      else shared.current.delete(id);
    },
    [],
  );

  useLayoutEffect(() => {
    const resize = new ResizeObserver(measure);
    observer.current = resize;
    if (rootRef.current) resize.observe(rootRef.current);
    for (const node of Object.values(views.current))
      if (node) resize.observe(node);
    shared.current.forEach((pair) => {
      for (const node of Object.values(pair)) resize.observe(node);
    });
    measure();
    return () => {
      resize.disconnect();
      observer.current = null;
      progress.stop();
    };
  }, [measure, progress]);

  const settle = useCallback(
    (next: boolean, velocity = 0) => {
      progress.stop();
      if (reduced || immediate.current) progress.jump(next ? 1 : 0);
      else animate(progress, next ? 1 : 0, { ...spring, velocity });
      immediate.current = false;
    },
    [progress, reduced],
  );

  useLayoutEffect(() => {
    settle(expanded);
    if (previous.current !== expanded) {
      const outgoing = views.current[expanded ? "compact" : "expanded"];
      if (outgoing?.contains(document.activeElement)) {
        const incoming = views.current[expanded ? "expanded" : "compact"];
        const target = incoming?.querySelector<HTMLElement>(
          'button:not(:disabled), a[href], input:not(:disabled), [tabindex="0"]',
        );
        (target ?? incoming)?.focus({ preventScroll: true });
      }
    }
    previous.current = expanded;
  }, [expanded, settle]);

  useLayoutEffect(() => {
    const next = sizes.compact.height;
    if (!next) return;
    if (!reservedHeightReady.current || reduced) {
      reservedHeight.stop();
      reservedHeight.jump(next);
      reservedHeightReady.current = true;
      return;
    }
    animate(reservedHeight, next, spring);
  }, [reduced, reservedHeight, sizes.compact.height]);

  const request = (next: boolean, instantly = false) => {
    immediate.current = instantly;
    if (next !== expanded) {
      if (controlled === undefined) setInternal(next);
      onExpandedChange?.(next);
    }
    // Controlled consumers may decline the request. Settle to the accepted
    // state; a subsequent prop change retargets the same motion value.
    settle(controlled === undefined ? next : expanded);
  };

  return (
    <Context.Provider
      value={{
        expanded,
        direction,
        align,
        gestures,
        reduced,
        progress,
        width,
        sizes,
        offsets,
        panelId,
        rootRef,
        views,
        register,
        measure,
        request,
        settle,
      }}
    >
      <motion.div
        {...(props as ComponentPropsWithoutRef<typeof motion.div>)}
        ref={rootRef}
        data-slot="live-activity"
        data-state={expanded ? "expanded" : "compact"}
        data-direction={direction}
        className={cn("relative w-full", className)}
        style={{ ...style, height: reservedHeight }}
      >
        {children}
      </motion.div>
    </Context.Provider>
  );
}

export interface LiveActivitySurfaceProps
  extends ComponentPropsWithoutRef<"div"> {
  /** Composed compact and expanded views. */
  children: ReactNode;
}

export function LiveActivitySurface({
  children,
  className,
  style,
  onKeyDown,
  ...props
}: LiveActivitySurfaceProps) {
  const ctx = useActivity();
  const width = useMotionValue(0);
  const height = useMotionValue(0);
  const dimensionsReady = useRef(false);

  useLayoutEffect(() => {
    const updateDimensions = (progress: number, contentResize: boolean) => {
      const nextWidth = interpolate(
        ctx.sizes.compact.width,
        ctx.sizes.expanded.width,
        progress,
      );
      const nextHeight = interpolate(
        ctx.sizes.compact.height,
        ctx.sizes.expanded.height,
        progress,
      );
      if (!nextWidth || !nextHeight) return;

      const atRest = progress <= 0.001 || progress >= 0.999;
      if (!dimensionsReady.current || ctx.reduced) {
        width.stop();
        height.stop();
        width.jump(nextWidth);
        height.jump(nextHeight);
        dimensionsReady.current = true;
      } else if (contentResize && atRest) {
        animate(width, nextWidth, spring);
        animate(height, nextHeight, spring);
      } else {
        // Expansion and touch dragging remain tied directly to the shared
        // progress value. Any active resize spring is interrupted here.
        width.stop();
        height.stop();
        width.jump(nextWidth);
        height.jump(nextHeight);
      }
    };

    const unsubscribe = ctx.progress.on("change", (progress) => {
      updateDimensions(progress, false);
    });
    updateDimensions(ctx.progress.get(), true);
    return unsubscribe;
  }, [
    ctx.progress,
    ctx.reduced,
    ctx.sizes.compact.height,
    ctx.sizes.compact.width,
    ctx.sizes.expanded.height,
    ctx.sizes.expanded.width,
    height,
    width,
  ]);
  return (
    <motion.div
      {...(props as ComponentPropsWithoutRef<typeof motion.div>)}
      data-slot="live-activity-anchor"
      className="absolute inset-x-0"
      style={{
        [ctx.direction === "down" ? "top" : "bottom"]: 0,
        display: "flex",
        justifyContent:
          ctx.align === "center"
            ? "center"
            : ctx.align === "start"
              ? "flex-start"
              : "flex-end",
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented && event.key === "Escape" && ctx.expanded) {
          event.preventDefault();
          event.stopPropagation();
          ctx.request(false, true);
        }
      }}
    >
      <motion.div
        data-slot="live-activity-surface"
        data-state={ctx.expanded ? "expanded" : "compact"}
        className={cn(
          "relative isolate overflow-hidden rounded-3xl bg-background text-foreground",
          className,
        )}
        style={{ ...style, width, height, maxWidth: "100%" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function ActivityView({
  view,
  className,
  style,
  children,
  ...props
}: ComponentPropsWithoutRef<"div"> & { view: View }) {
  const ctx = useActivity();
  const active = ctx.expanded === (view === "expanded");
  const opacity = useTransform(ctx.progress, (p) =>
    view === "expanded" ? clamp(p) : 1 - clamp(p),
  );
  const attach = useCallback(
    (node: HTMLDivElement | null) => {
      ctx.views.current[view] = node;
    },
    [ctx.views, view],
  );
  useLayoutEffect(ctx.measure);
  return (
    <ViewContext.Provider value={view}>
      <motion.div
        {...(props as ComponentPropsWithoutRef<typeof motion.div>)}
        ref={attach}
        id={view === "expanded" ? ctx.panelId : props.id}
        data-slot={`live-activity-${view}`}
        inert={!active}
        aria-hidden={!active}
        tabIndex={-1}
        className={cn("absolute flow-root w-max", className)}
        style={{
          ...style,
          opacity,
          maxWidth: ctx.width || "100vw",
          [ctx.direction === "down" ? "top" : "bottom"]: 0,
          insetInlineStart:
            ctx.align === "end"
              ? undefined
              : ctx.align === "center"
                ? "50%"
                : 0,
          insetInlineEnd: ctx.align === "end" ? 0 : undefined,
          x: ctx.align === "center" ? "-50%" : 0,
          pointerEvents: active ? "auto" : "none",
        }}
      >
        {children}
      </motion.div>
    </ViewContext.Provider>
  );
}

export function LiveActivityCompact(props: ComponentPropsWithoutRef<"div">) {
  return <ActivityView {...props} view="compact" />;
}
export function LiveActivityExpanded(props: ComponentPropsWithoutRef<"div">) {
  return <ActivityView {...props} view="expanded" />;
}

export interface LiveActivitySharedProps
  extends Omit<ComponentPropsWithoutRef<"span">, "id"> {
  /** Matching visual identity, unique within each view of this Root. */
  id: string;
}

export function LiveActivityShared({
  id,
  className,
  style,
  ...props
}: LiveActivitySharedProps) {
  const ctx = useActivity();
  const view = useContext(ViewContext);
  if (!view)
    throw new Error("LiveActivity.Shared must be inside Compact or Expanded.");
  const pair = ctx.offsets[id];
  const factor = ctx.align === "center" ? 0.5 : ctx.align === "end" ? 1 : 0;
  const rtl = ctx.rootRef.current
    ? getComputedStyle(ctx.rootRef.current).direction === "rtl"
    : false;
  const horizontalAnchor = rtl ? 1 - factor : factor;
  const dx =
    pair?.compact && pair.expanded
      ? pair.expanded.x -
        pair.compact.x +
        (ctx.sizes.compact.width - ctx.sizes.expanded.width) * horizontalAnchor
      : 0;
  const dy =
    pair?.compact && pair.expanded
      ? pair.expanded.y -
        pair.compact.y +
        (ctx.direction === "up"
          ? ctx.sizes.compact.height - ctx.sizes.expanded.height
          : 0)
      : 0;
  const x = useTransform(
    ctx.progress,
    (p) => dx * (clamp(p) - (view === "expanded" ? 1 : 0)),
  );
  const y = useTransform(
    ctx.progress,
    (p) => dy * (clamp(p) - (view === "expanded" ? 1 : 0)),
  );
  const attach = useCallback(
    (node: HTMLSpanElement | null) => ctx.register(id, view, node),
    [ctx.register, id, view],
  );
  return (
    <motion.span
      {...(props as ComponentPropsWithoutRef<typeof motion.span>)}
      ref={attach}
      data-slot="live-activity-shared"
      data-shared-id={id}
      className={cn("relative inline-block", className)}
      style={{ ...style, x, y }}
    />
  );
}

function useGesture() {
  const ctx = useActivity();
  const drag = useRef<{
    id: number;
    y: number;
    start: number;
    lastY: number;
    time: number;
    velocity: number;
    moved: boolean;
  } | null>(null);
  const suppressClick = useRef(false);
  const distance = Math.max(
    80,
    Math.abs(ctx.sizes.expanded.height - ctx.sizes.compact.height),
  );
  const sign = ctx.direction === "down" ? 1 : -1;
  const finish = (
    event: ReactPointerEvent<HTMLButtonElement>,
    cancelled: boolean,
  ) => {
    const current = drag.current;
    if (!current || current.id !== event.pointerId) return;
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    if (!current.moved) {
      ctx.settle(ctx.expanded);
      return;
    }
    suppressClick.current = true;
    if (cancelled) {
      ctx.settle(ctx.expanded);
      return;
    }
    const velocity =
      event.timeStamp - current.time > 100 ? 0 : current.velocity;
    const next = clamp(ctx.progress.get() + velocity * 0.15) > 0.5;
    ctx.request(next);
  };
  return {
    onPointerDown(event: ReactPointerEvent<HTMLButtonElement>) {
      suppressClick.current = false;
      if (
        !ctx.gestures ||
        event.pointerType !== "touch" ||
        !event.isPrimary ||
        event.currentTarget.disabled ||
        drag.current
      )
        return;
      ctx.progress.stop();
      drag.current = {
        id: event.pointerId,
        y: event.clientY,
        start: ctx.progress.get(),
        lastY: event.clientY,
        time: event.timeStamp,
        velocity: 0,
        moved: false,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    onPointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
      const current = drag.current;
      if (!current || current.id !== event.pointerId) return;
      const delta = (event.clientY - current.y) * sign;
      if (Math.abs(delta) > 5) current.moved = true;
      const elapsed = event.timeStamp - current.time;
      if (elapsed > 0)
        current.velocity =
          ((event.clientY - current.lastY) * sign) /
          distance /
          (elapsed / 1000);
      current.lastY = event.clientY;
      current.time = event.timeStamp;
      if (current.moved && !ctx.reduced)
        ctx.progress.set(clamp(current.start + delta / distance));
      // Reduced motion keeps the visual state still but preserves swipe input.
      if (current.moved && ctx.reduced) current.start = ctx.expanded ? 1 : 0;
    },
    onPointerUp(event: ReactPointerEvent<HTMLButtonElement>) {
      if (ctx.reduced && drag.current?.moved) {
        const delta = (event.clientY - drag.current.y) * sign;
        if (Math.abs(delta) > 24) {
          drag.current = null;
          suppressClick.current = true;
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            event.currentTarget.releasePointerCapture(event.pointerId);
          ctx.request(delta > 0, true);
          return;
        }
      }
      finish(event, false);
    },
    onPointerCancel(event: ReactPointerEvent<HTMLButtonElement>) {
      finish(event, true);
    },
    onLostPointerCapture(event: ReactPointerEvent<HTMLButtonElement>) {
      finish(event, true);
    },
    consumeClick() {
      const value = suppressClick.current;
      suppressClick.current = false;
      return value;
    },
  };
}

const focusClass =
  "cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50";
function ActivityButton({
  kind,
  className,
  style,
  children,
  onClick,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onLostPointerCapture,
  ...props
}: ComponentPropsWithoutRef<"button"> & {
  kind: "trigger" | "close" | "handle";
}) {
  const ctx = useActivity();
  const gesture = useGesture();
  const draggable = kind !== "close" && ctx.gestures;
  return (
    <button
      {...props}
      type="button"
      data-slot={`live-activity-${kind}`}
      aria-expanded={ctx.expanded}
      aria-controls={ctx.panelId}
      aria-label={
        props["aria-label"] ??
        (kind === "close"
          ? "Collapse activity"
          : kind === "handle"
            ? "Toggle activity details"
            : undefined)
      }
      className={cn(
        focusClass,
        kind === "handle" &&
          "hidden h-11 w-full items-center justify-center [@media(pointer:coarse)]:flex",
        className,
      )}
      style={{
        ...style,
        touchAction: draggable ? "pan-x pinch-zoom" : style?.touchAction,
      }}
      onClick={(event) => {
        if (gesture.consumeClick()) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
        if (!event.defaultPrevented)
          ctx.request(
            kind === "close" ? false : !ctx.expanded,
            event.detail === 0,
          );
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (!event.defaultPrevented && draggable) gesture.onPointerDown(event);
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (!event.defaultPrevented && draggable) gesture.onPointerMove(event);
      }}
      onPointerUp={(event) => {
        onPointerUp?.(event);
        if (draggable) gesture.onPointerUp(event);
      }}
      onPointerCancel={(event) => {
        onPointerCancel?.(event);
        gesture.onPointerCancel(event);
      }}
      onLostPointerCapture={(event) => {
        onLostPointerCapture?.(event);
        gesture.onLostPointerCapture(event);
      }}
    >
      {children ??
        (kind === "handle" ? (
          <span
            aria-hidden="true"
            className="h-1 w-8 rounded-full bg-current opacity-25"
          />
        ) : kind === "close" ? (
          <span aria-hidden="true">×</span>
        ) : null)}
    </button>
  );
}

export function LiveActivityTrigger(props: ComponentPropsWithoutRef<"button">) {
  return <ActivityButton {...props} kind="trigger" />;
}
export function LiveActivityClose(props: ComponentPropsWithoutRef<"button">) {
  return <ActivityButton {...props} kind="close" />;
}
export function LiveActivityHandle(props: ComponentPropsWithoutRef<"button">) {
  return <ActivityButton {...props} kind="handle" />;
}

const LiveActivity = {
  Root: LiveActivityRoot,
  Surface: LiveActivitySurface,
  Compact: LiveActivityCompact,
  Expanded: LiveActivityExpanded,
  Shared: LiveActivityShared,
  Trigger: LiveActivityTrigger,
  Close: LiveActivityClose,
  Handle: LiveActivityHandle,
};
export default LiveActivity;
