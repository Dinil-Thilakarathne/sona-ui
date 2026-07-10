import Link from "next/link";
import { GIT_REP_LINK } from "@/lib/constants";
import { navLinks } from "@/lib/data";
import FadeInComp from "../common/fade-in";
import Logo from "../common/logo";
import SidebarLink from "../common/sidebar-link";
import StartCount from "../common/start-count";
import { ModeToggle } from "../common/theme-toggle";
import { Search } from "../Search";

const Header = () => {
  return (
    <header className="fixed left-0 top-0 z-49 px-2 lg:px-2 min-h-header-height w-full">
      <div className="flex items-center justify-between px-2 py-4 w-full  backdrop-blur-md">
        <div className="flex gap-x-6 items-center">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
          <nav className="hidden lg:flex items-center space-x-6">
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
        <div className="flex gap-2 items-center lg:space-x-6">
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
