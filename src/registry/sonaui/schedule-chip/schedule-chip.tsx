"use client";

import { CalendarClock, ChevronRight, LoaderCircle } from "lucide-react";
import type { HTMLMotionProps } from "motion/react";
import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/sona-utils";
import MorphSurface from "../morph-surface/morph-surface";

export interface ScheduleValue {
  /** A calendar date formatted as YYYY-MM-DD. */
  date: string;
  /** A local time formatted as HH:mm. */
  time: string;
  /** An IANA timezone name such as America/New_York. */
  timezone: string;
}

export interface SchedulePreset {
  /** The readable label shown in the preset row. */
  label: string;
  /** The schedule copied into the draft when selected. */
  value: ScheduleValue;
}

export interface ScheduleChipProps
  extends Omit<HTMLMotionProps<"div">, "onChange"> {
  /** The committed schedule. Use null when no schedule is set. */
  value: ScheduleValue | null;
  /** Called after a schedule is successfully applied or cleared. */
  onValueChange?: (value: ScheduleValue | null) => void;
  /** Persists the draft before it is committed. Throw or reject to keep the editor open. */
  onApply?: (value: ScheduleValue | null) => void | Promise<void>;
  /** Converts the committed or draft value into the readable summary. */
  formatSummary?: (value: ScheduleValue | null) => string;
  /** Returns an error message for an invalid draft, or null when it is valid. */
  validate?: (value: ScheduleValue | null) => string | null;
  /** Quick schedule choices displayed above the precise fields. @default [] */
  presets?: SchedulePreset[];
  /** Timezones available in the editor. @default ["UTC"] */
  timezones?: string[];
  /** Accessible label for the schedule control. @default "Edit schedule" */
  label?: string;
  /** Text shown while no schedule is committed. @default "Add schedule" */
  emptyLabel?: string;
  /** Message shown when persistence fails. @default "Could not update the schedule. Try again." */
  errorMessage?: string;
}

const spring = { type: "spring", bounce: 0.2, duration: 0.34 } as const;

function defaultFormatSummary(value: ScheduleValue | null) {
  if (!value) return "Add schedule";
  return `${value.date}, ${value.time}`;
}

