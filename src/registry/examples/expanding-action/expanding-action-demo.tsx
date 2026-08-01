"use client";

import { Plus } from "lucide-react";

import ExpandingAction from "@/registry/sonaui/expanding-action/expanding-action";

const projectTypes = [
  { value: "marketing", label: "Marketing" },
  { value: "design", label: "Design" },
  { value: "development", label: "Development" },
];

export default function ExpandingActionDemo() {
  return (
    <ExpandingAction
      trigger="New project"
      triggerIcon={<Plus className="size-4" strokeWidth={1.75} />}
      items={projectTypes}
    />
  );
}
