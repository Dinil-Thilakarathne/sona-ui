"use client";

import { BookOpen, Clapperboard, FileText, ImageIcon, Music } from "lucide-react";

import CircularDockMenu from "@/registry/sonaui/circular-dock-menu/circular-dock-menu";

const ITEMS = [
  { label: "Document", icon: FileText },
  { label: "Learning", icon: BookOpen },
  { label: "Music", icon: Music },
  { label: "Video", icon: Clapperboard },
  { label: "Image", icon: ImageIcon },
];

export default function CircularDockMenuDemo() {
  return <CircularDockMenu items={ITEMS} />;
}
