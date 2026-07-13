import { useMDXComponent } from "@content-collections/mdx/react";
import Image from "next/image";
import Link from "next/link";
import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockHeader,
  CodeBlockLineNumbers,
  CodeBlockPre,
} from "@/components/code-block/code-block";
import { InternalCodeBlock } from "@/components/code-block/internal-code-block";
import {
  Tabs as NewTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/tabs/tabs";
import { cn } from "@/lib/utils";
import { DesignTokenReference } from "../design-token/design-token-reference";
import { ComponentUsageServer } from "../usage/component-usage-server";
import { CodeSyntaxHighlighter } from "./code-syntax-highlighter";
import { ComponentInstallationServer } from "./component-installation-server";
import ComponentPlayground from "./component-playground";
import { ComponentPreviewServer as ComponentPreview } from "./component-preview-server";
import ComponentWrapper from "./component-wrapper";
import PropTable from "./prop-table";
import Tabs from "./tabs";

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
      data-doc-heading
      className={cn(
        "font-heading mt-2 scroll-m-20 text-2xl font-bold lg:text-4xl",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      data-doc-heading
      className={cn(
        "font-heading mt-12 scroll-m-20 border-b pb-2 mb-2 text-xl font-semibold tracking-tight first:mt-0 lg:text-2xl",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      data-doc-heading
      className={cn(
        "font-heading mt-8 scroll-m-20 pb-2 text-lg font-semibold tracking-tight lg:text-xl",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      data-doc-heading
      className={cn(
        "font-heading mt-6 scroll-m-20 text-base font-semibold tracking-tight lg:text-lg",
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
    <thead className={cn("bg-muted", className)} {...props} />
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn("border-b border-border", className)} {...props} />
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
    <p className={cn("text-sm leading-7 md:text-base", className)} {...props} />
  ),
  blockquote: ({
    className,
    ...props
  }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "border-border mt-6 border-l-2 pl-6 text-muted-foreground italic",
        className,
      )}
      {...props}
    />
  ),
  Divider: () => <div className="py-8 w-full" />,
  CodeSyntaxHighlighter,
  ComponentWrapper,
  Tabs,
  NewTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  CodeBlock,
  CodeBlockCode,
  CodeBlockHeader,
  CodeBlockLineNumbers,
  CodeBlockPre,
  ComponentPreview,
  ComponentPlayground,
  PropTable,
  ComponentInstallation: ComponentInstallationServer,

  ComponentUsage: ComponentUsageServer,
  CodeBlockWrapper: InternalCodeBlock,
  DesignTokenReference,
};

interface MDXProps {
  code: string;
  className?: string;
  headerActions?: React.ReactNode;
  mobileHeaderContent?: React.ReactNode;
}

export function Mdx({
  code,
  className,
  headerActions,
  mobileHeaderContent,
}: MDXProps) {
  const Component = useMDXComponent(code);
  const mdxComponents =
    headerActions || mobileHeaderContent
      ? {
          ...components,
          h1: ({
            className: headingClassName,
            ...props
          }: React.HTMLAttributes<HTMLHeadingElement>) => (
            <>
              <h1
                data-doc-heading
                className={cn(
                  "font-heading mt-2 scroll-m-20 text-2xl font-bold lg:text-4xl",
                  headingClassName,
                )}
                {...props}
              />
              <div className="flex flex-col gap-4 md:pt-4 mobile:mb-2 lg:absolute lg:top-0 lg:right-0 lg:block lg:pt-0">
                {headerActions}
                {mobileHeaderContent && (
                  <div className="lg:hidden">{mobileHeaderContent}</div>
                )}
              </div>
            </>
          ),
        }
      : components;

  return (
    <article
      className={cn(
        "docs-prose relative mx-auto max-w-[75ch]",
        headerActions && "lg:[&>h1]:pr-28",
        className,
      )}
      data-context="component-article"
    >
      <Component components={mdxComponents} />
    </article>
  );
}
