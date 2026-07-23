"use client";

import { useRef } from "react";

import SectionRail from "@/registry/sonaui/section-rail/section-rail";

const sectionRailItems = [
  {
    id: "section-rail-play-overview",
    label: "Overview",
    description: "The goal, scope, and main ideas behind this page.",
  },
  {
    id: "section-rail-play-interaction",
    label: "Interaction",
    description: "How the component responds to hover, focus, and scroll.",
  },
  {
    id: "section-rail-play-motion",
    label: "Motion",
    description: "Direct scroll progress, no bounce, no ambient animation.",
  },
  {
    id: "section-rail-play-accessibility",
    label: "Accessibility",
    description: "Labels on focus, aria-current, and reduced-motion support.",
  },
];

/**
 * The rail reads a scroll position, so the playground needs a real scrolling
 * region to point it at. The ref makes this a client component, so it lives in
 * its own file — `playground/index.tsx` is also imported by a server component.
 */
export default function SectionRailPlayground({
  showLabels,
  activeIndicator,
  side,
}: {
  showLabels: "hidden" | "always" | "active" | "hover";
  activeIndicator: "dot" | "fill" | "progress";
  side: "left" | "right";
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const rail = (
    <div className="flex items-center">
      <SectionRail
        items={sectionRailItems}
        scrollRoot={scrollRef}
        scrollOffset={24}
        showLabels={showLabels}
        activeIndicator={activeIndicator}
        side={side}
      />
    </div>
  );

  return (
    <div className="flex w-full max-w-2xl items-stretch gap-6">
      {side === "left" && rail}
      <div
        ref={scrollRef}
        className="h-80 flex-1 overflow-y-auto rounded-xl border border-border bg-secondary/40 p-6"
      >
        {sectionRailItems.map((section) => (
          <section key={section.id} id={section.id} className="py-10">
            <h3 className="font-semibold text-foreground text-lg">
              {section.label}
            </h3>
            <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
              {section.description} A rail answers three questions at a glance:
              where am I, what is nearby, and where can I go.
            </p>
          </section>
        ))}
      </div>
      {side === "right" && rail}
    </div>
  );
}
