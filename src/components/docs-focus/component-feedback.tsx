"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import { useState } from "react";
import { GIT_REP_LINK } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ComponentFeedbackProps = {
  component: string;
  title: string;
};

export function ComponentFeedback({
  component,
  title,
}: ComponentFeedbackProps) {
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  const reduceMotion = useReducedMotion();

  const feedbackUrl = (() => {
    if (typeof window === "undefined") return GIT_REP_LINK;

    const params = new URLSearchParams({
      title: `${answer === "yes" ? "Positive" : "Negative"} feedback: ${title}`,
      body: `Component: ${component}\nURL: ${window.location.href}\n\nFeedback:\n`,
      labels: "documentation,feedback",
    });

    return `${GIT_REP_LINK}/issues/new?${params.toString()}`;
  })();

  return (
    <section
      className="site-grid-section my-8 border-y border-border/60 py-5"
      data-boundary="both"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-sm">Was this page helpful?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Your response helps us improve component docs.
          </p>
        </div>
        <LayoutGroup id={`component-feedback-${component}`}>
          <div className="flex items-center gap-2">
            {(["yes", "no"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setAnswer(value)}
                className={cn(
                  "relative isolate rounded-md border border-border px-3 py-1.5 text-sm transition-colors duration-150 hover:bg-accent hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  answer === value ? "border-transparent text-foreground" : "",
                )}
              >
                {answer === value && (
                  <motion.span
                    layoutId="feedback-selected"
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-[inherit] bg-accent"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", duration: 0.38, bounce: 0 }
                    }
                  />
                )}
                <span className="relative inline-flex items-center gap-1.5">
                  {answer === value && (
                    <motion.span
                      key={`mark-${answer}`}
                      aria-hidden="true"
                      initial={
                        reduceMotion
                          ? false
                          : { opacity: 0, scale: 0.65, rotate: -18 }
                      }
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", duration: 0.38, bounce: 0.16 }
                      }
                      className="text-emerald-600 dark:text-emerald-400"
                    >
                      ✓
                    </motion.span>
                  )}
                  {value === "yes" ? "Yes" : "Needs work"}
                </span>
              </button>
            ))}
          </div>
        </LayoutGroup>
      </div>
      <AnimatePresence initial={false}>
        {answer && (
          <motion.div
            key="feedback-response"
            initial={
              reduceMotion ? false : { opacity: 0, y: 5, filter: "blur(3px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={
              reduceMotion
                ? undefined
                : { opacity: 0, y: -2, filter: "blur(2px)" }
            }
            transition={{ type: "spring", duration: 0.32, bounce: 0 }}
            className="mt-4 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 text-sm"
          >
            <span className="text-muted-foreground">
              Thanks for the feedback.
            </span>
            <a
              href={feedbackUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 hover:text-muted-foreground"
            >
              Send detailed feedback ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
