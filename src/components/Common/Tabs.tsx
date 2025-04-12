"use client";

import React, { useState } from "react";
import clsx from "clsx";

interface Tab {
  title: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, className }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={clsx("tabs-container", className)}>
      <div className="tabs-header flex space-x-4 border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={clsx(
              "px-4 py-2",
              activeTab === index
                ? "border-b-2 border-blue-500"
                : "text-gray-500",
            )}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tabs-content mt-4">{tabs[activeTab]?.content}</div>
    </div>
  );
};

export default Tabs;
