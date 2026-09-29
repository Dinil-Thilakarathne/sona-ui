"use client";

import { RotateCcw } from "lucide-react";
import { useState } from "react";

import NotificationStack, {
  type NotificationStackItem,
} from "@/registry/sonaui/notification-stack/notification-stack";

const initialNotifications: NotificationStackItem[] = [
  {
    id: "deploy",
    title: "Deployment completed",
    description: "Your production release is live.",
    variant: "success",
    action: { label: "View deployment" },
  },
  {
    id: "review",
    title: "New review requested",
    description: "Maya asked for feedback on the interaction pass.",
    action: { label: "Open review" },
  },
  {
    id: "storage",
    title: "Storage is nearly full",
    description: "Free space before your next backup.",
    variant: "warning",
    action: { label: "Manage storage" },
  },
];

export default function NotificationStackDemo({
  maxVisible = 4,
}: {
  maxVisible?: number;
}) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [selected, setSelected] = useState("");

  return (
    <div className="relative flex flex-col items-end gap-3 min-h-80 w-full overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_80%_10%,_var(--color-secondary),_transparent_48%)] p-4">
      <NotificationStack
        placement="inline"
        maxVisible={maxVisible}
        notifications={notifications.map((notification) => ({
          ...notification,
          action: notification.action
            ? {
                ...notification.action,
                onClick: () => setSelected(notification.action?.label ?? ""),
              }
            : undefined,
        }))}
        onDismiss={(id) =>
          setNotifications((current) =>
            current.filter((notification) => notification.id !== id),
          )
        }
      />
      <p role="status" className="text-xs text-muted-foreground">
        {selected && `Selected: ${selected}`}
      </p>
      {notifications.length === 0 && (
        <button
          type="button"
          className="self-center rounded-lg border border-border bg-background px-3 py-2 font-medium text-sm shadow-sm outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          onClick={() => setNotifications(initialNotifications)}
        >
          <RotateCcw className="mr-2 inline size-4" />
          Restore notifications
        </button>
      )}
    </div>
  );
}
