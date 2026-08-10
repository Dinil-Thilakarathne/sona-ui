"use client";

import {
  Archive,
  Check,
  Clock3,
  Copy,
  Folder,
  Pencil,
  Plus,
  Search,
  Undo2,
  Users,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/sona-utils";

type Variant = "floating" | "dock" | "labelled";

interface Project {
  id: string;
  name: string;
  description: string;
  updated: string;
  people: number;
  color: string;
}

const initialProjects: Project[] = [
  {
    id: "atlas",
    name: "Atlas Design System",
    description: "Foundations, components, and contribution guidelines",
    updated: "12 min ago",
    people: 8,
    color: "oklch(0.66 0.16 259)",
  },
  {
    id: "northstar",
    name: "Northstar Mobile",
    description: "Onboarding and account recovery improvements",
    updated: "Yesterday",
    people: 5,
    color: "oklch(0.7 0.15 153)",
  },
  {
    id: "signal",
    name: "Signal Analytics",
    description: "Exploration workspace for product teams",
    updated: "3 days ago",
    people: 3,
    color: "oklch(0.72 0.16 68)",
  },
  {
    id: "field-notes",
    name: "Field Notes",
    description: "Customer research synthesis and opportunity map",
    updated: "Last week",
    people: 6,
    color: "oklch(0.68 0.17 328)",
  },
];

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

const variantCopy: Record<
  Variant,
  { eyebrow: string; title: string; description: string }
> = {
  floating: {
    eyebrow: "Floating Tools",
    title: "Actions stay closest to the selection",
    description:
      "A compact material surface travels inside the row. It is fastest to scan, but shares horizontal space with content.",
  },
  dock: {
    eyebrow: "Edge Dock",
    title: "A stable gutter keeps content untouched",
    description:
      "The controls move only along the vertical axis. The attachment is quieter, though the workspace must reserve an action gutter.",
  },
  labelled: {
    eyebrow: "Labelled Bar",
    title: "Clarity takes priority over compactness",
    description:
      "Text labels reduce interpretation cost for infrequent workflows. The surface is easier to learn, but visually heavier.",
  },
};

export default function ActionRailWorkspace({ variant }: { variant: Variant }) {
  const [projects, setProjects] = useState(initialProjects);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [message, setMessage] = useState(
    "Hover, focus, or select a project to reveal actions",
  );
  const [archived, setArchived] = useState<{
    project: Project;
    index: number;
  } | null>(null);

  useEffect(() => {
    const clearSelection = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape" || activeId === null) return;
      setActiveId(null);
      setMessage("Selection cleared");
    };
    document.addEventListener("keydown", clearSelection);
    return () => document.removeEventListener("keydown", clearSelection);
  }, [activeId]);

  const edit = (id: string) => {
    const target = projects.find((project) => project.id === id);
    if (!target) return;
    const nextName = target.name.endsWith(" · Revised")
      ? target.name.replace(" · Revised", "")
      : `${target.name} · Revised`;
    setProjects((current) =>
      current.map((project) =>
        project.id === target.id
          ? { ...project, name: nextName, updated: "Just now" }
          : project,
      ),
    );
    setMessage(`Renamed ${target.name}`);
  };

  const duplicate = (id: string) => {
    const target = projects.find((project) => project.id === id);
    if (!target) return;
    const copy: Project = {
      ...target,
      id: `${target.id}-copy-${Date.now()}`,
      name: `${target.name.replace(" · Revised", "")} Copy`,
      updated: "Just now",
      people: 1,
    };
    setProjects((current) => {
      const index = current.findIndex((project) => project.id === target.id);
      return [
        ...current.slice(0, index + 1),
        copy,
        ...current.slice(index + 1),
      ];
    });
    setMessage(`Created ${copy.name}`);
  };

  const archive = (id: string) => {
    const target = projects.find((project) => project.id === id);
    if (!target || projects.length === 1) return;
    const index = projects.findIndex((project) => project.id === target.id);
    setArchived({ project: target, index });
    setProjects((current) =>
      current.filter((project) => project.id !== target.id),
    );
    setActiveId((current) => (current === target.id ? null : current));
    setMessage(`Archived ${target.name}`);
  };

  const undoArchive = () => {
    if (!archived) return;
    setProjects((current) => {
      const index = Math.min(archived.index, current.length);
      return [
        ...current.slice(0, index),
        archived.project,
        ...current.slice(index),
      ];
    });
    setActiveId(archived.project.id);
    setMessage(`Restored ${archived.project.name}`);
    setArchived(null);
  };

  return (
    <div className="min-h-screen bg-background px-5 py-28 text-foreground sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 grid gap-6 lg:grid-cols-[1fr_28rem] lg:items-end">
          <div>
            <p className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-[0.16em]">
              ActionRail prototype · {variantCopy[variant].eyebrow}
            </p>
            <h1 className="max-w-xl font-semibold text-3xl tracking-[-0.035em] sm:text-4xl">
              {variantCopy[variant].title}
            </h1>
          </div>
          <p className="max-w-md text-muted-foreground text-sm leading-6 lg:justify-self-end">
            {variantCopy[variant].description}
          </p>
        </header>

        <section
          aria-label="Projects"
          className="overflow-hidden rounded-2xl bg-card smooth-shadow-ring-lg shadow-[0_18px_60px_-36px_color-mix(in_oklab,var(--foreground)_24%,transparent)]"
        >
          <div className="flex flex-col gap-4 border-border border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold tracking-[-0.015em]">Projects</h2>
              <p className="mt-0.5 text-muted-foreground text-xs">
                Hover or focus to preview actions. Select to keep them visible.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring"
                type="button"
                aria-label="Search projects"
              >
                <Search aria-hidden="true" size={16} />
              </button>
              <button
                className="flex h-9 items-center gap-2 rounded-lg bg-primary px-3 font-medium text-primary-foreground text-sm outline-none active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                type="button"
                onClick={() => setMessage("New project flow opened")}
              >
                <Plus aria-hidden="true" size={16} />
                New project
              </button>
            </div>
          </div>

          <ProjectList
            activeId={activeId}
            onActiveChange={(id) => {
              setActiveId(id);
              const project = projects.find((item) => item.id === id);
              setMessage(`${project?.name ?? "Project"} selected`);
            }}
            onArchive={archive}
            onDuplicate={duplicate}
            onEdit={edit}
            projects={projects}
            variant={variant}
          />

          <footer className="flex min-h-12 items-center justify-between gap-4 border-border border-t bg-muted/35 px-5 py-3 text-muted-foreground text-xs">
            <p aria-live="polite" className="flex items-center gap-2">
              <Check aria-hidden="true" className="text-primary" size={14} />
              {message}
            </p>
            <AnimatePresence initial={false}>
              {archived && (
                <motion.button
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 2 }}
                  className="flex items-center gap-1.5 font-medium text-foreground outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                  type="button"
                  onClick={undoArchive}
                >
                  <Undo2 aria-hidden="true" size={13} />
                  Undo archive
                </motion.button>
              )}
            </AnimatePresence>
          </footer>
        </section>

        <p className="mt-4 text-muted-foreground text-xs">
          Keyboard: select a focused row with Enter or Space. Press Shift+F10 to
          move directly to its actions, or Escape to clear selection.
        </p>
      </div>
    </div>
  );
}

