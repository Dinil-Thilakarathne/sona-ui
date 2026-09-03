"use client";

import { Menu } from "@base-ui/react/menu";
import { Ellipsis } from "lucide-react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  Children,
  type CSSProperties,
  Fragment,
  isValidElement,
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/sona-utils";

export interface SmartOverflowActionProps {
  /** Stable identifier used for layout, focus recovery, and React rendering. */
  id: string;
  /** Visible label and optional rich content for the action. */
  children: ReactNode;
  /** Optional icon shown before the action label. @default undefined */
  icon?: ReactNode;
  /** Determines when the action moves into the three-dot menu. @default "secondary" */
  priority?: "primary" | "secondary" | "overflow";
  /** Applies destructive menu styling and separates the action from normal actions. @default false */
  destructive?: boolean;
  /** Whether the action is unavailable. @default false */
  disabled?: boolean;
  /** Called when the action is activated. @default undefined */
  onSelect?: () => void;
}

export interface SmartOverflowProps {
  /** Priority-aware action declarations. Only direct SmartOverflowAction children are rendered. */
  children: ReactNode;
  /** Accessible label for the action group. @default "Actions" */
  ariaLabel?: string;
  /** Accessible label for the three-dot trigger. @default "More actions" */
  moreLabel?: string;
  /** Whether every action is unavailable. @default false */
  disabled?: boolean;
  /** Additional CSS classes for the group container. @default undefined */
  className?: string;
  /** Additional CSS classes applied to each visible action. @default undefined */
  actionClassName?: string;
  /** Additional CSS classes applied to the three-dot trigger. @default undefined */
  moreButtonClassName?: string;
  /** Additional CSS classes for the overflow menu. @default undefined */
  menuClassName?: string;
}

interface ResolvedAction extends SmartOverflowActionProps {}

const gap = 4;
const transition = { duration: 0.17, ease: [0.22, 1, 0.36, 1] } as const;

function priorityWeight(priority: SmartOverflowActionProps["priority"]) {
  return priority === "primary" ? 1 : 0;
}

function ActionContents({ action }: { action: ResolvedAction }) {
  return (
    <>
      {action.icon ? (
        <span aria-hidden="true" className="shrink-0 [&_svg]:size-4">
          {action.icon}
        </span>
      ) : null}
      <span className="truncate">{action.children}</span>
    </>
  );
}

/** Declares an action inside SmartOverflow. */
export function SmartOverflowAction(_props: SmartOverflowActionProps) {
  return null;
}

