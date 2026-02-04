"use client";

import { type ReactNode } from "react";

import Sidebar from "@/components/component-sidebar";

const DocsLayoutShell: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="mt-header-height flex min-h-[calc(100vh-75px)]">
      <Sidebar />
      <section className="lg:ml-sidebar-width w-full flex-1 p-2 transition-[margin] duration-300 md:p-6">
        {children}
      </section>
    </main>
  );
};

export default DocsLayoutShell;
