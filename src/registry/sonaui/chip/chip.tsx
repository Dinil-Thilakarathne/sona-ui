import * as React from "react";

import { cn } from "@/lib/sona-utils";

type ChipTone = "neutral" | "success" | "warning" | "danger";
type ChipVariant = "soft" | "solid" | "outline";
type ChipSize = "sm" | "md";

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The semantic color used to communicate the chip's status. @default "neutral" */
  tone?: ChipTone;
  /** The surface treatment applied to the chip. @default "soft" */
  variant?: ChipVariant;
  /** The compactness of the chip. @default "md" */
  size?: ChipSize;
}

const toneClasses: Record<ChipVariant, Record<ChipTone, string>> = {
  soft: {
    neutral: "border-border bg-muted text-foreground",
    success:
      "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    warning:
      "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-400",
    danger: "border-destructive/30 bg-destructive/10 text-destructive",
  },
  solid: {
    neutral: "border-foreground bg-foreground text-background",
    success: "border-emerald-600 bg-emerald-600 text-white dark:bg-emerald-500",
    warning: "border-amber-500 bg-amber-500 text-amber-950",
    danger: "border-destructive bg-destructive text-destructive-foreground",
  },
  outline: {
    neutral: "border-border bg-transparent text-foreground",
    success:
      "border-emerald-500/50 bg-transparent text-emerald-700 dark:text-emerald-400",
    warning:
      "border-amber-500/50 bg-transparent text-amber-700 dark:text-amber-400",
    danger: "border-destructive/60 bg-transparent text-destructive",
  },
};

const sizeClasses: Record<ChipSize, string> = {
  sm: "min-h-5 gap-1 px-2 text-[0.5875rem]",
  md: "min-h-6 gap-1.5 px-2.5 text-xs",
};

const ChipIcon = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function ChipIcon({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      data-slot="chip-icon"
      className={cn(
        "flex size-3 shrink-0 items-center justify-center [&_svg]:size-full",
        className,
      )}
      {...props}
    />
  );
});

const ChipLabel = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function ChipLabel({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      data-slot="chip-label"
      className={cn("truncate", className)}
      {...props}
    />
  );
});

const ChipRoot = React.forwardRef<HTMLSpanElement, ChipProps>(function ChipRoot(
  { className, tone = "neutral", variant = "soft", size = "md", ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      data-size={size}
      data-slot="chip"
      data-tone={tone}
      data-variant={variant}
      className={cn(
        "inline-flex w-fit items-center justify-center rounded-xl border font-medium leading-none whitespace-nowrap",
        sizeClasses[size],
        toneClasses[variant][tone],
        className,
      )}
      {...props}
    />
  );
});

ChipIcon.displayName = "Chip.Icon";
ChipLabel.displayName = "Chip.Label";
ChipRoot.displayName = "Chip";

const Chip = Object.assign(ChipRoot, {
  Icon: ChipIcon,
  Label: ChipLabel,
});

export { ChipIcon, ChipLabel };
export default Chip;
