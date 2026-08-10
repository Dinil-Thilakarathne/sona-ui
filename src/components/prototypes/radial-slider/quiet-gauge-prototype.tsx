"use client";

import { useRadialSlider } from "./use-radial-slider";

export default function QuietDialPrototype() {
  const { value, angle, pressed, sliderProps } = useRadialSlider({
    initialValue: 42,
  });

  return (
    <section className="flex min-h-[calc(100svh-4.5rem)] items-center justify-center px-5 pb-24">
      <div className="grid w-full max-w-[800px] items-center gap-12 md:grid-cols-[0.8fr_1fr]">
        <header className="max-w-sm">
          <p className="text-muted-foreground text-xs">Radial slider</p>
          <h1 className="mt-3 font-medium text-3xl tracking-[-0.05em]">
            Quiet Dial
          </h1>
          <p className="mt-3 text-muted-foreground text-sm leading-6">
            A short index replaces the speedometer needle. The control remains
            readable without dominating the surrounding interface.
          </p>
        </header>

        <div
          {...sliderProps}
          aria-label="Intensity"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={value}
          aria-valuetext={`${value} percent`}
          className="group relative mx-auto aspect-square w-full max-w-[340px] cursor-grab touch-none rounded-[2rem] bg-card p-8 smooth-shadow-ring-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          data-pressed={pressed}
          role="slider"
          tabIndex={0}
        >
          <svg aria-hidden="true" className="size-full" viewBox="0 0 320 320">
            <path
              d="M58 160A102 102 0 0 1 262 160"
              fill="none"
              stroke="color-mix(in oklab,var(--foreground) 9%,transparent)"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <g
              className="origin-[160px_160px] transition-transform duration-180 [transition-timing-function:cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none group-data-[pressed=true]:transition-none"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <rect
                fill="var(--foreground)"
                height="24"
                rx="2"
                width="4"
                x="158"
                y="54"
              />
            </g>
            <circle
              cx="160"
              cy="160"
              fill="color-mix(in oklab,var(--foreground) 8%,transparent)"
              r="3"
            />
          </svg>
          <div className="pointer-events-none absolute inset-x-0 top-[48%] text-center">
            <div className="font-medium text-5xl tabular-nums tracking-[-0.07em]">
              {value}
            </div>
            <div className="mt-2 text-muted-foreground text-xs">Intensity</div>
          </div>
        </div>
      </div>
    </section>
  );
}
