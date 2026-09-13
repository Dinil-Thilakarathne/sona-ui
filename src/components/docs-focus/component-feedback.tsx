"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { GIT_REP_LINK } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ComponentFeedbackProps = {
  component: string;
  title: string;
};

const confettiPieces = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

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
    <section className="site-grid-section my-8 py-5" data-boundary="both">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-sm">Was this component useful?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Your feedback helps us improve the documentation.
          </p>
        </div>
        <div className="relative flex items-center gap-2">
          {answer === "yes" && !reduceMotion && (
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
            >
              {confettiPieces.map((piece) => (
                <motion.span
                  key={`confetti-${piece}`}
                  className="absolute left-1/2 top-1/2 size-1.5 rounded-[1px]"
                  style={{
                    backgroundColor: [
                      "#f56565",
                      "#0ae448",
                      "#fff312",
                      "#58a6ff",
                    ][piece % 4],
                  }}
                  initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: Math.cos(piece * 0.63) * (24 + piece * 2),
                    y: Math.sin(piece * 0.63) * (20 + piece * 2),
                    rotate: 180 + piece * 24,
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              ))}
            </div>
          )}
          {(["yes", "no"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setAnswer(value)}
              className={cn(
                "rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:cursor-pointer",
                answer === value &&
                  "border-foreground bg-accent text-foreground",
              )}
            >
              {value === "yes" ? "Yes" : "Not quite"}
            </button>
          ))}
        </div>
      </div>
      {answer && (
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
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
        </div>
      )}
    </section>
  );
}
