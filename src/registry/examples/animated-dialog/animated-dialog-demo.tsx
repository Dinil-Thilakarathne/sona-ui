"use client";

import { useState } from "react";
import {
  AnimatedDialog,
  AnimatedDialogClose,
  AnimatedDialogContent,
  AnimatedDialogDescription,
  AnimatedDialogTitle,
  AnimatedDialogTrigger,
} from "@/registry/sonaui/animated-dialog/animated-dialog";

export default function AnimatedDialogDemo() {
  const [direction, setDirection] = useState<"top" | "bottom" | "left" | "right" | "center">("bottom");

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-2 p-1 bg-secondary rounded-lg text-xs">
        {(["top", "bottom", "left", "right", "center"] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDirection(d)}
            className={`px-3 py-1.5 rounded-md font-medium capitalize transition-colors ${
              direction === d
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <AnimatedDialog>
        <AnimatedDialogTrigger>Open Dialog</AnimatedDialogTrigger>
        <AnimatedDialogContent from={direction}>
          <AnimatedDialogTitle>Directional Transition</AnimatedDialogTitle>
          <AnimatedDialogDescription>
            This modal is configured to animate from the <span className="font-semibold text-foreground capitalize">{direction}</span>. You can test all entry vectors using the switcher above.
          </AnimatedDialogDescription>
          <div className="mt-6 flex justify-end gap-3">
            <AnimatedDialogClose
              render={
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
              }
            />
            <AnimatedDialogClose
              render={
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg px-4 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Confirm
                </button>
              }
            />
          </div>
        </AnimatedDialogContent>
      </AnimatedDialog>
    </div>
  );
}
