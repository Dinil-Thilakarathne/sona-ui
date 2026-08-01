"use client";

import {
  type ComponentType,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import EdgeDockPrototype from "./edge-dock-prototype";
import FloatingToolsPrototype from "./floating-tools-prototype";
import LabelledBarPrototype from "./labelled-bar-prototype";

const variants: Array<{ name: string; Component: ComponentType }> = [
  { name: "Floating Tools", Component: FloatingToolsPrototype },
  { name: "Edge Dock", Component: EdgeDockPrototype },
  { name: "Labelled Bar", Component: LabelledBarPrototype },
];

function moveHighlight(
  picker: React.RefObject<HTMLElement | null>,
  index: number,
) {
  const root = picker.current;
  const highlight = root?.querySelector<HTMLElement>(".proto-picker-highlight");
  const items = root?.querySelectorAll<HTMLElement>(
    ".proto-picker-item:not(.proto-picker-replay)",
  );
  const item = items?.[index];
  if (!highlight || !item) return;
  highlight.style.width = `${item.offsetWidth}px`;
  highlight.style.transform = `translateX(${item.offsetLeft}px)`;
}

export default function ActionRailPrototypePicker() {
  const [current, setCurrent] = useState(0);
  const [replay, setReplay] = useState(0);
  const picker = useRef<HTMLElement>(null);

  const setActive = useCallback((index: number) => {
    if (index < 0 || index >= variants.length) return;
    setCurrent(index);
    setReplay((value) => value + 1);
    const url = new URL(window.location.href);
    url.searchParams.set("v", String(index + 1));
    window.history.replaceState(null, "", url);
  }, []);

  useEffect(() => {
    const value = Number(new URLSearchParams(window.location.search).get("v"));
    setCurrent(value >= 1 && value <= variants.length ? value - 1 : 0);
  }, []);

  useLayoutEffect(() => {
    moveHighlight(picker, current);
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() =>
        picker.current?.setAttribute("data-ready", ""),
      );
    });
    const onResize = () => moveHighlight(picker, current);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [current]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (
        /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) ||
        target.isContentEditable ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        return;
      }
      const number = Number.parseInt(event.key, 10);
      if (number >= 1 && number <= variants.length) {
        setActive(number - 1);
      } else if (event.key === "ArrowRight") {
        setActive((current + 1) % variants.length);
      } else if (event.key === "ArrowLeft") {
        setActive((current - 1 + variants.length) % variants.length);
      } else if (event.key === "r" || event.key === "R") {
        setReplay((value) => value + 1);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [current, setActive]);

  const ActiveVariant = variants[current].Component;

  return (
    <>
      <main key={`${current}-${replay}`}>
        <ActiveVariant />
      </main>
      <nav
        ref={picker}
        aria-label="Prototype variants"
        className="proto-picker"
        data-position="top"
      >
        <span aria-hidden="true" className="proto-picker-highlight" />
        {variants.map((variant, index) => (
          <button
            key={variant.name}
            aria-current={index === current ? "true" : undefined}
            className="proto-picker-item"
            data-active={index === current ? "" : undefined}
            onClick={() => setActive(index)}
            type="button"
          >
            {variant.name}
          </button>
        ))}
        <span aria-hidden="true" className="proto-picker-divider" />
        <button
          aria-label="Replay animation (R)"
          className="proto-picker-item proto-picker-replay"
          onClick={() => setReplay((value) => value + 1)}
          type="button"
        >
          ↻
        </button>
      </nav>
    </>
  );
}
