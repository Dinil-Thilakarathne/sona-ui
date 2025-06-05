import { type ReactNode } from "react";

import Sidebar from "@/components/ComponentsSidebar";
import { sortedComponentNavigationLinks } from "@/config/components";

const ComponentLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="flex min-h-[calc(100vh-75px)]">
      <Sidebar title="Components" items={sortedComponentNavigationLinks} />
      <section className="w-full flex-1 p-2 md:p-6">{children}</section>
    </main>
  );
};

export default ComponentLayout;
