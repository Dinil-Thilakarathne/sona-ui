"use client";

import { Check, Mic, Pause, Play, Square } from "lucide-react";
import { useState } from "react";
import LiveActivity from "@/registry/sonaui/live-activity/live-activity";

const waveform = [
  ["a", 18],
  ["b", 34],
  ["c", 22],
  ["d", 48],
  ["e", 30],
  ["f", 56],
  ["g", 40],
  ["h", 24],
  ["i", 50],
  ["j", 64],
  ["k", 34],
  ["l", 44],
  ["m", 20],
  ["n", 38],
  ["o", 28],
  ["p", 52],
  ["q", 32],
  ["r", 18],
] as const;

export default function LiveActivityRecording() {
  const [status, setStatus] = useState<"recording" | "paused" | "saved">(
    "recording",
  );
  const saved = status === "saved";
  const title = saved
    ? "Recording saved"
    : status === "paused"
      ? "Recording paused"
      : "Recording notes";

  return (
    <div className="flex min-h-[28rem] w-full max-w-xl items-start justify-center px-3 py-10">
      <LiveActivity.Root align="start">
        <LiveActivity.Surface className="smooth-shadow-ring-lg rounded-[1.75rem] bg-background">
          <LiveActivity.Compact>
            <LiveActivity.Trigger className="flex h-[4.5rem] w-[18rem] items-center gap-3 rounded-[1.75rem] px-3 text-left">
              <LiveActivity.Shared id="recording-icon">
                <span
                  className={`flex size-11 items-center justify-center rounded-2xl ${
                    saved
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                      : "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {saved ? (
                    <Check aria-hidden="true" className="size-5" />
                  ) : (
                    <Mic aria-hidden="true" className="size-5" />
                  )}
                </span>
              </LiveActivity.Shared>
              <span className="min-w-0 flex-1">
                <LiveActivity.Shared
                  id="recording-title"
                  className="block truncate text-sm font-medium"
                >
                  {title}
                </LiveActivity.Shared>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  Design critique
                </span>
              </span>
              <LiveActivity.Shared
                id="recording-time"
                className="text-sm font-medium tabular-nums"
              >
                {saved ? "18:42" : "12:48"}
              </LiveActivity.Shared>
            </LiveActivity.Trigger>
          </LiveActivity.Compact>

          <LiveActivity.Expanded className="w-[22rem] p-4 pb-4 [@media(pointer:coarse)]:pb-0">
            <div className="flex items-center gap-3">
              <LiveActivity.Shared id="recording-icon">
                <span
                  className={`flex size-11 items-center justify-center rounded-2xl ${
                    saved
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                      : "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {saved ? (
                    <Check aria-hidden="true" className="size-5" />
                  ) : (
                    <Mic aria-hidden="true" className="size-5" />
                  )}
                </span>
              </LiveActivity.Shared>
              <span className="min-w-0 flex-1">
                <LiveActivity.Shared
                  id="recording-title"
                  className="block truncate text-sm font-medium"
                >
                  {title}
                </LiveActivity.Shared>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  Design critique
                </span>
              </span>
              <LiveActivity.Shared
                id="recording-time"
                className="text-sm font-medium tabular-nums"
              >
                {saved ? "18:42" : "12:48"}
              </LiveActivity.Shared>
              <LiveActivity.Close className="flex size-9 items-center justify-center rounded-full text-lg text-muted-foreground hover:bg-muted hover:text-foreground" />
            </div>

            <div
              aria-hidden="true"
              className="mt-5 flex h-20 items-center justify-between gap-1 rounded-2xl bg-muted/60 px-4"
            >
              {waveform.map(([id, height]) => (
                <span
                  key={id}
                  className={`w-1 rounded-full ${
                    saved
                      ? "bg-emerald-500/55"
                      : status === "paused"
                        ? "bg-muted-foreground/35"
                        : "bg-rose-500/65"
                  }`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>

            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              {saved
                ? "Your recording is ready to review and share."
                : "Audio stays visible while you move through the rest of your workspace."}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {saved ? (
                <button
                  type="button"
                  onClick={() => setStatus("recording")}
                  className="col-span-2 min-h-11 rounded-xl bg-foreground text-sm font-medium text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.98] motion-reduce:transform-none"
                >
                  Start another recording
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setStatus((current) =>
                        current === "paused" ? "recording" : "paused",
                      )
                    }
                    className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-muted text-sm font-medium hover:bg-muted/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.98] motion-reduce:transform-none"
                  >
                    {status === "paused" ? (
                      <Play
                        aria-hidden="true"
                        className="size-4 fill-current"
                      />
                    ) : (
                      <Pause
                        aria-hidden="true"
                        className="size-4 fill-current"
                      />
                    )}
                    {status === "paused" ? "Resume" : "Pause"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus("saved")}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-rose-600 text-sm font-medium text-white hover:bg-rose-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 active:scale-[0.98] motion-reduce:transform-none"
                  >
                    <Square
                      aria-hidden="true"
                      className="size-3 fill-current"
                    />
                    Finish
                  </button>
                </>
              )}
            </div>
            <LiveActivity.Handle className="mt-1 text-muted-foreground" />
          </LiveActivity.Expanded>
        </LiveActivity.Surface>
      </LiveActivity.Root>
      <span role="status" className="sr-only">
        {title}
      </span>
    </div>
  );
}
