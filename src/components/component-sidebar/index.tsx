"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/common/sheet";
import { groupedComponents } from "@/config/components";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { navLinks } from "@/lib/data";
import SidebarLink from "../common/sidebar-link";

type SidebarProps = {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const SidebarContent: React.FC<{
  pathname: string;
  onLinkClick: () => void;
}> = ({ pathname, onLinkClick }) => {
  return (
    <>
      <nav className="flex flex-col gap-y-4">
        {Object.entries(groupedComponents).map(([type, components]) => (
          <div key={type} className="flex flex-col gap-y-1 py-2">
            <h3 className="text-foreground/90 font-semibold text-xs tracking-wider uppercase mb-1">
              {type}
            </h3>
            <div className="flex flex-col gap-y-1">
              {components.map((item) => (
                <SidebarLink
                  key={item.name}
                  href={item.href}
                  name={item.name}
                  tag={item.tag}
                  onClick={onLinkClick}
                  textClassName={
                    pathname === item.href ? "text-foreground font-medium" : ""
                  }
                  data-active={pathname === item.href}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="w-full grow" />
      <nav className="flex flex-col space-y-2 lg:hidden mt-6 pt-6 border-t border-sidebar-border">
        <h3 className="text-foreground/90 font-semibold text-xs tracking-wider uppercase px-2 mb-1">
          Navigation
        </h3>
        {navLinks.map((link) => (
          <div key={link.name} className="flex items-start space-y-0.5">
            <SidebarLink {...link} onClick={onLinkClick} />
          </div>
        ))}
      </nav>
    </>
  );
};

const Sidebar: React.FC<SidebarProps> = ({
  isOpen: controlledIsOpen,
  onOpenChange,
}) => {
  const pathname = usePathname();
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
  };

  useEffect(() => {
    if (isDesktop && !isControlled && uncontrolledIsOpen) {
      setUncontrolledIsOpen(false);
    }
  }, [isDesktop, isControlled, uncontrolledIsOpen]);

  const closeSidebarOnMobile = () => {
    if (!isDesktop) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Sidebar (Persistent layout sidebar) */}
      <aside className="bg-sidebar w-sidebar-width top-header-height fixed left-2 z-40 my-4 hidden lg:flex flex-col space-y-2 overflow-y-auto overscroll-none rounded-lg border p-4 h-[calc(100svh-var(--spacing-header-height)-2rem)]">
        <SidebarContent pathname={pathname} onLinkClick={() => {}} />
      </aside>

      {/* Mobile Sidebar (Sheet component overlay) */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger
          render={
            <motion.button
              className="bg-background/20 fixed right-4 bottom-4 z-50 block  rounded-full p-4 backdrop-blur lg:hidden border border-border shadow-lg"
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              aria-label="Toggle menu"
            >
              {isOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
            </motion.button>
          }
        />
        <SheetContent
          side="left"
          className="w-sidebar-width max-w-sidebar-width bg-sidebar border p-4 h-full max-h-[calc(100dvh-var(--spacing-header-height)-2rem)] flex flex-col rounded-lg top-[calc(var(--spacing-header-height)+1rem)]! left-2!"
          showCloseButton={false}
        >
          <div className="sr-only">
            <SheetTitle>Documentation Navigation</SheetTitle>
            <SheetDescription>
              Browse categories and components
            </SheetDescription>
          </div>
          <div className="flex flex-col h-full overflow-y-auto overscroll-none pr-1">
            <SidebarContent
              pathname={pathname}
              onLinkClick={closeSidebarOnMobile}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
