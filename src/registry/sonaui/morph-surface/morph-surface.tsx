"use client";

import {
  animate,
  type HTMLMotionProps,
  motion,
  type Transition,
  useAnimationControls,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import {
  forwardRef,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import useMeasure from "react-use-measure";

import { usePreviewMotionMode } from "@/lib/preview-motion";
import { motionTransition } from "@/lib/sona-motion";
import { cn } from "@/lib/sona-utils";

export type MorphSurfaceReducedMotion = "user" | "always" | "never";
export type MorphSurfaceOrigin =
  | "center"
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "top-left"
  | "top-right"
  | "bottom-right"
  | "bottom-left";

const morphSurfaceOrigins: Record<
  MorphSurfaceOrigin,
  { originX: number; originY: number }
> = {
  center: { originX: 0.5, originY: 0.5 },
  top: { originX: 0.5, originY: 0 },
  right: { originX: 1, originY: 0.5 },
  bottom: { originX: 0.5, originY: 1 },
  left: { originX: 0, originY: 0.5 },
  "top-left": { originX: 0, originY: 0 },
  "top-right": { originX: 1, originY: 0 },
  "bottom-right": { originX: 1, originY: 1 },
  "bottom-left": { originX: 0, originY: 1 },
};

type SurfaceSize = { width: number; height: number };

export interface MorphSurfaceRootProps
  extends Omit<HTMLMotionProps<"div">, "children" | "transition"> {
  /** A value that identifies the current content state and starts a new morph when it changes. */
  value: string;
  /** The current content rendered inside the persistent surface. */
  children: ReactNode;
  /** The transition used when the persistent surface changes size. @default motionTransition.spatial */
  transition?: Transition;
  /** The transition used when the content changes. @default motionTransition.enter */
  contentTransition?: Transition;
  /** The scale from which changed content resolves inside the surface. @default 0.96 */
  contentScale?: number;
  /** The shared origin used to grow, shrink, reveal, and scale the surface content. @default "center" */
  origin?: MorphSurfaceOrigin;
  /** Additional classes for the stable layout anchor around the surface. @default undefined */
  anchorClassName?: string;
  /** Additional classes for the internal clipping layer. @default undefined */
  clipClassName?: string;
  /** Additional classes for the persistent content wrapper. @default undefined */
  contentClassName?: string;
  /** Controls whether the surface follows, forces, or ignores reduced motion. @default "user" */
  reducedMotion?: MorphSurfaceReducedMotion;
}

const MorphSurfaceRoot = forwardRef<HTMLDivElement, MorphSurfaceRootProps>(
  function MorphSurfaceRoot(
    {
      value,
      children,
      className,
      transition = motionTransition.spatial,
      contentTransition = motionTransition.enter,
      contentScale = 0.96,
      origin = "center",
      anchorClassName,
      clipClassName,
      contentClassName,
      reducedMotion = "user",
      style,
      ...props
    },
    ref,
  ) {
    const [measureRef, bounds] = useMeasure({ offsetSize: true });
    const [anchorSize, setAnchorSize] = useState<SurfaceSize | null>(null);
    const renderedSize = useRef<SurfaceSize | null>(null);
    const surfaceScaleX = useMotionValue(1);
    const surfaceScaleY = useMotionValue(1);
    const inverseSurfaceScaleX = useTransform(
      surfaceScaleX,
      (scale) => 1 / scale,
    );
    const inverseSurfaceScaleY = useTransform(
      surfaceScaleY,
      (scale) => 1 / scale,
    );
    const transitionRef = useRef(transition);
    const previousValue = useRef(value);
    const contentControls = useAnimationControls();
    const userPrefersReducedMotion = useReducedMotion();
    const previewMotionMode = usePreviewMotionMode();
    const shouldReduceMotion =
      previewMotionMode === "reduced" ||
      reducedMotion === "always" ||
      (reducedMotion === "user" && userPrefersReducedMotion === true);
    const { originX, originY } = morphSurfaceOrigins[origin];
    const width = bounds.width || undefined;
    const height = bounds.height || undefined;

    transitionRef.current = transition;

    useLayoutEffect(() => {
      if (anchorSize || !bounds.width || !bounds.height) return;
      setAnchorSize({ width: bounds.width, height: bounds.height });
    }, [anchorSize, bounds.height, bounds.width]);

    useLayoutEffect(() => {
      if (!bounds.width || !bounds.height) return;

      const nextSize = { width: bounds.width, height: bounds.height };
      const previousSize = renderedSize.current;

      if (!previousSize || shouldReduceMotion) {
        renderedSize.current = nextSize;
        surfaceScaleX.set(1);
        surfaceScaleY.set(1);
        return;
      }

      const currentWidth = previousSize.width * surfaceScaleX.get();
      const currentHeight = previousSize.height * surfaceScaleY.get();
      const nextScaleX = currentWidth / nextSize.width;
      const nextScaleY = currentHeight / nextSize.height;

      renderedSize.current = nextSize;
      surfaceScaleX.set(nextScaleX);
      surfaceScaleY.set(nextScaleY);

      const surfaceXAnimation = animate(
        surfaceScaleX,
        1,
        transitionRef.current,
      );
      const surfaceYAnimation = animate(
        surfaceScaleY,
        1,
        transitionRef.current,
      );

      return () => {
        surfaceXAnimation.stop();
        surfaceYAnimation.stop();
      };
    }, [
      bounds.height,
      bounds.width,
      shouldReduceMotion,
      surfaceScaleX,
      surfaceScaleY,
    ]);

    useEffect(() => {
      if (previousValue.current === value) return;
      previousValue.current = value;

      if (shouldReduceMotion) {
        contentControls.set({ opacity: 1, scale: 1 });
        return;
      }

      contentControls.set({ opacity: 0, scale: contentScale });
      void contentControls.start({ opacity: 1, scale: 1 }, contentTransition);
    }, [
      contentControls,
      contentScale,
      contentTransition,
      shouldReduceMotion,
      value,
    ]);

    return (
      <div
        data-slot="morph-surface-anchor"
        className={cn("relative inline-block align-top", anchorClassName)}
        style={{
          width: anchorSize?.width ?? width,
          height: anchorSize?.height ?? height,
        }}
      >
        <motion.div
          ref={ref}
          data-slot="morph-surface"
          data-state={value}
          data-reduced-motion={shouldReduceMotion ? "true" : "false"}
          className={cn("absolute max-w-none", className)}
          initial={false}
          style={{
            ...style,
            width,
            height,
            left: `${originX * 100}%`,
            top: `${originY * 100}%`,
            x: `${originX * -100}%`,
            y: `${originY * -100}%`,
            scaleX: surfaceScaleX,
            scaleY: surfaceScaleY,
            originX,
            originY,
            willChange: "transform",
          }}
          {...props}
        >
          <div
            data-slot="morph-surface-clip"
            className={cn(
              "absolute inset-0 overflow-hidden rounded-[inherit]",
              clipClassName,
            )}
          >
            <motion.div
              data-slot="morph-surface-content-scale"
              className="absolute w-max max-w-none"
              style={{
                left: `${originX * 100}%`,
                top: `${originY * 100}%`,
                x: `${originX * -100}%`,
                y: `${originY * -100}%`,
                scaleX: inverseSurfaceScaleX,
                scaleY: inverseSurfaceScaleY,
                originX,
                originY,
                willChange: "transform",
              }}
            >
              <motion.div
                ref={measureRef}
                data-slot="morph-surface-content"
                animate={contentControls}
                initial={false}
                className={cn("w-max max-w-none", contentClassName)}
              >
                {children}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  },
);

const MorphSurface = {
  Root: MorphSurfaceRoot,
};

export { MorphSurfaceRoot };
export default MorphSurface;
