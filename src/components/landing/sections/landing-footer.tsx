import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="mx-auto grid w-full max-w-[76rem] gap-6 border-t border-border px-4 py-6 pb-8 text-[0.8125rem] text-muted-foreground sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_auto]">
      <Link
        href="/"
        className="font-clash-display text-lg font-semibold tracking-[-0.04em] text-foreground focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
      >
        Sona UI
      </Link>
      <div className="grid content-start gap-2">
        <Link
          href="/docs"
          className="focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
        >
          Components
        </Link>
        <Link
          href="/docs/installation"
          className="focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
        >
          Installation
        </Link>
        <Link
          href="/docs/theming"
          className="focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
        >
          Theming
        </Link>
      </div>
      <div className="grid content-start gap-2">
        <Link
          href="/docs/ai-agents"
          className="focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
        >
          AI agents
        </Link>
        <Link
          href="/docs/skills"
          className="focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
        >
          Skills
        </Link>
        <Link
          href="/docs/changelog"
          className="focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
        >
          Changelog
        </Link>
      </div>
      <a
        href="https://github.com/Dinil-Thilakarathne/sona-ui"
        className="inline-flex items-start gap-1.5 font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
        target="_blank"
        rel="noreferrer"
      >
        GitHub <ArrowUpRight className="size-4" aria-hidden="true" />
      </a>
    </footer>
  );
}
