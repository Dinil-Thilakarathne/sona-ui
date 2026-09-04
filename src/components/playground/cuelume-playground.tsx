"use client";

import { bind, play, type SoundName, setEnabled, sounds } from "cuelume";
import { Check, Copy, Loader2, Trash2, Volume2, VolumeX } from "lucide-react";
import Link from "@/components/common/link";
import { useEffect, useRef, useState } from "react";
import AnimatedSwitch from "@/registry/sonaui/animated-switch/animated-switch";
import Button from "@/registry/sonaui/button/button";
import FluidTabs from "@/registry/sonaui/fluid-tabs/fluid-tabs";

/**
 * Metadata for the soundboard, mirroring the cuelume README palette.
 * Grouped so the fourteen sounds read as three purpose-driven families.
 */
const SOUND_META: Record<
  SoundName,
  { character: string; use: string; group: "ambient" | "tactile" | "status" }
> = {
  chime: {
    character: "Soft two-note ascending bell",
    use: "Default hover",
    group: "ambient",
  },
  sparkle: {
    character: "Quick four-note twinkle",
    use: "Playful accents",
    group: "ambient",
  },
  droplet: {
    character: "Single note gliding down",
    use: "Dismiss, collapse",
    group: "ambient",
  },
  bloom: {
    character: "Warm slow swell",
    use: "Reveal, expand",
    group: "ambient",
  },
  whisper: {
    character: "Breathy quiet swell",
    use: "Dense lists",
    group: "ambient",
  },
  tick: {
    character: "Crisp instant tick",
    use: "Nav and menu hover",
    group: "ambient",
  },
  press: {
    character: "Dull muted knock",
    use: "Pointer down",
    group: "tactile",
  },
  release: {
    character: "Brighter springy tick",
    use: "Pointer up",
    group: "tactile",
  },
  toggle: {
    character: "Mechanical click-clack",
    use: "Switches, tabs",
    group: "tactile",
  },
  success: {
    character: "Warm three-note confirmation",
    use: "After an action succeeds",
    group: "status",
  },
  error: {
    character: "Soft knock, descending refusal",
    use: "Recoverable errors",
    group: "status",
  },
  page: {
    character: "Papery flick with a glass tick",
    use: "Pages, galleries, carousels",
    group: "status",
  },
  loading: {
    character: "Brief unresolved rising shimmer",
    use: "Work starting",
    group: "status",
  },
  ready: {
    character: "Focus tick with a harmonic bloom",
    use: "Content loaded",
    group: "status",
  },
};

const GROUPS: {
  id: "ambient" | "tactile" | "status";
  title: string;
  description: string;
}[] = [
  {
    id: "ambient",
    title: "Ambient & hover",
    description: "Soft feedback for pointer movement and reveals.",
  },
  {
    id: "tactile",
    title: "Tactile",
    description: "Press, release, and toggle — physical, mechanical cues.",
  },
  {
    id: "status",
    title: "Status",
    description: "Outcome cues for actions, navigation, and async work.",
  },
];

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="mb-4">
        <h2 className="font-semibold text-foreground text-lg tracking-tight">
          {title}
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">{description}</p>
      </div>
      {children}
    </section>
  );
}

