"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import { CopyButton } from "@/components/copy-button/copy-button";

const commandPrefix = "npx shadcn@latest add @sona-ui/";
const agentComponent = "agent-skill";
const featuredComponents = [
  "magnetic-button",
  "fluid-tabs",
  "animated-dialog",
  "bubble-up-button",
  "fluid-slider",
] as const;

type CommandTarget = "you" | "agent";

export function InstallCommand() {
  const [target, setTarget] = useState<CommandTarget>("you");
  const [componentIndex, setComponentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [measureRef, bounds] = useMeasure();
  const reduceMotion = useReducedMotion();
  const selectedComponent =
    target === "you" ? featuredComponents[componentIndex] : agentComponent;
  const command = `${commandPrefix}${selectedComponent}`;

  useEffect(() => {
    const updateVisibility = () => {
      setIsDocumentVisible(document.visibilityState === "visible");
    };

    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () =>
      document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (
      target !== "you" ||
      reduceMotion ||
      isHovered ||
      hasInteracted ||
      !isDocumentVisible
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setComponentIndex(
        (currentIndex) => (currentIndex + 1) % featuredComponents.length,
      );
    }, 4500);

    return () => window.clearInterval(interval);
  }, [hasInteracted, isDocumentVisible, isHovered, reduceMotion, target]);

  const selectTarget = (nextTarget: CommandTarget) => {
    setHasInteracted(true);
    setTarget(nextTarget);
  };

  return (
    <div
      className="mt-8 flex w-fit flex-col items-center gap-5"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <fieldset className="m-0 flex items-center justify-center gap-5 border-0 p-0">
        <legend className="sr-only">Choose installation target</legend>
        <button
          type="button"
          onClick={() => selectTarget("you")}
          className="min-h-11 text-lg font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground aria-pressed:text-foreground motion-reduce:transition-none hover:cursor-pointer"
          aria-pressed={target === "you"}
        >
          For you
        </button>
        <span className="h-7 w-px bg-border" aria-hidden="true" />
        <button
          type="button"
          onClick={() => selectTarget("agent")}
          className="min-h-11 text-lg font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground aria-pressed:text-foreground motion-reduce:transition-none hover:cursor-pointer"
          aria-pressed={target === "agent"}
        >
          For your agent
        </button>
      </fieldset>

      <motion.div
        initial={false}
        animate={bounds.width ? { width: bounds.width } : undefined}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", duration: 0.3, bounce: 0 }
        }
        className="max-w-full overflow-hidden rounded-full border border-border/80 bg-background/50"
        onPointerDownCapture={() => setHasInteracted(true)}
        onFocusCapture={() => setHasInteracted(true)}
      >
        <div
          ref={measureRef}
          className="flex min-h-16 w-max items-center gap-3 py-2 pr-2 pl-5 text-left"
        >
          <span
            className="shrink-0 font-mono text-base text-muted-foreground/60"
            aria-hidden="true"
          >
            $
          </span>
          <code className="bg-transparent p-0 font-mono text-sm whitespace-nowrap overflow-hidden mobile:max-w-[20ch] mobile:text-ellipsis text-foreground sm:text-base">
            {commandPrefix}
            {target === "you" ? (
              <span className="inline-grid min-w-[16ch] [grid-template-areas:'slug']">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.span
                    key={selectedComponent}
                    className="[grid-area:slug]"
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, y: 4, filter: "blur(2px)" }
                    }
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: -3, filter: "blur(2px)" }
                    }
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", duration: 0.3, bounce: 0 }
                    }
                  >
                    {selectedComponent}
                  </motion.span>
                </AnimatePresence>
              </span>
            ) : (
              agentComponent
            )}
          </code>
          <CopyButton
            key={`${target}-${selectedComponent}`}
            content={command}
            componentName={`landing-install-${selectedComponent}`}
            language="shell"
            className="size-11 shrink-0 rounded-full p-0 text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          />
        </div>
      </motion.div>
    </div>
  );
}
