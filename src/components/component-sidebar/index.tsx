"use client";

import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";

import SidebarLink from "../common/sidebar-link";
import { navLinks } from "@/lib/data";
import { groupedComponents } from "@/config/components";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useScrollLock } from "usehooks-ts";

type SidebarProps = {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  isOpen: controlledIsOpen,
  onOpenChange,
}) => {
  const pathname = usePathname();

  const { lock, unlock } = useScrollLock({
    autoLock: false,
    lockTarget: "#scrollable",
  });

  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  const setIsOpen = (next: boolean) => {
    if (isDesktop && !next) {
      return;
    }
    if (!isControlled) {
      setUncontrolledIsOpen(next);
    }
    onOpenChange?.(next);
    if (!isDesktop) {
      if (next) {
        lock();
      } else {
        unlock();
      }
    }
  };

  useEffect(() => {
    if (isControlled || !isDesktop) return;
    setUncontrolledIsOpen(true);
  }, [isControlled, isDesktop]);

  const closeSidebarOnMobile = () => {
    if (!isDesktop) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Menu Icon for Mobile */}
      <motion.button
        className=" bg-background/20 backdrop-blur fixed right-4 bottom-4 z-50 block rounded-full p-4 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {isOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
      </motion.button>

      {/* Sidebar */}
      <aside
        className={`bg-sidebar w-sidebar-width top-header-height h-mobile-sidebar-height fixed left-2 z-40 my-4 flex transform flex-col space-y-2 overflow-y-scroll rounded-lg border p-4 transition-transform duration-300 lg:min-h-[calc(100vh-var(--spacing-header-height)-2rem)] lg:rounded-lg ${
          isOpen ? "translate-x-0" : "-translate-x-[110%]"
        }`}
      >
        <nav className="flex flex-col gap-y-4">
          {Object.entries(groupedComponents).map(([type, components]) => (
            <div key={type} className="flex flex-col gap-y-1 py-2">
              <h3 className="text-foreground font-medium">{type}</h3>
              <div className="flex flex-col gap-y-1">
                {components.map((item) => (
                  <SidebarLink
                    key={item.name}
                    href={item.href}
                    name={item.name}
                    tag={item.tag}
                    onClick={closeSidebarOnMobile}
                    textClassName={
                      pathname === item.href ? "text-foreground" : ""
                    }
                    data-active={pathname === item.href}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="w-full grow" />
        <nav className="flex flex-col space-y-2 lg:hidden">
          <h3 className="font-medium">Navigation</h3>
          {navLinks.map((link) => (
            <div key={link.name} className="flex items-start space-y-0.5">
              <SidebarLink {...link} onClick={closeSidebarOnMobile} />
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
