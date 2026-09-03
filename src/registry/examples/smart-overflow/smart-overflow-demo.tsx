"use client";

import { Archive, Copy, Eye, Pencil, Share2 } from "lucide-react";
import { useState } from "react";

import SmartOverflow, {
  SmartOverflowAction,
} from "@/registry/sonaui/smart-overflow/smart-overflow";

export default function SmartOverflowDemo() {
  const [lastAction, setLastAction] = useState("No action selected");

  return (
    <div className="w-full min-w-[240px] rounded-xl border border-border bg-card p-3 text-card-foreground shadow-sm resize-x overflow-auto">
      <div className="mb-4">
        <p className="font-medium text-sm">Quarterly product update</p>
        <p className="mt-1 text-muted-foreground text-xs">
          Draft · Updated 2m ago
        </p>
      </div>
      <SmartOverflow>
        <SmartOverflowAction
          id="edit"
          icon={<Pencil />}
          priority="primary"
          onSelect={() => setLastAction("Edit selected")}
        >
          Edit
        </SmartOverflowAction>
        <SmartOverflowAction
          id="preview"
          icon={<Eye />}
          priority="primary"
          onSelect={() => setLastAction("Preview selected")}
        >
          Preview
        </SmartOverflowAction>
        <SmartOverflowAction
          id="share"
          icon={<Share2 />}
          priority="secondary"
          onSelect={() => setLastAction("Share selected")}
        >
          Share
        </SmartOverflowAction>
        <SmartOverflowAction
          id="duplicate"
          icon={<Copy />}
          priority="secondary"
          onSelect={() => setLastAction("Duplicate selected")}
        >
          Duplicate
        </SmartOverflowAction>
        <SmartOverflowAction
          id="archive"
          icon={<Archive />}
          priority="overflow"
          destructive
          onSelect={() => setLastAction("Archive selected")}
        >
          Archive
        </SmartOverflowAction>
      </SmartOverflow>
      <p aria-live="polite" className="mt-3 text-muted-foreground text-xs">
        {lastAction}
      </p>
    </div>
  );
}
