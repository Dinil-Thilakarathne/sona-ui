import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function SiteGridFrame({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("site-grid-frame", className)} {...props}>
      <div className="site-grid-frame__rails" aria-hidden="true" />
      <div className="site-grid-frame__content">{children}</div>
    </div>
  );
}

type SiteGridSectionProps = ComponentProps<"section"> & {
  boundary?: "none" | "top" | "bottom" | "both";
};

export function SiteGridSection({
  boundary = "top",
  className,
  ...props
}: SiteGridSectionProps) {
  return (
    <section
      className={cn("site-grid-section", className)}
      data-boundary={boundary}
      {...props}
    />
  );
}

export function SiteGridContainer({
  className,
  ...props
}: ComponentProps<"div">) {
  return <div className={cn("site-grid-container", className)} {...props} />;
}

export function SiteGridRow({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("site-grid-row", className)} {...props} />;
}

type SiteGridGapProps = Omit<ComponentProps<"div">, "aria-hidden"> & {
  orientation?: "horizontal" | "vertical";
};

export function SiteGridGap({
  orientation = "horizontal",
  className,
  ...props
}: SiteGridGapProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("site-grid-gap", className)}
      data-orientation={orientation}
      {...props}
    />
  );
}
