import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AnimatedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "default" | "outline" | "filled";
  className?: string;
  children: ReactNode;
}

export default function AnimatedLink({
  href,
  variant = "default",
  className = "",
  children,
  ...props
}: AnimatedLinkProps) {
  const baseClasses =
    "px-4 py-2 rounded-full text-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 hover:cursor-pointer transition duration-200 ease-in-out";

  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    outline: "border border-gray-300 text-black hover:bg-secondary/20",
    filled: "bg-blue-500 text-white hover:bg-blue-600",
  };

  return (
    <Link
      href={href}
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
