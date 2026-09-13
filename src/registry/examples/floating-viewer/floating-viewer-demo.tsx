"use client";

import FloatingViewer from "@/registry/sonaui/floating-viewer/floating-viewer";

export default function FloatingViewerDemo() {
  return (
    <div className="grid w-full max-w-4xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-3">
        <p className="font-medium text-sm">Component walkthrough</p>
        <FloatingViewer>
          {/* biome-ignore lint/a11y/useMediaCaption: this demo video has no audio track */}
          <video
            aria-label="Sona UI animated dialog walkthrough"
            className="size-full object-cover"
            controls
            playsInline
            poster="/videos/posters/animated-dialog-poster.webp"
            preload="metadata"
            src="/videos/animated-dialog.mp4"
          />
        </FloatingViewer>
      </div>

      <form
        className="space-y-4 rounded-2xl bg-muted/45 p-5"
        onSubmit={(event) => event.preventDefault()}
      >
        <div>
          <h3 className="font-medium text-sm">Try it alongside the tutorial</h3>
          <p className="mt-1 text-muted-foreground text-xs leading-5">
            Float the video, then complete these fields without losing your
            place.
          </p>
        </div>
        <label className="block space-y-1.5 text-xs">
          <span className="font-medium">Project name</span>
          <input
            className="h-10 w-full rounded-xl bg-background px-3 outline-none ring-1 ring-border focus:ring-2 focus:ring-foreground/25"
            placeholder="Motion study"
          />
        </label>
        <label className="block space-y-1.5 text-xs">
          <span className="font-medium">Notes</span>
          <textarea
            className="min-h-24 w-full resize-none rounded-xl bg-background p-3 outline-none ring-1 ring-border focus:ring-2 focus:ring-foreground/25"
            placeholder="Capture what you notice..."
          />
        </label>
      </form>
    </div>
  );
}
