"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  CircleDot,
  Filter,
  MoreHorizontal,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/sona-utils";
import MorphSurface, {
  type MorphSurfaceOrigin,
  type MorphSurfaceReducedMotion,
} from "@/registry/sonaui/morph-surface/morph-surface";

type ScenarioState = {
  confirmation: boolean;
  filter: boolean;
  status: boolean;
  toolbar: boolean;
};

const compactState: ScenarioState = {
  confirmation: false,
  filter: false,
  status: false,
  toolbar: false,
};

const expandedState: ScenarioState = {
  confirmation: true,
  filter: true,
  status: true,
  toolbar: true,
};

const surfaceClassName =
  "rounded-2xl bg-card shadow-smooth-ring-lg text-card-foreground";

function Scenario({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <article className="overflow-hidden rounded-[1.5rem] bg-card smooth-shadow-ring-lg">
      <div className="border-border border-b px-5 py-4">
        <h2 className="font-medium text-sm tracking-[-0.01em]">{title}</h2>
        <p className="mt-1 text-muted-foreground text-xs leading-5">
          {description}
        </p>
      </div>
      <div className="grid min-h-72 place-items-center overflow-hidden bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--muted)_72%,transparent),transparent_68%)] p-8">
        {children}
      </div>
    </article>
  );
}

