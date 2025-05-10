"use client";

import { ButtonHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: "default" | "outline" | "filled";
  link?: string;
}

export default function Button({
  children,
  className,
  variant = "default",
  link,
  ...props
}: ButtonProps) {
  const baseClasses =
    "px-4 py-2 rounded-full text-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 hover:cursor-pointer transition duration-200 ease-in-out";

  const variantClasses = {
    default: "bg-white text-black hover:bg-slate-100",
    outline: "border border-gray-300 text-black hover:bg-gray-100",
    filled: "bg-blue-500 text-white hover:bg-blue-600",
  };

  if (link) {
    return (
      <Link
        href={link}
        className={cn(baseClasses, variantClasses[variant], className)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
