import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const animateSpy = vi.hoisted(() => vi.fn());

vi.mock("motion/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("motion/react")>();
  return {
    ...actual,
    animate: (...args: unknown[]) => {
      animateSpy(...args);
      return (actual.animate as (...a: unknown[]) => unknown)(...args);
    },
  };
});

import AnimatedSwitch from "@/registry/sonaui/animated-switch/animated-switch";

beforeEach(() => {
  animateSpy.mockClear();
  HTMLElement.prototype.setPointerCapture = () => {};
});
afterEach(cleanup);

describe("AnimatedSwitch drag", () => {
  it("returns the thumb to the resting position when a controlled checked value is not updated", () => {
    const onCheckedChange = vi.fn();
    render(
      <AnimatedSwitch
        checked={false}
        onCheckedChange={onCheckedChange}
        aria-label="Ignition lock"
      />,
    );
    const root = screen.getByRole("switch");
    const thumb = root.querySelector("span") as HTMLElement;

    animateSpy.mockClear(); // ignore the mount animation
    fireEvent.pointerDown(thumb,{ button: 0, clientX: 0, pointerId: 1 });
    fireEvent.pointerMove(thumb, { clientX: 40, pointerId: 1 });
    fireEvent.pointerUp(thumb, { clientX: 40, pointerId: 1 });

    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(animateSpy).toHaveBeenCalledTimes(1);
    expect(animateSpy.mock.calls[0]?.[1]).toBe(0);
  });
});
