import { ArrowUpRight } from "lucide-react";

import CursorHoverCard from "@/registry/sonaui/cursor-hover-card/cursor-hover-card";

export default function CursorHoverCardDemo() {
  return (
    <CursorHoverCard.Root>
      <CursorHoverCard.Trigger>
        <a
          href="https://github.com/Dinil-Thilakarathne"
          className="group flex items-center gap-3 rounded-xl px-3 py-2 outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="grid size-9 place-items-center rounded-full bg-foreground font-semibold text-background text-sm">
            DT
          </span>
          <span>
            <span className="block font-medium text-sm">
              Dinil Thilakarathne
            </span>
            <span className="block text-muted-foreground text-xs">
              Design engineer
            </span>
          </span>
          <ArrowUpRight className="ml-3 size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
        </a>
      </CursorHoverCard.Trigger>

      <CursorHoverCard.Content className="w-72 p-4">
        <div className="flex items-start gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-foreground font-semibold text-background">
            DT
          </span>
          <div>
            <p className="font-semibold text-sm">Dinil Thilakarathne</p>
            <p className="text-muted-foreground text-xs">@dinilthilakarathne</p>
          </div>
        </div>
        <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
          Building clear, expressive interfaces where interaction and motion
          improve understanding.
        </p>
      </CursorHoverCard.Content>
    </CursorHoverCard.Root>
  );
}
