"use client";

import { createContext, useContext } from "react";

export type PreviewMotionMode = "normal" | "reduced";

const PreviewMotionContext = createContext<PreviewMotionMode | null>(null);

export function PreviewMotionProvider({
  mode,
  children,
}: {
  mode: PreviewMotionMode;
  children: React.ReactNode;
}) {
  return (
    <PreviewMotionContext.Provider value={mode}>
      {children}
    </PreviewMotionContext.Provider>
  );
}

export function usePreviewMotionMode() {
  return useContext(PreviewMotionContext);
}
