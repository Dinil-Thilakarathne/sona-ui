"use client";

import { Bell, CreditCard, LogOut, Settings, User } from "lucide-react";
import {
  AnimatedDropdown,
  AnimatedDropdownContent,
  AnimatedDropdownItem,
  AnimatedDropdownSeparator,
  AnimatedDropdownTrigger,
} from "@/registry/sonaui/animated-dropdown/animated-dropdown";

export default function AnimatedDropdownDemo() {
  return (
    <AnimatedDropdown>
      <AnimatedDropdownTrigger>My Account ▾</AnimatedDropdownTrigger>
      <AnimatedDropdownContent>
        <AnimatedDropdownItem icon={<User />}>Profile</AnimatedDropdownItem>
        <AnimatedDropdownItem icon={<CreditCard />}>
          Billing
        </AnimatedDropdownItem>
        <AnimatedDropdownItem icon={<Bell />}>
          Notifications
        </AnimatedDropdownItem>
        <AnimatedDropdownItem icon={<Settings />}>
          Settings
        </AnimatedDropdownItem>
        <AnimatedDropdownSeparator />
        <AnimatedDropdownItem icon={<LogOut />} variant="danger">
          Log out
        </AnimatedDropdownItem>
      </AnimatedDropdownContent>
    </AnimatedDropdown>
  );
}
