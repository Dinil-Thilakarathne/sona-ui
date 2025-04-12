import React from "react";

import Logo from "../Common/Logo";
import StartCount from "../Common/StartCount";
import Button from "../Button";
import { navLinks } from "@/libs/data";
import StaggerText from "../Common/StaggerText";
import Tag from "../Common/Tag";

const Header = () => {
  return (
    <header className="container mx-auto flex min-h-[75px] items-center justify-between border-b border-gray-200 p-4">
      {/* Logo Section */}
      <div className="flex items-center">
        <Logo showVersion version="beta" />
      </div>

      <div className="flex items-center space-x-6">
        {/* Star Count Section */}
        <Button variant="default" className="">
          <StartCount />
        </Button>
        {/* Navigation Section */}
        <nav className="flex items-center space-x-6">
          {navLinks.map((link) => (
            <div key={link.name} className="flex items-start space-x-0.5">
              <a
                href={link.href}
                className="py-2 text-lg font-medium text-gray-700 hover:text-gray-900"
              >
                <StaggerText As="h2" text={link.name} />
              </a>
              {link.tag && (
                <Tag
                  text={link.tag}
                  type="soon"
                  className="px-1 py-0 text-xs"
                />
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
