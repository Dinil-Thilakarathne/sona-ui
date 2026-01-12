"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="overflow-clip rounded-2xl border border-slate-800 dark:border-slate-50">
      <div className="flex items-center justify-center space-x-0.5 p-0.5 *:text-slate-800 dark:*:text-slate-50">
        <button
          className="cursor-pointer overflow-clip"
          onClick={() => setTheme("dark")}
          aria-label="Toggle dark mode"
          type="button"
        >
          <Moon
            className={cn(
              "h-[1.2rem] w-[1.2rem] rounded-full p-0.5 hover:opacity-100",
              {
                theme: theme === "dark" ? "opacity-100" : "opacity-75",
              },
            )}
          />
        </button>
        <button
          className="cursor-pointer"
          onClick={() => setTheme("light")}
          aria-label="Toggle light mode"
          type="button"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rounded-full p-0.5 opacity-75 hover:opacity-100" />
        </button>
       </div>
    </div>
  );
}
