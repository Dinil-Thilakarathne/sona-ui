import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { FireFrame } from "../fire-frame";

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
      { label: "llms.txt", href: "/llms.txt" },
    ],
  },
] as const;

const footerLinkClassName =
  "group-hover:brightness-100 brightness-70 transition-[filter] duration-150 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground";

export function LandingFooter() {
  return (
    <footer className="relative isolate mx-auto w-full  max-w-[76rem] gap-6 border-t border-border px-4 sm:px-6 lg:px-8 py-6 lg:py-16 pb-8 text-[0.8125rem] text-muted-foreground flex flex-col">
      <FireFrame />
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row justify-between">
          <div>
            <Link
              href="/"
              className="font-helvetica-neue text-lg font-semibold tracking-[-0.04em] text-foreground focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
            >
              Sona UI
            </Link>
          </div>
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="flex gap-8 ">
              {footerLinkGroups.map((group) => (
                <nav key={group.label} aria-label={group.label}>
                  <ul className="m-0 grid list-none content-start gap-2 p-0">
                    {group.links.map((link) => (
                      <li key={link.href} className="group">
                        <Link href={link.href} className={footerLinkClassName}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <ExternalLink
                href="https://github.com/Dinil-Thilakarathne/sona-ui"
                label="GitHub"
              />
              <ExternalLink
                href="https://x.com/codebydinil"
                label="Twitter/X"
              />
            </div>
          </div>
        </div>
        <div>
          <p className="text-[12vw] leading-[80%] font-helvetica-neue text-foreground">
            Beautiful interactions
          </p>
        </div>
      </div>
    </footer>
  );
}

type ExternalLinkProps = {
  href: string;
  label: string;
};
const ExternalLink = ({ href, label }: ExternalLinkProps) => {
  return (
    <a
      href={href}
      className="w-full flex items-start justify-between gap-1.5 font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
      target="_blank"
      rel="noreferrer"
    >
      {label} <ArrowUpRight className="size-4" aria-hidden="true" />
    </a>
  );
};
