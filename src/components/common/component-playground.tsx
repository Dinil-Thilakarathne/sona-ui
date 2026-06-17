"use client";

import { Slider } from "@base-ui/react/slider";
import { Switch } from "@base-ui/react/switch";
import { useMemo, useState } from "react";

import ComponentWrapper from "@/components/common/component-wrapper";
import { cn } from "@/lib/utils";
import { type Control, playgroundRegistry } from "@/registry/playground";

interface ComponentPlaygroundProps {
  component: string;
}

function defaultsFor(controls: Control[]): Record<string, unknown> {
  return Object.fromEntries(controls.map((c) => [c.prop, c.default]));
}

const ComponentPlayground: React.FC<ComponentPlaygroundProps> = ({
  component,
}) => {
  const entry = playgroundRegistry[component];

  const [values, setValues] = useState<Record<string, unknown>>(() =>
    entry ? defaultsFor(entry.controls) : {},
  );

  const rendered = useMemo(
    () => (entry ? entry.render(values) : null),
    [entry, values],
  );

  if (!entry) {
    return (
      <div className="text-muted-foreground text-sm">
        No playground registered for component{" "}
        <code className="bg-muted rounded px-1 py-0.5">{component}</code>.
      </div>
    );
  }

  const set = (prop: string, value: unknown) =>
    setValues((prev) => ({ ...prev, [prop]: value }));

  const reset = () => setValues(defaultsFor(entry.controls));

  return (
    <div className="my-3 grid w-full gap-4 lg:grid-cols-[1fr_280px]">
      <ComponentWrapper className="min-h-[300px]">{rendered}</ComponentWrapper>

      <div className="bg-secondary flex flex-col gap-5 rounded-xl border p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-foreground text-sm font-semibold">
            Controls
          </span>
          <button
            type="button"
            onClick={reset}
            className="text-muted-foreground hover:text-foreground text-xs underline underline-offset-2"
          >
            Reset
          </button>
        </div>

        {entry.controls.map((control) => (
          <ControlField
            key={control.prop}
            control={control}
            value={values[control.prop]}
            onChange={(v) => set(control.prop, v)}
          />
        ))}
      </div>
    </div>
  );
};

interface ControlFieldProps {
  control: Control;
  value: unknown;
  onChange: (value: unknown) => void;
}

function ControlField({ control, value, onChange }: ControlFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-muted-foreground flex items-center justify-between text-xs font-medium">
        {control.label}
        {control.type === "slider" && (
          <span className="text-foreground tabular-nums">{String(value)}</span>
        )}
      </span>

      {control.type === "slider" && (
        <Slider.Root
          value={value as number}
          onValueChange={(v) => onChange(v as number)}
          min={control.min}
          max={control.max}
          step={control.step ?? 1}
        >
          <Slider.Control className="flex h-5 w-full items-center">
            <Slider.Track className="bg-accent relative h-1.5 w-full rounded-full">
              <Slider.Indicator className="bg-foreground rounded-full" />
              <Slider.Thumb className="bg-background border-foreground size-4 rounded-full border-2 shadow-sm outline-none" />
            </Slider.Track>
          </Slider.Control>
        </Slider.Root>
      )}

      {control.type === "text" && (
        <input
          type="text"
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          className="border-border bg-background text-foreground rounded-md border px-2.5 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
        />
      )}

      {control.type === "toggle" && (
        <Switch.Root
          checked={value as boolean}
          onCheckedChange={(checked) => onChange(checked)}
          className={cn(
            "relative flex h-6 w-10 rounded-full p-0.5 transition-colors",
            value ? "bg-foreground" : "bg-accent",
          )}
        >
          <Switch.Thumb className="bg-background size-5 rounded-full shadow-sm transition-transform data-[checked]:translate-x-4" />
        </Switch.Root>
      )}

      {control.type === "select" && (
        <select
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          className="border-border bg-background text-foreground rounded-md border px-2.5 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
        >
          {control.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default ComponentPlayground;
