"use client";

import { ChevronUp, ListTree } from "lucide-react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import { useEffect, useId, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/common/drawer";
import { cn } from "@/lib/utils";

type Heading = {
  id: string;
  level: number;
  text: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-");
}

function useTableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const article = document.querySelector<HTMLElement>(
      '[data-context="component-article"]',
    );
    if (!article) return;

    const usedIds = new Set<string>();
    const nextHeadings = Array.from(
      article.querySelectorAll<HTMLHeadingElement>("[data-doc-heading]"),
    ).map((heading) => {
      const baseId = heading.id || slugify(heading.textContent || "section");
      let id = baseId || "section";
      let suffix = 2;

      while (usedIds.has(id)) {
        id = `${baseId}-${suffix}`;
        suffix += 1;
      }

      usedIds.add(id);
      heading.id = id;

      return {
        id,
        level: Number(heading.tagName.slice(1)),
        text: heading.textContent || "Section",
      };
    });

    setHeadings(nextHeadings);
    setActiveId(nextHeadings[0]?.id ?? null);

    const getHeadingPositions = () =>
      nextHeadings.map((heading) => {
        const element = document.getElementById(heading.id);
        return {
          id: heading.id,
          top: element
            ? element.getBoundingClientRect().top + window.scrollY
            : Number.POSITIVE_INFINITY,
        };
      });

    let headingPositions = getHeadingPositions();

    const syncActiveHeading = () => {
      const readingLine =
        window.scrollY + Math.max(96, window.innerHeight * 0.2);
      let nextActiveId = nextHeadings[0]?.id ?? null;

      for (const heading of headingPositions) {
        if (heading.top <= readingLine) {
          nextActiveId = heading.id;
        } else {
          break;
        }
      }

      setActiveId((currentActiveId) =>
        currentActiveId === nextActiveId ? currentActiveId : nextActiveId,
      );
    };

    const handleResize = () => {
      headingPositions = getHeadingPositions();
      syncActiveHeading();
    };

    syncActiveHeading();
    window.addEventListener("scroll", syncActiveHeading, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", syncActiveHeading);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { activeId, headings };
}

function ContentsList({
  activeId,
  headings,
  onNavigate,
}: {
  activeId: string | null;
  headings: Heading[];
  onNavigate?: () => void;
}) {
  const layoutId = useId();
  const shouldReduceMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <LayoutGroup id={layoutId}>
      <ul className="space-y-1" onPointerLeave={() => setHoveredId(null)}>
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const highlightedId = hoveredId ?? activeId;
          const isHighlighted = highlightedId === heading.id;

          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={onNavigate}
                onPointerEnter={() => setHoveredId(heading.id)}
                onFocus={() => setHoveredId(heading.id)}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative block rounded-md px-2 py-1.5 text-sm leading-snug transition-colors duration-150 motion-reduce:transition-none",
                  "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  heading.level === 3 && "pl-3",
                  heading.level === 4 && "pl-6",
                  isActive
                    ? "font-medium text-foreground"
                    : "text-muted-foreground",
                )}
              >
                <AnimatePresence>
                  {isHighlighted && (
                    <motion.span
                      aria-hidden="true"
                      layoutId={
                        shouldReduceMotion ? undefined : `${layoutId}-hover`
                      }
                      className="pointer-events-none absolute inset-0 rounded-md bg-accent/60"
                      initial={shouldReduceMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={
                        shouldReduceMotion
                          ? { duration: 0.12 }
                          : { type: "spring", bounce: 0, duration: 0.22 }
                      }
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10">{heading.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </LayoutGroup>
  );
}

export function DocsTableOfContents() {
  const { activeId, headings } = useTableOfContents();
  const [open, setOpen] = useState(false);

  if (headings.length === 0) return null;

  return (
    <>
      <aside className="hidden lg:block">
        <nav
          aria-label="Table of contents"
          className="sticky top-28 border-l border-border pl-5"
        >
          <p className="mb-3 font-medium text-muted-foreground text-xs tracking-wider uppercase">
            On this page
          </p>
          <ContentsList activeId={activeId} headings={headings} />
        </nav>
      </aside>

      <Drawer
        open={open}
        onOpenChange={setOpen}
        showSwipeHandle
        swipeDirection="down"
      >
        <DrawerTrigger
          render={
            <button
              type="button"
          className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-4 z-40 flex max-w-[calc(100vw-6rem)] items-center gap-2 rounded-full bg-background/90 px-3 py-2 text-sm smooth-shadow-ring-lg backdrop-blur-md transition-[transform,background-color] duration-150 active:scale-[0.97] motion-reduce:transition-none lg:hidden"
              aria-label="Open table of contents"
              aria-expanded={open}
            >
              <ListTree className="size-4 shrink-0" aria-hidden="true" />
              <span className="truncate">On this page</span>
              <ChevronUp className="size-4 shrink-0" aria-hidden="true" />
            </button>
          }
        />
        <DrawerContent className="max-h-[min(32rem,75dvh)] rounded-t-2xl px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] pt-3">
          <DrawerHeader className="px-0 pb-2 pt-1">
            <DrawerTitle>On this page</DrawerTitle>
            <DrawerDescription>
              Jump to a section in this documentation page.
            </DrawerDescription>
          </DrawerHeader>
          <nav aria-label="Table of contents" className="overflow-y-auto pb-2">
            <ContentsList
              activeId={activeId}
              headings={headings}
              onNavigate={() => setOpen(false)}
            />
          </nav>
        </DrawerContent>
      </Drawer>
    </>
  );
}