export default function SmartOverflow({
  children,
  ariaLabel = "Actions",
  moreLabel = "More actions",
  disabled = false,
  className,
  actionClassName,
  moreButtonClassName,
  menuClassName,
}: SmartOverflowProps) {
  const shouldReduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLFieldSetElement>(null);
  const measureRefs = useRef(new Map<string, HTMLSpanElement>());
  const moreMeasureRef = useRef<HTMLSpanElement>(null);
  const actions = useMemo<ResolvedAction[]>(
    () =>
      Children.toArray(children).flatMap((child) => {
        if (!isValidElement<SmartOverflowActionProps>(child)) return [];
        return child.type === SmartOverflowAction ? [child.props] : [];
      }),
    [children],
  );
  const [visibleIds, setVisibleIds] = useState(() =>
    actions
      .filter((action) => action.priority !== "overflow")
      .map((action) => action.id),
  );
  const [isMeasured, setIsMeasured] = useState(false);
  const [focusedActionId, setFocusedActionId] = useState<string | null>(null);
  const layoutActions = useMemo(
    () => actions.filter((action) => action.priority !== "overflow"),
    [actions],
  );

  const updateLayout = useCallback(() => {
    const root = rootRef.current;
    if (!root || root.clientWidth === 0) return;

    const actionWidths = new Map(
      actions.map((action) => [
        action.id,
        measureRefs.current.get(action.id)?.offsetWidth ?? 0,
      ]),
    );
    const visible = [...layoutActions];
    const hidden = actions.filter((action) => action.priority === "overflow");
    const moreWidth = moreMeasureRef.current?.offsetWidth ?? 36;
    const requiredWidth = () => {
      const visibleWidth = visible.reduce(
        (total, action) => total + (actionWidths.get(action.id) ?? 0),
        0,
      );
      const hasOverflow = hidden.length > 0;
      const itemCount = visible.length + (hasOverflow ? 1 : 0);
      return (
        visibleWidth +
        (hasOverflow ? moreWidth : 0) +
        Math.max(0, itemCount - 1) * gap
      );
    };
    const removable = [...visible].sort((a, b) => {
      const priorityDifference =
        priorityWeight(a.priority) - priorityWeight(b.priority);
      return (
        priorityDifference ||
        layoutActions.indexOf(b) - layoutActions.indexOf(a)
      );
    });

    while (requiredWidth() > root.clientWidth && removable.length > 0) {
      const next = removable.shift();
      if (!next) break;
      const index = visible.findIndex((action) => action.id === next.id);
      if (index >= 0) {
        visible.splice(index, 1);
        hidden.unshift(next);
      }
    }

    const nextVisibleIds = visible.map((action) => action.id);
    setVisibleIds((current) =>
      current.length === nextVisibleIds.length &&
      current.every((id, index) => id === nextVisibleIds[index])
        ? current
        : nextVisibleIds,
    );
    setIsMeasured(true);
  }, [actions, layoutActions]);

  useLayoutEffect(() => {
    updateLayout();
  }, [updateLayout]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new ResizeObserver(updateLayout);
    observer.observe(root);
    return () => observer.disconnect();
  }, [updateLayout]);

  useEffect(() => {
    if (!focusedActionId || visibleIds.includes(focusedActionId)) return;
    rootRef.current
      ?.querySelector<HTMLButtonElement>('[data-slot="smart-overflow-trigger"]')
      ?.focus();
  }, [focusedActionId, visibleIds]);

  const visibleActions = actions.filter((action) =>
    visibleIds.includes(action.id),
  );
  const hiddenActions = actions.filter(
    (action) => !visibleIds.includes(action.id),
  );
  const motionTransition = shouldReduceMotion ? { duration: 0 } : transition;
  if (actions.length === 0) return null;

  return (
    <MotionConfig reducedMotion="user" transition={motionTransition}>
      <fieldset
        ref={rootRef}
        aria-label={ariaLabel}
        className={cn(
          "m-0 flex w-full min-w-0 items-center gap-1 border-0 p-0",
          className,
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 flex gap-1 opacity-0"
        >
          {actions.map((action) => (
            <span
              key={action.id}
              ref={(node) => {
                if (node) measureRefs.current.set(action.id, node);
                else measureRefs.current.delete(action.id);
              }}
              className={cn(
                "inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-lg px-3 text-sm font-medium",
                actionClassName,
              )}
            >
              <ActionContents action={action} />
            </span>
          ))}
          <span
            ref={moreMeasureRef}
            className={cn(
              "grid size-9 place-items-center rounded-lg",
              moreButtonClassName,
            )}
          >
            <Ellipsis aria-hidden="true" className="size-4" />
          </span>
        </div>

        <div
          className="flex min-w-0 items-center gap-1"
          style={
            { visibility: isMeasured ? "visible" : "hidden" } as CSSProperties
          }
        >
          <AnimatePresence initial={false} mode="popLayout">
            {visibleActions.map((action) => (
              <motion.button
                key={action.id}
                layout="position"
                type="button"
                disabled={disabled || action.disabled}
                data-slot="smart-overflow-action"
                data-action-id={action.id}
                initial={
                  shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={
                  shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98 }
                }
                onFocus={() => setFocusedActionId(action.id)}
                onBlur={() => setFocusedActionId(null)}
                onClick={action.onSelect}
                className={cn(
                  "inline-flex h-9 min-w-0 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-medium text-foreground",
                  "transition-[background-color,transform] duration-150 ease-out hover:bg-accent active:scale-[0.97]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  "disabled:pointer-events-none disabled:opacity-45 motion-reduce:transition-none",
                  actionClassName,
                )}
              >
                <ActionContents action={action} />
              </motion.button>
            ))}
            {hiddenActions.length > 0 ? (
              <motion.div
                key="smart-overflow-trigger"
                layout="position"
                initial={
                  shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={
                  shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }
                }
              >
                <Menu.Root>
                  <Menu.Trigger
                    aria-label={moreLabel}
                    data-slot="smart-overflow-trigger"
                    disabled={disabled}
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-lg text-muted-foreground",
                      "transition-[background-color,transform] duration-150 ease-out hover:bg-accent hover:text-foreground active:scale-[0.97]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      "data-[popup-open]:bg-accent data-[popup-open]:text-foreground disabled:pointer-events-none disabled:opacity-45 motion-reduce:transition-none",
                      moreButtonClassName,
                    )}
                  >
                    <Ellipsis aria-hidden="true" className="size-4" />
                  </Menu.Trigger>
                  <Menu.Portal>
                    <Menu.Positioner
                      side="bottom"
                      align="end"
                      sideOffset={6}
                      className="z-50"
                    >
                      <Menu.Popup
                        className={cn(
                          "min-w-44 origin-[var(--transform-origin)] rounded-xl border border-border/60 bg-popover p-1 text-popover-foreground shadow-lg",
                          "transition-[opacity,transform] starting:scale-95 starting:opacity-0 duration-150 motion-reduce:duration-0",
                          menuClassName,
                        )}
                      >
                        {hiddenActions.map((action, index) => {
                          const separatesDestructiveAction =
                            action.destructive &&
                            hiddenActions
                              .slice(0, index)
                              .some(
                                (previousAction) => !previousAction.destructive,
                              );
                          return (
                            <Fragment key={action.id}>
                              {separatesDestructiveAction ? (
                                <Menu.Separator className="mx-1 my-1 h-px bg-border/60" />
                              ) : null}
                              <Menu.Item
                                disabled={disabled || action.disabled}
                                onClick={action.onSelect}
                                className={cn(
                                  "flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm outline-none",
                                  "data-[highlighted]:bg-accent disabled:cursor-not-allowed disabled:opacity-45",
                                  action.destructive
                                    ? "text-danger-foreground data-[highlighted]:bg-danger data-[highlighted]:text-white"
                                    : "text-popover-foreground",
                                )}
                              >
                                <ActionContents action={action} />
                              </Menu.Item>
                            </Fragment>
                          );
                        })}
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.Root>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </fieldset>
    </MotionConfig>
  );
}
