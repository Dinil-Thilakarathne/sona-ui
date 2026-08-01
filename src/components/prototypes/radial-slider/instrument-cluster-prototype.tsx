"use client";

import { polarPoint, useRadialSlider } from "./use-radial-slider";

export default function MinimalArcPrototype() {
  const { value, angle, pressed, sliderProps } = useRadialSlider({
    initialValue: 64,
  });
  const thumb = polarPoint(angle, 112);

  return (
    <section className="flex min-h-[calc(100svh-4.5rem)] items-center justify-center px-5 pb-24">
      <div className="w-full max-w-[680px]">
        <header className="mb-12 text-center">
          <p className="text-muted-foreground text-xs">Radial slider study</p>
          <h1 className="mt-3 font-medium text-2xl tracking-[-0.04em]">
            Minimal Arc
          </h1>
          <p className="mx-auto mt-2 max-w-sm text-muted-foreground text-sm">
            A neutral 180° control with no dashboard or vehicle styling.
          </p>
        </header>

        <div
          {...sliderProps}
          aria-label="Level"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={value}
          aria-valuetext={`${value} percent`}
          className="group relative mx-auto aspect-square w-full max-w-[360px] cursor-grab touch-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          data-pressed={pressed}
          role="slider"
          tabIndex={0}
        >
          <svg aria-hidden="true" className="size-full" viewBox="0 0 320 320">
            <path
              d="M48 160A112 112 0 0 1 272 160"
              fill="none"
              pathLength="100"
              stroke="color-mix(in oklab,var(--foreground) 10%,transparent)"
              strokeLinecap="round"
              strokeWidth="8"
            />
            <path
              d="M48 160A112 112 0 0 1 272 160"
              fill="none"
              pathLength="100"
              stroke="var(--foreground)"
              strokeDasharray={`${value} 100`}
              strokeLinecap="round"
              strokeWidth="8"
            />
            <circle
              className="transition-[cx,cy] duration-150 ease-out motion-reduce:transition-none group-data-[pressed=true]:transition-none"
              cx={thumb.x}
              cy={thumb.y}
              fill="var(--background)"
              r="10"
              stroke="var(--foreground)"
              strokeWidth="4"
            />
          </svg>
          <div className="pointer-events-none absolute inset-x-0 top-[48%] text-center">
            <div className="font-medium text-5xl tabular-nums tracking-[-0.07em]">
              {value}
            </div>
            <div className="mt-2 text-muted-foreground text-xs">Level</div>
          </div>
        </div>
      </div>
    </section>
  );
}
