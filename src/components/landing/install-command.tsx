"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import useMeasure from "react-use-measure";
import { CopyButton } from "@/components/copy-button/copy-button";

const commands = {
  you: "npx shadcn@latest add @sona-ui/magnetic-button",
  agent: "npx shadcn@latest add @sona-ui/agent-skill",
} as const;

type CommandTarget = keyof typeof commands;

export function InstallCommand() {
  const [target, setTarget] = useState<CommandTarget>("you");
  const [measureRef, bounds] = useMeasure();
  const reduceMotion = useReducedMotion();
  const command = commands[target];

  const selectTarget = (nextTarget: CommandTarget) => {
    setTarget(nextTarget);
  };

  return (
    <div className="mt-8 flex w-fit flex-col items-center gap-5">
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
            {command}
          </code>
          <CopyButton
            key={target}
            content={command}
            componentName="landing-install-command"
            language="shell"
            className="size-11 shrink-0 rounded-full p-0 text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          />
        </div>
      </motion.div>
    </div>
  );
}
