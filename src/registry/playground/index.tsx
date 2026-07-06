import {
  BookOpen,
  Clapperboard,
  FileText,
  ImageIcon,
  Music,
} from "lucide-react";
import type * as React from "react";
import CircularDockMenu from "@/registry/sonaui/circular-dock-menu/circular-dock-menu";
import DotOrbitShader from "@/registry/sonaui/dot-orbit-shader/dot-orbit-shader";
import FanView from "@/registry/sonaui/fan-view/fan-view";
import HoldToDeleteButton from "@/registry/sonaui/hold-to-delete-button/hold-to-delete-button";
import Magnetic from "@/registry/sonaui/magnetic-button/magnetic-button";
import Marquee from "@/registry/sonaui/marquee/marquee";
import MeshGradientShader from "@/registry/sonaui/mesh-gradient-shader/mesh-gradient-shader";
import RippleButton, {
  RippleButtonText,
} from "@/registry/sonaui/ripple-button/ripple-button";
import SpinningText from "@/registry/sonaui/spinning-text/spinning-text";
import SpotlightCard from "@/registry/sonaui/spotlight-card/spotlight-card";

/**
 * Hand-authored playground registry.
 *
 * This is intentionally decoupled from the auto-generated `exampleRegistry`
 * (see `scripts/build-registry.ts`). Static, canonical examples live there and
 * are rendered with no props; live, interactive playgrounds live here and expose
 * an explicit per-component control schema that drives a real component instance.
 *
 * Adding a playground for a component = one entry below (controls + render).
 */

export type Control =
  | {
      type: "slider";
      prop: string;
      label: string;
      min: number;
      max: number;
      step?: number;
      default: number;
    }
  | { type: "text"; prop: string; label: string; default: string }
  | { type: "color"; prop: string; label: string; default: string }
  | { type: "toggle"; prop: string; label: string; default: boolean }
  | {
      type: "select";
      prop: string;
      label: string;
      options: { label: string; value: string }[];
      default: string;
    };

export type PlaygroundEntry = {
  controls: Control[];
  /** Renders the real sonaui component with the current control values applied. */
  render: (values: Record<string, unknown>) => React.ReactNode;
};

