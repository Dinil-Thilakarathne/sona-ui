import { type ReactNode } from "react";

import Sidebar from "@/components/ComponentsSidebar";

const ComponentLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="min-h-[calc(100vh-75px) grid grid-cols-1 lg:grid-cols-[25%_1fr] xl:grid-cols-[var(--sidebar-width)_1fr]">
      <Sidebar />
      <section className="w-full flex-1 p-2 md:p-6">{children}</section>
    </main>
  );
};

export default ComponentLayout;
