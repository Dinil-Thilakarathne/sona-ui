import React from "react";
import Tag from "./Tag";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showVersion?: boolean;
  version?: string;
}

const Logo = ({ className, showVersion, version }: LogoProps) => {
  return (
    <div role="presentation" className="flex items-center gap-2">
      <h1 className={cn("text-lg font-bold md:text-2xl", className)}>
        Sona UI
      </h1>
      {showVersion && version && (
        <Tag text={version} type="default" className="md:text-xs" />
      )}
    </div>
  );
};

export default Logo;
