import Link from "next/link";

import Logo from "../common/logo";
import StartCount from "../common/start-count";
import SidebarLink from "../common/sidebar-link";

import { navLinks } from "@/lib/data";
import { GIT_REP_LINK } from "@/lib/constants";
import FadeInComp from "../common/fade-in";
import { Search } from "../Search";
import { ModeToggle } from "../common/theme-toggle";

const Header = () => {
  return (
    <header className="min-h-header-height fixed top-0 left-0 z-99 w-full p-2 lg:px-2">
      <div className="bg-background/40 flex w-full items-center justify-between rounded-lg border px-2 py-4 backdrop-blur-md">
        <div className="flex items-center gap-x-6">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
          <nav className="hidden items-center space-x-6 lg:flex">
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
                <div className="flex items-start space-x-0.5">
                  <SidebarLink
                    name={link.name}
                    href={link.href}
                    tag={link.tag}
                  />
                </div>
              </FadeInComp>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2 lg:space-x-6">
          <Search />
          <FadeInComp
            animationProps={{
              duration: 0.4,
              opacity: 0,
              yPercent: 20,
              filter: "blur(4px)",
            }}
          >
            <Link href={GIT_REP_LINK} className="">
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