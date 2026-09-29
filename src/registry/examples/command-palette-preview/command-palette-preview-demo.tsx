"use client";

import { Command } from "lucide-react";
import { useEffect, useState } from "react";

import CommandPalettePreview from "@/registry/sonaui/command-palette-preview/command-palette-preview";

const commands = [
  {
    id: "new-project",
    label: "Create project",
    description: "Start a new workspace.",
    group: "Create",
    shortcut: "⌘ N",
  },
  {
    id: "invite",
    label: "Invite teammate",
    description: "Give a collaborator access.",
    group: "Create",
  },
  {
    id: "search",
    label: "Search projects",
    description: "Find a workspace or file.",
    group: "Navigate",
    shortcut: "⌘ P",
    keywords: ["find"],
  },
  {
    id: "settings",
    label: "Open settings",
    description: "Manage your workspace preferences.",
    group: "Navigate",
    shortcut: "⌘ ,",
  },
];

export default function CommandPalettePreviewDemo({
  placeholder = "Search commands...",
}: {
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="flex min-h-72 w-full flex-col gap-4 items-center justify-center rounded-2xl bg-secondary/45 p-6">
      <button
        type="button"
        className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-left shadow-sm outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={() => setOpen(true)}
      >
        <Command className="size-4 text-muted-foreground" />
        <span className="min-w-40 text-muted-foreground text-sm">
          Search commands...
        </span>
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-medium text-[10px] text-muted-foreground">
          ⌘ K
        </kbd>
      </button>
      <p role="status" className="min-h-5 text-xs text-muted-foreground">
        {selected && `Selected: ${selected}`}
      </p>
      <CommandPalettePreview
        placeholder={placeholder}
        items={commands.map((command) => ({
          ...command,
          onSelect: () => setSelected(command.label),
        }))}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
}
