import { Bell, Home, Search, Settings } from "lucide-react";

import FluidTooltip from "@/registry/sonaui/fluid-tooltip/fluid-tooltip";

const items = [
  { id: "home", label: "Home", icon: Home },
  { id: "search", label: "Search", icon: Search },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function FluidTooltipDemo() {
  return (
    <FluidTooltip.Group orientation="horizontal">
      <div className="flex items-center gap-1 rounded-2xl border border-border bg-muted/60 p-1.5">
        {items.map((item) => (
          <FluidTooltip.Root key={item.id} id={item.id}>
            <FluidTooltip.Trigger asChild>
              <button
                type="button"
                aria-label={item.label}
                className="grid size-10 place-items-center rounded-xl text-muted-foreground outline-none transition-colors duration-150 hover:bg-background hover:text-foreground focus-visible:bg-background focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                <item.icon aria-hidden="true" className="size-4" />
              </button>
            </FluidTooltip.Trigger>
            <FluidTooltip.Content>{item.label}</FluidTooltip.Content>
          </FluidTooltip.Root>
        ))}
      </div>
    </FluidTooltip.Group>
  );
}
