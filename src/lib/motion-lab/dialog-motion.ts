import type { DialConfig, TransitionConfig } from "dialkit";
import type { Transition } from "motion/react";

export type DialogMotionPresetName = "subtle" | "responsive" | "expressive";

export const motionLabRegistry = [
  {
    id: "dialog",
    name: "Animated Dialog",
    href: "/tools/motion-lab",
  },
] as const;

export interface DialogMotionValues {
  from: "top" | "bottom" | "left" | "right" | "center";
  exitTo: "top" | "bottom" | "left" | "right" | "center";
  modal: boolean;
  motion: TransitionConfig;
  appearance: {
    y: number;
    scale: number;
    blur: number;
  };
  backdrop: {
    opacity: number;
    blur: number;
  };
  reducedMotion: boolean;
}

export const dialogMotionControls = {
  from: {
    type: "select",
    options: ["top", "bottom", "left", "right", "center"],
  },
  exitTo: {
    type: "select",
    options: ["top", "bottom", "left", "right", "center"],
  },
  modal: true as boolean,
  motion: {
    type: "spring",
    visualDuration: 0.32,
    bounce: 0.08,
  },
  appearance: {
    y: [16, 0, 40, 1],
    scale: [0.98, 0.92, 1, 0.001],
    blur: [4, 0, 12, 1],
  },
  backdrop: {
    opacity: [0.42, 0, 0.72, 0.01],
    blur: [6, 0, 20, 1],
  },
  reducedMotion: false as boolean,
  replay: { type: "action", label: "Replay preview" },
} satisfies DialConfig;

export const dialogMotionPresets: Record<
  DialogMotionPresetName,
  DialogMotionValues
> = {
  subtle: {
    from: "bottom",
    exitTo: "bottom",
    modal: true,
    motion: { type: "spring", visualDuration: 0.24, bounce: 0 },
    appearance: { y: 8, scale: 0.99, blur: 2 },
    backdrop: { opacity: 0.36, blur: 3 },
    reducedMotion: false,
  },
  responsive: {
    from: "bottom",
    exitTo: "bottom",
    modal: true,
    motion: { type: "spring", visualDuration: 0.32, bounce: 0.08 },
    appearance: { y: 16, scale: 0.98, blur: 4 },
    backdrop: { opacity: 0.42, blur: 6 },
    reducedMotion: false,
  },
  expressive: {
    from: "bottom",
    exitTo: "bottom",
    modal: true,
    motion: { type: "spring", visualDuration: 0.46, bounce: 0.2 },
    appearance: { y: 24, scale: 0.955, blur: 7 },
    backdrop: { opacity: 0.5, blur: 10 },
    reducedMotion: false,
  },
};

export function toMotionTransition(
  transition: TransitionConfig,
  reducedMotion: boolean,
): Transition {
  if (reducedMotion) {
    return { duration: 0 };
  }

  return transition as Transition;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function finiteNumber(value: unknown, min: number, max: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return Math.min(max, Math.max(min, value));
}

export function parseDialogMotionValues(
  value: unknown,
): DialogMotionValues | null {
  if (!isRecord(value)) return null;
  const motion = value.motion;
  const appearance = value.appearance;
  const backdrop = value.backdrop;
  if (!isRecord(motion) || !isRecord(appearance) || !isRecord(backdrop)) {
    return null;
  }

  let normalizedMotion: TransitionConfig;
  if (motion.type === "spring") {
    const visualDuration = finiteNumber(motion.visualDuration, 0.1, 2);
    const bounce = finiteNumber(motion.bounce, 0, 1);
    if (visualDuration === null || bounce === null) return null;
    normalizedMotion = { type: "spring", visualDuration, bounce };
  } else if (motion.type === "easing" && Array.isArray(motion.ease)) {
    const duration = finiteNumber(motion.duration, 0.05, 2);
    const ease = motion.ease.map((point) => finiteNumber(point, -2, 2));
    if (duration === null || ease.length !== 4 || ease.includes(null)) {
      return null;
    }
    normalizedMotion = {
      type: "easing",
      duration,
      ease: ease as [number, number, number, number],
    };
  } else {
    return null;
  }

  const y = finiteNumber(appearance.y, 0, 40);
  const scale = finiteNumber(appearance.scale, 0.92, 1);
  const appearanceBlur = finiteNumber(appearance.blur, 0, 12);
  const opacity = finiteNumber(backdrop.opacity, 0, 0.72);
  const backdropBlur = finiteNumber(backdrop.blur, 0, 20);
  if (
    y === null ||
    scale === null ||
    appearanceBlur === null ||
    opacity === null ||
    backdropBlur === null
  ) {
    return null;
  }

  return {
    from:
      value.from === "top" ||
      value.from === "bottom" ||
      value.from === "left" ||
      value.from === "right" ||
      value.from === "center"
        ? value.from
        : "bottom",
    exitTo:
      value.exitTo === "top" ||
      value.exitTo === "bottom" ||
      value.exitTo === "left" ||
      value.exitTo === "right" ||
      value.exitTo === "center"
        ? value.exitTo
        : "bottom",
    modal: value.modal !== false,
    motion: normalizedMotion,
    appearance: { y, scale, blur: appearanceBlur },
    backdrop: { opacity, blur: backdropBlur },
    reducedMotion: value.reducedMotion === true,
  };
}

export function createDialogCode(values: DialogMotionValues) {
  const transition = JSON.stringify(
    values.reducedMotion ? { duration: 0 } : values.motion,
    null,
    2,
  ).replace(/"([^"]+)":/g, "$1:");
  const initial = values.reducedMotion
    ? "{ opacity: 0 }"
    : `{ opacity: 0, y: ${values.appearance.y}, scale: ${values.appearance.scale}, filter: "blur(${values.appearance.blur}px)" }`;
  const exit = values.reducedMotion
    ? "{ opacity: 0 }"
    : `{ opacity: 0, y: ${Math.max(4, Math.round(values.appearance.y * 0.5))}, scale: ${Math.min(0.995, values.appearance.scale + 0.01)}, filter: "blur(${Math.max(2, Math.round(values.appearance.blur * 0.75))}px)" }`;

  return `<motion.div
  initial={${initial}}
  animate={{
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  }}
  exit={${exit}}
  transition={${transition}}
>
  {/* Dialog content */}
</motion.div>`;
}
