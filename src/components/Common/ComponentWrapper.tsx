"use client";

import React from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";

interface ComponentWrapperProps {
  componentPath: string;
  className?: string;
}

const ComponentWrapper: React.FC<ComponentWrapperProps> = ({
  componentPath,
  className,
}) => {
  const DynamicComponent = dynamic(() => import(`@/${componentPath}`), {
    ssr: false,
  });

  return (
    <div className={clsx("rounded-lg bg-white p-4 shadow md:p-6", className)}>
      <DynamicComponent />
    </div>
  );
};

export default ComponentWrapper;