function ProjectList({
  projects,
  activeId,
  onActiveChange,
  onEdit,
  onDuplicate,
  onArchive,
  variant,
}: {
  projects: Project[];
  activeId: string | null;
  onActiveChange: (id: string) => void;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onArchive: (id: string) => void;
  variant: Variant;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef(new Map<string, HTMLButtonElement>());
  const railRef = useRef<HTMLDivElement>(null);
  const firstActionRef = useRef<HTMLButtonElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [hoverPreviewSuppressed, setHoverPreviewSuppressed] = useState(false);
  const [railY, setRailY] = useState(0);
  const [placed, setPlaced] = useState(false);
  const reducedMotion = useReducedMotion();
  const mobile = useMediaQuery("(max-width: 639px), (pointer: coarse)");
  const hoverPreviewId = hoverPreviewSuppressed ? null : hoveredId;
  const previewId = mobile ? focusedId : (hoverPreviewId ?? focusedId);
  const visibleId = activeId ?? previewId;

  const cancelHide = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = null;
  };

  const scheduleHoverHide = () => {
    cancelHide();
    hideTimer.current = setTimeout(() => setHoveredId(null), 100);
  };

  useEffect(
    () => () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    },
    [],
  );

  const measure = useCallback(() => {
    const container = containerRef.current;
    const row = visibleId ? rowRefs.current.get(visibleId) : null;
    if (!container || !row) return;
    const containerRect = container.getBoundingClientRect();
    const rowRect = row.getBoundingClientRect();
    setRailY(rowRect.top - containerRect.top + rowRect.height / 2);
    setPlaced(true);
  }, [visibleId]);

  useLayoutEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [measure]);

  const handleRowKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    id: string,
  ) => {
    if (event.shiftKey && event.key === "F10") {
      event.preventDefault();
      if (id !== activeId) onActiveChange(id);
      requestAnimationFrame(() => firstActionRef.current?.focus());
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative", variant === "dock" && "pr-16 sm:pr-20")}
      onPointerLeave={() => setHoverPreviewSuppressed(false)}
    >
      <div className="divide-y divide-border">
        {projects.map((project) => {
          const active = project.id === activeId;
          return (
            <button
              key={project.id}
              ref={(node) => {
                if (node) rowRefs.current.set(project.id, node);
                else rowRefs.current.delete(project.id);
              }}
              aria-controls="prototype-action-rail"
              aria-pressed={active}
              className={cn(
                "group relative grid w-full grid-cols-[auto_1fr] items-center gap-3 px-5 py-4 text-left outline-none transition-colors focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:grid-cols-[auto_minmax(0,1fr)_auto]",
                active
                  ? "bg-primary/[0.065]"
                  : "hover:bg-muted/45 focus-visible:bg-muted/45",
                variant === "floating" && "sm:pr-40",
                variant === "labelled" && "sm:pr-72",
              )}
              onClick={() => onActiveChange(project.id)}
              onPointerEnter={() => {
                if (mobile || hoverPreviewSuppressed) return;
                cancelHide();
                setHoveredId(project.id);
              }}
              onPointerMove={(event) => {
                if (
                  !hoverPreviewSuppressed ||
                  (event.movementX === 0 && event.movementY === 0)
                ) {
                  return;
                }
                setHoverPreviewSuppressed(false);
                setHoveredId(project.id);
              }}
              onPointerLeave={scheduleHoverHide}
              onFocus={() => setFocusedId(project.id)}
              onBlur={() => {
                requestAnimationFrame(() => {
                  if (!railRef.current?.contains(document.activeElement)) {
                    setFocusedId(null);
                  }
                });
              }}
              onKeyDown={(event) => handleRowKeyDown(event, project.id)}
              type="button"
            >
              <span
                className="flex size-10 items-center justify-center rounded-xl text-white shadow-sm"
                style={{ backgroundColor: project.color }}
              >
                <Folder aria-hidden="true" size={18} strokeWidth={1.8} />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-medium text-sm tracking-[-0.01em]">
                  {project.name}
                </span>
                <span className="mt-1 block truncate text-muted-foreground text-xs">
                  {project.description}
                </span>
              </span>
              <span className="col-start-2 flex items-center gap-4 text-muted-foreground text-xs sm:col-start-auto">
                <span className="flex items-center gap-1.5">
                  <Users aria-hidden="true" size={13} />
                  {project.people}
                </span>
                <span className="hidden items-center gap-1.5 md:flex">
                  <Clock3 aria-hidden="true" size={13} />
                  {project.updated}
                </span>
              </span>
              <AnimatePresence>
                {active && (
                  <motion.span
                    aria-hidden="true"
                    initial={{ opacity: 0, scaleY: 0.4 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0.6 }}
                    className="absolute inset-y-3 left-0 w-0.5 origin-center rounded-full bg-primary"
                  />
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      {placed && visibleId && (
        <motion.div
          initial={{ y: mobile ? 0 : railY }}
          animate={{ y: mobile ? 0 : railY }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { type: "spring", bounce: 0, duration: 0.38 }
          }
          className={cn(
            "z-20",
            mobile
              ? "fixed right-4 bottom-5 left-4"
              : cn(
                  "absolute top-0",
                  variant === "dock" ? "right-3" : "right-4",
                ),
          )}
          onPointerEnter={cancelHide}
          onPointerLeave={scheduleHoverHide}
        >
          <div className={mobile ? undefined : "-translate-y-1/2"}>
            <motion.div
              ref={railRef}
              id="prototype-action-rail"
              role="toolbar"
              aria-label={`Actions for ${projects.find((project) => project.id === visibleId)?.name ?? "selected project"}`}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.18, ease: [0.22, 1, 0.36, 1] }
              }
              className={cn(
                "flex items-center bg-popover/82 text-popover-foreground smooth-shadow-ring-md shadow-[0_10px_28px_-12px_color-mix(in_oklab,var(--foreground)_30%,transparent)] backdrop-blur-xl",
                variant === "floating" && "gap-0.5 rounded-xl p-1",
                variant === "dock" &&
                  cn(
                    "gap-0.5 rounded-xl p-1",
                    mobile ? "flex-row" : "flex-col",
                  ),
                variant === "labelled" && "gap-1 rounded-xl p-1",
                mobile && "justify-center rounded-2xl",
              )}
            >
              <ActionButton
                ref={firstActionRef}
                icon={<Pencil aria-hidden="true" size={15} />}
                label="Edit"
                labelled={variant === "labelled"}
                onClick={() => onEdit(visibleId)}
              />
              <ActionButton
                icon={<Copy aria-hidden="true" size={15} />}
                label="Duplicate"
                labelled={variant === "labelled"}
                onClick={() => onDuplicate(visibleId)}
              />
              {variant === "labelled" ? (
                <ActionButton
                  icon={<Archive aria-hidden="true" size={15} />}
                  label="Archive"
                  labelled
                  onClick={() => {
                    setHoverPreviewSuppressed(true);
                    setHoveredId(null);
                    setFocusedId(null);
                    onArchive(visibleId);
                  }}
                />
              ) : (
                <ActionButton
                  icon={<Archive aria-hidden="true" size={15} />}
                  label="Archive"
                  labelled={false}
                  onClick={() => {
                    setHoverPreviewSuppressed(true);
                    setHoveredId(null);
                    setFocusedId(null);
                    onArchive(visibleId);
                  }}
                />
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function ActionButton({
  ref,
  icon,
  label,
  labelled,
  onClick,
}: {
  ref?: React.Ref<HTMLButtonElement>;
  icon: ReactNode;
  label: string;
  labelled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      ref={ref}
      aria-label={labelled ? undefined : label}
      className={cn(
        "flex h-8 items-center justify-center gap-1.5 rounded-lg font-medium text-xs outline-none transition-colors hover:bg-muted active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-ring",
        labelled ? "px-2.5" : "w-8",
      )}
      title={labelled ? undefined : label}
      type="button"
      onClick={onClick}
    >
      {icon}
      {labelled && <span>{label}</span>}
    </button>
  );
}
