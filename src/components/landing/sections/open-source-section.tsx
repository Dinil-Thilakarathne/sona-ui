import { Code2, Terminal } from "lucide-react";
import Link from "@/components/common/link";
import { FaGithub } from "react-icons/fa";

const cardClass =
  "grid min-h-44 content-start gap-2.5 rounded-2xl bg-card p-5 smooth-shadow-ring-sm transition-[transform] duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground motion-reduce:transform-none motion-reduce:transition-none";

export function OpenSourceSection() {
  return (
    <section
      className="mx-auto w-full max-w-[76rem] border-t border-border px-4 sm:px-6 lg:px-8 py-[clamp(5rem,10vw,9rem)]"
      aria-labelledby="open-title"
    >
      <p className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
        Built in the open
      </p>
      <h2
        id="open-title"
        className="mt-3 max-w-[18ch] text-balance font-helvetica-neue text-[clamp(2rem,3.6vw,3.75rem)] leading-[.98] font-semibold tracking-[-0.05em]"
      >
        Engineering proof over marketing filler.
      </h2>
      <div className="mt-8 grid gap-3 md:grid-cols-3">
        <a
          href="https://github.com/Dinil-Thilakarathne/sona-ui"
          className={cardClass}
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub className="size-5 text-site-brand" aria-hidden="true" />
          <strong className="text-[0.95rem]">Open source</strong>
          <span className="text-[0.8125rem] leading-relaxed text-muted-foreground">
            Inspect the implementation and contribute.
          </span>
        </a>
        <Link href="/docs/changelog" className={cardClass}>
          <Terminal className="size-5 text-site-brand" aria-hidden="true" />
          <strong className="text-[0.95rem]">Release history</strong>
          <span className="text-[0.8125rem] leading-relaxed text-muted-foreground">
            See what has changed and why.
          </span>
        </Link>
        <Link href="/docs/ai-agents" className={cardClass}>
          <Code2 className="size-5 text-site-brand" aria-hidden="true" />
          <strong className="text-[0.95rem]">Validated workflow</strong>
          <span className="text-[0.8125rem] leading-relaxed text-muted-foreground">
            Registry and agent resources designed to work together.
          </span>
        </Link>
      </div>
    </section>
  );
}
