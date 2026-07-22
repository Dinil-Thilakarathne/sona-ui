import { Bot } from "lucide-react";
import Link from "next/link";

export function AiSection() {
  return (
    <section
      className="mx-auto grid w-full max-w-[76rem] items-center gap-10 border-t border-border px-4 py-[clamp(5rem,10vw,9rem)] md:grid-cols-[minmax(0,1fr)_minmax(18rem,.92fr)] md:gap-[clamp(2.5rem,7vw,7rem)]"
      aria-labelledby="ai-title"
    >
      <div>
        <p className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
          Built for you and your coding agent
        </p>
        <h2
          id="ai-title"
          className="mt-3 max-w-[18ch] text-balance font-clash-display text-[clamp(2rem,3.6vw,3.75rem)] leading-[.98] font-semibold tracking-[-0.05em]"
        >
          A component system agents can understand.
        </h2>
        <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          Structured catalog data, agent-readable resources, and an installable
          skill help agents discover the right component before they start
          writing lookalikes.
        </p>
        <div className="mt-8 flex flex-wrap gap-2.5">
          <Link
            href="/docs/ai-agents"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm leading-none font-semibold text-background transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-primary active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground motion-reduce:transform-none motion-reduce:transition-none"
          >
            AI agents <Bot className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/docs/skills"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-background px-4 py-2.5 text-sm leading-none font-semibold text-foreground transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-secondary active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground motion-reduce:transform-none motion-reduce:transition-none"
          >
            Skills
          </Link>
        </div>
      </div>
      <div
        className="overflow-hidden rounded-2xl border border-border bg-foreground p-5 font-mono text-xs leading-[1.8] text-[oklch(.93_0_0)] shadow-lg"
        role="img"
        aria-label="AI workflow example"
      >
        <div className="mb-6 flex gap-1.5">
          <span className="size-2 rounded-full bg-white/40" />
          <span className="size-2 rounded-full bg-white/40" />
          <span className="size-2 rounded-full bg-white/40" />
        </div>
        <p>
          <span className="text-[oklch(.75_.15_250)]">$</span> discover sona
          components for tabs
        </p>
        <p className="text-white/60">
          → Fluid Tabs · accessible · motion-aware
        </p>
        <p>
          <span className="text-[oklch(.75_.15_250)]">$</span> install
          @sona-ui/fluid-tabs
        </p>
        <p className="text-[oklch(.75_.15_145)]">
          ✓ source added to your project
        </p>
      </div>
    </section>
  );
}
