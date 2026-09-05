"use client";

import { ArrowUpRight, Play } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "@/components/common/link";
import { useMemo, useState } from "react";
import { componentNavigationLinks } from "@/config/components";
import { exampleRegistry } from "@/registry";

const galleryItems = componentNavigationLinks.filter(
  (item) => item.type !== "Getting Started" && item.slug,
);

const categories = [
  "All",
  ...Array.from(new Set(galleryItems.map((item) => item.type))),
];

type GalleryItem = (typeof galleryItems)[number];

function ComponentPreview({ item }: { item: GalleryItem }) {
  const example = item.slug ? exampleRegistry[item.slug]?.at(-1) : undefined;

  if (!example) {
    return (
      <span className="text-xs text-muted-foreground">Preview coming soon</span>
    );
  }

  const Example = example.component;

  return <Example />;
}

function ShowcaseCard({ item, index }: { item: GalleryItem; index: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.24,
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.035, 0.21),
        ease: [0.23, 1, 0.32, 1],
      }}
      className="group flex min-w-0 flex-col overflow-hidden p-2 rounded-2xl bg-card smooth-shadow-ring-sm"
    >
      <div className="relative flex aspect-[16/10] border rounded-xl items-center justify-center overflow-hidden border-border border-b bg-secondary/40 p-5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--foreground)/0.08),transparent_55%)] " />
        <div className="relative flex min-h-0 max-w-full items-center justify-center ">
          <ComponentPreview item={item} />
        </div>
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-background/72 px-2 py-1 font-mono text-[0.625rem] text-muted-foreground uppercase tracking-[0.12em] backdrop-blur-sm">
          <Play className="size-2.5 fill-current" aria-hidden="true" />
          Preview
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 p-2">
        <div className="min-w-0">
          <p className="mb-1 truncate font-mono text-[0.625rem] text-muted-foreground uppercase tracking-[0.12em]">
            {item.type}
          </p>
          <h2 className="truncate font-semibold text-sm tracking-[-0.015em]">
            {item.name}
          </h2>
        </div>
        <Link
          href={item.href}
          aria-label={`View ${item.name} documentation`}
          className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-foreground transition-[background-color,transform] duration-150 ease-out hover:bg-accent active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
        >
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}

export function ComponentShowcasePrototype() {
  const [activeCategory, setActiveCategory] = useState("All");
  const visibleItems = useMemo(
    () =>
      activeCategory === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.type === activeCategory),
    [activeCategory],
  );

  return (
    <main className="mx-auto w-full max-w-[82rem] px-4 pt-[calc(var(--spacing-header-height)+4rem)] pb-20 sm:px-6 lg:px-8">
      <header className="mb-10 max-w-2xl">
        <p className="font-mono text-[0.6875rem] text-muted-foreground uppercase tracking-[0.14em]">
          Sona UI collection
        </p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
          <div>
            <h1 className="font-helvetica-neue text-balance text-4xl tracking-[-0.055em] sm:text-5xl">
              Components in motion.
            </h1>
            <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              A working collection of interaction patterns, motion primitives,
              and visual building blocks.
            </p>
          </div>
          <p className="pb-1 font-mono text-xs text-muted-foreground tabular-nums">
            {galleryItems.length} components
          </p>
        </div>
      </header>

      <nav
        aria-label="Component categories"
        className="mb-7 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((category) => {
          const isActive = category === activeCategory;

          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-xs transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground ${
                isActive
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-transparent text-foreground"
              }`}
            >
              {category}
            </button>
          );
        })}
      </nav>

      <section aria-live="polite" aria-label={`${activeCategory} components`}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item, index) => (
            <ShowcaseCard key={item.slug} item={item} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
