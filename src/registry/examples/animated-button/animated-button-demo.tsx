"use client";

import { useState } from "react";
import { Check, ArrowRight, Loader2, Sparkles } from "lucide-react";
import AnimatedButton from "@/registry/sonaui/animated-button/animated-button";

export default function AnimatedButtonDemo() {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");
  const [swap, setSwap] = useState<"slide-up" | "slide-down" | "fade" | "blur">("slide-up");

  const handleClick = () => {
    if (state !== "idle") return;
    setState("loading");
    setTimeout(() => {
      setState("success");
      setTimeout(() => setState("idle"), 2000);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md">
      {/* Swap Animation Selector */}
      <div className="flex gap-2 p-1 bg-secondary rounded-lg text-xs">
        {(["slide-up", "slide-down", "fade", "blur"] as const).map((style) => (
          <button
            key={style}
            type="button"
            onClick={() => setSwap(style)}
            className={`px-3 py-1.5 rounded-md font-medium capitalize transition-colors ${
              swap === style
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {style.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Main state swap button */}
      <div className="flex flex-col items-center gap-2">
        <AnimatedButton
          onClick={handleClick}
          swap={swap}
          contentKey={state}
          variant="default"
          size="md"
          className="w-36"
        >
          {state === "idle" && (
            <>
              Submit <ArrowRight className="size-4" />
            </>
          )}
          {state === "loading" && (
            <>
              <Loader2 className="size-4 animate-spin" /> Saving...
            </>
          )}
          {state === "success" && (
            <>
              <Check className="size-4 text-emerald-400" /> Success
            </>
          )}
        </AnimatedButton>
        <span className="text-xs text-muted-foreground">Click to trigger state change</span>
      </div>

      {/* Hover Swap Mode (ScrollUpButton merge) */}
      <div className="flex flex-col items-center gap-2 border-t pt-6 w-full">
        <span className="text-sm font-semibold text-foreground">Hover Text Swap</span>
        <div className="flex gap-4">
          <AnimatedButton hoverSwap variant="outlined" size="md">
            Hover Me
          </AnimatedButton>
          <AnimatedButton hoverSwap variant="secondary" size="md">
            <Sparkles className="size-4 mr-2" /> Playful Effect
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
}
