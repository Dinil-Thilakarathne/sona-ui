"use client";

import { Bell, LogOut, Settings, User } from "lucide-react";
import { useState } from "react";
import {
  AnimatedDropdown,
  AnimatedDropdownContent,
  AnimatedDropdownItem,
  AnimatedDropdownSeparator,
  AnimatedDropdownTrigger,
} from "@/registry/sonaui/animated-dropdown/animated-dropdown";

export default function AnimatedDropdownControlled() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 items-center">
      <p className="text-muted-foreground text-sm">
        Dropdown is: <span className="font-semibold text-foreground">{open ? "open" : "closed"}</span>
      </p>
      <AnimatedDropdown open={open} onOpenChange={setOpen}>
        <AnimatedDropdownTrigger>Controlled ▾</AnimatedDropdownTrigger>
        <AnimatedDropdownContent>
          <AnimatedDropdownItem icon={<User />}>Profile</AnimatedDropdownItem>
          <AnimatedDropdownItem icon={<Bell />}>Notifications</AnimatedDropdownItem>
          <AnimatedDropdownItem icon={<Settings />}>Settings</AnimatedDropdownItem>
          <AnimatedDropdownSeparator />
          <AnimatedDropdownItem
            icon={<LogOut />}
            variant="danger"
            onClick={() => setOpen(false)}
          >
            Log out
          </AnimatedDropdownItem>
        </AnimatedDropdownContent>
      </AnimatedDropdown>
    </div>
  );
}
