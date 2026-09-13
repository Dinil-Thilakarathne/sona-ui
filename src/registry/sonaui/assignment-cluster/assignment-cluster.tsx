"use client";

import { Popover } from "@base-ui/react/popover";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/sona-utils";

export interface AssignmentClusterItem {
  id: string;
  name: string;
  imageUrl?: string;
}
export interface AssignmentClusterProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** People available for assignment. */
  items: AssignmentClusterItem[];
  /** Committed selected IDs. */
  value: string[];
  /** Called when the committed selection changes. */
  onChange?: (ids: string[]) => void;
  /** Called when Apply is pressed. Return a promise for async persistence. */
  onApply?: (ids: string[]) => void | Promise<void>;
  /** Label shown beside the summary. @default "Reviewers" */
  label?: string;
  /** Maximum avatars shown in the compact summary. @default 3 */
  maxVisible?: number;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function AssignmentCluster({
  items,
  value,
  onChange,
  onApply,
  label = "Reviewers",
  maxVisible = 3,
  className,
  ...props
}: AssignmentClusterProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);
  const [query, setQuery] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const searchId = useId();
  const hoverLayoutId = useId();
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (!open) setDraft(value);
  }, [value, open]);
  const selected = useMemo(
    () => items.filter((item) => draft.includes(item.id)),
    [items, draft],
  );
  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );
  const avatarClusterWidth =
    (Math.max(1, maxVisible) + 1) * 32 - Math.max(1, maxVisible) * 8;
  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setError(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        popoverRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }

      close();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [close, open]);
  const apply = async () => {
    setPending(true);
    setError(null);
    try {
      await onApply?.(draft);
      onChange?.(draft);
      close();
    } catch {
      setError("Could not save assignments. Try again.");
    } finally {
      setPending(false);
    }
  };
  const toggle = (id: string) =>
    setDraft((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  return (
    <Popover.Root open={open} onOpenChange={setOpen} modal={false}>
      <div
        className={cn("relative inline-flex items-center gap-3", className)}
        {...props}
      >
        <span className="text-sm font-medium text-foreground">{label}</span>
        <Popover.Trigger
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-label={`${selected.length} assigned`}
          onClick={() => {
            setDraft(value);
            setQuery("");
            setError(null);
          }}
          style={{ width: avatarClusterWidth }}
          className="flex cursor-pointer items-center justify-end rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span className="flex w-full justify-end -space-x-2">
            <AnimatePresence initial={false} mode="popLayout">
              {selected.slice(0, maxVisible).map((item) => (
                <motion.span
                  key={item.id}
                  layout="position"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: 0,
                          scale: 0.7,
                          transition: { duration: 0.14 },
                        }
                  }
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", bounce: 0.15, duration: 0.28 }
                  }
                  title={item.name}
                  className="grid size-8 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-background bg-muted text-[10px] font-semibold text-muted-foreground"
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="size-full object-cover"
                    />
                  ) : (
                    initials(item.name)
                  )}
                </motion.span>
              ))}
              {selected.length > maxVisible && (
                <motion.span
                  layout="position"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.7 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", bounce: 0.15, duration: 0.28 }
                  }
                  className="grid size-8 shrink-0 place-items-center rounded-full border-2 border-background bg-secondary text-xs font-medium"
                >
                  +{selected.length - maxVisible}
                </motion.span>
              )}
              {selected.length === 0 && (
                <motion.span
                  layout="position"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.7 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", bounce: 0.15, duration: 0.28 }
                  }
                  className="grid size-8 shrink-0 place-items-center rounded-full border-2 border-dashed border-border text-muted-foreground"
                >
                  +
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </Popover.Trigger>
        <AnimatePresence>
          {open && (
            <Popover.Portal>
              <Popover.Positioner side="bottom" align="end" sideOffset={8}>
                <Popover.Popup initialFocus={false} finalFocus={triggerRef}>
                  <motion.div
                    ref={popoverRef}
                    layout="size"
                    initial={reduceMotion ? false : { opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -2 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.16,
                            ease: [0.23, 1, 0.32, 1],
                          }
                    }
                    role="dialog"
                    aria-modal="false"
                    aria-label={`Edit ${label.toLowerCase()}`}
                    className="w-80 rounded-xl border border-border bg-background p-3 shadow-lg"
                  >
                    <motion.div
                      layout="position"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", bounce: 0, duration: 0.3 }
                      }
                      className="mb-2 flex items-center justify-between"
                    >
                      <strong className="text-sm">
                        Assign {label.toLowerCase()}
                      </strong>
                      <button
                        type="button"
                        onClick={close}
                        className="cursor-pointer rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-secondary"
                      >
                        Cancel
                      </button>
                    </motion.div>
                    <label htmlFor={searchId} className="sr-only">
                      Search people
                    </label>
                    <input
                      id={searchId}
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search people"
                      className="mb-2 h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <LayoutGroup id={hoverLayoutId}>
                      <motion.div
                        layout="size"
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: "spring", bounce: 0, duration: 0.3 }
                        }
                        className="max-h-56 overflow-y-auto"
                      >
                        <AnimatePresence initial={false} mode="popLayout">
                          {filtered.map((item) => (
                            <motion.label
                              key={item.id}
                              layout="position"
                              initial={
                                reduceMotion ? false : { opacity: 0, y: -4 }
                              }
                              animate={{ opacity: 1, y: 0 }}
                              exit={
                                reduceMotion ? undefined : { opacity: 0, y: -4 }
                              }
                              transition={
                                reduceMotion
                                  ? { duration: 0 }
                                  : {
                                      type: "spring",
                                      bounce: 0,
                                      duration: 0.24,
                                    }
                              }
                              onMouseEnter={() => setActiveId(item.id)}
                              onMouseLeave={() => setActiveId(null)}
                              onFocus={() => setActiveId(item.id)}
                              onBlur={() => setActiveId(null)}
                              className="relative flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm"
                            >
                              <AnimatePresence initial={false}>
                                {activeId === item.id && (
                                  <motion.span
                                    layoutId={
                                      reduceMotion
                                        ? undefined
                                        : `${hoverLayoutId}-hover`
                                    }
                                    initial={
                                      reduceMotion ? false : { opacity: 0 }
                                    }
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={
                                      reduceMotion
                                        ? { duration: 0 }
                                        : { duration: 0.12 }
                                    }
                                    className="absolute inset-0 rounded-md bg-accent"
                                  />
                                )}
                              </AnimatePresence>
                              <input
                                type="checkbox"
                                checked={draft.includes(item.id)}
                                onChange={() => toggle(item.id)}
                                className="relative z-10 size-4 accent-foreground"
                              />
                              <span className="relative z-10 grid size-7 place-items-center overflow-hidden rounded-full bg-muted text-[10px] font-semibold">
                                {item.imageUrl ? (
                                  <img
                                    src={item.imageUrl}
                                    alt=""
                                    className="size-full object-cover"
                                  />
                                ) : (
                                  initials(item.name)
                                )}
                              </span>
                              <span className="relative z-10">{item.name}</span>
                            </motion.label>
                          ))}
                          {filtered.length === 0 && (
                            <motion.p
                              layout="position"
                              initial={reduceMotion ? false : { opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={reduceMotion ? undefined : { opacity: 0 }}
                              className="px-2 py-4 text-sm text-muted-foreground"
                            >
                              No people found.
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </LayoutGroup>
                    {error && (
                      <p role="alert" className="mt-2 text-xs text-destructive">
                        {error}
                      </p>
                    )}
                    <motion.button
                      layout="position"
                      type="button"
                      disabled={pending}
                      onClick={apply}
                      className="mt-3 h-9 w-full cursor-pointer rounded-md bg-foreground text-sm font-medium text-background disabled:opacity-50"
                    >
                      {pending ? "Saving…" : "Apply assignments"}
                    </motion.button>
                  </motion.div>
                </Popover.Popup>
              </Popover.Positioner>
            </Popover.Portal>
          )}
        </AnimatePresence>
      </div>
    </Popover.Root>
  );
}
