"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@base-ui/react/button";

interface Tab {
  title: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, className }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={cn("py-2", className)}>
      <div className="flex max-w-[calc(100vw-16px)] overflow-auto md:max-w-[auto] md:space-x-4">
        {tabs.map((tab, index) => (
          <Button
            key={index}
            className={cn(
              "hover:bg-secondary/80 cursor-pointer rounded-lg px-4 py-2",
              activeTab === index ? "bg-secondary" : "text-gray-500",
            )}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </Button>
        ))}
      </div>
      <div className="tabs-content">{tabs[activeTab]?.content}</div>
    </div>
  );
};

export default Tabs;
