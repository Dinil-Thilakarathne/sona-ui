"use client";

import { Copy, Edit, Share2, Trash2 } from "lucide-react";
import {
  AnimatedDropdown,
  AnimatedDropdownContent,
  AnimatedDropdownItem,
  AnimatedDropdownSeparator,
  AnimatedDropdownTrigger,
  AnimatedDropdownTriggerIndicator,
} from "@/registry/sonaui/animated-dropdown/animated-dropdown";

export default function AnimatedDropdownDanger() {
  return (
    <AnimatedDropdown>
      <AnimatedDropdownTrigger>
        Actions
        <AnimatedDropdownTriggerIndicator />
      </AnimatedDropdownTrigger>
      <AnimatedDropdownContent align="start">
        <AnimatedDropdownItem icon={<Edit />}>Edit</AnimatedDropdownItem>
        <AnimatedDropdownItem icon={<Copy />}>Duplicate</AnimatedDropdownItem>
        <AnimatedDropdownItem icon={<Share2 />}>Share</AnimatedDropdownItem>
        <AnimatedDropdownSeparator />
        <AnimatedDropdownItem icon={<Trash2 />} variant="danger">
          Delete
        </AnimatedDropdownItem>
      </AnimatedDropdownContent>
    </AnimatedDropdown>
  );
}
