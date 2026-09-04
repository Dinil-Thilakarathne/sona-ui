"use client";

import { Copy, Focus, MoreHorizontal, Trash2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/sona-utils";

type CanvasItem = {
  id: string;
  label: string;
  description: string;
  className: string;
  tone: string;
};

type Action = {
  label: string;
  icon: typeof Focus;
};

type Point = {
  x: number;
  y: number;
};

const ACTIONS: Action[] = [
  { label: "Focus", icon: Focus },
  { label: "Duplicate", icon: Copy },
  { label: "Delete", icon: Trash2 },
];

const ITEMS: CanvasItem[] = [
  {
    id: "strategy",
    label: "Strategy",
    description: "Product direction",
    className: "left-[8%] top-[18%] sm:left-[13%]",
    tone: "bg-sky-400/15 text-sky-950 dark:text-sky-100",
  },
  {
    id: "research",
    label: "Research",
    description: "Customer insights",
    className: "right-[8%] top-[30%] sm:right-[14%]",
    tone: "bg-violet-400/15 text-violet-950 dark:text-violet-100",
  },
  {
    id: "prototype",
    label: "Prototype",
    description: "Interaction concept",
    className: "bottom-[15%] left-[35%] sm:left-[43%]",
    tone: "bg-amber-400/20 text-amber-950 dark:text-amber-100",
  },
];

const RADIUS = 94;
const SPREAD = (34 * Math.PI) / 180;

function getArcPoints(direction: number) {
  return ACTIONS.map((_, index) => {
    const progress = ACTIONS.length === 1 ? 0.5 : index / (ACTIONS.length - 1);
    const angle = direction + (progress - 0.5) * SPREAD * 2;
    return {
      x: Math.cos(angle) * RADIUS,
      y: Math.sin(angle) * RADIUS,
    };
  });
}

function pickSafeArc(anchor: Point, bounds: DOMRect) {
  const candidates = [0, Math.PI, Math.PI / 2, -Math.PI / 2];
  const padding = 38;

  return candidates.reduce(
    (best, direction) => {
      const points = getArcPoints(direction);
      const score = Math.min(
        ...points.flatMap((point) => [
          anchor.x + point.x - padding,
          bounds.width - (anchor.x + point.x + padding),
          anchor.y + point.y - padding,
          bounds.height - (anchor.y + point.y + padding),
        ]),
      );
      return score > best.score ? { direction, score } : best;
    },
    { direction: 0, score: Number.NEGATIVE_INFINITY },
  ).direction;
}

export default function CircularContextMenuPrototype() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [anchor, setAnchor] = useState<Point | null>(null);
  const [direction, setDirection] = useState(0);
  const [message, setMessage] = useState(
    "Select an object to reveal its actions",
  );
  const canvasRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef(new Map<string, HTMLButtonElement>());
  const actionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reducedMotion = useReducedMotion();

  const measureSelection = useCallback(() => {
    if (!selectedId || !canvasRef.current) return;
    const item = itemRefs.current.get(selectedId);
    if (!item) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const nextAnchor = {
      x: itemRect.left - canvasRect.left + itemRect.width / 2,
      y: itemRect.top - canvasRect.top + itemRect.height / 2,
    };
    setAnchor(nextAnchor);
    setDirection(pickSafeArc(nextAnchor, canvasRect));
  }, [selectedId]);

  useLayoutEffect(() => {
    measureSelection();
    const observer = new ResizeObserver(measureSelection);
    if (canvasRef.current) observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, [measureSelection]);

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape" || !selectedId) return;
      event.preventDefault();
      itemRefs.current.get(selectedId)?.focus();
      setSelectedId(null);
      setMessage("Selection cleared");
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selectedId]);

  const selectItem = (item: CanvasItem, focusAction = false) => {
    setSelectedId(item.id);
    setMessage(`${item.label} selected. Choose an action.`);
    if (focusAction) {
      requestAnimationFrame(() => actionRefs.current[0]?.focus());
    }
  };

  const handleActionKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (
      event.key !== "ArrowRight" &&
      event.key !== "ArrowDown" &&
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowUp"
    ) {
      return;
    }
    event.preventDefault();
    const delta =
      event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
    const next = (index + delta + ACTIONS.length) % ACTIONS.length;
    actionRefs.current[next]?.focus();
  };

  const arcPoints = anchor ? getArcPoints(direction) : [];
  const selectedItem = ITEMS.find((item) => item.id === selectedId);

  return (
    <main className="min-h-screen bg-background px-5 py-16 text-foreground sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 grid gap-6 lg:grid-cols-[1fr_25rem] lg:items-end">
          <div>
            <p className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-[0.16em]">
              Circular context menu prototype
            </p>
            <h1 className="max-w-2xl font-semibold text-3xl tracking-[-0.04em] sm:text-4xl">
              Actions make room for the object they belong to.
            </h1>
          </div>
          <p className="text-muted-foreground text-sm leading-6">
            Select an object. The three actions fan into the safest available
            direction, preserving a clear line back to the selection.
          </p>
        </header>

        <section className="overflow-hidden rounded-[1.75rem] bg-card smooth-shadow-ring-lg shadow-[0_24px_80px_-44px_color-mix(in_oklab,var(--foreground)_34%,transparent)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-border border-b px-5 py-4 sm:px-6">
            <div>
              <h2 className="font-semibold tracking-[-0.02em]">
                Concept board
              </h2>
              <p className="mt-1 text-muted-foreground text-xs">
                Edge-aware contextual actions
              </p>
            </div>
            <button
              className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring"
              type="button"
              aria-label="Board options"
            >
              <MoreHorizontal aria-hidden="true" size={17} />
            </button>
          </div>

          <section
            ref={canvasRef}
            aria-label="Interactive concept board"
            className="relative min-h-[27rem] overflow-hidden bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--muted)_80%,transparent),transparent_62%)] p-5 sm:min-h-[32rem]"
            onPointerDown={(event) => {
              if (event.target === event.currentTarget) {
                setSelectedId(null);
                setMessage("Selection cleared");
              }
            }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-50 [background-image:linear-gradient(color-mix(in_oklab,var(--border)_65%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--border)_65%,transparent)_1px,transparent_1px)] [background-size:2rem_2rem]"
            />

            {ITEMS.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    if (node) itemRefs.current.set(item.id, node);
                    else itemRefs.current.delete(item.id);
                  }}
                  aria-pressed={isSelected}
                  className={cn(
                    "absolute z-10 w-40 rounded-2xl border px-4 py-3 text-left outline-none transition-[box-shadow,border-color,transform] duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    item.className,
                    item.tone,
                    isSelected
                      ? "border-foreground/40 shadow-[0_14px_35px_-22px_color-mix(in_oklab,var(--foreground)_70%,transparent)]"
                      : "border-border/75 bg-background/80 shadow-sm",
                  )}
                  type="button"
                  onClick={() => selectItem(item)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      selectItem(item, true);
                    }
                  }}
                >
                  <span className="block font-semibold text-sm tracking-[-0.01em]">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-current/65 text-xs">
                    {item.description}
                  </span>
                </button>
              );
            })}

            <AnimatePresence initial={false}>
              {selectedId &&
                anchor &&
                selectedItem &&
                ACTIONS.map((action, index) => {
                  const point = arcPoints[index];
                  const Icon = action.icon;
                  return (
                    <motion.button
                      key={action.label}
                      ref={(node) => {
                        actionRefs.current[index] = node;
                      }}
                      aria-label={`${action.label} ${selectedItem.label}`}
                      className={cn(
                        "absolute z-20 flex size-11 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        action.label === "Delete" &&
                          "text-destructive hover:border-destructive/40",
                      )}
                      style={{ left: anchor.x - 22, top: anchor.y - 22 }}
                      type="button"
                      initial={{ opacity: 0, scale: 0.7, x: 0, y: 0 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: point.x,
                        y: point.y,
                        transition: reducedMotion
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
                        x: 0,
                        y: 0,
                        transition: reducedMotion
                          ? { duration: 0 }
                          : {
                              duration: 0.16,
                              delay: (ACTIONS.length - index - 1) * 0.02,
                            },
                      }}
                      whileHover={reducedMotion ? undefined : { scale: 1.06 }}
                      whileTap={reducedMotion ? undefined : { scale: 0.94 }}
                      onClick={() => {
                        setMessage(
                          `${action.label} chosen for ${selectedItem.label}`,
                        );
                        setSelectedId(null);
                      }}
                      onKeyDown={(event) => handleActionKeyDown(event, index)}
                    >
                      <Icon aria-hidden="true" size={17} />
                    </motion.button>
                  );
                })}
            </AnimatePresence>
          </section>

          <footer className="flex min-h-12 items-center border-border border-t bg-muted/35 px-5 py-3 text-muted-foreground text-xs sm:px-6">
            <p aria-live="polite">{message}</p>
          </footer>
        </section>

        <p className="mt-4 text-muted-foreground text-xs">
          Keyboard: Tab to an object, Enter or Space to open actions, Arrow keys
          to move between actions, Escape to return to the object.
        </p>
      </div>
    </main>
  );
}
