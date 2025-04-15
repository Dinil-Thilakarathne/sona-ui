"use client";

import React from "react";
import clsx from "clsx";

interface ComponentWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const ComponentWrapper: React.FC<ComponentWrapperProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={clsx(
        "xs:w-full w-[calc(100vw-16px)] overflow-clip rounded-lg border bg-white p-4 shadow-lg sm:w-full md:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ComponentWrapper;
