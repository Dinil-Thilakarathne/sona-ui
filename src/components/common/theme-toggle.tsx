"use client";

import { Button } from "@base-ui/react/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "./theme-provider";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [motionReady, setMotionReady] = useState(false);

  useEffect(() => {
    setMounted(true);
    const frame = window.requestAnimationFrame(() => setMotionReady(true));

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const currentTheme = isDark ? "dark" : "light";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <Button
      type="button"
      disabled={!mounted}
      aria-label={`${currentTheme} theme. Switch to ${nextTheme} theme`}
      aria-pressed={isDark}
      title={`Switch to ${nextTheme} theme`}
      onClick={() => setTheme(nextTheme)}
      className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-lg text-neutral-700 transition-colors duration-150 ease-out hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none dark:text-neutral-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
        className={cn(
          "size-4",
          motionReady
            ? "transition-transform duration-300 motion-reduce:transition-none"
            : "transition-none",
          isDark ? "-rotate-45" : "rotate-[135deg]",
        )}
      >
        <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" />
        <path d="M5 20L19 5" strokeLinejoin="round" />
        <path
          d="M16 9L22 13.8528M12.4128 12.4059L19.3601 18.3634M8 15.6672L15 21.5"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  );
}
