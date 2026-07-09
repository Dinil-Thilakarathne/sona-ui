"use client";

import { Button } from "@base-ui/react/button";
import { motion } from "motion/react";
import { type ReactNode, useId, useState } from "react";
import { cn } from "@/lib/utils";

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

  const tabId = useId();

  return (
    <div className={cn("flex flex-col gap-y-4 py-2", className)}>
      <div className="flex overflow-auto relative p-1 md:space-x-2 max-w-[calc(100vw-16px) w-fit md:max-w-[auto] bg-secondary rounded-xl">
        {tabs.map((tab, index) => (
          <Button
            key={index}
            className={cn("relative cursor-pointer rounded-lg")}
            onClick={() => setActiveTab(index)}
            data-active={activeTab === index}
          >
            {activeTab === index && (
              <motion.div
                layoutId={`active-tab-${tabId}`}
                className="absolute inset-0 h-full w-full bg-background/90 border-2 rounded-lg"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="block relative z-10 px-4 py-2">{tab.title}</span>
          </Button>
        ))}
      </div>
      <div className="tabs-content">{tabs[activeTab]?.content}</div>
    </div>
  );
};

export default Tabs;
