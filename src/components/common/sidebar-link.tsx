import Link, { type LinkProps } from "next/link";
import StaggerText from "./stagger-text";
import Tag from "./tag";

import { cn } from "@/lib/utils";
import { NavLinksPropsType } from "@/lib/types";

interface NavLinkProps extends NavLinksPropsType, LinkProps {
  href: string;
  textClassName?: string;
}

const SidebarLink = ({
  name,
  tag,
  href,
  textClassName,
  ...props
}: NavLinkProps) => {
  const isDisabled = tag === "soon";
  return isDisabled ? (
    <div className="group relative flex cursor-not-allowed items-start space-x-0.5">
      <h3 className={cn("text-muted-foreground text-sm", textClassName)}>
        {name}
      </h3>
      {tag && <Tag text={tag} type={tag} className="px-1 py-0 text-xs" />}
      <div className="bg-foreground absolute -bottom-0.5 left-0 h-0.5 w-0 transition-[width] duration-300 group-hover:w-full group-data-[active=true]:w-full"></div>
    </div>
  ) : (
    <Link
      className={cn("group relative flex items-start space-x-0.5")}
      href={href}
      {...props}
    >
      <h3
        className={cn(
          "text-muted-foreground group-hover:text-foreground text-sm",
          textClassName,
        )}
      >
        {name}
      </h3>
      {tag && <Tag text={tag} type={tag} className="px-1 py-0 text-xs" />}
      <div className="bg-foreground absolute -bottom-0.5 left-0 h-0.5 w-0 transition-[width] duration-300 group-hover:w-full group-data-[active=true]:w-full"></div>
    </Link>
  );
};

export default SidebarLink;
