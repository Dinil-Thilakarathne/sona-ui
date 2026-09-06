"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
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
  const [isDocumentVisible, setIsDocumentVisible] = useState(
    () =>
      typeof document === "undefined" || document.visibilityState === "visible",
  );

  useEffect(() => {
    const updateVisibility = () => {
      setIsDocumentVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", updateVisibility);
    return () =>
      document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    const currentVideo = element.current;
    if (!currentVideo) return;

    if (isActive && isDocumentVisible && !shouldReduceMotion) {
      void currentVideo.play().catch(() => undefined);
      return;
    }

    currentVideo.pause();
    currentVideo.currentTime = 0;
  }, [isActive, isDocumentVisible, shouldReduceMotion]);

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
