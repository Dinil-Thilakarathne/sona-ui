"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export interface MeshGradientShaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Up to 10 color spots. Accepts hex, RGB, or HSL strings.
   * @default ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7"]
   */
  colors?: string[];
  /**
   * Power of organic noise distortion (0–1).
   * @default 0.3
   */
  distortion?: number;
  /**
   * Power of vortex distortion (0–1).
   * @default 0.2
   */
  swirl?: number;
  /**
   * Grain distortion on color edges (0–1).
   * @default 0
   */
  grainMixer?: number;
  /**
   * Post-processing grain overlay (0–1).
   * @default 0
   */
  grainOverlay?: number;
  /**
   * Animation speed multiplier. 0 = static.
   * @default 1
   */
  speed?: number;
}

export default function MeshGradientShader({
  className,
  colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7"],
  distortion = 0.3,
  swirl = 0.2,
  grainMixer = 0,
  grainOverlay = 0,
  speed = 1,
  style,
  ...props
}: MeshGradientShaderProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={cn("overflow-hidden rounded-xl", className)}
      // First color doubles as a fallback while WebGL boots (or is unavailable).
      style={{ backgroundColor: colors[0], ...style }}
      {...props}
    >
      <MeshGradient
        colors={colors}
        distortion={distortion}
        swirl={swirl}
        grainMixer={grainMixer}
        grainOverlay={grainOverlay}
        speed={shouldReduceMotion ? 0 : speed}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
