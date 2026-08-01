import Link, { type LinkProps } from "next/link";
import type { NavLinksPropsType } from "@/lib/types";
import { cn } from "@/lib/utils";
import Tag from "./tag";

interface NavLinkProps extends NavLinksPropsType, LinkProps {
  className?: string;
  href: string;
  textClassName?: string;
}

const SidebarLink = ({
  name,
  tag,
  href,
  className,
  textClassName,
  ...props
}: NavLinkProps) => {
  const isDisabled = tag === "soon";
  return isDisabled ? (
    <div
      className={cn(
        "flex relative items-start space-x-0.5 cursor-not-allowed group",
        className,
      )}
    >
      <h3 className={cn("text-muted-foreground text-sm", textClassName)}>
        {name}
      </h3>
      {tag && <Tag text={tag} type={tag} className="px-1 py-0" />}
      <div className="absolute left-0 h-[0.75px] w-full bg-foreground rounded-full duration-100 ease-out transition-transform motion-reduce:transition-none origin-left scale-x-0 group-data-[active=true]:scale-x-100 group-hover:scale-x-100 -bottom-0.5"></div>
    </div>
  ) : (
    <Link
      className={cn("group relative flex items-start space-x-0.5", className)}
      href={href}
      {...props}
    >
      <h3
        className={cn(
          "text-muted-foreground text-sm group-hover:text-foreground",
          textClassName,
        )}
      >
        {name}
      </h3>
      {tag && <Tag text={tag} type={tag} className="px-1 py-0 text-tiny" />}
      <div className="absolute left-0 h-[0.75px] w-full bg-foreground rounded-full duration-150 ease-out transition-transform motion-reduce:transition-none origin-left scale-x-0 group-data-[active=true]:scale-x-100 group-hover:scale-x-100 -bottom-0.5"></div>
    </Link>
  );
};

export default SidebarLink;
