import { Plus } from "lucide-react";
import Image from "next/image";
import { TrackedExternalLink } from "@/components/common/tracked-external-link";

const sponsorshipSlots = [
  { label: "Your logo here", tier: "Platinum sponsor" },
  { label: "Your logo here", tier: "Gold sponsor" },
  { label: "Your logo here", tier: "Silver sponsor" },
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
            <TrackedExternalLink
              key={slot.tier}
              href="https://github.com/sponsors/Dinil-Thilakarathne"
              eventName="sponsor_link_clicked"
              eventProperties={{
                location: "landing_sponsor_slot",
                tier: slot.tier,
              }}
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
            </TrackedExternalLink>
          ))}
        </div>

        <div className="border-t border-border px-5 py-4 sm:px-8">
          <p className="text-sm font-semibold tracking-[0.06em] text-muted-foreground uppercase">
            Project supporters
          </p>
        </div>
        <div className="grid border-y border-border sm:grid-cols-2">
          <TrackedExternalLink
            href="https://tracwell.app/"
            eventName="sponsor_link_clicked"
            eventProperties={{
              location: "landing_platform_partner",
              sponsor: "Tracwell",
            }}
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Tracwell"
            className="group flex min-h-36 items-center justify-center gap-4 text-center transition-colors hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-foreground"
          >
            <Image
              src="/sponsors/tracwell.svg"
              alt=""
              width={48}
              height={48}
              className="size-10 object-contain sm:size-12"
            />
            <span className="font-helvetica-neue text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl">
              Tracwell
            </span>
          </TrackedExternalLink>
          <div className="border-t border-border sm:border-t-0 sm:border-l">
            <TrackedExternalLink
              href="https://vercel.com/open-source-program"
              eventName="sponsor_link_clicked"
              eventProperties={{
                location: "landing_project_supporter",
                sponsor: "Vercel",
                tier: "OSS Program",
              }}
              target="_blank"
              rel="noreferrer"
              aria-label="Visit the Vercel Open Source Program"
              className="group flex min-h-36 items-center justify-center gap-4 text-center transition-colors hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-foreground"
            >
              <svg
                className="text-foreground"
                viewBox="0 0 261 52"
                height="52"
                width="261"
                data-slot="geist-logo-svg"
                role="presentation"
              >
                <g>
                  <path
                    fill="currentColor"
                    d="M59.8 52H0L29.9 0zm67.82-38.45q4.9 0 8.81 2.13a15.5 15.5 0 0 1 6.22 6.32q2.3 4.2 2.38 10.26v2.06h-26.35q.27 4.4 2.58 6.92 2.38 2.47 6.36 2.47a8.4 8.4 0 0 0 7.76-4.93l9.16.67q-1.68 4.98-6.29 7.99t-10.63 3q-5.53 0-9.64-2.27a16 16 0 0 1-6.43-6.46 20 20 0 0 1-2.31-9.72q0-5.52 2.3-9.72a16 16 0 0 1 6.44-6.46 20 20 0 0 1 9.64-2.26m62.55 0q4.47 0 8.18 1.66a15.3 15.3 0 0 1 6.15 4.6q2.38 3 2.87 7.05l-9.23.47a8 8 0 0 0-2.8-5 7.7 7.7 0 0 0-5.17-1.86q-4.33 0-6.7 3-2.4 3-2.39 8.52t2.38 8.52q2.37 3 6.71 3 3.15 0 5.39-1.87 2.24-1.92 2.72-5.46l9.3.4a14.7 14.7 0 0 1-2.87 7.33 16 16 0 0 1-6.15 4.86 21 21 0 0 1-8.39 1.66q-5.53 0-9.64-2.26a16 16 0 0 1-6.44-6.46 20 20 0 0 1-2.3-9.72q0-5.52 2.3-9.72a16 16 0 0 1 6.44-6.46 20 20 0 0 1 9.64-2.26m38.66 0q4.9 0 8.8 2.13a15.5 15.5 0 0 1 6.22 6.32q2.31 4.2 2.38 10.26v2.06h-26.35q.28 4.4 2.58 6.92 2.38 2.47 6.36 2.47a8.4 8.4 0 0 0 7.77-4.93l9.15.67q-1.68 5-6.29 7.99t-10.62 3q-5.53 0-9.65-2.27a16 16 0 0 1-6.43-6.46 20 20 0 0 1-2.31-9.72q0-5.52 2.3-9.72a16 16 0 0 1 6.44-6.46 20 20 0 0 1 9.64-2.26M86.9 36.69l17.24-34.33h10.8L89.96 49.63h-6.12L58.85 2.36h10.81zm71.62-15.55a11 11 0 0 1 2.47-4.48q2.28-2.31 6.38-2.31h3.4v7.26h-3.47q-2.91 0-4.79.8a5.8 5.8 0 0 0-2.77 2.5q-.9 1.72-.9 4.37v20.35h-8.89V14.35h8.33zm101.73 28.5h-8.95V2.35h8.95zM127.62 20.26q-3.7 0-6 2.2-2.32 2.2-2.87 6.2h17.05q-.48-4.34-2.72-6.33a7.8 7.8 0 0 0-5.46-2.07m101.2 0q-3.7 0-6 2.2-2.31 2.2-2.87 6.2H237q-.5-4.34-2.73-6.33a7.8 7.8 0 0 0-5.46-2.07"
                  ></path>
                </g>
              </svg>
            </TrackedExternalLink>
          </div>
        </div>
      </div>
    </section>
  );
}
