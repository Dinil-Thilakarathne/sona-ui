"use client";

import { RotateCcw } from "lucide-react";
import {
  type KeyboardEvent,
  type PointerEvent,
  useMemo,
  useRef,
  useState,
} from "react";

import FluidTabs from "@/registry/sonaui/fluid-tabs/fluid-tabs";
import {
  type InspectionAnnotation,
  InspectionOverlay,
  type InspectionTarget,
  useInspectionTargets,
} from "./inspection-board";

const boardWidth = 1200;
const boardHeight = 675;

const tabs = [
  { value: "overview", title: "Overview" },
  { value: "activity", title: "Activity" },
  { value: "settings", title: "Settings" },
];

const targets: InspectionTarget[] = [
  {
    id: "board",
    resolve: (root) => root,
  },
  {
    id: "component",
    resolve: (root) => root.querySelector("[data-anatomy-component]"),
  },
  {
    id: "list",
    resolve: (root) => root.querySelector('[role="tablist"]'),
  },
  {
    id: "trigger",
    resolve: (root) => root.querySelector('[role="tab"][aria-selected="true"]'),
  },
  {
    id: "first-trigger",
    resolve: (root) => root.querySelectorAll('[role="tab"]')[0] ?? null,
  },
  {
    id: "second-trigger",
    resolve: (root) => root.querySelectorAll('[role="tab"]')[1] ?? null,
  },
  {
    id: "last-trigger",
    resolve: (root) => root.querySelectorAll('[role="tab"]')[2] ?? null,
  },
  {
    id: "hover-cue",
    resolve: (root) =>
      root.querySelector('[role="tab"][data-hovered] .anatomy-hover-cue') ??
      root.querySelectorAll(".anatomy-hover-cue")[1] ??
      null,
  },
  {
    id: "active-surface",
    resolve: (root) => root.querySelector(".anatomy-active-indicator"),
  },
];

function formatPixels(value: number | undefined) {
  return value === undefined ? "—" : `${Math.round(value)} px`;
}

