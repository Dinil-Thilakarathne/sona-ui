"use client";

import { useState } from "react";
import ImageTrail from "@/registry/sonaui/image-trail/image-trail";

const images = [
  "https://picsum.photos/id/1015/300/200",
  "https://picsum.photos/id/1025/300/200",
  "https://picsum.photos/id/1035/300/200",
  "https://picsum.photos/id/1043/300/200",
  "https://picsum.photos/id/1050/300/200",
  "https://picsum.photos/id/1062/300/200",
];

export default function ImageTrailInteractiveExample() {
  const [clicks, setClicks] = useState(0);

  return (
    <ImageTrail images={images} className="h-full w-full">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <p className="pointer-events-none text-center text-muted-foreground text-sm">
          Sweep the cursor to spawn the trail, then click the button or the link
          — the images never block them.
        </p>
        <button
          type="button"
          onClick={() => setClicks((c) => c + 1)}
          className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground text-sm shadow-sm transition-colors hover:bg-primary/90"
        >
          Clicked {clicks} {clicks === 1 ? "time" : "times"}
        </button>
        <a
          href="https://sonaui.dev"
          target="_blank"
          rel="noreferrer"
          className="text-foreground text-sm underline underline-offset-4 hover:text-primary"
        >
          A link that stays hoverable
        </a>
      </div>
    </ImageTrail>
  );
}
