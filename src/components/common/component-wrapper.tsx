"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ComponentWrapperProps {
  children: ReactNode;
  className?: string;
}

const ComponentWrapper: React.FC<ComponentWrapperProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex min-h-[350px] w-full items-center justify-center overflow-clip rounded-xl border bg-secondary p-4 shadow-xs md:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ComponentWrapper;
