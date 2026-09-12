import { Fragment } from "react";
import { SiteGridGap } from "@/components/landing/site-grid";
import { componentShowcaseVideos } from "@/config/component-showcase";
import { componentNavigationLinks } from "@/config/components";
import { ComponentShowcaseCard } from "./component-showcase-card";
import { ComponentShowcaseRegistryPreview } from "./component-showcase-registry-preview";
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

type ComponentShowcaseProps = {
  items?: ComponentShowcaseItem[];
};

export function ComponentShowcase({
  items = defaultItems,
}: ComponentShowcaseProps) {
  const groups = items.reduce<Map<string, ComponentShowcaseItem[]>>(
    (categories, item) => {
      const categoryItems = categories.get(item.category) ?? [];
      categoryItems.push(item);
      categories.set(item.category, categoryItems);
      return categories;
    },
    new Map(),
  );
  const categoryGroups = Array.from(groups);

  return (
    <main
      className="site-grid-section relative z-10 mx-auto w-full max-w-(--site-grid-max-width) px-4 pt-[calc(var(--spacing-header-height)+clamp(3rem,7vw,6rem))] pb-[clamp(4rem,8vw,7rem)] sm:px-6 lg:px-8"
      data-boundary="both"
    >
      <header className="flex flex-col gap-4  pb-4 ">
        <h1 className="text-balance font-helvetica-neue text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.92] tracking-[-0.04em] translate-x-[-4px]">
          Components with behavior built in.
        </h1>

        <p className="max-w-[34ch] text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          Browse production-ready interactions, then take the source and make it
          your own.
        </p>
      </header>

      <div className="mt-8 flex flex-col sm:mt-10">
        {categoryGroups.map(([category, categoryItems], index) => (
          <Fragment key={category}>
            <section
              className=" site-grid-section pb-4"
              data-boundary="both"
              aria-labelledby={`component-category-${category.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`}
            >
              <header
                className="mb-5 flex gap-2 sm:mb-6 site-grid-section py-2"
                data-boundary="both"
              >
                <h2
                  id={`component-category-${category.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`}
                  className="font-helvetica-neue text-2xl tracking-[-0.04em] sm:text-3xl"
                >
                  {category}
                </h2>
                <p className="shrink-0 font-mono text-[0.825rem] tracking-[0.14em] text-muted-foreground tabular-nums uppercase">
                  [{categoryItems.length}]
                </p>
              </header>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-2">
                {categoryItems.map((item) => (
                  <ComponentShowcaseCard
                    key={item.slug}
                    item={item}
                    preview={
                      item.preview ?? (
                        <ComponentShowcaseRegistryPreview slug={item.slug} />
                      )
                    }
                  />
                ))}
              </div>
            </section>
            {index < categoryGroups.length - 1 && (
              <SiteGridGap
                orientation="horizontal"
                data-boundary="both"
                className="site-grid-category-gap site-grid-section !min-h-4 !w-[calc(100%+64px)] -translate-x-[32px]"
              />
            )}
          </Fragment>
        ))}
      </div>
    </main>
  );
}
