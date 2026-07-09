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
        <code className="px-1 py-0.5 bg-muted rounded">{component}</code>.
      </div>
    );
  }

  const set = (prop: string, value: unknown) =>
    setValues((prev) => ({ ...prev, [prop]: value }));

  const reset = () => setValues(defaultsFor(entry.controls));

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[80%_1fr] my-3 max-w-screen w-full">
      <ComponentWrapper className="min-h-[300px]">{rendered}</ComponentWrapper>

      <div className="flex flex-col gap-5 p-4 bg-secondary border rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-foreground text-sm">
            Controls
          </span>
          <button
            type="button"
            onClick={reset}
            className="text-muted-foreground text-xs underline underline-offset-2 hover:text-foreground"
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

/** Coerces any CSS color (hex, rgb, rgba) to #rrggbb for the native swatch. */
function toHex(color: string): string {
  if (/^#[0-9a-fA-F]{6}$/.test(color)) return color;
  const match = color.match(/rgba?\(([^)]+)\)/);
  if (match) {
    const [r, g, b] = match[1]
      .split(",")
      .map((n) => Number.parseFloat(n.trim()));
    const channel = (n: number) =>
      Math.max(0, Math.min(255, Math.round(n)))
        .toString(16)
        .padStart(2, "0");
    return `#${channel(r)}${channel(g)}${channel(b)}`;
  }
  return "#000000";
}

function ControlField({ control, value, onChange }: ControlFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="flex items-center justify-between font-medium text-muted-foreground text-xs">
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
          <Slider.Control className="flex items-center h-5 w-full">
            <Slider.Track className="relative h-1.5 w-full bg-accent rounded-full">
              <Slider.Indicator className="bg-foreground rounded-full" />
              <Slider.Thumb className="size-4 bg-background border-2 border-foreground outline-none rounded-full shadow-sm" />
            </Slider.Track>
          </Slider.Control>
        </Slider.Root>
      )}

      {control.type === "text" && (
        <input
          type="text"
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          className="px-2.5 py-1.5 text-foreground text-sm bg-background border border-border outline-none rounded-md focus:ring-2 focus:ring-ring/40"
        />
      )}

      {control.type === "color" && (
        <div className="flex gap-2 items-center">
          <input
            type="color"
            aria-label={`${control.label} swatch`}
            value={toHex((value as string) ?? "#000000")}
            onChange={(e) => onChange(e.target.value)}
            className="shrink-0 p-1 h-9 w-9 bg-transparent border border-border rounded-md cursor-pointer"
          />
          <input
            type="text"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            spellCheck={false}
            className="px-2.5 py-1.5 w-full font-mono text-foreground text-xs bg-background border border-border outline-none rounded-md focus:ring-2 focus:ring-ring/40"
          />
        </div>
      )}

      {control.type === "toggle" && (
        <Switch.Root
          checked={value as boolean}
          onCheckedChange={(checked) => onChange(checked)}
          className={cn(
            "relative flex h-6 w-10 cursor-pointer rounded-full p-0.5 transition-[background-color,scale] duration-200 ease-out active:scale-95 motion-reduce:transition-none",
            value ? "bg-foreground" : "bg-accent",
          )}
        >
          <Switch.Thumb className="size-5 bg-background rounded-full shadow-sm duration-200 ease-out transition-transform motion-reduce:transition-none data-[checked]:translate-x-4" />
        </Switch.Root>
      )}

      {control.type === "select" && (
        <select
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          className="px-2.5 py-1.5 text-foreground text-sm bg-background border border-border outline-none rounded-md focus:ring-2 focus:ring-ring/40"
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
