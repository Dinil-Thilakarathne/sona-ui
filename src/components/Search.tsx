"use client";

import {
  CommandDialog,
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

export function Search() {
  const [open, setOpen] = React.useState(false);
  const { query, setQuery, results } = useSearch();
  const router = useRouter();

  const isDesktop = useMediaQuery("(min-width: 1024px) and (pointer: fine)");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey) && isDesktop) {
        e.preventDefault();
        setOpen((open) => !open);
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
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden lg:inline-flex gap-2 items-center px-3 py-1.5 font-medium text-muted-foreground text-sm whitespace-nowrap hover:text-accent-foreground bg-transparent hover:bg-accent border border-input rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring shadow-sm disabled:opacity-50 transition-colors disabled:pointer-events-none"
      >
        <SearchIcon className="h-4 w-4" />
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <kbd className="hidden lg:flex gap-1 items-center px-1.5 h-5 font-medium font-mono text-[10px] text-muted-foreground bg-muted border rounded opacity-100 pointer-events-none select-none">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        label="Search documentation"
      >
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <div className="grid fixed left-[50%] top-[50%] z-50 gap-4 p-0 max-w-lg w-full md:w-full bg-white/80 border sm:rounded-lg shadow-lg duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in translate-x-[-50%] translate-y-[-50%] data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=closed]:zoom-out-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] data-[state=open]:zoom-in-95">
          <div
            className="flex items-center px-3 border-b"
            cmdk-input-wrapper=""
          >
            <CommandInput
              placeholder="Search documentation..."
              value={query}
              onValueChange={setQuery}
              className="flex py-3 h-11 w-full text-sm placeholder:text-muted-foreground bg-transparent outline-none rounded-md disabled:cursor-not-allowed"
            />
          </div>
          <CommandList className="overflow-x-hidden overflow-y-auto px-3 max-h-[300px]">
            <CommandEmpty className="py-6 text-center text-sm">
              No results found.
            </CommandEmpty>
            <CommandGroup
              heading="Pages"
              className="overflow-hidden pb-4 **:[[cmdk-group-heading]]:pb-2 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 text-foreground **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground **:[[cmdk-group-heading]]:text-xs"
            >
              {results.map((doc) => (
                <CommandItem
                  key={doc.slug}
                  value={doc.title}
                  onSelect={() => {
                    runCommand(() => router.push(`/docs/${doc.slug}`));
                  }}
                  className="flex relative items-center px-2 py-1.5 text-sm aria-selected:text-accent-foreground aria-selected:bg-accent outline-none rounded-sm data-disabled:opacity-85 cursor-default select-none data-disabled:pointer-events-none"
                >
                  <div className="flex items-center justify-center mr-2 h-4 w-4">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                  {doc.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </div>
      </CommandDialog>
    </>
  );
}