export const playgroundRegistry: Record<string, PlaygroundEntry> = {
  "dot-orbit-shader": {
    controls: [
      {
        type: "slider",
        prop: "size",
        label: "Dot size",
        min: 0.05,
        max: 1,
        step: 0.05,
        default: 0.4,
      },
      {
        type: "slider",
        prop: "sizeRange",
        label: "Size variation",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.3,
      },
      {
        type: "slider",
        prop: "spreading",
        label: "Orbit spread",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.5,
      },
      {
        type: "slider",
        prop: "speed",
        label: "Speed",
        min: 0,
        max: 3,
        step: 0.1,
        default: 1,
      },
    ],
    render: (v) => (
      <DotOrbitShader
        size={v.size as number}
        sizeRange={v.sizeRange as number}
        spreading={v.spreading as number}
        speed={v.speed as number}
        className="h-64 lg:h-72 w-full rounded-xl"
      />
    ),
  },

  "mesh-gradient-shader": {
    controls: [
      {
        type: "slider",
        prop: "distortion",
        label: "Distortion",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.3,
      },
      {
        type: "slider",
        prop: "swirl",
        label: "Swirl",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.2,
      },
      {
        type: "slider",
        prop: "speed",
        label: "Speed",
        min: 0,
        max: 3,
        step: 0.1,
        default: 1,
      },
      {
        type: "slider",
        prop: "grainOverlay",
        label: "Grain",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0,
      },
    ],
    render: (v) => (
      <MeshGradientShader
        distortion={v.distortion as number}
        swirl={v.swirl as number}
        speed={v.speed as number}
        grainOverlay={v.grainOverlay as number}
        className="h-64 lg:h-72 w-full rounded-xl"
      />
    ),
  },
  "ripple-button": {
    controls: [
      {
        type: "slider",
        prop: "scaleAmount",
        label: "Scale amount",
        min: 5,
        max: 60,
        step: 1,
        default: 25,
      },
      {
        type: "slider",
        prop: "duration",
        label: "Duration (s)",
        min: 0.1,
        max: 2,
        step: 0.1,
        default: 0.5,
      },
      {
        type: "text",
        prop: "label",
        label: "Button text",
        default: "Hover me",
      },
    ],
    render: (v) => (
      <RippleButton
        scaleAmount={v.scaleAmount as number}
        duration={v.duration as number}
        className="px-6 py-3"
      >
        <RippleButtonText text={(v.label as string) || "Hover me"} />
      </RippleButton>
    ),
  },

  "spinning-text": {
    controls: [
      {
        type: "text",
        prop: "text",
        label: "Text",
        default: "This is example text!",
      },
      {
        type: "slider",
        prop: "duration",
        label: "Duration (s) — higher is slower",
        min: 2,
        max: 30,
        step: 1,
        default: 10,
      },
      {
        type: "slider",
        prop: "radius",
        label: "Radius",
        min: 1,
        max: 15,
        step: 1,
        default: 5,
      },
      {
        type: "toggle",
        prop: "reverse",
        label: "Reverse direction",
        default: false,
      },
    ],
    render: (v) => (
      <SpinningText
        duration={v.duration as number}
        radius={v.radius as number}
        reverse={v.reverse as boolean}
      >
        {(v.text as string) || "This is example text!"}
      </SpinningText>
    ),
  },

  "magnetic-button": {
    controls: [
      {
        type: "slider",
        prop: "magneticIntensity",
        label: "Magnetic intensity",
        min: 0,
        max: 2,
        step: 0.1,
        default: 0.6,
      },
      {
        type: "slider",
        prop: "magneticRange",
        label: "Magnetic range (px)",
        min: 20,
        max: 300,
        step: 10,
        default: 100,
      },
      {
        type: "select",
        prop: "interactionArea",
        label: "Interaction area",
        options: [
          { label: "Self", value: "self" },
          { label: "Parent", value: "parent" },
        ],
        default: "self",
      },
    ],
    render: (v) => (
      <div className="border-border rounded-full border border-dashed p-2">
        <Magnetic
          magneticIntensity={v.magneticIntensity as number}
          magneticRange={v.magneticRange as number}
          interactionArea={v.interactionArea as "self" | "parent"}
        >
          <button
            type="button"
            className="bg-foreground text-background cursor-pointer rounded-full px-6 py-4 font-semibold"
          >
            Magnetic Button
          </button>
        </Magnetic>
      </div>
    ),
  },

  "spotlight-card": {
    controls: [
      {
        type: "slider",
        prop: "spotlightSize",
        label: "Spotlight size (px)",
        min: 100,
        max: 600,
        step: 10,
        default: 350,
      },
      {
        type: "color",
        prop: "spotlightColor",
        label: "Spotlight color",
        default: "rgba(56,189,248,0.25)",
      },
      {
        type: "toggle",
        prop: "disabled",
        label: "Disable effect",
        default: false,
      },
    ],
    render: (v) => (
      <SpotlightCard
        spotlightSize={v.spotlightSize as number}
        spotlightColor={v.spotlightColor as string}
        disabled={v.disabled as boolean}
        className="max-w-sm"
      >
        <h3 className="text-foreground text-lg font-semibold">
          Spotlight Card
        </h3>
        <p className="text-muted-foreground mt-2 text-sm">
          Move your cursor across the card to reveal the spotlight.
        </p>
      </SpotlightCard>
    ),
  },

  "hold-to-delete-button": {
    controls: [
      {
        type: "text",
        prop: "label",
        label: "Button label",
        default: "Hold To Delete",
      },
      {
        type: "slider",
        prop: "holdDuration",
        label: "Hold duration (ms)",
        min: 500,
        max: 5000,
        step: 100,
        default: 2000,
      },
    ],
    render: (v) => (
      <div className="flex items-center justify-center py-12">
        <HoldToDeleteButton
          label={(v.label as string) || "Hold To Delete"}
          holdDuration={v.holdDuration as number}
        />
      </div>
    ),
  },

  "circular-dock-menu": {
    controls: [
      {
        type: "slider",
        prop: "stiffness",
        label: "Spring stiffness",
        min: 100,
        max: 800,
        step: 20,
        default: 420,
      },
      {
        type: "slider",
        prop: "damping",
        label: "Spring damping",
        min: 10,
        max: 60,
        step: 2,
        default: 32,
      },
    ],
    render: (v) => (
      <CircularDockMenu
        stiffness={v.stiffness as number}
        damping={v.damping as number}
        items={[
          { label: "Document", icon: FileText },
          { label: "Learning", icon: BookOpen },
          { label: "Music", icon: Music },
          { label: "Video", icon: Clapperboard },
          { label: "Image", icon: ImageIcon },
        ]}
      />
    ),
  },

  "fan-view": {
    controls: [
      {
        type: "slider",
        prop: "stiffness",
        label: "Spring stiffness",
        min: 100,
        max: 800,
        step: 20,
        default: 540,
      },
      {
        type: "slider",
        prop: "damping",
        label: "Spring damping",
        min: 10,
        max: 60,
        step: 2,
        default: 28,
      },
    ],
    render: (v) => (
      <FanView
        stiffness={v.stiffness as number}
        damping={v.damping as number}
        items={[
          { label: "Music", width: 164 },
          { label: "Video", width: 160 },
          { label: "Image", width: 156 },
          { label: "Learning", width: 180 },
          { label: "Document", width: 196 },
        ]}
      />
    ),
  },

  marquee: {
    controls: [
      {
        type: "slider",
        prop: "duration",
        label: "Duration (s) — higher is slower",
        min: 2,
        max: 30,
        step: 1,
        default: 10,
      },
      {
        type: "toggle",
        prop: "reverse",
        label: "Reverse direction",
        default: false,
      },
      {
        type: "toggle",
        prop: "activeHover",
        label: "Pause on hover",
        default: false,
      },
      {
        type: "toggle",
        prop: "activeScroll",
        label: "React to scroll",
        default: false,
      },
    ],
    render: (v) => (
      <Marquee
        duration={v.duration as number}
        reverse={v.reverse as boolean}
        activeHover={v.activeHover as boolean}
        activeScroll={v.activeScroll as boolean}
        containerClassName="space-x-12"
      >
        <div className="text-foreground flex items-center gap-x-12 text-lg font-medium">
          {["Next.js", "React", "TypeScript", "Tailwind", "Motion"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </Marquee>
    ),
  },
};
