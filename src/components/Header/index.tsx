import React from "react";
import Link from "next/link";

import Logo from "../Common/Logo";
import StartCount from "../Common/StartCount";
import Button from "../Button";
import SidebarLink from "../Common/SidebarLink";

import { navLinks } from "@/libs/data";
import { GIT_REP_LINK } from "@/libs/constants";

const Header = () => {
  return (
    <header className="container mx-auto flex min-h-[75px] items-center justify-between border-b p-2 lg:p-4">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Logo showVersion version="beta" />
        </Link>
      </div>

      <div className="flex items-center lg:space-x-6">
        <Button link={GIT_REP_LINK} variant="default" className="">
          <StartCount />
        </Button>

        <nav className="hidden items-center space-x-6 lg:flex">
          {navLinks.map((link) => (
            <div key={link.name} className="flex items-start space-x-0.5">
              <SidebarLink {...link} />
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
