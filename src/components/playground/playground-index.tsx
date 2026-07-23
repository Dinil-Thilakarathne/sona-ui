"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

function formatName(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function PlaygroundIndex({
  components,
}: {
  components: string[];
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      components.filter((component) =>
        component.toLowerCase().includes(query.toLowerCase().trim()),
      ),
    [components, query],
  );

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="mb-2 font-mono text-xs text-muted-foreground">
          /playground
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Component workbench
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Test components, tune their states, and prepare clean previews before
          publishing them.
        </p>
      </header>

      <label className="mb-6 block max-w-md text-sm font-medium text-foreground">
        <span className="sr-only">Search playgrounds</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search components"
          className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((component) => (
          <Link
            key={component}
            href={`/playground/${component}`}
            className="group rounded-xl border bg-card p-4 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="font-medium text-foreground group-hover:underline group-hover:underline-offset-4">
              {formatName(component)}
            </span>
            <span className="mt-1 block font-mono text-xs text-muted-foreground">
              {component}
            </span>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          No playgrounds match “{query}”.
        </p>
      )}
    </main>
  );
}
