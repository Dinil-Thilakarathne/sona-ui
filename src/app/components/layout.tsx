import React from "react";
import Sidebar from "@/components/ComponentsSidebar";

const ComponentLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const sidebarItems = [
    { name: "Button", href: "/components/button" },
    { name: "Tag", href: "/components/tag" },
    { name: "Header", href: "/components/header" },
    { name: "Hero", href: "/components/hero" },
  ];

  return (
    <div className="container mx-auto flex min-h-screen">
      <Sidebar title="Components" items={sidebarItems} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default ComponentLayout;
