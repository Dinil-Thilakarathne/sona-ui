import Link, { type LinkProps } from "next/link";
import StaggerText from "./StaggerText";
import Tag from "./Tag";

import { cn } from "@/lib/utils";
import { NavLinksPropsType } from "@/lib/types";

interface NavLinkProps extends NavLinksPropsType, LinkProps {
  href: string;
}

const SidebarLink = ({ name, tag, href, ...props }: NavLinkProps) => {
  const isDisabled = tag === "soon";

  return isDisabled ? (
    <div className="flex cursor-not-allowed items-start space-x-0.5">
      <StaggerText text={name} as="h3" className="text-lg font-medium" />
      {tag && <Tag text={tag} type={tag} className="px-1 py-0 text-xs" />}
    </div>
  ) : (
    <Link className={cn("flex items-start space-x-0.5")} href={href} {...props}>
      <StaggerText text={name} as="h3" className="text-md font-medium" />
      {tag && <Tag text={tag} type={tag} className="px-1 py-0 text-xs" />}
    </Link>
  );
};

export default SidebarLink;
