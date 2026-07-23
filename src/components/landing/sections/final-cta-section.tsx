import { ArrowRight, ArrowUpRight } from "lucide-react";
import { LandingButtonLink } from "../button-link";

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
        className="mt-3 max-w-[14ch] text-balance font-helvetica-neue text-[clamp(2rem,3.6vw,3.75rem)] leading-[.98] font-semibold tracking-[-0.05em]"
      >
        Build the interaction your product deserves.
      </h2>
      <div className="mt-8 flex flex-wrap justify-center gap-2.5">
        <LandingButtonLink
          href="/docs"
          className="rounded-full px-4 text-sm font-semibold"
        >
          Browse components <ArrowRight className="size-4" aria-hidden="true" />
        </LandingButtonLink>
        <LandingButtonLink
          href="https://github.com/Dinil-Thilakarathne/sona-ui"
          variant="outlined"
          className="rounded-full px-4 text-sm font-semibold"
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub <ArrowUpRight className="size-4" aria-hidden="true" />
        </LandingButtonLink>
      </div>
    </section>
  );
}
