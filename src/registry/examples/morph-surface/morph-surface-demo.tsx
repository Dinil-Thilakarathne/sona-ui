"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

import MorphSurface from "@/registry/sonaui/morph-surface/morph-surface";

export default function MorphSurfaceDemo() {
  const [view, setView] = useState("compact");

  return (
    <MorphSurface.Root
      value={view}
      className="rounded-2xl bg-card shadow-smooth-ring-lg"
    >
      {view === "compact" ? (
        <div className="p-2">
          <button
            type="button"
            onClick={() => setView("expanded")}
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="font-medium">Review changes</span>
            <ArrowRight
              aria-hidden="true"
              className="size-4 text-muted-foreground"
            />
          </button>
        </div>
      ) : (
        <div className="w-80 p-4">
          <div className="flex items-start gap-3">
            <button
              type="button"
              aria-label="Return to summary"
              onClick={() => setView("compact")}
              className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
            </button>
            <div>
              <h3 className="font-medium text-sm">Three files changed</h3>
              <p className="mt-1 text-muted-foreground text-sm leading-6">
                The same surface grows around its center while its content
                changes in place.
              </p>
            </div>
          </div>
        </div>
      )}
    </MorphSurface.Root>
  );
}
