"use client";

import { type ReactNode, useEffect, useState } from "react";

import Sidebar from "@/components/ComponentsSidebar";

const DocsLayoutShell: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(true);
    }
  }, []);

  return (
    <main className="mt-header-height flex min-h-[calc(100vh-75px)]">
      <Sidebar isOpen={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <section
        className={`w-full flex-1 p-2 transition-[margin] duration-300 md:p-6 ${
          isSidebarOpen ? "lg:ml-sidebar-width" : "lg:ml-0"
        }`}
      >
        {children}
      </section>
    </main>
  );
};

export default DocsLayoutShell;
