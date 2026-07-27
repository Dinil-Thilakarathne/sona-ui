"use client";

import type { MotionValue } from "motion/react";
import { motion } from "motion/react";
import MeshGradientShader from "@/registry/sonaui/mesh-gradient-shader/mesh-gradient-shader";

type HeroMeshBackgroundProps = {
  meshX: MotionValue<number>;
  meshY: MotionValue<number>;
};

export function HeroMeshBackground({ meshX, meshY }: HeroMeshBackgroundProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-[-4%] opacity-[0.8] dark:opacity-[0.4] will-change-transform"
        style={{
          x: meshX,
          y: meshY,
          maskImage:
            "radial-gradient(ellipse 82% 75% at 50% 45%, black 2%, transparent 76%)",
        }}
      >
        <MeshGradientShader
          className="size-full rounded-none"
          colors={["#d8dde7", "#8fa1b8", "#eef0f4", "#aab4c2", "#f7f7f8"]}
          distortion={0.8}
          swirl={0.04}
          grainMixer={0.4}
          grainOverlay={0.8}
          speed={0.8}
        />
      </motion.div>

      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "radial-gradient(var(--foreground) 0.7px, transparent 0.7px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 72% 62% at 50% 45%, black 8%, transparent 78%)",
        }}
      />

      <div className="absolute top-1/2 left-1/2 h-[30rem] w-[min(54rem,94vw)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-background/68 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
    </div>
  );
}
