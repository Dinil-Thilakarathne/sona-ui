"use client";

import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import ComponentPlayground from "@/components/common/component-playground";
import { cn } from "@/lib/utils";
import { playgroundRegistry } from "@/registry/playground";

function formatName(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

interface PlaygroundWorkbenchProps {
  component: string;
}

export default function PlaygroundWorkbench({
  component,
}: PlaygroundWorkbenchProps) {
  const entry = playgroundRegistry[component];
  const [controlsOpen, setControlsOpen] = useState(true);

  if (!entry) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
        No playground registered for <code>{component}</code>. Add an entry to
        <code className="ml-1 rounded bg-muted px-1 py-0.5">
          src/registry/playground/index.tsx
        </code>
        .
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1440px] _px-4 py-8 sm:px-6 lg:px-8 min-h-screen">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <a
            href="/playground"
            className="mb-3 inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronLeft className="size-3.5" aria-hidden="true" />
            All playgrounds
          </a>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {formatName(component)}
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Development workbench for testing this component before publishing.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setControlsOpen((open) => !open)}
          aria-expanded={controlsOpen}
          aria-controls="playground-controls"
          className="inline-flex h-9 items-center gap-2 rounded-md border bg-background px-3 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {controlsOpen ? (
            <ChevronRight className="size-4" aria-hidden="true" />
          ) : (
            <ChevronLeft className="size-4" aria-hidden="true" />
          )}
          {controlsOpen ? "Hide controls" : "Show controls"}
        </button>
      </header>

      <div>
        <div id="playground-controls">
          <ComponentPlayground
            component={component}
            controlsOpen={controlsOpen}
          />
        </div>
      </div>
    </div>
  );
}
