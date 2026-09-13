"use client";

import Link from "@/components/common/link";
import Logo from "@/components/common/logo";
import SidebarLink from "@/components/common/sidebar-link";
import StartCount from "@/components/common/start-count";
import { ModeToggle } from "@/components/common/theme-toggle";
import { Search } from "@/components/Search";
import { componentNavigationLinks } from "@/config/components";
import { GIT_REP_LINK } from "@/lib/constants";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-49 h-header-height transition-[background-color,backdrop-filter] duration-200 motion-reduce:transition-none",
        "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:z-20 after:h-px after:bg-[var(--site-grid-line)]",
      )}
    >
      <div className=" absolute w-full h-full left-0 top-0 bg-background mx-0.5"></div>
      <div className="relative z-10 mx-auto flex items-center justify-between h-full w-full max-w-(--header-max-width) border-x border-border px-4 bg-background">
        <div className="flex gap-1 lg:gap-2 items-center">
          <Link
            href="/"
            prefetch
            className="-ml-2 flex h-9 items-center rounded-md px-2 transition-colors duration-150 hover:bg-secondary active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground motion-reduce:transition-none"
          >
            <Logo />
          </Link>
          <Divider />

          <nav
            className="flex min-w-0 items-center justify-center"
            aria-label="Primary navigation"
          >
            {navLinks.map((link) => (
              <SidebarLink
                className="rounded-md px-2 py-2 transition-colors duration-150 hover:bg-secondary motion-reduce:transition-none sm:px-3"
                key={link.name}
                name={link.name}
                href={link.href}
                prefetch
                tag={link.tag}
                showIndicator={false}
                suffix={
                  link.name === "Components" ? (
                    <sup className="ml-1 align-super font-mono text-[9px] leading-none text-muted-foreground">
                      [{componentNavigationLinks.length}]
                    </sup>
                  ) : undefined
                }
              />
            ))}
          </nav>
        </div>

        <div className="h-fit flex items-center gap-1 lg:gap-2">
          <Search compact />
          <Divider />
          <Link
            href={GIT_REP_LINK}
            className="flex h-9 min-w-9 items-center justify-center px-2 rounded-md text-muted-foreground transition-colors duration-150 hover:bg-secondary hover:text-foreground active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground motion-reduce:transition-none"
            aria-label="Star Sona UI on GitHub"
          >
            <StartCount />
          </Link>
          <Divider />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;

const Divider = () => {
  return <div className="h-4 w-[1px] bg-secondary"></div>;
};
