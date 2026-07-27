import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface DocsPageLink {
  title: string;
  href: string;
}

interface DocsPageNavigationProps {
  previous?: DocsPageLink;
  next?: DocsPageLink;
  className?: string;
}

export function DocsPageNavigation({
  previous,
  next,
  className,
}: DocsPageNavigationProps) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Documentation page navigation"
      className={cn("grid gap-3 sm:grid-cols-2", className)}
    >
      {previous ? (
        <Link
          href={previous.href}
          className="group flex min-h-16 flex-col justify-center rounded-xl border border-border bg-background/60 px-4 py-3 text-left transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Previous
          </span>
          <span className="mt-1 line-clamp-1 font-medium text-sm group-hover:text-foreground">
            {previous.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group flex min-h-16 flex-col items-end justify-center rounded-xl border border-border bg-background/60 px-4 py-3 text-right transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
            Next
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </span>
          <span className="mt-1 line-clamp-1 font-medium text-sm group-hover:text-foreground">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
