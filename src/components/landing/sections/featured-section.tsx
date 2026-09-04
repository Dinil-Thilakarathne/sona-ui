import { ArrowRight } from "lucide-react";
import Link from "@/components/common/link";
import { ComponentShowcaseCard } from "@/components/component-showcase/component-showcase-card";
import { ComponentShowcaseRegistryPreview } from "@/components/component-showcase/component-showcase-registry-preview";
import type { ComponentShowcaseItem } from "@/components/component-showcase/types";
import { componentShowcaseVideos } from "@/config/component-showcase";

const featured: ComponentShowcaseItem[] = [
  {
    name: "Fluid Tabs",
    slug: "fluid-tabs",
    href: "/docs/fluid-tabs",
    category: "Navigation & Disclosure",
    video: componentShowcaseVideos["fluid-tabs"],
  },
  {
    name: "Expanding Action",
    slug: "exapnding-action",
    href: "/docs/expanding-action",
    category: "Actions & Inputs",
    video: componentShowcaseVideos["expanding-action"],
  },
  {
    name: "Fluid Tooltip",
    slug: "fluid-tooltip",
    href: "/docs/fluid-tooltip",
    category: "Navigation & Disclosure",
    video: componentShowcaseVideos["fluid-tooltip"],
  },
  {
    name: "Animated Dropdown",
    slug: "animated-dropdown",
    href: "/docs/animated-dropdown",
    category: "Navigation & Disclosure",
    video: componentShowcaseVideos["animated-dropdown"],
  },
  {
    name: "Animated Dialog",
    slug: "animated-dialog",
    href: "/docs/animated-dialog",
    category: "Navigation & Disclosure",
    video: componentShowcaseVideos["animated-dialog"],
  },
  {
    name: "Accordion",
    slug: "accordion",
    href: "/docs/accordion",
    category: "Navigation & Disclosure",
    video: componentShowcaseVideos.accordion,
  },
];

export function FeaturedSection() {
  return (
    <section
      className="mx-auto w-full max-w-[76rem] px-4 sm:px-6 lg:px-8 py-[clamp(5rem,10vw,9rem)]"
      aria-labelledby="noteworthy-title"
    >
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
            New and noteworthy
          </p>
          <h2
            id="noteworthy-title"
            className="mt-3 max-w-[18ch] text-balance font-helvetica-neue text-[clamp(2rem,3.6vw,3.75rem)] leading-[.98] font-semibold tracking-[-0.05em]"
          >
            Components with a point of view.
          </h2>
        </div>
        <Link
          href="/components"
          className="inline-flex items-center gap-1.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
        >
          Explore the collection
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((item) => (
          <ComponentShowcaseCard
            autoPlayVideo
            key={item.slug}
            item={item}
            preview={<ComponentShowcaseRegistryPreview slug={item.slug} />}
          />
        ))}
      </div>
    </section>
  );
}
