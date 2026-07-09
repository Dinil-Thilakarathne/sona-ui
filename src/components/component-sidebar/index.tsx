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
            <h3 className="mb-1 font-semibold text-foreground/90 text-xs tracking-wider uppercase">
              {type}
            </h3>
            <div className="flex flex-col gap-y-2">
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
      <div className="grow w-full" />
      <nav className="flex lg:hidden flex-col mt-6 pt-6 space-y-2 border-sidebar-border border-t">
        <h3 className="mb-1 px-2 font-semibold text-foreground/90 text-xs tracking-wider uppercase">
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
      <aside className="hidden lg:flex overflow-y-auto overscroll-none fixed left-2 top-header-height z-40 flex-col my-4 p-4 space-y-2 h-[calc(100svh-var(--spacing-header-height)-2rem)] w-sidebar-width bg-sidebar rounded-lg">
        <SidebarContent pathname={pathname} onLinkClick={() => {}} />
      </aside>

      {/* Mobile Sidebar (Sheet component overlay) */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger
          render={
            <motion.button
              className="block lg:hidden fixed bottom-4 right-4 z-50 p-4 bg-background/20 border border-border rounded-full shadow-lg backdrop-blur"
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              aria-label="Toggle menu"
            >
              {isOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
            </motion.button>
          }
        />
        <SheetContent
          side="left"
          className="flex left-2! top-[calc(var(--spacing-header-height)+1rem)]! flex-col p-4 h-full max-h-[calc(100dvh-var(--spacing-header-height)-2rem)] max-w-sidebar-width w-sidebar-width bg-sidebar border rounded-lg"
          showCloseButton={false}
        >
          <div className="sr-only">
            <SheetTitle>Documentation Navigation</SheetTitle>
            <SheetDescription>
              Browse categories and components
            </SheetDescription>
          </div>
          <div className="flex overflow-y-auto overscroll-none flex-col pr-1 h-full">
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
