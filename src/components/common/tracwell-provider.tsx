"use client";

import { type ReactNode, useEffect } from "react";
import type { TracwellClient } from "tracwell";
import { createTracwell } from "tracwell";

const projectKey = process.env.NEXT_PUBLIC_TRACWELL_PROJECT_KEY;
let client: TracwellClient | undefined;

export function TracwellProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!projectKey || client) {
      return;
    }

    client = createTracwell({
      collectionMode: "private",
      consent: "granted",
      projectKey,
      respectDoNotTrack: true,
    });
  }, []);

  return children;
}
