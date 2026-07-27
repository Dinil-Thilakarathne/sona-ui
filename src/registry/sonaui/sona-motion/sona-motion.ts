import type { Transition } from "motion/react";

/** Shared easing curves for stateful Sona UI motion. */
export const motionEasing = {
  enter: [0.23, 1, 0.32, 1],
  exit: [0.4, 0, 1, 1],
  move: [0.65, 0, 0.35, 1],
} as const;

/** Semantic motion transitions. Choose by interaction purpose, not component. */
export const motionTransition = {
  instant: { duration: 0 },
  reduced: { duration: 0.12, ease: motionEasing.enter },
  feedback: { type: "spring", bounce: 0, duration: 0.22 },
  enter: { duration: 0.18, ease: motionEasing.enter },
  exit: { duration: 0.12, ease: motionEasing.exit },
  spatial: { type: "spring", bounce: 0, duration: 0.35 },
  expressive: { type: "spring", bounce: 0.18, duration: 0.4 },
} satisfies Record<string, Transition>;
