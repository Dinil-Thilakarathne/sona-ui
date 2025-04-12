import React from "react";

interface SidebarProps {
  title: string;
  items: { name: string; href: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ title, items }) => {
  return (
    <aside className="w-64 border-r border-gray-200 p-4">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">{title}</h2>
      <nav className="space-y-2">
        {items.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="block font-medium text-gray-700 hover:text-gray-900"
          >
            {item.name}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
