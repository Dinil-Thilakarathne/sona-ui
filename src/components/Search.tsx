"use client";

import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "cmdk";
import { ArrowRight, SearchIcon } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import { useRouter } from "next/navigation";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/themes";
import { useMediaQuery } from "@/hooks/useMediaQuery";

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
        className="border-input hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring text-muted-foreground hidden items-center gap-2 rounded-md border bg-transparent px-3 py-1.5 text-sm font-medium whitespace-nowrap shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 lg:inline-flex"
      >
        <SearchIcon className="h-4 w-4" />
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <kbd className="bg-muted text-muted-foreground pointer-events-none hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none lg:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        label="Global Command Menu"
        title="Search documentation"
      >
        <VisuallyHidden>
          <DialogTitle aria-label="Search documentation" aria-hidden="true">
            Search documentation
          </DialogTitle>
        </VisuallyHidden>
        <div className="bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 backdrop-blur-sm" />
        <div className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white/80 p-0 shadow-lg duration-200 sm:rounded-lg md:w-full">
          <div
            className="flex items-center border-b px-3"
            cmdk-input-wrapper=""
          >
            <CommandInput
              placeholder="Search documentation..."
              value={query}
              onValueChange={setQuery}
              className="placeholder:text-muted-foreground flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed"
            />
          </div>
          <CommandList className="max-h-[300px] overflow-x-hidden overflow-y-auto px-3">
            <CommandEmpty className="py-6 text-center text-sm">
              No results found.
            </CommandEmpty>
            <CommandGroup
              heading="Pages"
              className="text-foreground **:[[cmdk-group-heading]]:text-muted-foreground overflow-hidden pb-4 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:pb-2 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium"
            >
              {results.map((doc) => (
                <CommandItem
                  key={doc.slug}
                  value={doc.title}
                  onSelect={() => {
                    runCommand(() => router.push(`/docs/${doc.slug}`));
                  }}
                  className="aria-selected:bg-accent aria-selected:text-accent-foreground relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-85"
                >
                  <div className="mr-2 flex h-4 w-4 items-center justify-center">
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
