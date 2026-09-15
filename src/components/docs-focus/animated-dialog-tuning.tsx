"use client";

import { DialRoot, useDialKitController } from "dialkit";
import { useTheme } from "next-themes";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import "dialkit/styles.css";
import type { Control } from "@/registry/playground";
import { playgroundRegistry } from "@/registry/playground";
import {
  AnimatedDialog,
  AnimatedDialogClose,
  AnimatedDialogContent,
  AnimatedDialogDescription,
  AnimatedDialogTitle,
  AnimatedDialogTrigger,
} from "@/registry/sonaui/animated-dialog/animated-dialog";

type DialogDirection = "top" | "bottom" | "left" | "right" | "center";

type AnimatedDialogTuningState = {
  from: DialogDirection;
  exitTo: DialogDirection;
  modal: boolean;
  replayVersion: number;
  tuningOpen: boolean;
  setTuningOpen: (open: boolean) => void;
};

type TuningToggleState = {
  tuningOpen: boolean;
  setTuningOpen: (open: boolean) => void;
};

const TuningToggleContext = createContext<TuningToggleState | null>(null);

const AnimatedDialogTuningContext =
  createContext<AnimatedDialogTuningState | null>(null);

export function AnimatedDialogTuningProvider({
  children,
  open,
  onOpenChange,
}: {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [replayVersion, setReplayVersion] = useState(0);
  const entry = playgroundRegistry["animated-dialog"];
  const config = useMemo(
    () => (entry ? dialConfigForControls(entry.controls) : {}),
    [entry],
  );
  const dial = useDialKitController("Animated Dialog", config, {
    id: "sona-docs-animated-dialog",
    onAction(path) {
      if (path === "replay") setReplayVersion((version) => version + 1);
    },
  });

  const value = useMemo<AnimatedDialogTuningState>(() => {
    const values = dial.values as Partial<AnimatedDialogTuningState>;
    return {
      from: values.from ?? "bottom",
      exitTo: values.exitTo ?? "bottom",
      modal: values.modal ?? true,
      replayVersion,
      tuningOpen: open,
      setTuningOpen: onOpenChange,
    };
  }, [dial.values, onOpenChange, open, replayVersion]);

  return (
    <AnimatedDialogTuningContext value={value}>
      <TuningToggleContext.Provider
        value={{ tuningOpen: open, setTuningOpen: onOpenChange }}
      >
        {children}
      </TuningToggleContext.Provider>
    </AnimatedDialogTuningContext>
  );
}

export function DocsTuningToggle({
  children,
}: {
  children: (state: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }) => ReactNode;
}) {
  const tuning = useContext(TuningToggleContext);
  if (!tuning) return null;

  return children({
    open: tuning.tuningOpen,
    onOpenChange: tuning.setTuningOpen,
  });
}

function dialConfigForControls(controls: Control[]) {
  return Object.fromEntries(
    controls.map((control) => {
      if (control.type === "select") {
        return [
          control.prop,
          {
            type: "select",
            options: control.options,
            default: control.default,
          },
        ];
      }
      if (control.type === "toggle") {
        return [control.prop, control.default];
      }
      if (control.type === "slider") {
        return [
          control.prop,
          [control.default, control.min, control.max, control.step],
        ];
      }
      if (control.type === "color") {
        return [control.prop, { type: "color", default: control.default }];
      }
      return [control.prop, { type: "text", default: control.default }];
    }),
  );
}

export function GenericTuningProvider({
  component,
  children,
  open,
  onOpenChange,
}: {
  component: string;
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const entry = playgroundRegistry[component];
  const config = useMemo(
    () => (entry ? dialConfigForControls(entry.controls) : {}),
    [entry],
  );
  const dial = useDialKitController(component, config, {
    id: `sona-docs-${component}`,
  });

  return (
    <TuningToggleContext.Provider
      value={{ tuningOpen: open, setTuningOpen: onOpenChange }}
    >
      <GenericTuningContext.Provider
        value={{ values: dial.values as Record<string, unknown>, entry }}
      >
        {children}
      </GenericTuningContext.Provider>
    </TuningToggleContext.Provider>
  );
}

const GenericTuningContext = createContext<{
  values: Record<string, unknown>;
  entry: (typeof playgroundRegistry)[string] | undefined;
} | null>(null);

export function GenericTunablePreview({ fallback }: { fallback: ReactNode }) {
  const tuning = useContext(GenericTuningContext);
  if (!tuning?.entry) return fallback;
  return tuning.entry.render(tuning.values);
}

export function AnimatedDialogTuningPanel() {
  const { resolvedTheme } = useTheme();

  return (
    <aside
      aria-label="Component tuning controls"
      className="h-full min-w-0 border-l border-border bg-background"
    >
      <div className="border-b border-border px-4 py-4">
        <p className="text-sm font-medium text-foreground">Tune component</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Adjust the component's public motion props and preview the result.
        </p>
      </div>
      <div className="motion-lab-dialkit min-h-[460px]">
        <DialRoot
          mode="inline"
          theme={resolvedTheme === "dark" ? "dark" : "light"}
          productionEnabled
        />
      </div>
    </aside>
  );
}

export function TunableAnimatedDialogPreview({
  fallback,
}: {
  fallback: ReactNode;
}) {
  const tuning = useContext(AnimatedDialogTuningContext);
  const [open, setOpen] = useState(false);
  const replayVersion = tuning?.replayVersion ?? 0;

  useEffect(() => {
    if (replayVersion === 0) return;
    setOpen(false);
    let openFrame = 0;
    const closeFrame = window.requestAnimationFrame(() => {
      openFrame = window.requestAnimationFrame(() => setOpen(true));
    });
    return () => {
      window.cancelAnimationFrame(closeFrame);
      window.cancelAnimationFrame(openFrame);
    };
  }, [replayVersion]);

  if (!tuning) return fallback;

  return (
    <div className="flex flex-col items-center gap-6">
      <AnimatedDialog open={open} onOpenChange={setOpen} modal={tuning.modal}>
        <AnimatedDialogTrigger>Open Dialog</AnimatedDialogTrigger>
        <AnimatedDialogContent from={tuning.from} exitTo={tuning.exitTo}>
          <AnimatedDialogTitle>Directional Transition</AnimatedDialogTitle>
          <AnimatedDialogDescription>
            This dialog enters from {tuning.from} and exits toward{" "}
            {tuning.exitTo}.
          </AnimatedDialogDescription>
          <div className="mt-6 flex justify-end gap-3">
            <AnimatedDialogClose>Cancel</AnimatedDialogClose>
            <AnimatedDialogClose className="bg-primary text-primary-foreground">
              Confirm
            </AnimatedDialogClose>
          </div>
        </AnimatedDialogContent>
      </AnimatedDialog>
    </div>
  );
}
