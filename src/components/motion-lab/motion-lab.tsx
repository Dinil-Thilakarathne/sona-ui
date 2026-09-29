"use client";

import { DialRoot, useDialKitController } from "dialkit";
import {
  ArrowUpRight,
  Check,
  Copy,
  Play,
  RotateCcw,
  Share2,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "dialkit/styles.css";
import Link from "@/components/common/link";
import { useCopyToClipboard } from "@/components/copy-button/copy-button";
import {
  createDialogCode,
  type DialogMotionPresetName,
  type DialogMotionValues,
  dialogMotionControls,
  dialogMotionPresets,
  motionLabRegistry,
  parseDialogMotionValues,
  toMotionTransition,
} from "@/lib/motion-lab/dialog-motion";
import { cn } from "@/lib/utils";
import {
  AnimatedDialog,
  AnimatedDialogClose,
  AnimatedDialogContent,
  AnimatedDialogDescription,
  AnimatedDialogTitle,
  AnimatedDialogTrigger,
} from "@/registry/sonaui/animated-dialog/animated-dialog";

const presetLabels: Record<DialogMotionPresetName, string> = {
  subtle: "Subtle",
  responsive: "Responsive",
  expressive: "Expressive",
};

export function MotionLab() {
  const [previewOpen, setPreviewOpen] = useState(true);
  const [replayKey, setReplayKey] = useState(0);
  const [activePreset, setActivePreset] =
    useState<DialogMotionPresetName | null>("responsive");
  const restoredSharedConfig = useRef(false);
  const { resolvedTheme } = useTheme();

  const replay = useCallback(() => {
    setPreviewOpen(false);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setReplayKey((key) => key + 1);
        setPreviewOpen(true);
      });
    });
  }, []);

  const dial = useDialKitController("Dialog", dialogMotionControls, {
    id: "sona-motion-lab-dialog",
    persist: true,
    onAction(path) {
      if (path === "replay") replay();
    },
  });

  const values = useMemo<DialogMotionValues>(() => {
    const defaults = dialogMotionPresets.responsive;
    const raw = dial.values as Partial<DialogMotionValues>;

    return {
      ...defaults,
      ...raw,
      motion: {
        ...defaults.motion,
        ...(raw.motion ?? {}),
      },
      appearance: {
        ...defaults.appearance,
        ...(raw.appearance ?? {}),
      },
      backdrop: {
        ...defaults.backdrop,
        ...(raw.backdrop ?? {}),
      },
    };
  }, [dial.values]);
  const generatedCode = useMemo(() => createDialogCode(values), [values]);

  useEffect(() => {
    if (restoredSharedConfig.current) return;
    restoredSharedConfig.current = true;
    const encoded = new URL(window.location.href).searchParams.get("config");
    if (!encoded) return;

    try {
      const sharedValues = parseDialogMotionValues(
        JSON.parse(window.atob(encoded)),
      );
      if (sharedValues) {
        dial.setValues(sharedValues);
        setActivePreset(null);
      }
    } catch {
      // Ignore malformed shared configurations and keep the safe defaults.
    }
  }, [dial]);

  useEffect(() => {
    if (!activePreset) return;
    const preset = dialogMotionPresets[activePreset];
    if (JSON.stringify(values) !== JSON.stringify(preset)) {
      setActivePreset(null);
    }
  }, [activePreset, values]);

  function selectPreset(preset: DialogMotionPresetName) {
    dial.setValues(dialogMotionPresets[preset]);
    setActivePreset(preset);
    replay();
  }

  function reset() {
    dial.resetValues();
    setActivePreset("responsive");
    replay();
  }

  return (
    <div className="grid min-h-full grid-cols-1 bg-background lg:grid-cols-[17rem_minmax(0,1fr)_320px]">
      <aside className="hidden min-w-0 overflow-hidden border-r border-border bg-focus-canvas lg:block">
        <MotionLabSidebar />
      </aside>

      <article className="apple-scrollbar scrollbar-gutter-stable min-h-0 min-w-0 overflow-x-hidden overflow-y-auto overscroll-contain bg-background">
        <div className="site-grid-frame min-h-full pt-2 lg:pt-16">
          <div className="site-grid-frame__content mx-auto w-full max-w-(--site-grid-max-width) px-4 pb-20 sm:px-6 lg:px-8">
            <header className="mb-8">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Motion component
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Animated Dialog
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                Adjust a real dialog by eye, compare designed presets, preview
                reduced motion, and copy the exact values into your interface.
              </p>
            </header>

            <WorkbenchToolbar
              activePreset={activePreset}
              onPresetChange={selectPreset}
              onReplay={replay}
              onReset={reset}
              values={values}
            />
            <div className="mt-3 bg-muted/30 p-3 sm:p-5 lg:p-6">
              <DialogPreview
                key={replayKey}
                open={previewOpen}
                onOpenChange={setPreviewOpen}
                values={values}
              />
            </div>
            <CodeOutput code={generatedCode} />
            <section className="border-t border-border py-10 sm:py-14">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                About this motion
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                A spring is only good relative to the interface it moves.
              </h2>
              <div className="mt-5 space-y-5 text-sm leading-7 text-muted-foreground sm:text-base">
                <p>
                  A value that feels natural on a small toggle can feel sluggish
                  on a dialog. Tune timing, distance, scale, and backdrop
                  treatment beside the actual interaction instead of an abstract
                  graph.
                </p>
                <p>
                  Start with a restrained preset, adjust only what the
                  interaction needs, then replay it rapidly. Good interface
                  motion preserves orientation without delaying the task.
                </p>
                <p>
                  Reduced motion keeps the state change clear while removing
                  spatial travel, scale, blur, and spring movement.
                </p>
              </div>
            </section>
          </div>
        </div>
      </article>

      <aside
        aria-label="Motion controls"
        className="min-w-0 border-l border-border bg-background"
      >
        <div className="sticky top-0 min-h-svh pt-10 lg:pt-16">
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-medium text-foreground">Tune motion</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Adjust the values and replay the preview.
            </p>
          </div>
          <div className="motion-lab-dialkit min-h-[460px]">
            <DialRoot
              mode="inline"
              theme={resolvedTheme === "dark" ? "dark" : "light"}
              productionEnabled
            />
          </div>
        </div>
      </aside>
    </div>
  );
}
function WorkbenchToolbar({
  activePreset,
  onPresetChange,
  onReplay,
  onReset,
  values,
}: {
  activePreset: DialogMotionPresetName | null;
  onPresetChange: (preset: DialogMotionPresetName) => void;
  onReplay: () => void;
  onReset: () => void;
  values: DialogMotionValues;
}) {
  const { copied, copy } = useCopyToClipboard();

  function share() {
    const url = new URL(window.location.href);
    url.searchParams.set("interaction", "dialog");
    url.searchParams.set("config", window.btoa(JSON.stringify(values)));
    copy(url.toString());
  }

  return (
    <div className="flex min-h-14 flex-wrap items-center justify-between gap-3 border-b border-border bg-background px-3 py-2 sm:px-4">
      <div className="flex min-w-0 items-center gap-2">
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:inline">
          Dialog motion
        </span>
        <div className="hidden h-5 w-px bg-border sm:block" />
        <fieldset className="flex gap-1">
          <legend className="sr-only">Motion presets</legend>
          {(Object.keys(presetLabels) as DialogMotionPresetName[]).map(
            (preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => onPresetChange(preset)}
                className={cn(
                  "h-8 rounded-md px-2.5 text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground motion-reduce:transition-none",
                  activePreset === preset
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                {presetLabels[preset]}
              </button>
            ),
          )}
        </fieldset>
      </div>

      <div className="flex items-center gap-1">
        <ToolbarButton label="Replay preview" onClick={onReplay}>
          <Play className="size-3.5 fill-current" aria-hidden />
        </ToolbarButton>
        <ToolbarButton label="Reset values" onClick={onReset}>
          <RotateCcw className="size-3.5" aria-hidden />
        </ToolbarButton>
        <ToolbarButton
          label={copied ? "Link copied" : "Copy share link"}
          onClick={share}
        >
          {copied ? (
            <Check className="size-3.5 text-emerald-500" aria-hidden />
          ) : (
            <Share2 className="size-3.5" aria-hidden />
          )}
        </ToolbarButton>
      </div>
    </div>
  );
}

function MotionLabSidebar() {
  return (
    <nav
      aria-label="Motion Lab components"
      className="flex h-full min-h-0 flex-col overflow-hidden p-5 lg:pt-32"
    >
      <div className="shrink-0 px-2">
        <p className="text-sm font-medium">Motion Lab</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Tune registered interactions
        </p>
      </div>
      <div className="apple-scrollbar min-h-0 flex-1 overflow-y-auto pt-5 pb-16">
        {motionLabRegistry.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            aria-current="page"
            className="relative flex h-9 items-center justify-between rounded-lg bg-accent/50 px-2.5 text-sm font-medium text-foreground before:absolute before:inset-y-1.5 before:left-0 before:w-px before:rounded-full before:bg-primary"
          >
            <span>{item.name}</span>
            <span className="size-1.5 rounded-full bg-foreground" aria-hidden />
          </Link>
        ))}
      </div>
    </nav>
  );
}

function ToolbarButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors duration-150 hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground active:scale-[0.97] motion-reduce:transition-none"
    >
      {children}
    </button>
  );
}

function DialogPreview({
  open,
  onOpenChange,
  values,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  values: DialogMotionValues;
}) {
  const from = values.from;
  return (
    <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden rounded-xl bg-background p-5 sm:min-h-[600px] sm:p-10">
      <AnimatedDialog defaultOpen={open} modal={values.modal} onOpenChange={onOpenChange}>
        <AnimatedDialogTrigger>Open dialog</AnimatedDialogTrigger>
        <AnimatedDialogContent from={from} exitTo={values.exitTo}>
          <AnimatedDialogTitle>Invite a collaborator</AnimatedDialogTitle>
          <AnimatedDialogDescription>
            Add someone to this workspace. They will receive an invitation.
          </AnimatedDialogDescription>
          <AnimatedDialogClose className="mt-5">Close</AnimatedDialogClose>
        </AnimatedDialogContent>
      </AnimatedDialog>
    </div>
  );

  /* Legacy parameterized preview retained below while the registry component
   * migration is completed. */
  /* istanbul ignore next */
  const systemReducedMotion = useReducedMotion();
  const [showTrigger, setShowTrigger] = useState(!open);
  const reduceMotion = Boolean(systemReducedMotion || values.reducedMotion);
  const transition = toMotionTransition(values.motion, reduceMotion);
  const initial = reduceMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: values.appearance.y,
        scale: values.appearance.scale,
        filter: `blur(${values.appearance.blur}px)`,
      };
  const exit = reduceMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: Math.max(4, values.appearance.y * 0.5),
        scale: Math.min(0.995, values.appearance.scale + 0.01),
      filter: `blur(${Math.max(2, values.appearance.blur * 0.75)}px)`,
    };

  useEffect(() => {
    if (open) setShowTrigger(false);
  }, [open]);

  return (
    <div className="relative flex min-h-[520px] overflow-hidden rounded-xl bg-background smooth-shadow-ring-sm sm:min-h-[600px]">
      <div className="absolute inset-x-0 top-0 flex h-11 items-center justify-between border-b border-border px-3">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">
          Live preview
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center p-5 pt-16 sm:p-10 sm:pt-20">
        {showTrigger && !open && (
          <button
            type="button"
            onClick={() => {
              setShowTrigger(false);
              onOpenChange(true);
            }}
            className="rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-transform duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground motion-reduce:transition-none"
          >
            Open dialog
          </button>
        )}

        <AnimatePresence initial>
          {open && (
            <motion.div
              className="absolute inset-0 top-11 flex items-center justify-center p-5 sm:p-10"
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{
                opacity: values.backdrop.opacity,
                backdropFilter: reduceMotion
                  ? "blur(0px)"
                  : `blur(${values.backdrop.blur}px)`,
              }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.18 }}
              style={{ backgroundColor: "black" }}
              aria-hidden
            />
          )}
        </AnimatePresence>

        <AnimatePresence
          initial
          onExitComplete={() => {
            if (!open) setShowTrigger(true);
          }}
        >
          {open && (
            <motion.div
              role="dialog"
              aria-modal="false"
              aria-labelledby="motion-lab-dialog-title"
              aria-describedby="motion-lab-dialog-description"
              initial={initial}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={exit}
              transition={transition}
              className="relative z-10 w-full max-w-sm rounded-2xl bg-popover p-5 text-popover-foreground smooth-shadow-ring-lg sm:p-6"
            >
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors duration-150 hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground motion-reduce:transition-none"
                aria-label="Close preview dialog"
              >
                <X className="size-4" aria-hidden />
              </button>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                Project settings
              </p>
              <h2
                id="motion-lab-dialog-title"
                className="pr-8 text-lg font-semibold tracking-tight"
              >
                Invite a collaborator
              </h2>
              <p
                id="motion-lab-dialog-description"
                className="mt-1.5 text-sm leading-6 text-muted-foreground"
              >
                Add someone to this workspace. They will receive an invitation
                by email.
              </p>
              <label
                className="mt-5 block text-xs font-medium"
                htmlFor="preview-email"
              >
                Email address
              </label>
              <input
                id="preview-email"
                type="email"
                placeholder="name@company.com"
                className="mt-2 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-muted-foreground focus:border-foreground/30 focus:ring-3 focus:ring-ring/20 motion-reduce:transition-none"
              />
              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="h-9 rounded-lg bg-secondary px-3 text-sm font-medium transition-colors duration-150 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground motion-reduce:transition-none"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="h-9 rounded-lg bg-foreground px-3 text-sm font-medium text-background transition-transform duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground motion-reduce:transition-none"
                >
                  Send invite
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-background/80 px-2 py-1 font-mono text-[10px] text-muted-foreground backdrop-blur-sm">
        {reduceMotion ? "Reduced motion" : "Motion enabled"}
      </div>
    </div>
  );
}

