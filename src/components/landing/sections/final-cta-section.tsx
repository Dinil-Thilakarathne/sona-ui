import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function FinalCtaSection() {
  return (
    <section
      className="mx-auto grid w-full max-w-3xl justify-items-center px-4 py-[clamp(5rem,12vw,9rem)] text-center"
      aria-labelledby="final-title"
    >
      <p className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
        Ready when you are
      </p>
      <h2
        id="final-title"
        className="mt-3 max-w-[14ch] text-balance font-clash-display text-[clamp(2rem,3.6vw,3.75rem)] leading-[.98] font-semibold tracking-[-0.05em]"
      >
        Build the interaction your product deserves.
      </h2>
      <div className="mt-8 flex flex-wrap justify-center gap-2.5">
        <Link
          href="/docs"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm leading-none font-semibold text-background transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-primary active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground motion-reduce:transform-none motion-reduce:transition-none"
        >
          Browse components <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <a
          href="https://github.com/Dinil-Thilakarathne/sona-ui"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm leading-none font-semibold text-foreground transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-secondary active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground motion-reduce:transform-none motion-reduce:transition-none"
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
