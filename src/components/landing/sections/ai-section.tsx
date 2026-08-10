import { Bot } from "lucide-react";
import { LandingButtonLink } from "../button-link";

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
          className="mt-3 max-w-[18ch] text-balance font-helvetica-neue text-[clamp(2rem,3.6vw,3.75rem)] leading-[.98] font-semibold tracking-[-0.05em]"
        >
          A component system agents can understand.
        </h2>
        <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          Structured catalog data, agent-readable resources, and an installable
          skill help agents discover the right component before they start
          writing lookalikes.
        </p>
        <div className="mt-8 flex flex-wrap gap-2.5">
          <LandingButtonLink
            href="/docs/ai-agents"
            className="rounded-full px-4 text-sm font-semibold"
          >
            AI agents <Bot className="size-4" aria-hidden="true" />
          </LandingButtonLink>
          <LandingButtonLink
            href="/docs/skills"
            variant="outlined"
            className="rounded-full px-4 text-sm font-semibold"
          >
            Skills
          </LandingButtonLink>
        </div>
      </div>
      <div
        className="overflow-hidden rounded-2xl bg-card p-5 font-mono text-xs leading-[1.8] text-card-foreground smooth-shadow-ring-lg"
        role="img"
        aria-label="AI workflow example"
      >
        <div className="mb-6 flex gap-1.5">
          <span className="size-2 rounded-full bg-muted-foreground/40" />
          <span className="size-2 rounded-full bg-muted-foreground/40" />
          <span className="size-2 rounded-full bg-muted-foreground/40" />
        </div>
        <p>
          <span className="text-primary">$</span> discover sona components for
          tabs
        </p>
        <p className="text-muted-foreground">
          → Fluid Tabs · accessible · motion-aware
        </p>
        <p>
          <span className="text-primary">$</span> install @sona-ui/fluid-tabs
        </p>
        <p className="text-success-foreground">
          ✓ source added to your project
        </p>
      </div>
    </section>
  );
}
