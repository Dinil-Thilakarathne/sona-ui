"use client";

import {
  type KeyboardEvent,
  type PointerEvent,
  type RefObject,
  useCallback,
  useRef,
  useState,
} from "react";

const DEFAULT_START_ANGLE = -90;
const DEFAULT_SWEEP_ANGLE = 180;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function snap(value: number, step: number) {
  return Math.round(value / step) * step;
}

export function valueToAngle(
  value: number,
  min = 0,
  max = 100,
  startAngle = DEFAULT_START_ANGLE,
  sweepAngle = DEFAULT_SWEEP_ANGLE,
) {
  return startAngle + ((value - min) / (max - min)) * sweepAngle;
}

export function polarPoint(angle: number, radius: number, center = 160) {
  const radians = ((angle - 90) * Math.PI) / 180;
  return {
    x: center + radius * Math.cos(radians),
    y: center + radius * Math.sin(radians),
  };
}

type UseRadialSliderOptions = {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
  fineStep?: number;
  startAngle?: number;
  sweepAngle?: number;
};

type DragState = {
  pointerId: number;
  mode: "angle" | "vertical";
  startY: number;
  startValue: number;
};

export function useRadialSlider({
  initialValue = 64,
  min = 0,
  max = 100,
  step = 1,
  fineStep = step,
  startAngle = DEFAULT_START_ANGLE,
  sweepAngle = DEFAULT_SWEEP_ANGLE,
}: UseRadialSliderOptions = {}) {
  const [value, setValue] = useState(initialValue);
  const [pressed, setPressed] = useState(false);
  const drag = useRef<DragState | null>(null);

  const updateFromPointer = useCallback(
    (event: PointerEvent<HTMLElement>, element: HTMLElement) => {
      const state = drag.current;
      if (!state) return;

      if (state.mode === "vertical") {
        const delta = (state.startY - event.clientY) * fineStep * 0.25;
        setValue(clamp(snap(state.startValue + delta, fineStep), min, max));
        return;
      }

      const rect = element.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      let angle = (Math.atan2(y, x) * 180) / Math.PI + 90;
      if (angle > 180) angle -= 360;

      const endAngle = startAngle + sweepAngle;
      const constrained =
        angle < startAngle && angle > -180
          ? startAngle
          : angle > endAngle && angle <= 180
            ? endAngle
            : angle;
      const next =
        min + ((constrained - startAngle) / sweepAngle) * (max - min);
      setValue(clamp(snap(next, step), min, max));
    },
    [fineStep, max, min, startAngle, step, sweepAngle],
  );

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (event.button !== 0) return;
      const element = event.currentTarget;
      const rect = element.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      const radius = Math.hypot(x, y);

      element.setPointerCapture(event.pointerId);
      drag.current = {
        pointerId: event.pointerId,
        mode: radius < rect.width * 0.22 ? "vertical" : "angle",
        startY: event.clientY,
        startValue: value,
      };
      setPressed(true);
      updateFromPointer(event, element);
    },
    [updateFromPointer, value],
  );

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (!drag.current || drag.current.pointerId !== event.pointerId) return;
      updateFromPointer(event, event.currentTarget);
    },
    [updateFromPointer],
  );

  const finishPointer = useCallback((event: PointerEvent<HTMLElement>) => {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return;
    drag.current = null;
    setPressed(false);
  }, []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      let next = value;
      if (event.key === "ArrowUp" || event.key === "ArrowRight") {
        next += event.shiftKey ? step * 10 : step;
      } else if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
        next -= event.shiftKey ? step * 10 : step;
      } else if (event.key === "PageUp") {
        next += step * 10;
      } else if (event.key === "PageDown") {
        next -= step * 10;
      } else if (event.key === "Home") {
        next = min;
      } else if (event.key === "End") {
        next = max;
      } else {
        return;
      }
      event.preventDefault();
      setValue(clamp(snap(next, step), min, max));
    },
    [max, min, step, value],
  );

  return {
    value,
    angle: valueToAngle(value, min, max, startAngle, sweepAngle),
    pressed,
    sliderProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: finishPointer,
      onPointerCancel: finishPointer,
      onKeyDown,
    },
  };
}

export function movePickerHighlight(
  picker: RefObject<HTMLElement | null>,
  index: number,
) {
  const root = picker.current;
  if (!root) return;
  const items = root.querySelectorAll<HTMLElement>(
    ".proto-picker-item:not(.proto-picker-replay)",
  );
  const highlight = root.querySelector<HTMLElement>(".proto-picker-highlight");
  const item = items[index];
  if (!item || !highlight) return;
  highlight.style.width = `${item.offsetWidth}px`;
  highlight.style.transform = `translateX(${item.offsetLeft}px)`;
}
