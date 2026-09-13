import type { ReactNode } from "react";

export type ComponentShowcaseVideo = {
  src: string;
  poster?: string;
};

export type ComponentShowcaseItem = {
  name: string;
  slug: string;
  href: string;
  category: string;
  tag?: "new" | "soon" | "updated" | "beta" | "featured" | "default";
  video?: ComponentShowcaseVideo;
  preview?: ReactNode;
};
