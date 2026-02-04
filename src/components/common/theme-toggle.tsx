"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Button } from "@base-ui/react/button";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const className = cn(
    "relative cursor-pointer overflow-clip p-1",
    "before:bg-accent before:absolute before:top-px before:left-px before:aspect-square before:h-[calc(100%-2px)] before:rounded-full before:opacity-0 before:transition-opacity before:duration-300 before:content-['']",
    "hover:before:opacity-70",
    "data-[active=true]:before:opacity-100",
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <div className="overflow-clip rounded-full border border-slate-800 dark:border-slate-50">
        <div className="relative flex items-center justify-center space-x-0.5 rounded-full p-0.5 *:text-slate-800 dark:*:text-slate-50">
          <Button
            className={className}
            onClick={() => {
              setTheme("dark");
            }}
            aria-label="Toggle dark mode"
            type="button"
            data-active={theme === "dark" || theme === undefined}
          >
            <Moon
              className={cn(
                "relative h-[1.4rem] w-[1.4rem] rounded-full p-0.5 hover:opacity-100",
                {
                  theme: theme === "dark" ? "opacity-100" : "opacity-75",
                },
              )}
            />
          </Button>
          <Button
            className={className}
            onClick={() => setTheme("light")}
            aria-label="Toggle light mode"
            type="button"
            data-active={theme === "light" || theme === undefined}
          >
            <Sun className="h-[1.4rem] w-[1.4rem] scale-100 rounded-full p-0.5 opacity-75 hover:opacity-100" />
          </Button>
        </div>
      </div>
    )
  );
}
