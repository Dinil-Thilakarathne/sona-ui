"use client";

import { ChevronDown } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useIsPresent,
  useReducedMotionConfig,
} from "motion/react";
import {
  type ReactNode,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/sona-utils";

function CardDetails({ children }: { children: ReactNode }) {
  const isPresent = useIsPresent();

  return (
    <div inert={!isPresent} aria-hidden={!isPresent || undefined}>
      {children}
    </div>
  );
}

export interface ExpandableDataCardProps {
  /** Short label describing the data shown in the card. */
  title: string;
  /** Always-visible summary content, such as a metric and its change. */
  summary: ReactNode;
  /** Additional data revealed when the card expands. */
  children: ReactNode;
  /** Controlled expanded state. @default undefined */
  open?: boolean;
  /** Initial expanded state when uncontrolled. @default false */
  defaultOpen?: boolean;
  /** Called when the user opens or closes the card. @default undefined */
  onOpenChange?: (open: boolean) => void;
  /** Additional classes for the card surface. @default undefined */
  className?: string;
}

export default function ExpandableDataCard({
  title,
  summary,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  className,
}: ExpandableDataCardProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [inputModality, setInputModality] = useState<"pointer" | "keyboard">(
    "pointer",
  );
  const shouldReduceMotion = useReducedMotionConfig();
  const generatedId = useId();
  const titleId = `${generatedId}-title`;
  const triggerId = `${generatedId}-trigger`;
  const detailsId = `${generatedId}-details`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const isOpen = open ?? internalOpen;
  useLayoutEffect(() => {
    if (!isOpen && detailsRef.current?.contains(document.activeElement)) {
      triggerRef.current?.focus({ preventScroll: true });
    }
  }, [isOpen]);
  const shouldAnimate = !shouldReduceMotion && inputModality !== "keyboard";
  const transition = shouldAnimate
    ? { type: "spring" as const, duration: 0.32, bounce: 0 }
    : { duration: 0 };

  function toggle() {
    const nextOpen = !isOpen;
    if (open === undefined) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  }

  return (
    <motion.article
      layout
      transition={transition}
      className={cn(
        "w-full max-w-md overflow-hidden rounded-2xl bg-card text-card-foreground smooth-shadow-ring-md",
        className,
      )}
    >
      <motion.div
        layout="position"
        transition={transition}
        className="p-5 sm:p-6"
      >
        <div className="flex items-center justify-between gap-4">
          <h3
            id={titleId}
            className="min-w-0 break-words text-sm font-medium text-muted-foreground"
          >
            {title}
          </h3>
          <button
            ref={triggerRef}
            id={triggerId}
            type="button"
            aria-label={`${isOpen ? "Collapse" : "Expand"} ${title} details`}
            aria-expanded={isOpen}
            aria-controls={detailsId}
            onClick={toggle}
            onKeyDownCapture={() => setInputModality("keyboard")}
            onPointerDownCapture={() => setInputModality("pointer")}
            className="inline-flex min-h-8 shrink-0 items-center gap-1 rounded-lg px-2 text-xs font-medium text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
          >
            <span>Details</span>
            <motion.span
              aria-hidden="true"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={transition}
              className="inline-flex"
            >
              <ChevronDown className="size-3.5" />
            </motion.span>
          </button>
        </div>
        <div className="mt-5">{summary}</div>
      </motion.div>

      <div id={detailsId} ref={detailsRef}>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              role="region"
              aria-labelledby={titleId}
              initial={shouldAnimate ? { opacity: 0, y: -6 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldAnimate ? -3 : 0 }}
              transition={transition}
              className="border-t border-border/70 px-5 py-4 sm:px-6"
            >
              <CardDetails>{children}</CardDetails>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
