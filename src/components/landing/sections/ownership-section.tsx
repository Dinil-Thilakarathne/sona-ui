import { ArrowRight, Code2, Layers3, Sparkles } from "lucide-react";
import Link from "next/link";

const steps = [
  [
    "01",
    Code2,
    "Install",
    "Pull a component and its foundations through the registry.",
  ],
  [
    "02",
    Layers3,
    "Own the source",
    "Read, change, and compose the implementation in your app.",
  ],
  [
    "03",
    Sparkles,
    "Shape the system",
    "Adapt tokens and motion to the product you are actually building.",
  ],
] as const;

export function OwnershipSection() {
  return (
    <section
      className="mx-auto grid w-full max-w-[76rem] items-center gap-10 border-t border-border px-4 sm:px-6 lg:px-8 py-[clamp(5rem,10vw,9rem)] md:grid-cols-[minmax(0,.88fr)_minmax(20rem,1.12fr)] md:gap-[clamp(2.5rem,7vw,7rem)]"
      aria-labelledby="ownership-title"
    >
      <div>
        <p className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
          Copy it. Read it. Make it yours.
        </p>
        <h2
          id="ownership-title"
          className="mt-3 max-w-[18ch] text-balance font-helvetica-neue text-[clamp(2rem,3.6vw,3.75rem)] leading-[.98] font-semibold tracking-[-0.05em]"
        >
          The component is yours once you install it.
        </h2>
        <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          Sona UI gives you source, not a black box. Install from the registry,
          adapt the implementation, and make the motion and theme fit your
          product.
        </p>
        <Link
          href="/docs/installation"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
        >
          Read installation <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      <ol className="grid gap-3">
        {steps.map(([number, Icon, title, description]) => (
          <li
            className="grid grid-cols-[auto_auto_1fr] items-start gap-3.5 rounded-xl bg-card p-4 smooth-shadow-ring-sm"
            key={number}
          >
            <span className="font-mono text-[0.6875rem] leading-6 text-muted-foreground">
              {number}
            </span>
            <Icon className="mt-1 size-5 text-site-brand" aria-hidden="true" />
            <div>
              <strong className="text-sm">{title}</strong>
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
