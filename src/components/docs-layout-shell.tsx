"use client";

import type { ReactNode } from "react";

import Sidebar from "@/components/component-sidebar";

const DocsLayoutShell: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="flex mt-header-height min-h-[calc(100vh-75px)]">
      <Sidebar />
      <section className="flex-1 p-2 md:p-6 xl:ml-sidebar-width w-full xl:max-w-[calc(100%-var(--sidebar-width))] duration-300 transition-[margin]">
        {children}
      </section>
    </main>
  );
};

export default DocsLayoutShell;
