import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const footerLinkGroups = [
  {
    label: "Sona UI documentation",
    links: [
      { label: "Components", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Theming", href: "/docs/theming" },
    ],
  },
  {
    label: "Sona UI resources",
    links: [
      { label: "AI agents", href: "/docs/ai-agents" },
      { label: "Skills", href: "/docs/skills" },
      { label: "Changelog", href: "/docs/changelog" },
    ],
  },
] as const;

const footerLinkClassName =
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground";

export function LandingFooter() {
  return (
    <footer className="mx-auto grid w-full max-w-[76rem] gap-6 border-t border-border px-4 py-6 lg:py-16 pb-8 text-[0.8125rem] text-muted-foreground sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_auto]">
      <div>
        <Link
          href="/"
          className="font-helvetica-neue text-lg font-semibold tracking-[-0.04em] text-foreground focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
        >
          Sona UI
        </Link>
      </div>
      {footerLinkGroups.map((group) => (
        <nav key={group.label} aria-label={group.label}>
          <ul className="m-0 grid list-none content-start gap-2 p-0">
            {group.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={footerLinkClassName}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ))}
      <div>
        <a
          href="https://github.com/Dinil-Thilakarathne/sona-ui"
          className="inline-flex items-start gap-1.5 font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
          target="_blank"
          rel="noreferrer"
        >
          GitHub <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
