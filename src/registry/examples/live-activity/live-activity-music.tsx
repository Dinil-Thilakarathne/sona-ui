"use client";

import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useState } from "react";
import LiveActivity from "@/registry/sonaui/live-activity/live-activity";

function AlbumArtwork() {
  return (
    <span className="relative block size-12 overflow-hidden rounded-xl bg-[linear-gradient(145deg,#fb7185_0%,#7c3aed_52%,#172554_100%)] shadow-lg shadow-fuchsia-950/30">
      <span className="absolute -bottom-3 -right-3 size-10 rounded-full border-[7px] border-white/25" />
      <span className="absolute left-2 top-2 size-4 rounded-full bg-amber-200/80 blur-[1px]" />
    </span>
  );
}

export default function LiveActivityMusic() {
  const [playing, setPlaying] = useState(true);

  return (
    <div className="flex min-h-[28rem] w-full max-w-xl items-start justify-center px-3 py-10">
      <LiveActivity.Root>
        <LiveActivity.Surface className="smooth-shadow-ring-lg rounded-[1.75rem] bg-[#17141c] text-white shadow-black/25">
          <LiveActivity.Compact>
            <LiveActivity.Trigger className="flex h-[4.5rem] w-[19rem] items-center gap-3 rounded-[1.75rem] px-3 text-left">
              <LiveActivity.Shared id="artwork">
                <AlbumArtwork />
              </LiveActivity.Shared>
              <span className="min-w-0 flex-1">
                <LiveActivity.Shared
                  id="track"
                  className="block truncate text-sm font-semibold tracking-[-0.01em]"
                >
                  Night Drive
                </LiveActivity.Shared>
                <LiveActivity.Shared
                  id="artist"
                  className="mt-0.5 block truncate text-xs text-white/50"
                >
                  Luna Avenue
                </LiveActivity.Shared>
              </span>
              <span className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white/80">
                {playing ? (
                  <Pause aria-hidden="true" className="size-4 fill-current" />
                ) : (
                  <Play
                    aria-hidden="true"
                    className="ml-0.5 size-4 fill-current"
                  />
                )}
              </span>
            </LiveActivity.Trigger>
          </LiveActivity.Compact>

          <LiveActivity.Expanded className="w-[22rem] p-4 pb-4 [@media(pointer:coarse)]:pb-0">
            <div className="flex items-center gap-3">
              <LiveActivity.Shared id="artwork">
                <AlbumArtwork />
              </LiveActivity.Shared>
              <span className="min-w-0 flex-1">
                <LiveActivity.Shared
                  id="track"
                  className="block truncate text-sm font-semibold tracking-[-0.01em]"
                >
                  Night Drive
                </LiveActivity.Shared>
                <LiveActivity.Shared
                  id="artist"
                  className="mt-0.5 block truncate text-xs text-white/50"
                >
                  Luna Avenue
                </LiveActivity.Shared>
              </span>
              <LiveActivity.Close className="flex size-9 items-center justify-center rounded-full text-lg text-white/40 hover:bg-white/10 hover:text-white" />
            </div>

            <div className="mt-6">
              <div
                role="progressbar"
                aria-label="Night Drive playback"
                aria-valuemin={0}
                aria-valuemax={214}
                aria-valuenow={82}
                className="h-1 overflow-hidden rounded-full bg-white/10"
              >
                <div className="h-full w-[38%] rounded-full bg-white/80" />
              </div>
              <div className="mt-2 flex justify-between text-[0.625rem] font-medium tabular-nums text-white/35">
                <span>1:22</span>
                <span>-2:12</span>
              </div>
            </div>

            <div className="mt-1 flex items-center justify-center gap-7">
              <button
                type="button"
                aria-label="Previous track"
                className="flex size-11 items-center justify-center rounded-full text-white/75 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-300 active:scale-95 motion-reduce:transform-none"
              >
                <SkipBack aria-hidden="true" className="size-5 fill-current" />
              </button>
              <button
                type="button"
                aria-label={playing ? "Pause Night Drive" : "Play Night Drive"}
                onClick={() => setPlaying((current) => !current)}
                className="flex size-14 items-center justify-center rounded-full bg-white text-[#17141c] hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-300 active:scale-[0.97] motion-reduce:transform-none"
              >
                {playing ? (
                  <Pause aria-hidden="true" className="size-5 fill-current" />
                ) : (
                  <Play
                    aria-hidden="true"
                    className="ml-0.5 size-5 fill-current"
                  />
                )}
              </button>
              <button
                type="button"
                aria-label="Next track"
                className="flex size-11 items-center justify-center rounded-full text-white/75 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-300 active:scale-95 motion-reduce:transform-none"
              >
                <SkipForward
                  aria-hidden="true"
                  className="size-5 fill-current"
                />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2 text-white/35">
              <Volume2 aria-hidden="true" className="size-3.5" />
              <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                <span className="block h-full w-[68%] rounded-full bg-white/45" />
              </span>
            </div>
            <LiveActivity.Handle className="mt-1 text-white/35 hover:text-white/60" />
          </LiveActivity.Expanded>
        </LiveActivity.Surface>
      </LiveActivity.Root>
    </div>
  );
}