export default function ScheduleChip({
  value,
  onValueChange,
  onApply,
  formatSummary = defaultFormatSummary,
  validate,
  presets = [],
  timezones = ["UTC"],
  label = "Edit schedule",
  emptyLabel = "Add schedule",
  errorMessage = "Could not update the schedule. Try again.",
  className,
  ...props
}: ScheduleChipProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<ScheduleValue | null>(value);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const headingId = useId();
  const errorId = useId();

  useEffect(() => {
    if (!open) setDraft(value);
  }, [open, value]);

  useEffect(() => {
    if (open) dateRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (pending || rootRef.current?.contains(event.target as Node)) return;
      setDraft(value);
      setError(null);
      setInvalid(false);
      setOpen(false);
      requestAnimationFrame(() => triggerRef.current?.focus());
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open, pending, value]);

  const restoreTriggerFocus = () => {
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const close = () => {
    if (pending) return;
    setDraft(value);
    setError(null);
    setInvalid(false);
    setOpen(false);
    restoreTriggerFocus();
  };

  const apply = async () => {
    const validationError = validate?.(draft) ?? null;
    if (validationError) {
      setError(validationError);
      setInvalid(true);
      dateRef.current?.focus();
      return;
    }

    setPending(true);
    setError(null);
    setInvalid(false);
    try {
      await onApply?.(draft);
      onValueChange?.(draft);
      setOpen(false);
      restoreTriggerFocus();
    } catch {
      setError(errorMessage);
    } finally {
      setPending(false);
    }
  };

  const updateDraft = (next: Partial<ScheduleValue>) => {
    setDraft((current) => ({
      date: current?.date ?? "",
      time: current?.time ?? "",
      timezone: current?.timezone ?? timezones[0] ?? "UTC",
      ...next,
    }));
    setError(null);
    setInvalid(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      close();
    }
  };

  const summary = value ? formatSummary(value) : emptyLabel;
  const draftSummary =
    draft?.date && draft.time ? formatSummary(draft) : "No schedule selected";

  return (
    <MorphSurface.Root
      ref={rootRef}
      value={open ? "editor" : "summary"}
      origin="center"
      transition={spring}
      contentScale={1}
      onKeyDown={handleKeyDown}
      anchorClassName={cn("overflow-visible", className)}
      className="smooth-shadow-ring-lg smooth-ring-black/8 overflow-hidden rounded-2xl bg-background dark:smooth-ring-white/14"
      clipClassName="rounded-[inherit]"
      {...props}
    >
      {!open ? (
        <button
          ref={triggerRef}
          type="button"
          aria-expanded="false"
          aria-label={`${label}: ${summary}`}
          onClick={() => {
            setDraft(value);
            setError(null);
            setInvalid(false);
            setOpen(true);
          }}
          className="group flex h-10 cursor-pointer items-center gap-2 rounded-2xl bg-background px-3.5 text-sm font-medium text-foreground outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <CalendarClock className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
          <span className="whitespace-nowrap">{summary}</span>
          <ChevronRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </button>
      ) : (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby={headingId}
          aria-describedby={error ? errorId : undefined}
          className="w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl bg-background p-3.5 text-foreground"
        >
          <div className="flex items-start gap-3 px-1 pb-3">
            <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-accent text-foreground">
              <CalendarClock className="size-4" />
            </span>
            <div className="min-w-0">
              <h2 id={headingId} className="text-sm font-semibold">
                Schedule
              </h2>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {draftSummary}
              </p>
            </div>
          </div>

          {presets.length > 0 && (
            <fieldset
              className="mb-3 flex flex-wrap gap-1.5"
              aria-label="Schedule presets"
            >
              {presets.map((preset) => {
                const selected =
                  draft?.date === preset.value.date &&
                  draft.time === preset.value.time &&
                  draft.timezone === preset.value.timezone;
                return (
                  <button
                    key={`${preset.label}-${preset.value.date}-${preset.value.time}`}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      setDraft(preset.value);
                      setError(null);
                      setInvalid(false);
                    }}
                    className="cursor-pointer rounded-full bg-secondary px-2.5 py-1.5 text-xs font-medium text-secondary-foreground outline-none transition-colors hover:bg-accent aria-pressed:bg-foreground aria-pressed:text-background focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {preset.label}
                  </button>
                );
              })}
            </fieldset>
          )}

          <div className="grid grid-cols-2 gap-2">
            <label className="grid gap-1.5 text-xs font-medium text-muted-foreground">
              Date
              <input
                ref={dateRef}
                type="date"
                value={draft?.date ?? ""}
                aria-invalid={invalid}
                aria-describedby={error ? errorId : undefined}
                onChange={(event) => updateDraft({ date: event.target.value })}
                className="h-10 min-w-0 rounded-lg border border-input bg-transparent px-2.5 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <label className="grid gap-1.5 text-xs font-medium text-muted-foreground">
              Time
              <input
                type="time"
                value={draft?.time ?? ""}
                aria-invalid={invalid}
                aria-describedby={error ? errorId : undefined}
                onChange={(event) => updateDraft({ time: event.target.value })}
                className="h-10 min-w-0 rounded-lg border border-input bg-transparent px-2.5 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
          </div>

          <label className="mt-2 grid gap-1.5 text-xs font-medium text-muted-foreground">
            Timezone
            <select
              value={draft?.timezone ?? timezones[0] ?? "UTC"}
              onChange={(event) =>
                updateDraft({ timezone: event.target.value })
              }
              className="h-10 rounded-lg border border-input bg-transparent px-2.5 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {timezones.map((timezone) => (
                <option key={timezone} value={timezone}>
                  {timezone}
                </option>
              ))}
            </select>
          </label>

          <div className="min-h-5 pt-1.5">
            {error && (
              <p id={errorId} role="alert" className="text-xs text-destructive">
                {error}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              type="button"
              disabled={pending}
              onClick={() => {
                setDraft(null);
                setError(null);
                setInvalid(false);
              }}
              className="cursor-pointer rounded-lg px-2 py-2 text-xs font-medium text-muted-foreground outline-none transition-colors hover:bg-destructive/10 hover:text-destructive disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring"
            >
              Clear
            </button>
            <div className="flex gap-1.5">
              <button
                type="button"
                disabled={pending}
                onClick={close}
                className="cursor-pointer rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={apply}
                className="flex min-w-20 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-xs font-medium text-background outline-none transition-opacity disabled:cursor-not-allowed disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {pending && <LoaderCircle className="size-3.5 animate-spin" />}
                {pending ? "Saving" : "Apply"}
              </button>
            </div>
          </div>
        </div>
      )}
    </MorphSurface.Root>
  );
}
