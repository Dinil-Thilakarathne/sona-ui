"use client";

import { useState } from "react";

import FluidTabs from "@/registry/sonaui/fluid-tabs/fluid-tabs";

const tabs = [
  {
    value: "overview",
    title: "Overview",
    ariaControls: "fluid-tabs-playground-overview",
  },
  {
    value: "activity",
    title: "Activity",
    ariaControls: "fluid-tabs-playground-activity",
  },
  {
    value: "settings",
    title: "Settings",
    ariaControls: "fluid-tabs-playground-settings",
  },
];

const panels = [
  {
    value: "overview",
    title: "Project overview",
    description: "A clear view of what is ready and what needs attention.",
    detail: "3 active projects",
  },
  {
    value: "activity",
    title: "Recent activity",
    description: "Maya updated the interaction review two hours ago.",
    detail: "12 updates this week",
  },
  {
    value: "settings",
    title: "Workspace settings",
    description: "Manage your team, notifications, and preferences.",
    detail: "Personal workspace",
  },
];

interface FluidTabsPlaygroundProps {
  initialValue: string;
  variant: "capsule" | "underline";
  size: "sm" | "md" | "lg";
}

export default function FluidTabsPlayground({
  initialValue,
  variant,
  size,
}: FluidTabsPlaygroundProps) {
  const [activeTab, setActiveTab] = useState(initialValue);

  return (
    <div className="w-full max-w-md space-y-4">
      <FluidTabs
        ariaLabel="Project sections"
        tabs={tabs}
        value={activeTab}
        onValueChange={setActiveTab}
        variant={variant}
        size={size}
      />
      {panels.map((panel) => (
        <section
          key={panel.value}
          id={`fluid-tabs-playground-${panel.value}`}
          role="tabpanel"
          aria-label={panel.title}
          hidden={activeTab !== panel.value}
          className="min-h-36 rounded-xl border border-border bg-background p-5"
        >
          <p className="font-medium text-foreground text-sm">{panel.title}</p>
          <p className="mt-1.5 text-muted-foreground text-sm">
            {panel.description}
          </p>
          <p className="mt-5 font-medium text-foreground text-xs">
            {panel.detail}
          </p>
        </section>
      ))}
    </div>
  );
}
