"use client";

import { AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import { componentShowcaseVideos } from "@/config/component-showcase";
import { componentNavigationLinks } from "@/config/components";
import { exampleRegistry } from "@/registry";
import FluidTabs from "@/registry/sonaui/fluid-tabs/fluid-tabs";
import { ComponentShowcaseCard } from "./component-showcase-card";
import type { ComponentShowcaseItem } from "./types";

const defaultItems: ComponentShowcaseItem[] = componentNavigationLinks
  .filter((item) => item.type !== "Getting Started" && item.slug)
  .map((item) => ({
    name: item.name,
    slug: item.slug ?? item.name,
    href: item.href,
    category: item.type,
    tag: item.tag,
    video: item.slug ? componentShowcaseVideos[item.slug] : undefined,
  }));

const defaultCategories = [
  "All",
  ...Array.from(new Set(defaultItems.map((item) => item.category))),
];

function RegistryPreview({ slug }: { slug: string }) {
  const example = exampleRegistry[slug]?.at(-1);

  if (!example) {
    return (
      <span className="text-xs text-muted-foreground">Preview coming soon</span>
    );
  }

  const Example = example.component;

  return <Example />;
}

type ComponentShowcaseProps = {
  items?: ComponentShowcaseItem[];
};

export function ComponentShowcase({
  items = defaultItems,
}: ComponentShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories =
    items === defaultItems
      ? defaultCategories
      : ["All", ...Array.from(new Set(items.map((item) => item.category)))];
  const visibleItems = useMemo(
    () =>
      activeCategory === "All"
        ? items
        : items.filter((item) => item.category === activeCategory),
    [activeCategory, items],
  );

  return (
    <main className="mx-auto w-full max-w-[82rem] px-4 pt-[calc(var(--spacing-header-height)+4rem)] pb-20 sm:px-6 lg:px-8 relative z-10">
      <header className="mb-10 max-w-4xl flex flex-col gap-2">
        <p className="font-mono text-[0.6875rem] text-muted-foreground uppercase tracking-[0.14em]">
          Sona UI collection
        </p>
        <div className=" flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="font-helvetica-neue text-balance text-4xl tracking-[-0.055em] sm:text-5xl">
              Components in motion.
            </h1>
            <p className=" text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              A collection of motion-led UI components. [Hover to see each in
              action]
            </p>
          </div>
        </div>
      </header>

      <div className="mb-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <FluidTabs
          ariaLabel="Component categories"
          onValueChange={setActiveCategory}
          size="sm"
          tabs={categories.map((category) => ({
            title: category,
            value: category,
          }))}
          value={activeCategory}
        />
      </div>

      <section aria-live="polite" aria-label={`${activeCategory} components`}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false} mode="popLayout">
            {visibleItems.map((item) => (
              <ComponentShowcaseCard
                key={item.slug}
                item={item}
                preview={item.preview ?? <RegistryPreview slug={item.slug} />}
              />
            ))}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
