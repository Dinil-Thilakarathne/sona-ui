"use client";

import { useRef } from "react";

import SectionRail from "@/registry/sonaui/section-rail/section-rail";

const sections = [
  {
    id: "section-rail-demo-overview",
    label: "Overview",
    description: "The goal, scope, and main ideas behind this page.",
  },
  {
    id: "section-rail-demo-interaction",
    label: "Interaction",
    description: "How the component responds to hover, focus, and scroll.",
  },
  {
    id: "section-rail-demo-motion",
    label: "Motion",
    description: "Direct scroll progress, no bounce, no ambient animation.",
  },
  {
    id: "section-rail-demo-accessibility",
    label: "Accessibility",
    description: "Labels on focus, aria-current, and reduced-motion support.",
  },
];

const copy =
  "A rail answers three questions at a glance: where am I, what is nearby, and where can I go. Everything else is decoration.";

export default function SectionRailDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-full max-w-2xl items-stretch gap-6">
      <div
        ref={scrollRef}
        className="h-80 flex-1 overflow-y-auto rounded-xl border border-border bg-secondary/40 p-6"
      >
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-6 py-10"
          >
            <h3 className="font-semibold text-foreground text-lg">
              {section.label}
            </h3>
            <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
              {section.description} {copy}
            </p>
          </section>
        ))}
      </div>

      <div className="flex items-center">
        <SectionRail
          items={sections}
          scrollRoot={scrollRef}
          scrollOffset={24}
          side="left"
        />
      </div>
    </div>
  );
}
