"use client";

import { useState } from "react";

import SwipeActionRow from "@/registry/sonaui/swipe-action-row/swipe-action-row";

export default function SwipeActionRowPlayground({
  threshold,
  disabled,
}: {
  threshold: number;
  disabled: boolean;
}) {
  const [archived, setArchived] = useState(false);

  if (archived) {
    return (
      <button
        type="button"
        className="rounded-lg px-3 py-2 text-muted-foreground text-sm hover:bg-muted"
        onClick={() => setArchived(false)}
      >
        Restore row
      </button>
    );
  }

  return (
    <SwipeActionRow.Root className="w-full max-w-md">
      <SwipeActionRow.Item disabled={disabled} threshold={threshold}>
        <SwipeActionRow.Actions side="left">
          <SwipeActionRow.Action
            fullSwipe
            className="bg-sky-600 text-white"
            onClick={() => setArchived(true)}
          >
            Archive
          </SwipeActionRow.Action>
        </SwipeActionRow.Actions>
        <SwipeActionRow.Actions side="right">
          <SwipeActionRow.Action className="bg-amber-500 text-white">
            Flag
          </SwipeActionRow.Action>
          <SwipeActionRow.Action
            variant="destructive"
            onClick={() => setArchived(true)}
          >
            Delete
          </SwipeActionRow.Action>
        </SwipeActionRow.Actions>
        <SwipeActionRow.Content className="flex min-h-20 items-center px-4">
          <div>
            <p className="font-medium text-sm">Motion review</p>
            <p className="text-muted-foreground text-sm">
              Swipe either direction or use the arrow keys
            </p>
          </div>
        </SwipeActionRow.Content>
      </SwipeActionRow.Item>
    </SwipeActionRow.Root>
  );
}
