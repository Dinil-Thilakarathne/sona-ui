"use client";

import { Dialog } from "@base-ui/react/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "cmdk";
import { ArrowRight, SearchIcon } from "lucide-react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useSearch } from "@/hooks/useSearch";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function Search({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = React.useState(false);
  const { query, setQuery, results } = useSearch();
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const layoutId = React.useId();
  const shouldReduceMotion = useReducedMotion();
  const [shortcutModifier, setShortcutModifier] = React.useState("⌘");
  const [hoveredResult, setHoveredResult] = React.useState<string | null>(null);
  const [selectedResult, setSelectedResult] = React.useState<string | null>(
    null,
  );

  React.useEffect(() => {
    const isApplePlatform = /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent);
    setShortcutModifier(isApplePlatform ? "⌘" : "Ctrl");
  }, []);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === "KeyK" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  React.useEffect(() => {
    setSelectedResult((current) =>
      results.some((result) => result.slug === current)
        ? current
        : (results[0]?.slug ?? null),
    );
  }, [results]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        type="button"
        aria-label={compact ? "Search documentation" : undefined}
        title={compact ? "Search documentation" : undefined}
        className={cn(
          "items-center font-medium text-muted-foreground text-sm whitespace-nowrap hover:text-accent-foreground bg-transparent hover:bg-accent rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors",
          compact
            ? "inline-flex size-9 justify-center"
            : "hidden lg:inline-flex gap-2 px-3 py-1.5",
        )}
      >
        <SearchIcon className="size-4" />
        {!compact && (
          <>
            <span>Search documentation...</span>
            <kbd className="flex gap-1 items-center px-1.5 h-5 font-medium font-mono text-[10px] text-muted-foreground bg-muted rounded pointer-events-none select-none">
              <span className="text-xs">{shortcutModifier}</span>K
            </kbd>
          </>
        )}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-150 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none" />
        <Dialog.Popup
          initialFocus={inputRef}
          aria-describedby={undefined}
          className="fixed left-1/2 top-[15vh] z-50 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 origin-top overflow-hidden rounded-xl bg-popover text-popover-foreground smooth-shadow-ring-lg transition duration-150 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-ending-style:duration-100 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none"
        >
          <Dialog.Title className="sr-only">Search documentation</Dialog.Title>
          <Command
            shouldFilter={false}
            label="Search documentation"
            value={selectedResult ?? undefined}
            onValueChange={setSelectedResult}
          >
            <div className="flex items-center gap-2 border-b border-border px-3">
              <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
              <CommandInput
                ref={inputRef}
                placeholder="Search documentation..."
                value={query}
                onValueChange={setQuery}
                className="flex h-11 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
              />
            </div>
            <CommandList className="max-h-[320px] overflow-x-hidden overflow-y-auto p-2">
              <CommandEmpty className="py-6 text-center text-muted-foreground text-sm">
                No results found.
              </CommandEmpty>
              <LayoutGroup id={layoutId}>
                <CommandGroup
                  heading="Pages"
                  className="text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:pb-1.5 **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground **:[[cmdk-group-heading]]:text-xs"
                  onPointerLeave={() => setHoveredResult(null)}
                >
                  {results.map((doc) => {
                    const isHovered = hoveredResult === doc.slug;

                    return (
                      <CommandItem
                        key={doc.slug}
                        value={doc.slug}
                        onMouseEnter={() => setHoveredResult(doc.slug)}
                        onFocus={() => setHoveredResult(null)}
                        onMouseLeave={() => setHoveredResult(null)}
                        onBlur={() => setHoveredResult(null)}
                        onSelect={() => {
                          analytics.searchUsed({
                            query,
                            result_count: results.length,
                            selected: doc.slug,
                          });
                          runCommand(() => router.push(`/docs/${doc.slug}`));
                        }}
                        className={cn(
                          "relative flex cursor-default items-center gap-2 rounded-md px-2 py-2 text-sm outline-none select-none",
                          (hoveredResult ?? selectedResult) === doc.slug
                            ? "text-accent-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        <AnimatePresence>
                          {(isHovered || selectedResult === doc.slug) && (
                            <motion.span
                              aria-hidden="true"
                              layoutId={
                                shouldReduceMotion
                                  ? undefined
                                  : `${layoutId}-hover`
                              }
                              className="pointer-events-none absolute inset-0 rounded-md bg-accent"
                              initial={
                                shouldReduceMotion ? false : { opacity: 0 }
                              }
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={
                                shouldReduceMotion
                                  ? { duration: 0.12 }
                                  : {
                                      type: "spring",
                                      bounce: 0,
                                      duration: 0.22,
                                    }
                              }
                            />
                          )}
                        </AnimatePresence>
                        <span className="relative z-10 flex items-center gap-2">
                          <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" />
                          {doc.title}
                        </span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </LayoutGroup>
            </CommandList>
          </Command>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
