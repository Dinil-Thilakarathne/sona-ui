import { type ReactNode } from "react";

import Sidebar from "@/components/ComponentsSidebar";
import { componentNavigationLinks } from "@/config/components";

const ComponentLayout: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-75px)]">
      <Sidebar title="Components" items={componentNavigationLinks} />
      <main className="w-full flex-1 p-2 md:p-6">{children}</main>
    </div>
  );
};

export default ComponentLayout;
