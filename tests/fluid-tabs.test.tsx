import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Ref } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Motion mock: record the resolved `transition` prop on every render of the
// `motion.span` indicator. The transition is computed during render from
// `keyboardSelectionRef.current`, so the record captured on the activation
// render equals the value framer-motion would receive.
const motionMock = vi.hoisted(() => ({
  transitions: [] as Array<{ layoutId: unknown; transition: unknown }>,
  reduceMotion: false,
}));

vi.mock("motion/react", async () => {
  const React = await import("react");
  const MotionSpan = React.forwardRef(function MotionSpan(
    props: Record<string, unknown>,
    ref: Ref<HTMLSpanElement>,
  ) {
    motionMock.transitions.push({
      layoutId: props.layoutId,
      transition: props.transition,
    });
    return React.createElement("span", {
      ref,
      "data-testid": "motion-span",
      "data-layoutid": String(props.layoutId),
    });
  });
  const motion = new Proxy(
    {},
    {
      get: () => MotionSpan,
    },
  );
  return {
    motion,
    LayoutGroup: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    useReducedMotion: () => motionMock.reduceMotion,
  };
});

import FluidTabs from "@/registry/sonaui/fluid-tabs/fluid-tabs";

const SPRING = { type: "spring", stiffness: 320, damping: 40, mass: 0.9 };
const SNAP = { duration: 0 };

const tabs = [
  { value: "overview", title: "Overview" },
  { value: "activity", title: "Activity" },
  { value: "settings", title: "Settings" },
];

const tab = (name: string) => screen.getByRole("tab", { name });

function lastTransition() {
  return motionMock.transitions.at(-1)?.transition;
}

beforeEach(() => {
  motionMock.transitions.length = 0;
  motionMock.reduceMotion = false;
});

afterEach(() => {
  cleanup();
});

// Regression guards for the documented motion contract in
// src/content/docs/fluid-tabs.mdx: the indicator "moves between items for
// pointer input and updates immediately for keyboard input." These guard
// against re-introducing the ref-reset-timing bug and against removing the
// `onPointerDown` reset that prevents a stale keyboard ref from leaking
// into a later pointer activation.
describe("FluidTabs — keyboard vs pointer indicator motion", () => {
  it("keyboard activation snaps the indicator to duration: 0", async () => {
    const user = userEvent.setup();
    render(<FluidTabs tabs={tabs} defaultValue="overview" />);
    expect(lastTransition()).toEqual(SPRING); // initial mount, ref false

    tab("Activity").focus();
    await user.keyboard("{Enter}");

    expect(tab("Activity")).toHaveAttribute("aria-selected", "true");
    expect(lastTransition()).toEqual(SNAP);
  });

  it("pointer activation keeps the spring transition", async () => {
    const user = userEvent.setup();
    render(<FluidTabs tabs={tabs} defaultValue="overview" />);

    await user.click(tab("Activity"));

    expect(tab("Activity")).toHaveAttribute("aria-selected", "true");
    expect(lastTransition()).toEqual(SPRING);
  });

  it("a non-activating keydown (Arrow) does not leak into a later pointer activation", async () => {
    const user = userEvent.setup();
    render(<FluidTabs tabs={tabs} defaultValue="overview" />);
    motionMock.transitions.length = 0;

    // Arrow moves focus only under base-ui manual activation; it sets
    // keyboardSelectionRef.current = true but performs no value change.
    tab("Overview").focus();
    await user.keyboard("{ArrowRight}");

    // The onPointerDown reset must clear the stale ref so the click springs.
    await user.click(tab("Settings"));

    expect(tab("Settings")).toHaveAttribute("aria-selected", "true");
    expect(lastTransition()).toEqual(SPRING);
  });

  it("Enter on the active tab does not leak into a later pointer activation", async () => {
    const user = userEvent.setup();
    render(<FluidTabs tabs={tabs} defaultValue="overview" />);
    motionMock.transitions.length = 0;

    // base-ui's onClick early-returns when the tab is already active, so no
    // value change/render occurs to clear the ref set by the keydown.
    tab("Overview").focus();
    await user.keyboard("{Enter}");

    await user.click(tab("Activity"));

    expect(tab("Activity")).toHaveAttribute("aria-selected", "true");
    expect(lastTransition()).toEqual(SPRING);
  });
});
