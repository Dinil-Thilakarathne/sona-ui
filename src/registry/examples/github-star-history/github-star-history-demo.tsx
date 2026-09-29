"use client";

import { useEffect, useState } from "react";

import GitHubStarHistory, {
  type GitHubStarHistoryDatum,
} from "@/registry/sonaui/github-star-history/github-star-history";

type StarHistoryState =
  | { status: "loading" }
  | {
      status: "success";
      data: GitHubStarHistoryDatum[];
      repository: string;
    }
  | { status: "error"; message: string };

export default function GitHubStarHistoryDemo() {
  const [state, setState] = useState<StarHistoryState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    async function loadHistory() {
      try {
        const response = await fetch("/api/github-star-history", {
          signal: controller.signal,
        });
        const payload = (await response.json()) as
          | { repository: string; data: GitHubStarHistoryDatum[] }
          | { error?: { message?: string } };

        if (!response.ok || !("data" in payload)) {
          throw new Error(
            "error" in payload && payload.error?.message
              ? payload.error.message
              : "GitHub star history is unavailable.",
          );
        }

        setState({
          status: "success",
          data: payload.data,
          repository: payload.repository,
        });
      } catch (error) {
        if (controller.signal.aborted) return;
        setState({
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "GitHub star history is unavailable.",
        });
      }
    }

    void loadHistory();
    return () => controller.abort();
  }, []);

  if (state.status === "loading") {
    return (
      <div
        className="w-full max-w-3xl rounded-xl border border-border bg-muted/30 p-6 text-sm text-muted-foreground"
        role="status"
      >
        Loading repository star history…
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="w-full max-w-3xl rounded-xl border border-border bg-muted/30 p-6 text-sm">
        <p className="font-medium text-foreground">
          GitHub star history is unavailable
        </p>
        <p className="mt-1 text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <GitHubStarHistory
      className="max-w-3xl"
      data={state.data}
      repository={state.repository}
    />
  );
}
