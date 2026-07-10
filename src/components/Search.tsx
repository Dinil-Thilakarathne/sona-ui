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
import { useRouter } from "next/navigation";
import * as React from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSearch } from "@/hooks/useSearch";
import { analytics } from "@/lib/analytics";

export function Search() {
  const [open, setOpen] = React.useState(false);
  const { query, setQuery, results } = useSearch();
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const isDesktop = useMediaQuery("(min-width: 1024px) and (pointer: fine)");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey) && isDesktop) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isDesktop]);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        type="button"
        className="hidden lg:inline-flex gap-2 items-center px-3 py-1.5 font-medium text-muted-foreground text-sm whitespace-nowrap hover:text-accent-foreground bg-transparent hover:bg-accent border border-input rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring shadow-sm transition-colors"
      >
        <SearchIcon className="size-4" />
        <span>Search documentation...</span>
        <kbd className="flex gap-1 items-center px-1.5 h-5 font-medium font-mono text-[10px] text-muted-foreground bg-muted border rounded pointer-events-none select-none">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-150 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none" />
        <Dialog.Popup
          initialFocus={inputRef}
          aria-describedby={undefined}
          className="fixed left-1/2 top-[15vh] z-50 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 origin-top overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-lg transition duration-150 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-ending-style:duration-100 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none"
        >
          <Dialog.Title className="sr-only">Search documentation</Dialog.Title>
          <Command shouldFilter={false} label="Search documentation">
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
              <CommandGroup
                heading="Pages"
                className="text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:pb-1.5 **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground **:[[cmdk-group-heading]]:text-xs"
              >
                {results.map((doc) => (
                  <CommandItem
                    key={doc.slug}
                    value={doc.title}
                    onSelect={() => {
                      analytics.searchUsed({
                        query,
                        result_count: results.length,
                        selected: doc.slug,
                      });
                      runCommand(() => router.push(`/docs/${doc.slug}`));
                    }}
                    className="flex cursor-default items-center gap-2 rounded-md px-2 py-2 text-sm outline-none select-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                  >
                    <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" />
                    {doc.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
