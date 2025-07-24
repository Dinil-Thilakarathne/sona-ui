import Link from "next/link";

import Logo from "../Common/Logo";
import StartCount from "../Common/StartCount";
import SidebarLink from "../Common/SidebarLink";

import { navLinks } from "@/lib/data";
import { GIT_REP_LINK } from "@/lib/constants";
import { ModeToggle } from "../Common/ModeToggle";
import AnimatedLink from "../Common/AnimatedLink";

const Header = () => {
  return (
    <header className="min-h-header-height fixed top-0 left-0 z-99 flex w-full items-center justify-between p-2 lg:p-4">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
      </div>

      <div className="flex items-center lg:space-x-6">
        <AnimatedLink href={GIT_REP_LINK} variant="default" className="">
          <StartCount />
        </AnimatedLink>

        <nav className="hidden items-center space-x-6 lg:flex">
          {navLinks.map((link) => (
            <div key={link.name} className="flex items-start space-x-0.5">
              <SidebarLink name={link.name} href={link.href} tag={link.tag} />
            </div>
          ))}
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;
