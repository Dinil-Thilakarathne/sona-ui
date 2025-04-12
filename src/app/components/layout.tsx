import React from "react";
import Sidebar from "@/components/ComponentsSidebar";
import { ComponentSidebarItems } from "@/libs/data";

const ComponentLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-75px)]">
      <Sidebar title="Components" items={ComponentSidebarItems} />
      <main className="flex-1 p-2 md:p-6">{children}</main>
    </div>
  );
};

export default ComponentLayout;
