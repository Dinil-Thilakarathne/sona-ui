"use client";

import { type ReactNode } from "react";
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
        "xs:w-full bg-primary-foreground flex w-[calc(100vw-16px)] items-center justify-center overflow-clip rounded-lg border p-4 shadow-lg sm:w-full md:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ComponentWrapper;
