"use client";

import { Bell, Folder, House, Settings, Sparkles } from "lucide-react";
import { useState } from "react";

import MagneticDock from "@/registry/sonaui/magnetic-dock/magnetic-dock";

const apps = [
  { id: "home", label: "Home", icon: House, href: "#home" },
  { id: "projects", label: "Projects", icon: Folder, href: "#projects" },
  { id: "create", label: "Create", icon: Sparkles, href: "#create" },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    href: "#notifications",
  },
  { id: "settings", label: "Settings", icon: Settings, href: "#settings" },
];

export default function MagneticDockDemo({
  distance,
  itemSize,
  magnification,
}: {
  distance?: number;
  itemSize?: number;
  magnification?: number;
}) {
  const [selected, setSelected] = useState("Home");
  return (
    <div className="flex flex-col gap-14 min-h-72 w-full items-center justify-end bg-[radial-gradient(circle_at_center,_var(--color-secondary),_transparent_65%)] px-4 pb-8 pt-12">
      <p role="status" className="text-sm text-muted-foreground">
        {selected}
      </p>
      <MagneticDock
        distance={distance}
        itemSize={itemSize}
        magnification={magnification}
        items={apps.map((app) => ({
          id: app.id,
          label: app.label,
          icon: app.icon,
          onClick: () => setSelected(app.label),
        }))}
      />
    </div>
  );
}
