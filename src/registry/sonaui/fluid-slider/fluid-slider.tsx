"use client";

import { Slider } from "@base-ui/react/slider";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/sona-utils";

export interface FluidSliderProps {
  /** Visible label associated with the slider. */
  label: ReactNode;
  /** Controlled slider value. @default undefined */
  value?: number;
  /** Initial value for uncontrolled usage. @default 50 */
  defaultValue?: number;
  /** Called continuously while the value changes. @default undefined */
  onValueChange?: (
    value: number,
    details: Slider.Root.ChangeEventDetails,
  ) => void;
  /** Called when a pointer or keyboard interaction commits. @default undefined */
  onValueCommitted?: (
    value: number,
    details: Slider.Root.CommitEventDetails,
  ) => void;
  /** Minimum allowed value. @default 0 */
  min?: number;
  /** Maximum allowed value. @default 100 */
  max?: number;
  /** Smallest value increment. @default 1 */
  step?: number;
  /** Increment used by Page Up, Page Down, and modified arrow keys. @default 10 */
  largeStep?: number;
  /** Numeric positions rendered as quiet reference marks. @default [] */
  marks?: number[];
  /** Formats the visible and accessible value text. @default undefined */
  formatValue?: (value: number) => string;
  /** Intl options used when no custom formatter is supplied. @default undefined */
  format?: Intl.NumberFormatOptions;
  /** Locale used by the default number formatter. @default undefined */
  locale?: Intl.LocalesArgument;
  /** Whether the trailing formatted value is visible. @default true */
  showValue?: boolean;
  /** Whether the active boundary grip is visible. @default true */
  showHandle?: boolean;
  /** Whether the slider ignores user interaction. @default false */
  disabled?: boolean;
  /** Name submitted with the slider's hidden range input. @default undefined */
  name?: string;
  /** ID of the form that owns the slider input. @default undefined */
  form?: string;
  /** Accessible name used instead of the visible label. @default undefined */
  ariaLabel?: string;
  /** Additional classes for the slider root. @default undefined */
  className?: string;
  /** Additional classes for the track surface. @default undefined */
  trackClassName?: string;
  /** Additional classes for the filled surface. @default undefined */
  surfaceClassName?: string;
  /** Additional classes for the fixed label. @default undefined */
  labelClassName?: string;
  /** Additional classes for the trailing value. @default undefined */
  valueClassName?: string;
  /** Additional classes for the boundary grip. @default undefined */
  handleClassName?: string;
}

const tokenStyle = {
  "--fluid-slider-track": "var(--background)",
  "--fluid-slider-surface":
    "color-mix(in oklab, var(--primary) 16%, var(--background))",
  "--fluid-slider-surface-active":
    "color-mix(in oklab, var(--primary) 22%, var(--background))",
  "--fluid-slider-handle": "var(--primary)",
  "--fluid-slider-label": "var(--foreground)",
  "--fluid-slider-value": "var(--muted-foreground)",
  "--fluid-slider-mark":
    "color-mix(in oklab, var(--foreground) 32%, transparent)",
  "--fluid-slider-focus-ring": "var(--ring)",
  "--fluid-slider-disabled-opacity": "0.48",
  "--fluid-slider-border-radius": "var(--radius)",
} as CSSProperties;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function rubberband(overshoot: number, dimension: number, constant = 0.55) {
  return (
    (overshoot * dimension * constant) /
    (dimension + constant * Math.abs(overshoot))
  );
}

