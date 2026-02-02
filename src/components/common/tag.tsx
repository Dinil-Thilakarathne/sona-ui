import { cn } from "@/lib/utils";
import type { TagPropsType } from "@/lib/types";

const Tag: React.FC<TagPropsType> = ({ text, type = "default", className }) => {
  const baseClasses =
    "inline-flex items-center px-2 py-0.5 rounded-full text-sm ";

  const typeClasses = {
    new: "bg-green-200 text-green-800 dark:bg-green-300 dark:text-green-950",
    soon: "bg-yellow-200 text-yellow-800 dark:bg-yellow-300 dark:text-yellow-950",
    updated:
      "bg-purple-200 text-purple-800 dark:bg-purple-300 dark:text-purple-950",
    featured: "bg-blue-200 text-blue-800 dark:bg-blue-300 dark:text-blue-950",
    default: "bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  };

  const typeClass =
    typeClasses[type as keyof typeof typeClasses] || typeClasses.default;

  return <span className={cn(baseClasses, typeClass, className)}>{text}</span>;
};


export default Tag;
