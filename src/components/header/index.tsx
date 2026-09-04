"use client";

import Link from "@/components/common/link";
import { usePathname } from "next/navigation";
import { GIT_REP_LINK } from "@/lib/constants";
import { navLinks } from "@/lib/data";
import FadeInComp from "../common/fade-in";
import Logo from "../common/logo";
import SidebarLink from "../common/sidebar-link";
import StartCount from "../common/start-count";
import { ModeToggle } from "../common/theme-toggle";
import { Search } from "../Search";

const Header = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/docs")) return null;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-49 sm:top-6">
      <div className="mx-auto flex w-full max-w-[76rem] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-auto flex items-center rounded-xl bg-focus-chrome p-1 smooth-shadow-ring-sm backdrop-blur-xl">
          <Link
            href="/"
            prefetch
            className="flex h-9 items-center rounded-lg px-3 hover:bg-accent"
          >
            <Logo />
          </Link>
          <div className="mx-1 hidden h-5 w-px bg-border lg:block" />
          <nav className="hidden items-center gap-5 px-3 lg:flex">
            {navLinks.map((link, i) => (
              <FadeInComp
                key={link.name}
                animationProps={{
                  duration: 0.4,
                  opacity: 0,
                  yPercent: 20,
                  delay: i * 0.1,
                  filter: "blur(4px)",
                }}
              >
                <SidebarLink
                  name={link.name}
                  href={link.href}
                  prefetch
                  tag={link.tag}
                />
              </FadeInComp>
            ))}
          </nav>
        </div>
        <div className="pointer-events-auto flex items-center gap-1 rounded-xl bg-focus-chrome p-1 smooth-shadow-ring-sm backdrop-blur-xl">
          <Search />
          <FadeInComp
            animationProps={{
              duration: 0.4,
              opacity: 0,
              yPercent: 20,
              filter: "blur(4px)",
            }}
          >
            <Link
              href={GIT_REP_LINK}
              className="flex h-9 items-center rounded-lg px-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:px-3"
            >
              <StartCount />
            </Link>
          </FadeInComp>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
