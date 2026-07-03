"use client";

import FanView from "@/registry/sonaui/fan-view/fan-view";

const ITEMS = [
  { label: "Music", width: 164 },
  { label: "Video", width: 160 },
  { label: "Image", width: 156 },
  { label: "Learning", width: 180 },
  { label: "Document", width: 196 },
];

export default function FanViewDemo() {
  return <FanView items={ITEMS} />;
}