export default function FluidSlider({
  label,
  value,
  defaultValue = 50,
  onValueChange,
  onValueCommitted,
  min = 0,
  max = 100,
  step = 1,
  largeStep = 10,
  marks = [],
  formatValue,
  format,
  locale,
  showValue = true,
  showHandle = true,
  disabled = false,
  name,
  form,
  ariaLabel,
  className,
  trackClassName,
  surfaceClassName,
  labelClassName,
  valueClassName,
  handleClassName,
}: FluidSliderProps) {
  const labelId = useId();
  const shouldReduceMotion = useReducedMotion();
  const [internalValue, setInternalValue] = useState(() =>
    clamp(defaultValue, min, max),
  );
  const currentValue = clamp(value ?? internalValue, min, max);
  const range = max - min;
  const progress = range === 0 ? 0 : ((currentValue - min) / range) * 100;
  const controlRef = useRef<HTMLDivElement>(null);
  const pointerActiveRef = useRef(false);
  const trackPressRef = useRef(false);
  const dragMovedRef = useRef(false);
  const pointerStartXRef = useRef(0);
  const fillAnimationRef = useRef<ReturnType<typeof animate> | null>(null);
  const grabOffsetRef = useRef(0);
  const pointerVelocityRef = useRef(0);
  const previousPointerRef = useRef({ x: 0, time: 0 });
  const settleAnimationRef = useRef<ReturnType<typeof animate> | null>(null);
  const progressMotion = useMotionValue(progress / 100);
  const overshoot = useMotionValue(0);
  const trackWidth = useMotionValue(1);
  const direction = useMotionValue(1);
  const press = useMotionValue(0);
  const pressAnimationRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    const target = progress / 100;
    fillAnimationRef.current?.stop();

    // A tap on the inactive track (pointer pressed but not yet dragged) should
    // glide the fill to the new value. Dragging tracks 1:1 and keyboard/external
    // changes stay instant, per the interaction spec.
    const isTap = pointerActiveRef.current && !dragMovedRef.current;
    if (isTap && !shouldReduceMotion) {
      fillAnimationRef.current = animate(progressMotion, target, {
        type: "spring",
        stiffness: 420,
        damping: 40,
        mass: 0.9,
      });
    } else {
      progressMotion.set(target);
    }
  }, [progress, progressMotion, shouldReduceMotion]);

  useEffect(() => {
    const control = controlRef.current;
    if (!control) return;

    const updateWidth = () =>
      trackWidth.set(control.getBoundingClientRect().width);
    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(control);
    return () => resizeObserver.disconnect();
  }, [trackWidth]);

  useEffect(
    () => () => {
      settleAnimationRef.current?.stop();
      pressAnimationRef.current?.stop();
      fillAnimationRef.current?.stop();
    },
    [],
  );

  // The filled fraction (0–1), including any damped overshoot past the bounds.
  // Clip-path, not scaleX, sizes the fill so its border-radius stays a true,
  // undistorted match for the track corners at every value.
  const fillFraction = useTransform(() => {
    const width = Math.max(trackWidth.get(), 1);
    const directionalOvershoot = (overshoot.get() / width) * direction.get();
    return clamp(progressMotion.get() + directionalOvershoot, 0, 1);
  });
  const surfaceClipPath = useTransform(() => {
    const inset = (1 - fillFraction.get()) * 100;
    const isRtl = direction.get() === -1;
    const insetEnd = isRtl ? 0 : inset;
    const insetStart = isRtl ? inset : 0;
    return `inset(0px ${insetEnd}% 0px ${insetStart}% round var(--fluid-slider-border-radius))`;
  });

  // Immediate-response squash: the active surface compresses slightly while
  // pressed and eases back on release. Presentation only — never the value.
  const surfaceScaleY = useTransform(press, [0, 1], [1, 0.98]);

  const animatePress = (target: number) => {
    pressAnimationRef.current?.stop();
    if (shouldReduceMotion) {
      press.set(target);
      return;
    }
    pressAnimationRef.current = animate(press, target, {
      type: "spring",
      stiffness: 640,
      damping: 34,
      mass: 0.6,
    });
  };

  const formatter = useMemo(
    () => new Intl.NumberFormat(locale, format),
    [format, locale],
  );
  const formattedValue = formatValue
    ? formatValue(currentValue)
    : formatter.format(currentValue);
  const visibleMarks = marks.filter((mark) => mark >= min && mark <= max);

  const settleOvershoot = () => {
    pointerActiveRef.current = false;
    trackPressRef.current = false;
    controlRef.current?.removeAttribute("data-pressed");
    animatePress(0);
    if (overshoot.get() === 0) return;

    settleAnimationRef.current?.stop();
    if (shouldReduceMotion) {
      overshoot.set(0);
      return;
    }

    settleAnimationRef.current = animate(overshoot, 0, {
      type: "spring",
      stiffness: 520,
      damping: 42,
      mass: 0.65,
      velocity: pointerVelocityRef.current,
    });
  };

  // Base UI's own track-press handler can't resolve the thumb when it is
  // rendered through motion (getFingerState returns null), so a bare-track tap
  // never sets the value. Since Slider.Root is fully controlled by this
  // component, we drive Base UI's hidden range input directly: it fires the
  // real onValueChange with proper event details, which flows through the
  // Slider.Root handler below.
  const applyValueFromClientX = (clientX: number) => {
    const control = controlRef.current;
    if (!control) return;

    const rect = control.getBoundingClientRect();
    if (rect.width === 0) return;

    const isRtl = getComputedStyle(control).direction === "rtl";
    let ratio = (clientX - rect.left) / rect.width;
    if (isRtl) ratio = 1 - ratio;
    ratio = clamp(ratio, 0, 1);

    const raw = min + ratio * range;
    const stepped = clamp(
      Math.round((raw - min) / step) * step + min,
      min,
      max,
    );

    const input = control.querySelector<HTMLInputElement>(
      'input[type="range"]',
    );
    if (!input || Number(input.value) === stepped) return;

    const nativeSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value",
    )?.set;
    nativeSetter?.call(input, String(stepped));
    input.dispatchEvent(new Event("input", { bubbles: true }));
  };

  const handlePointerDown = (event: PointerEvent) => {
    if (disabled || event.button !== 0) return;

    settleAnimationRef.current?.stop();
    pointerActiveRef.current = true;
    dragMovedRef.current = false;
    pointerStartXRef.current = event.clientX;
    controlRef.current?.setAttribute("data-pressed", "");
    animatePress(1);
    pointerVelocityRef.current = 0;
    previousPointerRef.current = { x: event.clientX, time: event.timeStamp };

    const control = controlRef.current;
    if (control) {
      const rect = control.getBoundingClientRect();
      trackWidth.set(rect.width);
      direction.set(getComputedStyle(control).direction === "rtl" ? -1 : 1);
    }

    const target = event.target as HTMLElement;
    const pressedHandle = target.closest<HTMLElement>(
      "[data-fluid-slider-hit]",
    );
    const thumb = target.closest<HTMLElement>("[data-fluid-slider-thumb]");

    if (pressedHandle && thumb) {
      trackPressRef.current = false;
      const thumbRect = thumb.getBoundingClientRect();
      grabOffsetRef.current =
        event.clientX - (thumbRect.left + thumbRect.width / 2);
    } else {
      // A surface press is a positional command, not a drag gesture. Move the
      // value to that point immediately; continuous adjustment begins only
      // from the boundary indicator.
      trackPressRef.current = true;
      grabOffsetRef.current = 0;
      overshoot.set(0);
      applyValueFromClientX(event.clientX);
    }
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (!pointerActiveRef.current || disabled) return;

    // Once the indicator crosses the drag threshold, stop any pending tap
    // glide so the boundary stays locked 1:1 to the pointer. A surface press
    // is a positional command, so its glide must run to completion.
    if (
      !trackPressRef.current &&
      !dragMovedRef.current &&
      Math.abs(event.clientX - pointerStartXRef.current) > 8
    ) {
      dragMovedRef.current = true;
      fillAnimationRef.current?.stop();
    }

    // Surface presses set one value on pointer-down. Only the indicator is a
    // continuous drag target.
    if (trackPressRef.current) return;

    const previous = previousPointerRef.current;
    const elapsed = Math.max(event.timeStamp - previous.time, 1);
    pointerVelocityRef.current =
      ((event.clientX - previous.x) / elapsed) * 1000;
    previousPointerRef.current = { x: event.clientX, time: event.timeStamp };

    if (shouldReduceMotion) {
      overshoot.set(0);
      return;
    }

    const control = controlRef.current;
    if (!control) return;

    const rect = control.getBoundingClientRect();
    const presentedBoundary = event.clientX - grabOffsetRef.current;
    const rawOvershoot =
      presentedBoundary < rect.left
        ? presentedBoundary - rect.left
        : presentedBoundary > rect.right
          ? presentedBoundary - rect.right
          : 0;

    overshoot.set(rubberband(rawOvershoot, rect.width));
  };

  useEffect(() => {
    const control = controlRef.current;
    if (!control) return;

    control.addEventListener("pointerdown", handlePointerDown);
    control.addEventListener("pointermove", handlePointerMove);
    control.addEventListener("pointerup", settleOvershoot);
    control.addEventListener("pointercancel", settleOvershoot);
    control.addEventListener("lostpointercapture", settleOvershoot);

    return () => {
      control.removeEventListener("pointerdown", handlePointerDown);
      control.removeEventListener("pointermove", handlePointerMove);
      control.removeEventListener("pointerup", settleOvershoot);
      control.removeEventListener("pointercancel", settleOvershoot);
      control.removeEventListener("lostpointercapture", settleOvershoot);
    };
  });

  const fluidStyle = {
    ...tokenStyle,
    "--fluid-slider-progress": progress,
  } as CSSProperties;

  return (
    <Slider.Root
      aria-labelledby={ariaLabel ? undefined : labelId}
      value={currentValue}
      min={min}
      max={max}
      step={step}
      largeStep={largeStep}
      format={format}
      locale={locale}
      disabled={disabled}
      name={name}
      form={form}
      onValueChange={(nextValue, details) => {
        if (value === undefined) setInternalValue(nextValue);
        onValueChange?.(nextValue, details);
      }}
      onValueCommitted={onValueCommitted}
      className={cn(
        "group/fluid-slider w-full min-h-12 max-w-xl select-none rounded-xl",
        disabled &&
          "pointer-events-none opacity-(--fluid-slider-disabled-opacity)",
        className,
      )}
      style={fluidStyle}
    >
      <Slider.Control
        ref={controlRef}
        data-fluid-slider-control=""
        className={cn(
          "group/fluid-slider-control relative h-12 w-full cursor-pointer rounded-2xl outline-none touch-pan-y",
          "has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-(--fluid-slider-focus-ring) has-[input:focus-visible]:ring-offset-2 has-[input:focus-visible]:ring-offset-background _overflow-clip rounded-(--fluid-slider-border-radius)",
          trackClassName,
        )}
      >
        <Slider.Track className="relative h-12 w-full [container-type:inline-size]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-(--fluid-slider-border-radius) bg-(--fluid-slider-track) shadow-[inset_0_1px_0_color-mix(in_oklab,var(--foreground)_4%,transparent)]"
          />

          <Slider.Indicator
            render={
              <motion.div
                style={{ clipPath: surfaceClipPath, scaleY: surfaceScaleY }}
              />
            }
            className={cn(
              "w-full! pointer-events-none absolute inset-0 origin-left rounded-(--fluid-slider-border-radius) bg-(--fluid-slider-surface) shadow-[inset_0_1px_0_color-mix(in_oklab,var(--background)_55%,transparent),0_1px_2px_color-mix(in_oklab,var(--foreground)_5%,transparent)] transition-[filter,background-color] duration-150 rtl:origin-right",
              surfaceClassName,
            )}
            style={{ insetInlineStart: 0, insetInlineEnd: 0 }}
          />

          {visibleMarks.map((mark) => {
            const markProgress = range === 0 ? 0 : ((mark - min) / range) * 100;
            return (
              <span
                key={mark}
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 z-5 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--fluid-slider-mark) rtl:translate-x-1/2"
                style={{ insetInlineStart: `${markProgress}%` }}
              />
            );
          })}

          <Slider.Label
            className={cn(
              "pointer-events-none absolute inset-y-0 start-5 z-10 flex items-center truncate pe-24 font-medium text-(--fluid-slider-label) text-sm",
              labelClassName,
            )}
          >
            <span id={labelId}>{label}</span>
          </Slider.Label>

          {showValue && (
            <Slider.Value
              className={cn(
                "pointer-events-none absolute inset-y-0 end-5 z-10 flex items-center font-medium text-(--fluid-slider-value) text-sm tabular-nums",
                valueClassName,
              )}
            >
              {() => formattedValue}
            </Slider.Value>
          )}

          <Slider.Thumb
            render={<motion.div style={{ x: overshoot }} />}
            data-fluid-slider-thumb=""
            aria-label={ariaLabel}
            aria-valuetext={formattedValue}
            className="absolute z-20 h-full w-0 outline-none"
          >
            <span
              data-fluid-slider-hit=""
              aria-hidden="true"
              className="absolute inset-y-0 z-20 w-11 -translate-x-1/2 cursor-grab active:cursor-grabbing rtl:translate-x-1/2"
              style={{
                insetInlineStart: "50%",
              }}
            />
            {showHandle && (
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute top-1/2 start-1/2 h-7 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--fluid-slider-handle) opacity-90 shadow-[0_0_0_1px_color-mix(in_oklab,var(--background)_30%,transparent)] transition-[height,opacity] duration-150 group-data-[pressed]/fluid-slider-control:h-8 group-data-[pressed]/fluid-slider-control:opacity-100 rtl:translate-x-1/2",
                  handleClassName,
                )}
              />
            )}
          </Slider.Thumb>
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
}
