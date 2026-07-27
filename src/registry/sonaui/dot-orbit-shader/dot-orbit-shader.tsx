"use client";

import { DotOrbit } from "@paper-design/shaders-react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/sona-utils";

export interface DotOrbitShaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Background color. Accepts hex, RGB, or HSL strings.
   * @default "#000000"
   */
  colorBack?: string;
  /**
   * Up to 10 dot colors. Accepts hex, RGB, or HSL strings.
   * @default ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4"]
   */
  colors?: string[];
  /**
   * Dot radius relative to cell size (0–1).
   * @default 0.4
   */
  size?: number;
  /**
   * Random variation in dot size (0–1). 0 = uniform.
   * @default 0.3
   */
  sizeRange?: number;
  /**
   * Maximum orbit distance around each cell center (0–1).
   * @default 0.5
   */
  spreading?: number;
  /**
   * Extra color steps between base colors. 1 = N colors, 2 = 2×N, etc. (1–4).
   * @default 1
   */
  stepsPerColor?: number;
  /**
   * Animation speed multiplier. 0 = static.
   * @default 1
   */
  speed?: number;
}

export default function DotOrbitShader({
  className,
  colorBack = "#000000",
  colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4"],
  size = 0.4,
  sizeRange = 0.3,
  spreading = 0.5,
  stepsPerColor = 1,
  speed = 1,
  style,
  ...props
}: DotOrbitShaderProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={cn("overflow-hidden rounded-xl", className)}
      // Background color doubles as a fallback while WebGL boots (or is unavailable).
      style={{ backgroundColor: colorBack, ...style }}
      {...props}
    >
      <DotOrbit
        colorBack={colorBack}
        colors={colors}
        size={size}
        sizeRange={sizeRange}
        spreading={spreading}
        stepsPerColor={stepsPerColor}
        speed={shouldReduceMotion ? 0 : speed}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
