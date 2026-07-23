"use client";

export interface AnimatedPlusMinusButtonProps {
  /** Icon size in pixels. @default 24 */
  size?: number;
}

export default function AnimatedPlusMinusButton({
  size = 24,
}: AnimatedPlusMinusButtonProps) {
  return (
    <span aria-hidden="true" className="flex items-center justify-center">
      <svg width={size} height={size} viewBox="0 0 24 24">
        <title>Expand or collapse</title>
        <line
          x1="1"
          y1="12"
          x2="23"
          y2="12"
          stroke="currentColor"
          strokeWidth="1"
          className="origin-center transition-opacity duration-200 group-data-panel-open:opacity-0 motion-reduce:transition-none"
        />
        <line
          x1="12"
          y1="1"
          x2="12"
          y2="23"
          stroke="currentColor"
          strokeWidth="1"
          className="origin-center transition-transform duration-200 group-data-panel-open:rotate-90 motion-reduce:transition-none"
        />
      </svg>
    </span>
  );
}
