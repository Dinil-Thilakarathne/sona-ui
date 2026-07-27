"use client";

import { useEffect, useState } from "react";
import ActivityGraph from "@/registry/sonaui/activity-graph/activity-graph";

interface GitHubContributionCalendar {
  login: string;
  days: Array<{
    date: string;
    value: number;
    label: string;
  }>;
  from: string;
  to: string;
}

type CalendarState =
  | { status: "loading" }
  | { status: "success"; calendar: GitHubContributionCalendar }
  | { status: "error"; message: string };

export default function ActivityGraphDemo() {
  const [state, setState] = useState<CalendarState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    async function loadCalendar() {
      try {
        const response = await fetch("/api/github-contributions", {
          signal: controller.signal,
        });
        const contentType = response.headers.get("content-type");

        if (!contentType?.includes("application/json")) {
          throw new Error(
            `The GitHub contribution endpoint returned ${response.status} instead of JSON.`,
          );
        }

        const payload = (await response.json()) as
          | GitHubContributionCalendar
          | { message?: string };

        if (!response.ok) {
          throw new Error(
            "message" in payload && payload.message
              ? payload.message
              : "GitHub contribution data is unavailable.",
          );
        }

        setState({
          status: "success",
          calendar: payload as GitHubContributionCalendar,
        });
      } catch (error) {
        if (controller.signal.aborted) return;

        setState({
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "GitHub contribution data is unavailable.",
        });
      }
    }

    void loadCalendar();

    return () => controller.abort();
  }, []);

  if (state.status === "loading") {
    return (
      <div
        className="w-full max-w-4xl rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground"
        role="status"
      >
        Loading GitHub contribution activity…
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="w-full max-w-4xl rounded-lg border border-border bg-muted/30 p-4 text-sm">
        <p className="font-medium text-foreground">
          GitHub contribution data is unavailable
        </p>
        <p className="mt-1 text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  const { calendar } = state;

  return (
    <div className="w-full max-w-4xl">
      <ActivityGraph
        data={calendar.days}
        startDate={calendar.from}
        endDate={calendar.to}
        showTooltip
        colors={[
          "color-mix(in oklab, #22c55e 25%, var(--background))",
          "color-mix(in oklab, #22c55e 45%, var(--background))",
          "color-mix(in oklab, #22c55e 70%, var(--background))",
          "#22c55e",
        ]}
        emptyColor="color-mix(in oklab, var(--muted) 76%, var(--background))"
        ariaLabel={`${calendar.login}'s GitHub contribution activity`}
      />
    </div>
  );
}
