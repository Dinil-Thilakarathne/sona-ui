"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import AnimatedSwitch from "@/registry/sonaui/animated-switch/animated-switch";
import FluidSlider from "@/registry/sonaui/fluid-slider/fluid-slider";
import FluidTabs from "@/registry/sonaui/fluid-tabs/fluid-tabs";
import MeshGradientShader from "@/registry/sonaui/mesh-gradient-shader/mesh-gradient-shader";
import SpotlightCard from "@/registry/sonaui/spotlight-card/spotlight-card";

type Featured = {
  name: string;
  slug: string;
  category: string;
  description: string;
  demo: ReactNode;
  className?: string;
  padDemo?: boolean;
};

const featured: Featured[] = [
  {
    name: "Fluid Tabs",
    slug: "fluid-tabs",
    category: "Interface",
    description: "A shared-layout tab system with a physical active state.",
    demo: (
      <FluidTabs
        tabs={[
          { value: "overview", title: "Overview" },
          { value: "activity", title: "Activity" },
          { value: "settings", title: "Settings" },
        ]}
      />
    ),
  },
  {
    name: "Animated Switch",
    slug: "animated-switch",
    category: "Interface",
    description: "Tactile state feedback with a compact API.",
    demo: <AnimatedSwitch defaultChecked />,
  },
  {
    name: "Mesh Gradient",
    slug: "mesh-gradient-shader",
    category: "Shaders",
    description: "A configurable mesh field for bounded visual atmosphere.",
    className: "lg:row-span-2",
    padDemo: false,
    demo: <MeshGradientShader className="h-full min-h-52 w-full" />,
  },
  {
    name: "Fluid Slider",
    slug: "fluid-slider",
    category: "Interface",
    description: "A precise slider with fluid, motion-aware feedback.",
    className: "lg:col-span-2",
    demo: (
      <div className="w-full max-w-md">
        <FluidSlider
          label="Frequency"
          defaultValue={15}
          formatValue={(value) => `${value}%`}
          marks={[10, 20, 30, 40, 50, 60, 70, 80, 90]}
        />
      </div>
    ),
  },
];

export function FeaturedSection() {
  return (
    <section
      className="mx-auto w-full max-w-[76rem] px-4 py-[clamp(5rem,10vw,9rem)]"
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
          href="/docs"
          className="inline-flex items-center gap-1.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
        >
          Explore the collection{" "}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="grid auto-rows-[minmax(0,1fr)] gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((item) => (
          <article
            key={item.slug}
            className={cn(
              "flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-[border-color] duration-200 hover:border-foreground/35",
              item.className,
            )}
          >
            <div
              className={cn(
                "flex grow items-center justify-center overflow-hidden border-b border-border bg-secondary/40",
                item.padDemo === false ? "" : "min-h-40 p-5",
              )}
            >
              {item.demo}
            </div>
            <div className="grid gap-2 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[0.6875rem] font-semibold tracking-[0.06em] text-muted-foreground uppercase">
                  {item.category}
                </span>
                <Link
                  href={`/docs/${item.slug}`}
                  aria-label={`View ${item.name} documentation`}
                  className="grid size-7 place-items-center rounded-full bg-secondary text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
                >
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
              <h3 className="text-base font-semibold tracking-[-0.025em]">
                {item.name}
              </h3>
              <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
