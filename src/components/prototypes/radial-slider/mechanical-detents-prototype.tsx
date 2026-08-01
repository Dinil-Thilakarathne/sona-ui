"use client";

import { polarPoint, useRadialSlider } from "./use-radial-slider";

const marks = Array.from({ length: 9 }, (_, index) => index);

export default function CompactIndexPrototype() {
  const { value, angle, pressed, sliderProps } = useRadialSlider({
    initialValue: 50,
    step: 5,
    fineStep: 5,
  });

  return (
    <section className="flex min-h-[calc(100svh-4.5rem)] items-center justify-center px-5 pb-24">
      <div className="w-full max-w-[640px]">
        <header className="mb-10 text-center">
          <p className="text-muted-foreground text-xs">
            Compact radial control
          </p>
          <h1 className="mt-3 font-medium text-2xl tracking-[-0.04em]">
            Compact Index
          </h1>
          <p className="mx-auto mt-2 max-w-sm text-muted-foreground text-sm">
            Quiet reference marks make stepped values clear in smaller UI
            surfaces.
          </p>
        </header>

        <div
          {...sliderProps}
          aria-label="Amount"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={value}
          aria-valuetext={`${value} percent`}
          className="group relative mx-auto aspect-square w-full max-w-[300px] cursor-grab touch-none rounded-3xl bg-card p-5 shadow-[inset_0_0_0_1px_var(--border)] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          data-pressed={pressed}
          role="slider"
          tabIndex={0}
        >
          <svg aria-hidden="true" className="size-full" viewBox="0 0 320 320">
            {marks.map((mark) => {
              const markAngle = -90 + (mark / 8) * 180;
              const outer = polarPoint(markAngle, 112);
              const inner = polarPoint(markAngle, mark % 2 === 0 ? 101 : 105);
              const active = mark / 8 <= value / 100;
              return (
                <line
                  key={mark}
                  stroke={
                    active
                      ? "var(--foreground)"
                      : "color-mix(in oklab,var(--foreground) 16%,transparent)"
                  }
                  strokeLinecap="round"
                  strokeWidth={mark % 2 === 0 ? 2 : 1}
                  x1={inner.x}
                  x2={outer.x}
                  y1={inner.y}
                  y2={outer.y}
                />
              );
            })}
            <g
              className="origin-[160px_160px] transition-transform duration-150 ease-out motion-reduce:transition-none group-data-[pressed=true]:transition-none"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <circle cx="160" cy="58" fill="var(--foreground)" r="6" />
            </g>
          </svg>
          <div className="pointer-events-none absolute inset-x-0 top-[47%] text-center">
            <p className="font-medium text-4xl tabular-nums tracking-[-0.06em]">
              {value}
            </p>
            <p className="mt-2 text-muted-foreground text-xs">Amount</p>
          </div>
        </div>
      </div>
    </section>
  );
}
