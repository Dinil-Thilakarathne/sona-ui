import React from "react";
import Tag from "./Tag";
import { cn } from "@/libs/utils";

interface LogoProps {
  className?: string;
  showVersion?: boolean;
  version?: string;
}

const Logo = ({ className, showVersion, version }: LogoProps) => {
  return (
    <div role="presentation" className="flex items-center gap-2">
      <h1 className={cn("text-2xl font-bold", className)}>Sona UI</h1>
      {showVersion && version && (
        <Tag text={version} type="default" className="text-xs" />
      )}
    </div>
  );
};

export default Logo;