function CodeOutput({ code }: { code: string }) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <div className="border-t border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <p className="text-sm font-medium text-foreground">Motion code</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Production values from the current preview.
          </p>
        </div>
        <button
          type="button"
          onClick={() => copy(code)}
          className="inline-flex h-8 items-center gap-2 rounded-md px-2.5 text-xs font-medium text-muted-foreground transition-colors duration-150 hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground motion-reduce:transition-none"
        >
          {copied ? (
            <Check className="size-3.5 text-emerald-500" aria-hidden />
          ) : (
            <Copy className="size-3.5" aria-hidden />
          )}
          {copied ? "Copied" : "Copy code"}
        </button>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_280px]">
        <pre className="max-h-72 overflow-auto p-4 font-mono text-xs leading-6 text-foreground sm:p-5">
          <code>{code}</code>
        </pre>
        <div className="border-t border-border p-4 lg:border-l lg:border-t-0">
          <p className="text-xs font-medium text-foreground">
            Want the complete component?
          </p>
          <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
            Sona UI adds dialog semantics, focus management, and reduced-motion
            handling around this transition.
          </p>
          <Link
            href="/docs/animated-dialog"
            className="mt-4 inline-flex h-8 items-center gap-1.5 rounded-md bg-foreground px-2.5 text-xs font-medium text-background transition-transform duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground motion-reduce:transition-none"
          >
            Animated Dialog
            <ArrowUpRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
