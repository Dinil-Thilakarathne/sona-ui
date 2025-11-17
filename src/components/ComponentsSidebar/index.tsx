"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";

import SidebarLink from "../Common/SidebarLink";
import { navLinks } from "@/lib/data";
// import { ModeToggle } from "../Common/ModeToggle";
import { groupedComponents } from "@/config/components";
// import ProfilePopover from "../ProfilePopover";

type SidebarProps = {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  isOpen: controlledIsOpen,
  onOpenChange,
}) => {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  const setIsOpen = (next: boolean) => {
    if (!isControlled) {
      setUncontrolledIsOpen(next);
    }
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (typeof window === "undefined" || isControlled) return;
    if (window.innerWidth >= 1024) {
      setUncontrolledIsOpen(true);
    }
  }, [isControlled]);

  return (
    <>
      {/* Menu Icon for Mobile */}
      <motion.button
        className="fixed right-4 bottom-4 z-50 block rounded-full bg-white p-4 lg:hidden dark:bg-slate-800"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {isOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
      </motion.button>

      <button
        className="top-header-height absolute left-2 mt-2 invisible cursor-pointer rounded-2xl bg-white p-2 lg:visible"
        style={isOpen ? { display: "none" } : { display: "block" }}
        onClick={() => setIsOpen(true)}
      >
        <GoSidebarCollapse size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-sidebar w-sidebar-width top-header-height h-mobile-sidebar-height fixed left-2 z-40 my-4 flex transform flex-col space-y-2 rounded-2xl p-4 transition-transform duration-300 lg:min-h-[calc(100vh-var(--spacing-header-height)-2rem)] ${
          isOpen ? "translate-x-0" : "-translate-x-[110%]"
        }`}
      >
        <button
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <GoSidebarExpand size={24} />
        </button>
        <nav className="space-y-2">
          {Object.entries(groupedComponents).map(([type, components]) => (
            <div key={type}>
              <h3 className="border-b text-lg font-medium">{type}</h3>
              <div className="flex flex-col space-y-1 pt-1">
                {components.map((item) => (
                  <SidebarLink
                    key={item.name}
                    href={item.href}
                    name={item.name}
                    tag={item.tag}
                    onClick={() => setIsOpen(false)}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="w-full grow" />
        <nav className="flex flex-col space-y-2 lg:hidden">
          <h3 className="border-b text-lg font-medium">Navigation</h3>
          {navLinks.map((link) => (
            <div key={link.name} className="flex items-start space-y-0.5">
              <SidebarLink {...link} />
            </div>
          ))}
        </nav>
        {/* <ProfilePopover /> */}
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
