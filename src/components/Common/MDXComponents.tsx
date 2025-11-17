import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useMDXComponent } from "@content-collections/mdx/react";
import { CodeSyntaxHighlighter } from "./CodeSyntaxHighlighter";
import ComponentWrapper from "./ComponentWrapper";
import Tabs from "./Tabs";
import ComponentPreview from "./ComponentPreview";
import PropTable from "./PropTable";

const CustomLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const href = props.href;

  if (href?.startsWith("/")) {
    return (
      <Link {...props} href={href}>
        {props.children}
      </Link>
    );
  }

  if (href?.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const components = {
  Image,
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "font-heading mt-2 scroll-m-20 text-2xl font-bold lg:text-4xl",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "font-heading  mt-12 scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0 lg:text-2xl",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "font-heading mt-8 scroll-m-20 pb-2 text-lg font-semibold tracking-tight lg:text-xl",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto">
      <table
        className={cn("border-border w-full border-collapse border", className)}
        {...props}
      />
    </div>
  ),
  thead: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className={cn("bg-gray-100", className)} {...props} />
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn("border-b border-gray-300", className)} {...props} />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn("px-4 py-2 text-left font-medium", className)}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className={cn("px-4 py-2", className)} {...props} />
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <CustomLink
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("text-sm md:text-base", className)} {...props} />
  ),
  Divider: () => <div className="w-full py-8" />,
  CodeSyntaxHighlighter,
  ComponentWrapper,
  Tabs,
  ComponentPreview,
  PropTable,
};

interface MDXProps {
  code: string;
  className?: string;
}

export function Mdx({ code, className }: MDXProps) {
  const Component = useMDXComponent(code);

  return (
    <article className={cn("mx-auto max-w-[120ch]", className)}>
      <Component components={components} />
    </article>
  );
}