export default function MorphSurfacePrototype() {
  const [states, setStates] = useState<ScenarioState>(compactState);
  const [origin, setOrigin] = useState<MorphSurfaceOrigin>("center");
  const [reducedMotion, setReducedMotion] =
    useState<MorphSurfaceReducedMotion>("user");
  const [narrow, setNarrow] = useState(false);
  const [extraStatusDetail, setExtraStatusDetail] = useState(false);
  const [isStressTesting, setIsStressTesting] = useState(false);
  const filterInputRef = useRef<HTMLInputElement>(null);
  const stressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (stressTimerRef.current) clearTimeout(stressTimerRef.current);
    },
    [],
  );

  useEffect(() => {
    if (!states.filter) return;
    const frame = requestAnimationFrame(() => filterInputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [states.filter]);

  const setScenario = (key: keyof ScenarioState, expanded: boolean) => {
    setStates((current) => ({ ...current, [key]: expanded }));
  };

  const startStressTest = () => {
    if (stressTimerRef.current) clearTimeout(stressTimerRef.current);
    setIsStressTesting(true);
    let step = 0;

    const runStep = () => {
      const expanded = step % 2 === 0;
      setStates(expanded ? expandedState : compactState);
      step += 1;

      if (step < 10) {
        stressTimerRef.current = setTimeout(runStep, 110);
        return;
      }

      stressTimerRef.current = null;
      setIsStressTesting(false);
    };

    runStep();
  };

  const sharedProps = { origin, reducedMotion };

  return (
    <main className="min-h-screen bg-background px-5 py-14 text-foreground sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <header className="grid gap-6 lg:grid-cols-[1fr_25rem] lg:items-end">
          <div>
            <p className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-[0.16em]">
              Morph Surface stress test
            </p>
            <h1 className="max-w-3xl font-semibold text-3xl tracking-[-0.045em] sm:text-4xl">
              One surface, tested across four product patterns.
            </h1>
          </div>
          <p className="text-muted-foreground text-sm leading-6">
            Each example swaps the content inside one persistent surface. The
            controls expose geometry, interruption, resizing, and reduced motion
            behavior without changing the primitive.
          </p>
        </header>

        <section
          aria-label="Prototype controls"
          className="mt-8 flex flex-wrap items-end gap-3 rounded-2xl bg-card p-3 smooth-shadow-ring-lg"
        >
          <label className="grid min-w-36 gap-1.5">
            <span className="px-1 font-medium text-muted-foreground text-[11px] uppercase tracking-[0.12em]">
              Origin
            </span>
            <span className="relative">
              <select
                value={origin}
                onChange={(event) =>
                  setOrigin(event.target.value as MorphSurfaceOrigin)
                }
                className="h-9 w-full appearance-none rounded-lg bg-muted px-3 pr-8 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="center">Center</option>
                <option value="top">Top</option>
                <option value="right">Right</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute top-2.5 right-2.5 size-4 text-muted-foreground"
              />
            </span>
          </label>

          <label className="grid min-w-40 gap-1.5">
            <span className="px-1 font-medium text-muted-foreground text-[11px] uppercase tracking-[0.12em]">
              Reduced motion
            </span>
            <span className="relative">
              <select
                value={reducedMotion}
                onChange={(event) =>
                  setReducedMotion(
                    event.target.value as MorphSurfaceReducedMotion,
                  )
                }
                className="h-9 w-full appearance-none rounded-lg bg-muted px-3 pr-8 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="user">Follow system</option>
                <option value="always">Always reduce</option>
                <option value="never">Never reduce</option>
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute top-2.5 right-2.5 size-4 text-muted-foreground"
              />
            </span>
          </label>

          <button
            type="button"
            aria-pressed={narrow}
            onClick={() => setNarrow((current) => !current)}
            className="h-9 rounded-lg bg-muted px-3 font-medium text-sm outline-none transition-colors hover:bg-muted/75 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring"
          >
            {narrow ? "Use wide canvas" : "Use narrow canvas"}
          </button>

          <button
            type="button"
            disabled={isStressTesting}
            onClick={startStressTest}
            className="flex h-9 items-center gap-2 rounded-lg bg-foreground px-3 font-medium text-background text-sm outline-none transition-opacity hover:opacity-85 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-wait disabled:opacity-55"
          >
            <Zap aria-hidden="true" className="size-4" />
            {isStressTesting ? "Testing…" : "Rapid toggle"}
          </button>

          <button
            type="button"
            onClick={() => {
              setStates(compactState);
              setExtraStatusDetail(false);
            }}
            className="ml-auto grid size-9 place-items-center rounded-lg text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Reset scenarios"
          >
            <RotateCcw aria-hidden="true" className="size-4" />
          </button>
        </section>

        <div
          className={cn(
            "mx-auto mt-6 grid gap-5 lg:grid-cols-2",
            narrow ? "max-w-md" : "max-w-none",
          )}
        >
          <Scenario
            title="Action confirmation"
            description="A compact action grows into a decision with supporting context."
          >
            <MorphSurface.Root
              value={states.confirmation ? "expanded" : "compact"}
              className={surfaceClassName}
              {...sharedProps}
            >
              {states.confirmation ? (
                <div className="w-72 p-4">
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => setScenario("confirmation", false)}
                      aria-label="Return to review action"
                      className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <ArrowLeft aria-hidden="true" className="size-4" />
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm">
                        Apply three changes?
                      </p>
                      <p className="mt-1 text-muted-foreground text-xs leading-5">
                        Two files will update and one will be created.
                      </p>
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          className="rounded-lg bg-foreground px-3 py-1.5 font-medium text-background text-xs"
                        >
                          Apply
                        </button>
                        <button
                          type="button"
                          onClick={() => setScenario("confirmation", false)}
                          className="rounded-lg bg-muted px-3 py-1.5 font-medium text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-2">
                  <button
                    type="button"
                    onClick={() => setScenario("confirmation", true)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 font-medium text-sm outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Review changes
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </button>
                </div>
              )}
            </MorphSurface.Root>
          </Scenario>

          <Scenario
            title="Filter editor"
            description="A filter chip becomes a focused editing surface with form controls."
          >
            <MorphSurface.Root
              value={states.filter ? "expanded" : "compact"}
              className={surfaceClassName}
              {...sharedProps}
            >
              {states.filter ? (
                <div className="w-72 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">Filter projects</p>
                    <button
                      type="button"
                      onClick={() => setScenario("filter", false)}
                      className="text-muted-foreground text-xs hover:text-foreground"
                    >
                      Done
                    </button>
                  </div>
                  <label className="mt-3 flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
                    <Search
                      aria-hidden="true"
                      className="size-4 text-muted-foreground"
                    />
                    <input
                      ref={filterInputRef}
                      placeholder="Search by name"
                      className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                  </label>
                  <div className="mt-3 flex gap-2">
                    {["Active", "Owned", "Recent"].map((filter) => (
                      <button
                        type="button"
                        key={filter}
                        className="rounded-full bg-muted px-2.5 py-1 text-xs first:bg-foreground first:text-background"
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-2">
                  <button
                    type="button"
                    onClick={() => setScenario("filter", true)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 font-medium text-sm outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Filter aria-hidden="true" className="size-4" />
                    Filters
                    <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px]">
                      1
                    </span>
                  </button>
                </div>
              )}
            </MorphSurface.Root>
          </Scenario>

          <Scenario
            title="Live status"
            description="Content grows again while expanded, without changing the surface state."
          >
            <MorphSurface.Root
              value={states.status ? "expanded" : "compact"}
              className={surfaceClassName}
              {...sharedProps}
            >
              {states.status ? (
                <div className="w-72 p-4">
                  <div className="flex items-start gap-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald-500/12 text-emerald-600 dark:text-emerald-400">
                      <Check aria-hidden="true" className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium text-sm">Deployment ready</p>
                        <button
                          type="button"
                          onClick={() => setScenario("status", false)}
                          className="text-muted-foreground text-xs hover:text-foreground"
                        >
                          Close
                        </button>
                      </div>
                      <p className="mt-1 text-muted-foreground text-xs leading-5">
                        Build completed in 42 seconds.
                      </p>
                      {extraStatusDetail && (
                        <p className="mt-2 rounded-lg bg-muted px-3 py-2 text-muted-foreground text-xs leading-5">
                          All checks passed across preview and production
                          environments.
                        </p>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setExtraStatusDetail((current) => !current)
                        }
                        className="mt-3 font-medium text-xs"
                      >
                        {extraStatusDetail ? "Hide detail" : "Add async detail"}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-2">
                  <button
                    type="button"
                    onClick={() => setScenario("status", true)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 font-medium text-sm outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <CircleDot
                      aria-hidden="true"
                      className="size-4 text-emerald-500"
                    />
                    Ready
                  </button>
                </div>
              )}
            </MorphSurface.Root>
          </Scenario>

          <Scenario
            title="Action cluster"
            description="A small trigger expands mostly across the horizontal axis."
          >
            <MorphSurface.Root
              value={states.toolbar ? "expanded" : "compact"}
              className={surfaceClassName}
              {...sharedProps}
            >
              {states.toolbar ? (
                <div className="flex items-center gap-1 p-2">
                  <button
                    type="button"
                    onClick={() => setScenario("toolbar", false)}
                    className="grid size-9 place-items-center rounded-xl text-muted-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Collapse actions"
                  >
                    <ArrowLeft aria-hidden="true" className="size-4" />
                  </button>
                  <span className="mx-1 h-5 w-px bg-border" />
                  {[
                    { label: "Refine", icon: SlidersHorizontal },
                    { label: "Enhance", icon: Sparkles },
                    { label: "Delete", icon: Trash2 },
                  ].map(({ label, icon: Icon }) => (
                    <button
                      type="button"
                      key={label}
                      className="grid size-9 place-items-center rounded-xl text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={label}
                    >
                      <Icon aria-hidden="true" className="size-4" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-2">
                  <button
                    type="button"
                    onClick={() => setScenario("toolbar", true)}
                    className="grid size-9 place-items-center rounded-xl text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Show more actions"
                  >
                    <MoreHorizontal aria-hidden="true" className="size-4" />
                  </button>
                </div>
              )}
            </MorphSurface.Root>
          </Scenario>
        </div>
      </div>
    </main>
  );
}
