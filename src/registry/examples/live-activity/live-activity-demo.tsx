"use client";

import { ArrowDownToLine, Check, FileText } from "lucide-react";
import { useState } from "react";
import LiveActivity, {
  type LiveActivityProps,
} from "@/registry/sonaui/live-activity/live-activity";

export function LiveActivityExample({
  direction = "down",
  align = "center",
  gestures = "touch",
  motion = "auto",
}: Pick<LiveActivityProps, "direction" | "align" | "gestures" | "motion">) {
  const [status, setStatus] = useState<"exporting" | "ready" | "cancelled">(
    "exporting",
  );
  const title =
    status === "ready"
      ? "Report ready"
      : status === "cancelled"
        ? "Export cancelled"
        : "Exporting report";
  const icon =
    status === "ready" ? (
      <Check aria-hidden="true" className="size-4" />
    ) : (
      <FileText aria-hidden="true" className="size-4" />
    );
  return (
    <div className="flex min-h-96 w-full max-w-lg flex-col justify-between gap-6 py-8">
      {direction === "up" && <div className="flex-1" />}
      <LiveActivity.Root
        direction={direction}
        align={align}
        gestures={gestures}
        motion={motion}
      >
        <LiveActivity.Surface className="smooth-shadow-ring-lg rounded-3xl bg-background">
          <LiveActivity.Compact>
            <LiveActivity.Trigger className="flex min-h-14 items-center gap-3 rounded-3xl px-5 text-sm">
              <LiveActivity.Shared id="icon" className="text-muted-foreground">
                {icon}
              </LiveActivity.Shared>
              <LiveActivity.Shared id="title" className="font-medium">
                {title}
              </LiveActivity.Shared>
              <span className="text-muted-foreground tabular-nums">
                {status === "exporting"
                  ? "64%"
                  : status === "ready"
                    ? "CSV"
                    : ""}
              </span>
            </LiveActivity.Trigger>
          </LiveActivity.Compact>
          <LiveActivity.Expanded className="w-80 p-5 pb-0">
            <div className="flex items-center gap-3 text-sm">
              <LiveActivity.Shared id="icon" className="text-muted-foreground">
                {icon}
              </LiveActivity.Shared>
              <LiveActivity.Shared id="title" className="font-medium">
                {title}
              </LiveActivity.Shared>
              <LiveActivity.Close className="ml-auto flex size-9 shrink-0 items-center justify-center text-lg text-muted-foreground" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              September overview.csv
            </p>
            {status === "exporting" ? (
              <>
                <div
                  role="progressbar"
                  aria-label="Report export"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={64}
                  className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted"
                >
                  <div className="h-full w-[64%] rounded-full bg-foreground" />
                </div>
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>Preparing your report</span>
                  <span className="tabular-nums">64%</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStatus("cancelled")}
                  className="mt-5 rounded-md px-2 py-2 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
                >
                  Cancel export
                </button>
              </>
            ) : status === "ready" ? (
              <a
                download="september-overview.csv"
                href="data:text/csv;charset=utf-8,Month%2CReports%0ASeptember%2C24"
                className="mt-5 flex min-h-10 items-center justify-center gap-2 rounded-lg bg-foreground px-4 text-sm text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <ArrowDownToLine aria-hidden="true" className="size-4" />
                Download sample
              </a>
            ) : (
              <button
                type="button"
                onClick={() => setStatus("exporting")}
                className="mt-5 min-h-10 w-full rounded-lg bg-foreground px-4 text-sm text-background focus-visible:outline-2 focus-visible:outline-ring"
              >
                Try again
              </button>
            )}
            <LiveActivity.Handle className="mt-1 text-muted-foreground" />
          </LiveActivity.Expanded>
        </LiveActivity.Surface>
      </LiveActivity.Root>
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
        <span>Demo controls</span>
        <button
          type="button"
          onClick={() => setStatus(status === "ready" ? "exporting" : "ready")}
          className="rounded-md border border-border px-3 py-2 hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          {status === "ready" ? "Reset export" : "Simulate completion"}
        </button>
      </div>
      <span role="status" className="sr-only">
        {title}
      </span>
    </div>
  );
}

export default function LiveActivityDemo() {
  return <LiveActivityExample />;
}
