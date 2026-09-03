"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import type { ComponentShowcaseVideo } from "./types";

type ComponentShowcaseVideoProps = {
  video: ComponentShowcaseVideo;
  isActive: boolean;
  onError: () => void;
};

export function ComponentShowcaseVideoPlayer({
  video,
  isActive,
  onError,
}: ComponentShowcaseVideoProps) {
  const element = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const currentVideo = element.current;
    if (!currentVideo) return;

    if (isActive && !shouldReduceMotion) {
      void currentVideo.play().catch(() => undefined);
      return;
    }

    currentVideo.pause();
    currentVideo.currentTime = 0;
  }, [isActive, shouldReduceMotion]);

  return (
    <video
      ref={element}
      aria-label="Component demonstration"
      className="size-full object-cover"
      loop
      muted
      onError={onError}
      playsInline
      poster={video.poster}
      preload={isActive ? "metadata" : "none"}
    >
      <source src={video.src} />
    </video>
  );
}
