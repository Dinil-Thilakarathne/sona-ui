"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { groupedComponents } from "@/config/components";
import { cn } from "@/lib/utils";

const SIDEBAR_SCROLL_STORAGE_KEY = "sona-docs-sidebar-scroll-top";

export function DesktopDocsSidebar({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const scrollTopRef = useRef(0);

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
      <div className=" shrink-0">
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
          className="h-full overflow-y-auto [scrollbar-color:var(--color-scrollbar)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-scrollbar [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1"
        >
          {Object.entries(groupedComponents).map(([group, items]) => (
            <section key={group} className="mb-5">
              <h2 className="mb-1.5  text-sm text-muted-foreground">{group}</h2>
              <div className="grid gap-0.5">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    onClick={onNavigate}
                    className={cn(
                      "relative flex items-center justify-between rounded-lg py-1.5 pl-3 text-xs text-muted-foreground transition-colors hover:text-foreground before:absolute before:top-1/2 before:left-0 before:h-4 before:w-px before:-translate-y-1/2 before:rounded-full before:bg-primary before:opacity-0 before:transition-opacity",
                      pathname === item.href &&
                        "font-medium text-foreground before:opacity-100",
                    )}
                  >
                    {item.name}
                    {item.tag && (
                      <>
                        <span className="sr-only">{item.tag}</span>
                        <span
                          aria-hidden="true"
                          className={cn(
                            "size-1.5 shrink-0 rounded-full",
                            item.tag === "new" && "bg-success",
                            item.tag === "updated" && "bg-info",
                            !["new", "updated"].includes(item.tag) &&
                              "bg-muted-foreground",
                          )}
                        />
                      </>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          ))}
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
