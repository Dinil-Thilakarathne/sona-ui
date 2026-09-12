import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import SwipeActionRow from "@/registry/sonaui/swipe-action-row/swipe-action-row";

function Inbox() {
  return (
    <SwipeActionRow.Root>
      {["First", "Second"].map((label) => (
        <SwipeActionRow.Item key={label} data-testid={`${label}-item`}>
          <SwipeActionRow.Actions side="left">
            <SwipeActionRow.Action>Archive</SwipeActionRow.Action>
          </SwipeActionRow.Actions>
          <SwipeActionRow.Actions side="right">
            <SwipeActionRow.Action fullSwipe>Flag</SwipeActionRow.Action>
            <SwipeActionRow.Action variant="destructive">
              Delete
            </SwipeActionRow.Action>
          </SwipeActionRow.Actions>
          <SwipeActionRow.Content>
            <button type="button">{label}</button>
          </SwipeActionRow.Content>
        </SwipeActionRow.Item>
      ))}
    </SwipeActionRow.Root>
  );
}

beforeEach(() => {
  Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
    configurable: true,
    get() {
      const element = this as HTMLElement;
      if (element.dataset.slot === "swipe-item") return 320;
      if (element.dataset.slot === "swipe-actions") {
        return element.dataset.side === "left" ? 80 : 160;
      }
      return 80;
    },
  });

  globalThis.ResizeObserver = class {
    private callback: ResizeObserverCallback;

    constructor(callback: ResizeObserverCallback) {
      this.callback = callback;
    }

    observe(target: Element) {
      this.callback(
        [
          {
            target,
            contentRect: target.getBoundingClientRect(),
          } as ResizeObserverEntry,
        ],
        this,
      );
    }

    unobserve() {}
    disconnect() {}
  };
});

afterEach(cleanup);

describe("SwipeActionRow", () => {
  it("opens either action strip from the focused row with arrow keys", async () => {
    const user = userEvent.setup();
    render(<Inbox />);

    screen.getByRole("button", { name: "First" }).focus();
    await user.keyboard("{ArrowLeft}");

    await waitFor(() =>
      expect(screen.getByTestId("First-item")).toHaveAttribute(
        "data-state",
        "right",
      ),
    );
    expect(
      within(screen.getByTestId("First-item"))
        .getByRole("button", { name: "Flag" })
        .closest("div"),
    ).not.toHaveAttribute("inert");

    await user.keyboard("{ArrowRight}");
    await waitFor(() =>
      expect(screen.getByTestId("First-item")).toHaveAttribute(
        "data-state",
        "closed",
      ),
    );
  });

  it("closes the previous row when a sibling opens", async () => {
    const user = userEvent.setup();
    render(<Inbox />);

    screen.getByRole("button", { name: "First" }).focus();
    await user.keyboard("{ArrowLeft}");
    screen.getByRole("button", { name: "Second" }).focus();
    await user.keyboard("{ArrowLeft}");

    await waitFor(() => {
      expect(screen.getByTestId("First-item")).toHaveAttribute(
        "data-state",
        "closed",
      );
      expect(screen.getByTestId("Second-item")).toHaveAttribute(
        "data-state",
        "right",
      );
    });
  });

  it("dismisses an open row with Escape", async () => {
    const user = userEvent.setup();
    render(<Inbox />);

    screen.getByRole("button", { name: "First" }).focus();
    await user.keyboard("{ArrowLeft}");
    await user.keyboard("{Escape}");

    await waitFor(() =>
      expect(screen.getByTestId("First-item")).toHaveAttribute(
        "data-state",
        "closed",
      ),
    );
  });
});
