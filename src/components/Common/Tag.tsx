import React from "react";

import { cn } from "@/lib/utils";
import { TagProps } from "@/lib/types";

const Tag: React.FC<TagProps> = ({ text, type = "default", className }) => {
  const baseClasses =
    "inline-flex items-center px-2 py-0.5 rounded-full text-sm ";

    const typeClasses = {
      new: "bg-green-200 text-green-800",
      soon: "bg-yellow-200 text-yellow-800",
      updated: "bg-purple-200 text-purple-800",
      featured: "bg-blue-200 text-blue-800",
      default: "bg-white text-gray-800",
    };

    const typeClass = typeClasses[type as keyof typeof typeClasses] || typeClasses.default;

  return (
    <span className={cn(baseClasses, typeClass, className)}>
      {text}
    </span>
  );
};

export default Tag;
