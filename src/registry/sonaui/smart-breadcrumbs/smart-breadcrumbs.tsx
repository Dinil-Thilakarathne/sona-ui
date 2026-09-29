"use client";

import { Fragment } from "react";
import { Menu } from "@base-ui/react/menu";
import { ChevronRight, Ellipsis } from "lucide-react";

import { cn } from "@/lib/sona-utils";

export interface SmartBreadcrumbItem {
  /** Optional stable identity for a path level. @default undefined */
  id?: string;
  /** Text shown for this level. */
  label: string;
  /** Destination for a level that can be revisited. */
  href?: string;
}

export interface SmartBreadcrumbsProps {
  /** Ordered path from the first level to the current page. */
  items: SmartBreadcrumbItem[];
  /**
   * Minimum number of levels before the middle levels collapse.
   * @default 4
   */
  collapseAt?: number;
  /**
   * Accessible label for the navigation landmark.
   * @default "Breadcrumb"
   */
  ariaLabel?: string;
  /** Additional classes for the navigation landmark. */
  className?: string;
}

function Separator() {
  return (
    <ChevronRight
      aria-hidden="true"
      className="size-3.5 shrink-0 text-muted-foreground/60"
    />
  );
}

export default function SmartBreadcrumbs({
  items,
  collapseAt = 4,
  ariaLabel = "Breadcrumb",
  className,
}: SmartBreadcrumbsProps) {
  if (items.length === 0) return null;

  const shouldCollapse = items.length >= Math.max(4, collapseAt);
  const keyedItems = items.map((item, depth) => ({
    ...item,
    key:
      item.id ??
      JSON.stringify(
        items.slice(0, depth + 1).map((level) => [level.href, level.label]),
      ),
  }));
  const middleItems = shouldCollapse ? keyedItems.slice(1, -1) : [];
  const visibleItems = shouldCollapse
    ? [keyedItems[0], keyedItems[keyedItems.length - 1]]
    : keyedItems;

  return (
    <nav aria-label={ariaLabel} className={cn("min-w-0 max-w-full", className)}>
      <ol className="flex min-w-0 items-center gap-1.5 text-sm">
        {visibleItems.map((item, index) => {
          const isCurrent = index === visibleItems.length - 1;

          return (
            <Fragment key={item.key}>
              {shouldCollapse && index === 1 && (
                <li className="flex shrink-0 items-center gap-1.5">
                  <Separator />
                  <Menu.Root modal={false}>
                    <Menu.Trigger
                      aria-label={`Show ${middleItems.length} hidden breadcrumb levels`}
                      className="grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
                    >
                      <Ellipsis aria-hidden="true" className="size-4" />
                    </Menu.Trigger>
                    <Menu.Portal>
                      <Menu.Positioner
                        side="bottom"
                        align="start"
                        sideOffset={6}
                        className="z-50"
                      >
                        <Menu.Popup className="min-w-40 max-w-[calc(100vw-2rem)] max-h-[var(--available-height)] overflow-y-auto origin-(--transform-origin) rounded-xl bg-popover p-1 text-popover-foreground smooth-shadow-ring-md transition-[opacity,transform] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none">
                          {middleItems.map((hiddenItem) => (
                            <Menu.Item
                              key={hiddenItem.key}
                              render={
                                hiddenItem.href ? (
                                  <a href={hiddenItem.href}>
                                    {hiddenItem.label}
                                  </a>
                                ) : undefined
                              }
                              disabled={!hiddenItem.href}
                              className="flex min-h-9 cursor-pointer items-center rounded-lg px-3 py-2 text-sm break-words [overflow-wrap:anywhere] outline-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:cursor-default data-disabled:opacity-50"
                            >
                              {hiddenItem.href ? undefined : hiddenItem.label}
                            </Menu.Item>
                          ))}
                        </Menu.Popup>
                      </Menu.Positioner>
                    </Menu.Portal>
                  </Menu.Root>
                </li>
              )}
              <li className="flex min-w-0 items-center gap-1.5">
                {index > 0 && <Separator />}
                {isCurrent ? (
                  <span
                    aria-current="page"
                    className="min-w-0 truncate font-medium text-foreground"
                  >
                    {item.label}
                  </span>
                ) : item.href ? (
                  <a
                    href={item.href}
                    className="min-w-0 truncate rounded-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="min-w-0 truncate text-muted-foreground">
                    {item.label}
                  </span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
