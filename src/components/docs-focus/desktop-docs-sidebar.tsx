"use client";

import { ChevronDown } from "lucide-react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import { usePathname } from "next/navigation";
import { useId, useLayoutEffect, useRef, useState } from "react";
import Link from "@/components/common/link";
import { groupedComponents } from "@/config/components";
import { cn } from "@/lib/utils";
import Chip from "@/registry/sonaui/chip/chip";

const SIDEBAR_SCROLL_STORAGE_KEY = "sona-docs-sidebar-scroll-top";

export function DesktopDocsSidebar({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const layoutGroupId = useId();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const scrollTopRef = useRef(0);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        Object.keys(groupedComponents).map((group) => [group, true]),
      ),
  );
  const shouldReduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    try {
      const savedScrollTop = Number.parseFloat(
        window.sessionStorage.getItem(SIDEBAR_SCROLL_STORAGE_KEY) ?? "0",
      );

      if (Number.isFinite(savedScrollTop) && scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = savedScrollTop;
        scrollTopRef.current = savedScrollTop;
      }
    } catch {
      // The sidebar remains usable when browser storage is unavailable.
    }

    return () => {
      try {
        window.sessionStorage.setItem(
          SIDEBAR_SCROLL_STORAGE_KEY,
          String(scrollTopRef.current),
        );
      } catch {
        // The sidebar remains usable when browser storage is unavailable.
      }
    };
  }, []);

  return (
    <nav
      aria-label="Documentation pages"
      className="flex h-full min-h-0 flex-col overflow-hidden lg:pt-32 p-5"
    >
      <div className=" shrink-0 px-2">
        <p className="text-sm font-medium">Documentation</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse guides and components
        </p>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden pt-4">
        <div
          ref={scrollAreaRef}
          onScroll={(event) => {
            scrollTopRef.current = event.currentTarget.scrollTop;
          }}
          className="apple-scrollbar h-full overflow-y-auto pt-2 pb-16"
        >
          <LayoutGroup id={layoutGroupId}>
            {Object.entries(groupedComponents).map(([group, items]) => {
              const isOpen = openCategories[group] ?? false;
              const sectionId = `docs-sidebar-${group
                .toLowerCase()
                .replaceAll(/[^a-z0-9]+/g, "-")}`;
              const activeIndicatorId = `${sectionId}-active-indicator`;

              return (
                <section key={group} className="mb-2">
                  <h2>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={sectionId}
                      onClick={() =>
                        setOpenCategories((current) => ({
                          ...current,
                          [group]: !current[group],
                        }))
                      }
                      className="group flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-md text-foreground transition-colors duration-150 hover:bg-muted/40 hover:text-foreground hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 motion-reduce:transition-none"
                    >
                      <span>
                        {group}
                        <sup className="ml-1 text-[0.625rem] leading-none tabular-nums">
                          [{items.length}]
                        </sup>
                      </span>
                      <motion.span
                        aria-hidden="true"
                        className="grid size-4 shrink-0 place-items-center"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { type: "spring", bounce: 0, duration: 0.2 }
                        }
                      >
                        <ChevronDown className="size-3.5" strokeWidth={1.75} />
                      </motion.span>
                    </button>
                  </h2>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={sectionId}
                        role="region"
                        aria-label={`${group} pages`}
                        className="overflow-hidden"
                        initial={
                          shouldReduceMotion
                            ? { opacity: 1 }
                            : { height: 0, opacity: 0 }
                        }
                        animate={{ height: "auto", opacity: 1 }}
                        exit={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : { height: 0, opacity: 0 }
                        }
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : {
                                height: {
                                  duration: 0.22,
                                  ease: [0.32, 0.72, 0, 1],
                                },
                                opacity: { duration: 0.14 },
                              }
                        }
                      >
                        <div className="grid gap-0.5 pt-1">
                          {items.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                aria-current={isActive ? "page" : undefined}
                                onClick={(event) => {
                                  if (pathname === item.href) {
                                    event.preventDefault();
                                    return;
                                  }

                                  onNavigate?.();
                                }}
                                className={cn(
                                  "relative flex items-center justify-between rounded-lg py-1.5 pl-3 text-sm text-muted-foreground transition-colors hover:text-foreground",
                                  isActive && "font-medium text-foreground",
                                )}
                              >
                                {isActive && (
                                  <motion.span
                                    aria-hidden="true"
                                    layoutId={
                                      shouldReduceMotion
                                        ? undefined
                                        : activeIndicatorId
                                    }
                                    className="pointer-events-none absolute inset-0 rounded-lg bg-accent/50 before:absolute before:inset-y-1.5 before:left-0 before:w-px before:rounded-full before:bg-primary"
                                    transition={{
                                      type: "spring",
                                      bounce: 0,
                                      duration: 0.22,
                                    }}
                                  />
                                )}
                                <span className="relative z-10">
                                  {item.name}
                                </span>
                                {item.tag && (
                                  <Chip
                                    size="sm"
                                    variant="soft"
                                    tone={
                                      item.tag === "new"
                                        ? "success"
                                        : item.tag === "updated" ||
                                            item.tag === "beta"
                                          ? "warning"
                                          : "neutral"
                                    }
                                    aria-label={item.tag}
                                    className="relative z-10 min-h-4 px-1 text-[0.5625rem] uppercase tracking-[0.08em]"
                                  >
                                    {item.tag}
                                  </Chip>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>
              );
            })}
          </LayoutGroup>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-background to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-background to-transparent"
        />
      </div>
    </nav>
  );
}
