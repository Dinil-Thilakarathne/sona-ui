"use client";

import { useState } from "react";

import { cn } from "@/lib/sona-utils";
import AnimatedSegmentedControl from "@/registry/sonaui/animated-segmented-control/animated-segmented-control";

const items = [
  { value: "compact", label: "Compact" },
  { value: "comfortable", label: "Comfortable" },
  { value: "spacious", label: "Spacious" },
];

const tasks = [
  { name: "Review new components", detail: "Design system" },
  { name: "Refine motion details", detail: "Interaction pass" },
  { name: "Publish release notes", detail: "Documentation" },
];

const rowSpacing = {
  compact: "py-1.5",
  comfortable: "py-3",
  spacious: "py-5",
} as const;

export default function AnimatedSegmentedControlDemo() {
  const [density, setDensity] =
    useState<keyof typeof rowSpacing>("comfortable");

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-5 py-5">
      <div className="w-full">
        <p className="font-medium text-foreground text-sm">List density</p>
        <p className="text-muted-foreground text-xs">
          Choose how much room each row uses.
        </p>
      </div>
      <AnimatedSegmentedControl
        items={items}
        value={density}
        onValueChange={(nextValue) =>
          setDensity(nextValue as keyof typeof rowSpacing)
        }
      />
      <div className="w-full divide-y divide-border rounded-xl border border-border bg-background px-4">
        {tasks.map((task) => (
          <div
            key={task.name}
            className={cn(
              "flex items-center justify-between gap-3",
              rowSpacing[density],
            )}
          >
            <span className="font-medium text-foreground text-sm">
              {task.name}
            </span>
            <span className="shrink-0 text-muted-foreground text-xs">
              {task.detail}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
