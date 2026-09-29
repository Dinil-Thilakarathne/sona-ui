"use client";

import { Command, Search } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/sona-utils";

export interface CommandPaletteItem {
  /** A stable identifier used for selection and callbacks. */
  id: string;
  /** Primary command label. */
  label: string;
  /** Group label used to organize results. */
  group?: string;
  /** Optional supporting description. */
  description?: string;
  /** Optional keyboard shortcut label. */
  shortcut?: string;
  /** Optional alternate terms used for filtering. */
  keywords?: string[];
  /** Called when the command is selected. */
  onSelect?: () => void;
  /** Prevents selection of this command. */
  disabled?: boolean;
}

export interface CommandPalettePreviewProps {
  /** Commands available in the palette. */
  items: CommandPaletteItem[];
  /** Controlled visibility state. */
  open?: boolean;
  /**
   * Initial visibility for uncontrolled usage.
   * @default false
   */
  defaultOpen?: boolean;
  /** Called when the palette requests a visibility change. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Placeholder shown in the command search field.
   * @default "Search commands..."
   */
  placeholder?: string;
  /**
   * Copy shown when filtering returns no commands.
   * @default "No commands found."
   */
  emptyMessage?: string;
  /** Additional CSS classes for the palette surface. */
  className?: string;
}

export default function CommandPalettePreview({
  items,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  placeholder = "Search commands...",
  emptyMessage = "No commands found.",
  className,
}: CommandPalettePreviewProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listId = useId();
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return items;

    return items.filter((item) =>
      [item.label, item.description, item.group, ...(item.keywords ?? [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [items, query]);

  const groupedItems = useMemo(() => {
    return filteredItems.reduce<Map<string, CommandPaletteItem[]>>(
      (groups, item) => {
        const group = item.group ?? "Commands";
        const groupItems = groups.get(group) ?? [];
        groupItems.push(item);
        groups.set(group, groupItems);
        return groups;
      },
      new Map(),
    );
  }, [filteredItems]);

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const selectableItems = Array.from(groupedItems.values())
    .flat()
    .filter((item) => !item.disabled);
  const resolvedIndex = Math.min(
    activeIndex,
    Math.max(0, selectableItems.length - 1),
  );
  const activeItem = selectableItems[resolvedIndex];
  const activeId = activeItem ? `${listId}-${activeItem.id}` : undefined;
  useEffect(() => {
    if (isOpen && activeId)
      document.getElementById(activeId)?.scrollIntoView({ block: "nearest" });
  }, [isOpen, activeId]);
  const selectItem = (item: CommandPaletteItem) => {
    if (item.disabled) return;
    item.onSelect?.();
    setOpen(false);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-modal="true"
      aria-label="Command palette"
      onCancel={(event) => {
        event.preventDefault();
        setOpen(false);
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          setOpen(false);
      }}
      className={cn(
        "fixed inset-x-0 top-[min(18vh,9rem)] m-0 mx-auto p-0",
        "w-[calc(100%_-_2rem)] max-w-xl max-h-[80dvh] overflow-y-auto rounded-2xl border-0 bg-background text-foreground smooth-shadow-ring-2xl backdrop:bg-foreground/20 backdrop:backdrop-blur-[2px]",
        className,
      )}
      onKeyDown={(event) => {
        if (event.nativeEvent.isComposing) return;
        if (event.key === "ArrowDown") {
          event.preventDefault();
          setActiveIndex(
            selectableItems.length
              ? (resolvedIndex + 1) % selectableItems.length
              : 0,
          );
        }
        if (event.key === "ArrowUp") {
          event.preventDefault();
          setActiveIndex(
            selectableItems.length
              ? (resolvedIndex - 1 + selectableItems.length) %
                  selectableItems.length
              : 0,
          );
        }
        if (event.key === "Enter" && activeItem) {
          event.preventDefault();
          selectItem(activeItem);
        }
      }}
    >
      <label className="flex items-center gap-3 border-border border-b px-4 py-3">
        <Search aria-hidden="true" className="size-5 text-muted-foreground" />
        <input
          ref={inputRef}
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          value={query}
          aria-controls={listId}
          aria-activedescendant={activeId}
          aria-label="Search commands"
          className="min-w-0 flex-1 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground"
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
          }}
          placeholder={placeholder}
        />
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-medium text-[10px] text-muted-foreground">
          Esc
        </kbd>
      </label>
      <div
        id={listId}
        role="listbox"
        aria-label="Commands"
        className="max-h-[min(20rem,45dvh)] overflow-y-auto p-2"
      >
        {filteredItems.length === 0 ? (
          <p className="px-3 py-8 text-center text-muted-foreground text-sm">
            {emptyMessage}
          </p>
        ) : (
          Array.from(groupedItems).map(([group, groupItems]) => (
            <fieldset key={group} aria-label={group} className="pb-2 last:pb-0">
              <p className="px-2 pb-1 pt-2 font-medium text-[11px] text-muted-foreground uppercase tracking-[0.12em]">
                {group}
              </p>
              {groupItems.map((item) => {
                const itemIndex = selectableItems.findIndex(
                  (selectableItem) => selectableItem.id === item.id,
                );
                const isActive = itemIndex >= 0 && itemIndex === resolvedIndex;

                return (
                  <button
                    id={`${listId}-${item.id}`}
                    key={item.id}
                    type="button"
                    role="option"
                    tabIndex={-1}
                    aria-disabled={item.disabled || undefined}
                    aria-selected={isActive}
                    disabled={item.disabled}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left outline-none transition-colors duration-150 motion-reduce:transition-none",
                      isActive && "bg-accent text-accent-foreground",
                      "hover:bg-accent focus-visible:bg-accent disabled:pointer-events-none disabled:opacity-45",
                    )}
                    onMouseEnter={() => {
                      if (itemIndex >= 0) setActiveIndex(itemIndex);
                    }}
                    onClick={() => selectItem(item)}
                    onMouseDown={(event) => event.preventDefault()}
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-md bg-muted text-muted-foreground">
                      <Command
                        aria-hidden="true"
                        className="size-4"
                        strokeWidth={1.8}
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-sm">
                        {item.label}
                      </span>
                      {item.description && (
                        <span className="mt-0.5 block truncate text-muted-foreground text-xs">
                          {item.description}
                        </span>
                      )}
                    </span>
                    {item.shortcut && (
                      <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-medium text-[10px] text-muted-foreground">
                        {item.shortcut}
                      </kbd>
                    )}
                  </button>
                );
              })}
            </fieldset>
          ))
        )}
      </div>
      <footer className="flex items-center justify-between border-border border-t px-4 py-2 text-muted-foreground text-xs">
        <span>↑ ↓ to navigate</span>
        <span>↵ to select</span>
      </footer>
    </dialog>
  );
}
