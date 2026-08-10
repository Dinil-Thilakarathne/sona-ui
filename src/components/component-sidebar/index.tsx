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
import {
  componentNavigationLinks,
  groupedComponents,
} from "@/config/components";
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
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-medium text-sm">Browse</h2>
        <span className="font-mono text-[10px] text-muted-foreground">
          {componentNavigationLinks.length}
        </span>
      </div>
      <nav className="flex flex-col" aria-label="Documentation categories">
        {Object.entries(groupedComponents).map(([type, components]) => (
          <section key={type} className="mb-5">
            <h3 className="mb-1.5 font-mono text-[10px] text-muted-foreground tracking-[0.16em] uppercase">
              {type}
            </h3>
            <div className="flex flex-col gap-y-0.5">
              {components.map((item) => (
                <SidebarLink
                  key={item.name}
                  href={item.href}
                  name={item.name}
                  tag={item.tag}
                  onClick={onLinkClick}
                  showIndicator={false}
                  className="rounded-md px-3 py-1.5 transition-colors duration-150 ease-out hover:bg-muted/60 data-[active=true]:bg-muted/60"
                  textClassName={
                    pathname === item.href ? "text-foreground font-medium" : ""
                  }
                  data-active={pathname === item.href}
                />
              ))}
            </div>
          </section>
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
  const isDesktop = useMediaQuery("(min-width: 1280px)");
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
      <aside className="hidden xl:flex overflow-y-auto overscroll-none fixed left-2 top-header-height z-40 flex-col my-4 p-4 space-y-2 h-[calc(100svh-var(--spacing-header-height)-2rem)] w-[min(var(--sidebar-width),100%)] bg-sidebar rounded-lg">
        <SidebarContent pathname={pathname} onLinkClick={() => {}} />
      </aside>

      {/* Mobile Sidebar (Sheet component overlay) */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger
          render={
            <motion.button
              className="block xl:hidden fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] z-50 p-4 bg-background/90 rounded-full smooth-shadow-ring-lg backdrop-blur"
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              aria-label={
                isOpen
                  ? "Close documentation navigation"
                  : "Open documentation navigation"
              }
              aria-expanded={isOpen}
            >
              {isOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
            </motion.button>
          }
        />
        <SheetContent
          side="left"
          className="flex  flex-col p-4 h-full min-h-dvh  max-w-sidebar-width w-sidebar-width bg-sidebar  rounded-r-lg"
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