export default function FluidTabsInspectionBoard() {
  const boardRef = useRef<HTMLDivElement>(null);
  const [resetKey, setResetKey] = useState(0);
  const [inputMode, setInputMode] = useState<"pointer" | "keyboard">("pointer");
  const rects = useInspectionTargets(boardRef, targets);

  const annotations = useMemo<InspectionAnnotation[]>(
    () => [
      {
        box: false,
        id: "component-label",
        label: "FluidTabs",
        note: "Public component",
        target: "component",
        x: 0.22,
        y: 0.25,
        tone: "neutral",
      },
      {
        id: "list-label",
        label: "Tab List",
        note: 'role="tablist"',
        target: "list",
        x: 0.72,
        y: 0.3,
        tone: "blue",
      },
      {
        id: "trigger-label",
        label: "Tab Trigger",
        note: 'role="tab" · aria-selected',
        target: "trigger",
        x: 0.72,
        y: 0.41,
        tone: "blue",
      },
      {
        id: "hover-label",
        label: "Hover Cue",
        note: "Pointer preview · selection unchanged",
        target: "hover-cue",
        x: 0.72,
        y: 0.52,
        tone: "gold",
      },
      {
        id: "surface-label",
        label: "Active Surface",
        note: "One visual object · current mount point",
        target: "active-surface",
        x: 0.72,
        y: 0.63,
        tone: "blue",
      },
      {
        box: false,
        id: "bridge-label",
        label: "Shared Layout Bridge",
        note: "LayoutGroup + shared layoutId",
        target: "active-surface",
        x: 0.72,
        y: 0.74,
        tone: "neutral",
      },
    ],
    [],
  );

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const tab = (event.target as HTMLElement).closest<HTMLElement>(
      '[role="tab"]',
    );
    const previousTab = boardRef.current?.querySelector(
      '[role="tab"][data-hovered]',
    );
    if (previousTab !== tab) previousTab?.removeAttribute("data-hovered");
    tab?.setAttribute("data-hovered", "");
  };

  const clearHover = () => {
    boardRef.current
      ?.querySelector('[role="tab"][data-hovered]')
      ?.removeAttribute("data-hovered");
  };

  const onPointerDown = (_event: PointerEvent<HTMLDivElement>) => {
    setInputMode("pointer");
  };

  const onKeyDown = (_event: KeyboardEvent<HTMLDivElement>) => {
    setInputMode("keyboard");
  };

  const gap =
    rects["first-trigger"] && rects["second-trigger"]
      ? rects["second-trigger"].x -
        (rects["first-trigger"].x + rects["first-trigger"].width)
      : undefined;
  const maxTravel =
    rects["first-trigger"] && rects["last-trigger"]
      ? rects["last-trigger"].x +
        rects["last-trigger"].width / 2 -
        (rects["first-trigger"].x + rects["first-trigger"].width / 2)
      : undefined;

  return (
    <main className="min-h-screen bg-[#151515] px-5 py-8 text-white selection:bg-sky-200/20">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1200px] flex-col items-center justify-center gap-5">
        <section
          ref={boardRef}
          aria-label="Fluid Tabs component anatomy inspection board"
          className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#202020] smooth-shadow-ring-xl shadow-[0_32px_90px_rgba(0,0,0,0.3)]"
        >
          <div className="absolute left-[8%] top-[8%]">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/25">
              Component anatomy / 01
            </p>
            <h1 className="mt-2 text-[17px] font-medium tracking-[-0.02em] text-white/80">
              Fluid Tabs
            </h1>
          </div>

          <div className="absolute left-[28%] top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              data-anatomy-component=""
              key={resetKey}
              onKeyDownCapture={onKeyDown}
              onPointerDownCapture={onPointerDown}
              onPointerLeave={clearHover}
              onPointerMove={onPointerMove}
            >
              <FluidTabs
                activeIndicatorClassName="anatomy-active-indicator bg-[var(--fluid-tabs-surface-active)]"
                hoverClassName="anatomy-hover-cue bg-[var(--fluid-tabs-hover)]"
                tabs={tabs}
              />
            </div>
          </div>

          <InspectionOverlay
            annotations={annotations}
            height={rects.board?.height ?? boardHeight}
            rects={rects}
            width={rects.board?.width ?? boardWidth}
          />

          {rects.list ? (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute font-mono text-[9px] text-white/30"
              style={{
                left: rects.list.x + rects.list.width / 2,
                top: rects.list.y - 30,
                transform: "translateX(-50%)",
              }}
            >
              <span className="block h-2 border-x border-t border-white/20" />
              <span className="mt-1 block text-center">
                {formatPixels(rects.list.width)}
              </span>
            </div>
          ) : null}

          {rects.trigger ? (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute font-mono text-[9px] text-white/30"
              style={{
                left: rects.trigger.x - 34,
                top: rects.trigger.y + rects.trigger.height / 2,
                transform: "translateY(-50%)",
              }}
            >
              <span className="flex items-center gap-1.5">
                {formatPixels(rects.trigger.height)}
                <span className="h-9 w-2 border-y border-l border-white/20" />
              </span>
            </div>
          ) : null}

          <div className="absolute bottom-[8%] left-[8%] right-[8%] flex items-end justify-between border-t border-white/[0.07] pt-4">
            <div className="flex gap-8 font-mono text-[10px]">
              <div>
                <p className="text-white/25">Input</p>
                <p className="mt-1.5 text-white/65">
                  {inputMode === "pointer"
                    ? "Pointer → Spring"
                    : "Keyboard → Instant"}
                </p>
              </div>
              <div>
                <p className="text-white/25">Transition</p>
                <p className="mt-1.5 text-white/65">
                  {inputMode === "pointer" ? "320 / 40 / 0.9" : "duration 0"}
                </p>
              </div>
              <div>
                <p className="text-white/25">List geometry</p>
                <p className="mt-1.5 text-white/65">
                  4 px pad · {formatPixels(gap)} gap
                </p>
              </div>
              <div>
                <p className="text-white/25">Max travel</p>
                <p className="mt-1.5 text-white/65">
                  {formatPixels(maxTravel)} centre to centre
                </p>
              </div>
            </div>
            <div className="font-mono text-[10px] text-white/35">
              Reduced motion → Instant
            </div>
          </div>
        </section>

        <div className="flex w-full items-center justify-between px-1 text-xs text-white/40">
          <p>
            Hover a tab, click across the list, then use arrow keys to compare
            paths.
          </p>
          <button
            className="flex h-8 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 text-white/60 transition-colors duration-150 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 active:scale-[0.98]"
            onClick={() => {
              setInputMode("pointer");
              clearHover();
              setResetKey((value) => value + 1);
            }}
            type="button"
          >
            <RotateCcw aria-hidden="true" className="size-3.5" />
            Reset
          </button>
        </div>
      </div>
    </main>
  );
}