export default function CuelumePlayground() {
  const [enabled, setEnabledState] = useState(true);
  const [hoverSound, setHoverSound] = useState<SoundName>("tick");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bind(rootRef.current ?? undefined);
  }, []);

  function handleEnabledChange(next: boolean) {
    setEnabledState(next);
    setEnabled(next);
  }

  return (
    <div
      ref={rootRef}
      className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mb-2 font-mono text-muted-foreground text-xs">
            /playground/cuelume
          </p>
          <h1 className="font-semibold text-3xl text-foreground tracking-tight">
            Cuelume sound effects
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground text-sm leading-6">
            Fourteen Web Audio interaction sounds, synthesized live with no
            audio files. This page binds them to real Sona UI elements so you
            can hear how they feel before wiring them into production.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 rounded-lg border bg-background px-3 py-2">
            {enabled ? (
              <Volume2 className="size-4 text-foreground" aria-hidden="true" />
            ) : (
              <VolumeX
                className="size-4 text-muted-foreground"
                aria-hidden="true"
              />
            )}
            <span className="font-medium text-foreground text-sm">
              {enabled ? "Sound on" : "Sound off"}
            </span>
            <AnimatedSwitch
              checked={enabled}
              onCheckedChange={handleEnabledChange}
              aria-label="Enable Cuelume sounds"
            />
          </div>
        </div>
      </header>

      <div className="mb-8 rounded-lg border border-dashed bg-muted/40 p-4 font-mono text-xs text-muted-foreground">
        <p className="mb-2 text-foreground">Wire it up once:</p>
        <pre className="overflow-x-auto">
          {`import { bind } from "cuelume";\n\nuseEffect(() => { bind(); }, []);`}
        </pre>
      </div>

      <div className="flex flex-col gap-6">
        {/* Soundboard — imperative play() for every sound. */}
        <Section
          title="Soundboard"
          description="Click any tile to play it imperatively with play(name). Works with mouse, touch, and keyboard."
        >
          <div className="flex flex-col gap-6">
            {GROUPS.map((group) => (
              <div key={group.id}>
                <h3 className="mb-1 font-medium text-foreground text-sm">
                  {group.title}
                </h3>
                <p className="mb-3 text-muted-foreground text-xs">
                  {group.description}
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {sounds
                    .filter((name) => SOUND_META[name].group === group.id)
                    .map((name) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => play(name)}
                        className="group flex flex-col items-start rounded-lg border bg-background p-3 text-left transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span className="font-mono font-medium text-foreground text-sm group-hover:underline group-hover:underline-offset-4">
                          {name}
                        </span>
                        <span className="mt-1 text-muted-foreground text-xs leading-4">
                          {SOUND_META[name].character}
                        </span>
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Declarative — data-cuelume-* attributes + bind(). */}
        <Section
          title="Declarative attributes"
          description="Add data-cuelume-* to markup and call bind(). Hover, press, and release need a fine mouse pointer; toggle follows native click."
        >
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-2 font-mono text-muted-foreground text-xs">
                data-cuelume-press · data-cuelume-release
              </p>
              <div className="flex flex-wrap gap-3">
                <Button data-cuelume-press="" data-cuelume-release="">
                  Press & release
                </Button>
                <Button
                  variant="outlined"
                  data-cuelume-press="press"
                  data-cuelume-release="release"
                >
                  Explicit sounds
                </Button>
                <button
                  type="button"
                  data-cuelume-press=""
                  data-cuelume-release=""
                  className="inline-flex h-10 items-center rounded-xl border bg-background px-5 font-medium text-sm text-foreground transition-colors hover:bg-accent"
                >
                  Native button
                </button>
              </div>
            </div>

            <div>
              <p className="mb-2 font-mono text-muted-foreground text-xs">
                data-cuelume-hover="tick"
              </p>
              <nav className="flex flex-wrap gap-1 rounded-lg border bg-background p-1">
                {["Docs", "Components", "Pricing", "Blog", "Changelog"].map(
                  (item) => (
                    <span
                      key={item}
                      data-cuelume-hover="tick"
                      className="cursor-default rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {item}
                    </span>
                  ),
                )}
              </nav>
            </div>

            <div>
              <p className="mb-2 font-mono text-muted-foreground text-xs">
                data-cuelume-toggle · on a switch
              </p>
              <div className="inline-flex items-center gap-3">
                <span
                  data-cuelume-toggle=""
                  className="inline-flex items-center"
                >
                  <AnimatedSwitch aria-label="Toggle with sound" />
                </span>
                <span className="text-foreground text-sm">Dark mode</span>
              </div>
            </div>

            <div>
              <p className="mb-2 font-mono text-muted-foreground text-xs">
                data-cuelume-hover — configurable
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={hoverSound}
                  onChange={(e) => setHoverSound(e.target.value as SoundName)}
                  className="h-9 rounded-md border bg-background px-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {sounds.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                {/* key forces bind to re-read the attribute value on change */}
                <span
                  key={hoverSound}
                  data-cuelume-hover={hoverSound}
                  className="inline-flex h-10 cursor-default items-center rounded-xl border border-dashed bg-background px-5 text-sm text-muted-foreground"
                >
                  Hover me → {hoverSound}
                </span>
              </div>
            </div>
          </div>
        </Section>

        {/* Tabs — page/toggle feel on view switches. */}
        <Section
          title="Tabbed navigation"
          description="Each trigger carries data-cuelume-toggle for a mechanical switch cue as the view changes."
        >
          <div
            data-cuelume-toggle=""
            className="inline-flex [&_button]:cursor-pointer"
          >
            <FluidTabs
              defaultValue="overview"
              variant="capsule"
              tabs={[
                { value: "overview", title: "Overview" },
                { value: "activity", title: "Activity" },
                { value: "settings", title: "Settings" },
              ]}
            />
          </div>
        </Section>

        {/* Imperative — play() from real async flows. */}
        <Section
          title="Imperative from real flows"
          description="Call play(name) at the exact moment an action resolves — the sound follows the outcome, not the click."
        >
          <ImperativeDemos />
        </Section>
      </div>

      <footer className="mt-10 border-t pt-6 text-muted-foreground text-xs">
        <p>
          Package:{" "}
          <Link
            href="https://github.com/Danilaa1/cuelume"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-foreground underline underline-offset-4"
          >
            cuelume
          </Link>{" "}
          · Sounds respect the global toggle above via setEnabled(). Cuelume
          does not persist the preference — your app owns that.
        </p>
      </footer>
    </div>
  );
}

function ImperativeDemos() {
  const [copied, setCopied] = useState(false);
  const [loadState, setLoadState] = useState<"idle" | "loading" | "done">(
    "idle",
  );

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText("npm install cuelume");
      play("success");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      play("error");
    }
  }

  function handleLoad() {
    if (loadState === "loading") return;
    setLoadState("loading");
    play("loading");
    setTimeout(() => {
      setLoadState("done");
      play("ready");
      setTimeout(() => setLoadState("idle"), 1500);
    }, 1400);
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="outlined" onClick={handleCopy}>
        {copied ? (
          <Check className="size-4" aria-hidden="true" />
        ) : (
          <Copy className="size-4" aria-hidden="true" />
        )}
        {copied ? "Copied — success" : "Copy install cmd"}
      </Button>

      <Button variant="outlined" onClick={handleLoad}>
        {loadState === "loading" ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <Check className="size-4" aria-hidden="true" />
        )}
        {loadState === "loading"
          ? "Loading…"
          : loadState === "done"
            ? "Ready!"
            : "Simulate load → ready"}
      </Button>

      <Button variant="outlined" onClick={() => play("error")}>
        <Trash2 className="size-4" aria-hidden="true" />
        Trigger error
      </Button>
    </div>
  );
}
