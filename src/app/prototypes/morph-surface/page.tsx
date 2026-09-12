import type { Metadata } from "next";

import MorphSurfacePrototype from "@/components/prototypes/morph-surface/morph-surface-prototype";

export const metadata: Metadata = {
  title: "Morph Surface Prototype",
  description: "Stress tests for the Morph Surface primitive.",
};

export default function MorphSurfacePrototypePage() {
  return <MorphSurfacePrototype />;
}
