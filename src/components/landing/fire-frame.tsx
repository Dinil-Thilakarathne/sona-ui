"use client";

import { useEffect, useRef, useState } from "react";
import {
  clock,
  effect,
  type FrameLoopHandle,
  frame,
  frameLoop,
  init,
  surface,
} from "vgpu";

const FIRE_BACKGROUND_SHADER = `
struct Params {
  resolution: vec2f,
  baseColor: vec3f,
  hotColor: vec3f,
  time: f32,
}

@group(0) @binding(0) var<uniform> params: Params;

fn hash(point: vec2f) -> f32 {
  return fract(sin(dot(point, vec2f(127.1, 311.7))) * 43758.5453);
}

fn noise(point: vec2f) -> f32 {
  let cell = floor(point);
  let local = fract(point);
  let blend = local * local * (3.0 - 2.0 * local);
  let bottom = mix(hash(cell), hash(cell + vec2f(1.0, 0.0)), blend.x);
  let top = mix(
    hash(cell + vec2f(0.0, 1.0)),
    hash(cell + vec2f(1.0, 1.0)),
    blend.x
  );

  return mix(bottom, top, blend.y);
}

fn fbm(point: vec2f) -> f32 {
  var position = point;
  var value = 0.0;
  var amplitude = 0.5;

  for (var octave = 0; octave < 4; octave += 1) {
    value += noise(position) * amplitude;
    position = position * 2.03 + vec2f(7.1, 3.7);
    amplitude *= 0.5;
  }

  return value;
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let aspect = params.resolution.x / max(params.resolution.y, 1.0);
  let motion = params.time;
  let wideNoise = fbm(vec2f(uv.x * aspect * 1.45, -motion * 0.15));
  let warp = fbm(vec2f(uv.x * aspect * 2.4 + wideNoise, uv.y * 1.7 - motion * 0.23));
  let detail = fbm(vec2f(uv.x * aspect * 5.2 + warp * 1.3, -motion * 0.36));
  let slowWave = sin(uv.x * aspect * 4.2 + motion * 0.17) * 0.035;
  let boundary = 0.61 - wideNoise * 0.24 - warp * 0.14
    + detail * 0.08 + slowWave;
  let signedDistance = uv.y - boundary;
  let primaryFlame = smoothstep(-0.045, 0.075, signedDistance);

  let secondaryNoise = fbm(vec2f(
    uv.x * aspect * 1.8 + 4.7,
    -motion * 0.21
  ));
  let secondaryWarp = fbm(vec2f(
    uv.x * aspect * 3.1 + secondaryNoise * 1.2,
    uv.y * 1.9 - motion * 0.31
  ));
  let secondaryBoundary = 0.68 - secondaryNoise * 0.2
    - secondaryWarp * 0.11
    + sin(uv.x * aspect * 5.4 - motion * 0.24) * 0.025;
  let secondaryDistance = uv.y - secondaryBoundary;
  let secondaryFlame = smoothstep(-0.035, 0.065, secondaryDistance);
  let flame = max(primaryFlame, secondaryFlame * 0.88);
  let softEdge = exp(-abs(signedDistance) * 18.0);
  let secondaryEdge = exp(-abs(secondaryDistance) * 21.0);
  let verticalHeat = smoothstep(boundary - 0.02, 1.0, uv.y);
  let grain = noise(uv * params.resolution * 0.18 + motion * 1.1) - 0.5;

  let black = vec3f(0.002, 0.001, 0.0);
  let ember = params.baseColor * vec3f(0.48, 0.22, 0.08);
  var color = mix(black, ember, flame);
  color = mix(
    color,
    params.baseColor,
    flame * (0.48 + verticalHeat * 0.38)
  );
  color += params.hotColor * softEdge * 0.3;
  color += mix(params.baseColor, params.hotColor, 0.7)
    * secondaryEdge * 0.2;
  color += params.baseColor * grain * flame * 0.012;

  return vec4f(color, clamp(flame + softEdge * 0.18, 0.0, 1.0));
}
`;

type Status = "loading" | "ready" | "unsupported" | "error";

type FireColors = {
  base: string;
  hot: string;
};

const DEFAULT_FIRE_COLORS: FireColors = {
  base: "#304dff",
  hot: "#8298ff",
};

function hexToRgb(color: string): readonly [number, number, number] {
  const value = Number.parseInt(color.slice(1), 16);

  return [
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  ];
}

export function FireFrame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const updateColors = useRef<(colors: FireColors) => void>(() => undefined);
  const [status, setStatus] = useState<Status>("loading");
  const [colors, _setColors] = useState<FireColors>(DEFAULT_FIRE_COLORS);

  useEffect(() => {
    updateColors.current(colors);
  }, [colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!("gpu" in navigator)) {
      setStatus("unsupported");
      return;
    }

    let disposed = false;
    let loop: FrameLoopHandle | undefined;
    let resizeObserver: ResizeObserver | undefined;
    let gpu: Awaited<ReturnType<typeof init>> | undefined;

    void (async () => {
      try {
        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter) {
          if (!disposed) setStatus("unsupported");
          return;
        }

        gpu = await init();
        if (disposed) {
          gpu.dispose();
          return;
        }

        const canvasSurface = surface(gpu, canvas, { dpr: [1, 2] });
        const fire = effect(gpu, FIRE_BACKGROUND_SHADER, {
          label: "abstract-fire-background",
          set: {
            params: {
              resolution: canvasSurface.size,
              baseColor: hexToRgb(DEFAULT_FIRE_COLORS.base),
              hotColor: hexToRgb(DEFAULT_FIRE_COLORS.hot),
              time: 0,
            },
          },
        });

        canvasSurface.onResize(() => {
          fire.set({ params: { resolution: canvasSurface.size } });
        });

        updateColors.current = (nextColors) => {
          fire.set({
            params: {
              baseColor: hexToRgb(nextColors.base),
              hotColor: hexToRgb(nextColors.hot),
            },
          });
        };

        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        const animationClock = clock(gpu);

        if (prefersReducedMotion) {
          const kernel = gpu;
          const renderStatic = () => {
            if (disposed) return;
            frame(kernel, (currentFrame) => {
              currentFrame.pass(canvasSurface, fire);
            });
          };
          renderStatic();
          const ro = new ResizeObserver(() => {
            requestAnimationFrame(renderStatic);
          });
          ro.observe(canvas);
          resizeObserver = ro;
        } else {
          loop = frameLoop(gpu, (currentFrame) => {
            fire.set({ params: { time: animationClock.time } });
            currentFrame.pass(canvasSurface, fire);
          });
        }

        setStatus("ready");
      } catch {
        if (!disposed) setStatus("error");
      }
    })();

    return () => {
      disposed = true;
      updateColors.current = () => undefined;
      resizeObserver?.disconnect();
      loop?.stop();
      gpu?.dispose();
    };
  }, []);

  if (status === "unsupported" || status === "error") {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-x-1/2 bottom-0 z-0 h-full w-screen -translate-x-1/2 overflow-hidden bg-transparent">
      <canvas
        ref={canvasRef}
        aria-label="Abstract animated fire background rendered with WebGPU"
        className="block size-full opacity-70"
      />
    </div>
  );
}
