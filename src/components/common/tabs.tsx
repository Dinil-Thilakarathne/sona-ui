"use client";

import { motion } from "motion/react";
import { useId, useState, type ReactNode } from "react";
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

  const tabId = useId();

  return (
    <div className={cn("flex flex-col gap-y-4 py-2", className)}>
      <div className="bg-secondary max-w-[calc(100vw-16px) relative flex w-fit overflow-auto rounded-xl p-1 md:max-w-[auto] md:space-x-2">
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
                className="bg-background/90 absolute inset-0 h-full w-full rounded-lg border-2"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 block px-4 py-2">{tab.title}</span>
          </Button>
        ))}
      </div>
      <div className="tabs-content">{tabs[activeTab]?.content}</div>
    </div>
  );
};

export default Tabs;
