import { type ReactNode } from "react";

import Sidebar from "@/components/ComponentsSidebar";

const ComponentLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="min-h-[calc(100vh-75px) mt-header-height flex">
      <Sidebar />
      <section className="lg:ml-sidebar-width w-full flex-1 p-2 md:p-6">
        {children}
      </section>
    </main>
  );
};

export default ComponentLayout;
