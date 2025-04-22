"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

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
    <div className={cn("", className)}>
      <div className="flex max-w-[calc(100vw-16px)] overflow-auto border-b md:max-w-[auto] md:space-x-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={cn(
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
