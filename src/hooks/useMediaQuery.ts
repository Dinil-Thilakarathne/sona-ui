"use client";

import { useCallback, useSyncExternalStore } from "react";

export function useMediaQuery(query: string) {
  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );
  const subscribe = useCallback(
    (callback: () => void) => {
      const qtx = window.matchMedia(query);
      qtx.addEventListener("change", callback);
      return () => qtx.removeEventListener("change", callback);
    },
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
