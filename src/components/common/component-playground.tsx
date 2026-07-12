"use client";

import { Slider } from "@base-ui/react/slider";
import { Switch } from "@base-ui/react/switch";
import {
  Component,
  type ErrorInfo,
  type ReactNode,
  useId,
  useMemo,
  useState,
} from "react";

import ComponentWrapper from "@/components/common/component-wrapper";
import { cn } from "@/lib/utils";
import { type Control, playgroundRegistry } from "@/registry/playground";

interface ComponentPlaygroundProps {
  component: string;
  controlsOpen?: boolean;
}

function defaultsFor(controls: Control[]): Record<string, unknown> {
  return Object.fromEntries(controls.map((c) => [c.prop, c.default]));
}

class PlaygroundErrorBoundary extends Component<
  { children: ReactNode; onReset: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // Keep the docs page usable when a component rejects an experimental value.
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
          <p className="text-sm font-medium text-foreground">
            This playground could not render with the selected values.
          </p>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false });
              this.props.onReset();
            }}
            className="rounded-md text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Reset controls
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const ComponentPlayground: React.FC<ComponentPlaygroundProps> = ({
  component,
  controlsOpen = true,
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

  const defaults = defaultsFor(entry.controls);
  const isDirty = entry.controls.some(
    (control) => values[control.prop] !== defaults[control.prop],
  );
  const reset = () => setValues(defaults);

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 my-3 max-w-screen w-full",
        controlsOpen ? "lg:grid-cols-[75%_1fr]" : "grid-cols-1",
      )}
    >
      <ComponentWrapper className="min-h-[300px]">
        <PlaygroundErrorBoundary onReset={reset}>
          {rendered}
        </PlaygroundErrorBoundary>
      </ComponentWrapper>

      {controlsOpen && (
        <fieldset className="flex flex-col gap-5 rounded-xl border bg-secondary p-4 shadow-sm">
          <legend className="sr-only">Controls</legend>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground text-sm">
              Controls
            </span>
            <button
              type="button"
              onClick={reset}
              disabled={!isDirty}
              className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
        </fieldset>
      )}
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
  const shortHex = color.match(/^#([0-9a-fA-F]{3})$/);
  if (shortHex) {
    return `#${shortHex[1]
      .split("")
      .map((channel) => `${channel}${channel}`)
      .join("")}`;
  }
  if (/^#[0-9a-fA-F]{6}$/.test(color)) return color;
  const match = color.match(/rgba?\(([^)]+)\)/);
  if (match) {
    const [r, g, b] = match[1].split(",").map((n) => {
      const value = n.trim();
      const parsed = Number.parseFloat(value);
      return value.endsWith("%") ? (parsed / 100) * 255 : parsed;
    });
    const channel = (n: number) =>
      Math.max(0, Math.min(255, Math.round(n)))
        .toString(16)
        .padStart(2, "0");
    return `#${channel(r)}${channel(g)}${channel(b)}`;
  }
  return "#000000";
}

function isValidColor(value: string) {
  if (!value.trim()) return false;
  if (typeof CSS === "undefined" || typeof CSS.supports !== "function") {
    return /^#[0-9a-f]{3,8}$/i.test(value.trim());
  }
  return CSS.supports("color", value);
}

function ControlField({ control, value, onChange }: ControlFieldProps) {
  const controlId = useId();
  const labelId = `${controlId}-label`;
  const colorValue = (value as string) ?? "#000000";
  const colorIsValid = control.type !== "color" || isValidColor(colorValue);

  return (
    <div className="flex flex-col gap-2">
      <label
        id={labelId}
        htmlFor={controlId}
        className="flex items-center justify-between font-medium text-muted-foreground text-xs"
      >
        {control.label}
        {control.type === "slider" && (
          <span className="text-foreground tabular-nums">{String(value)}</span>
        )}
      </label>

      {control.type === "slider" && (
        <Slider.Root
          aria-labelledby={labelId}
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
          id={controlId}
          aria-labelledby={labelId}
          type="text"
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          className="px-2.5 py-1.5 text-foreground text-sm bg-background border border-border outline-none rounded-md focus:ring-2 focus:ring-ring/40"
        />
      )}

      {control.type === "color" && (
        <div className="flex gap-2 items-center">
          <input
            id={`${controlId}-swatch`}
            aria-labelledby={labelId}
            type="color"
            aria-label={`${control.label} swatch`}
            value={toHex((value as string) ?? "#000000")}
            onChange={(e) => onChange(e.target.value)}
            className="shrink-0 p-1 h-9 w-9 bg-transparent border border-border rounded-md cursor-pointer"
          />
          <input
            id={controlId}
            aria-labelledby={labelId}
            type="text"
            value={colorValue}
            aria-invalid={!colorIsValid}
            onChange={(e) => onChange(e.target.value)}
            spellCheck={false}
            className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 font-mono text-xs text-foreground outline-none focus:ring-2 focus:ring-ring/40 aria-[invalid=true]:border-destructive"
          />
        </div>
      )}

      {control.type === "toggle" && (
        <Switch.Root
          aria-labelledby={labelId}
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
          id={controlId}
          aria-labelledby={labelId}
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
