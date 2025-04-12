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
    <div className={clsx("rounded-lg bg-white p-4 shadow-lg border  md:p-6", className)}>
      {children}
    </div>
  );
};

export default ComponentWrapper;
