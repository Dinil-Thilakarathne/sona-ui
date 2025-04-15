import React from "react";

import { cn } from "@/libs/utils";

interface TagProps {
  text: string;
  type?: "new" | "soon" | "featured" | "default";
  className?: string;
}

const Tag: React.FC<TagProps> = ({ text, type = "default", className }) => {
  const baseClasses =
    "inline-flex items-center px-2 py-0.5 rounded-full text-sm ";

  const typeClasses = {
    new: "bg-green-200 text-green-800",
    soon: "bg-yellow-200 text-yellow-800",
    featured: "bg-blue-200 text-blue-800",
    default: "bg-white text-gray-800",
  };

  return (
    <span className={cn(baseClasses, typeClasses[type], className)}>
      {text}
    </span>
  );
};

export default Tag;
