import { Plus } from "lucide-react";

const sponsorshipSlots = [
  { label: "Your logo here", tier: "Platinum sponsor" },
  { label: "Your logo here", tier: "Gold sponsor" },
  { label: "Become a sponsor", tier: "Support Sona UI" },
] as const;

export function SponsorsSection() {
  return (
    <section
      className="site-grid-section mx-auto w-full max-w-(--site-grid-max-width) py-[clamp(5rem,10vw,9rem)]"
      data-boundary="both"
      aria-labelledby="sponsors-title"
    >
      <div className="flex flex-col px-4  sm:px-6 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
          Supported by the community
        </p>
        <h2
          id="sponsors-title"
          className="mt-3 max-w-[18ch] text-balance font-helvetica-neue text-[clamp(2rem,3.6vw,3.75rem)] leading-[.98] font-semibold tracking-[-0.05em]"
        >
          Made possible by generous supporters.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Your support helps keep Sona UI open, experimental, and available to
          everyone.
        </p>
      </div>

      <div className="mt-12">
        <div className="border-b border-border px-5 py-4 sm:px-8">
          <p className="text-sm font-semibold tracking-[0.06em] text-muted-foreground uppercase">
            Supporters
          </p>
        </div>
        <div className="grid border-b border-border divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {sponsorshipSlots.map((slot) => (
            <a
              key={slot.tier}
              href="https://github.com/sponsors/Dinil-Thilakarathne"
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-40 flex-col items-center justify-center gap-3 px-5 py-8 text-center transition-colors hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-foreground"
            >
              <span className="flex size-10 items-center justify-center rounded-full border border-dashed border-muted-foreground/60 text-muted-foreground transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none">
                <Plus className="size-5" aria-hidden="true" />
              </span>
              <span className="font-helvetica-neue text-lg  tracking-[-0.03em] text-foreground">
                {slot.label}
              </span>
            </a>
          ))}
        </div>

        <div className="border-t border-border px-5 py-4 sm:px-8">
          <p className="text-sm font-semibold tracking-[0.06em] text-muted-foreground uppercase">
            Platform partner
          </p>
        </div>
        <a
          href="https://github.com/sponsors/Dinil-Thilakarathne"
          target="_blank"
          rel="noreferrer"
          className="group flex min-h-36 items-center justify-center border-b border-border text-center transition-colors hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-foreground"
        >
          <span className="font-helvetica-neue text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl">
            Platform sponsor logo
          </span>
        </a>
      </div>
    </section>
  );
}
