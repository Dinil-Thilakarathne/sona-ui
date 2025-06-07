"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  className?: string;
  variant?: "default" | "outline" | "filled";
  href?: string;
}

export default function Button({
  children,
  className,
  variant = "default",
  href,
  ...props
}: ButtonProps) {
  const baseClasses =
    "px-4 py-2 rounded-full text-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 hover:cursor-pointer transition duration-200 ease-in-out";

  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    outline: "border border-gray-300 text-black hover:bg-secondary/20",
    filled: "bg-blue-500 text-white hover:bg-blue-600",
  };

  if (href) {
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

  return (
    <button className={cn(baseClasses, variantClasses[variant], className)}>
      {children}
    </button>
  );
}
