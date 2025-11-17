import Link from "next/link";

import Logo from "../Common/Logo";
import StartCount from "../Common/StartCount";
import SidebarLink from "../Common/SidebarLink";

import { navLinks } from "@/lib/data";
import { GIT_REP_LINK } from "@/lib/constants";
// import { ModeToggle } from "../Common/ModeToggle";
import FadeInComp from "../Common/FadeIn";

const Header = () => {
  return (
    <header className="min-h-header-height bg-background fixed top-0 left-0 z-99 flex w-full items-center justify-between p-2 lg:p-4">
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
                <SidebarLink name={link.name} href={link.href} tag={link.tag} />
              </div>
            </FadeInComp>
          ))}
        </nav>
      </div>

      <div className="flex items-center lg:space-x-6">
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

        {/* hide this light theme is better :) */}
        {/* <ModeToggle /> */}
      </div>
    </header>
  );
};

export default Header;
