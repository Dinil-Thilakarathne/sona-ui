import React from "react";

import Link, { LinkProps } from "next/link";
import StaggerText from "./StaggerText";
import Tag from "./Tag";

import { cn } from "@/lib/utils";
import { ComponentItemsProps } from "@/lib/types";

interface SidebarLinkProps extends LinkProps, ComponentItemsProps {
  href: string;
  className?: string;
}

const SidebarLink = ({ name, tag, className, ...props }: SidebarLinkProps) => {
  const isDisabled = tag === "soon";

  return isDisabled ? (
    <div
      className={cn(
        "flex cursor-not-allowed items-start space-x-0.5",
        className,
      )}
    >
      <StaggerText text={name} As="h3" className="text-lg font-medium" />
      {tag && <Tag text={tag} type={tag} className="px-1 py-0 text-xs" />}
    </div>
  ) : (
    <Link {...props} className={cn("flex items-start space-x-0.5", className)}>
      <StaggerText text={name} As="h3" className="text-lg font-medium" />
      {tag && <Tag text={tag} type={tag} className="px-1 py-0 text-xs" />}
    </Link>
  );
};

export default SidebarLink;
