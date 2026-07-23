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
import { AgentTable } from "./agent-table";
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
      className={cn("docs-heading docs-heading-h1", className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      data-doc-heading
      className={cn("docs-heading docs-heading-h2", className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      data-doc-heading
      className={cn("docs-heading docs-heading-h3", className)}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      data-doc-heading
      className={cn("docs-heading docs-heading-h4", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("docs-list docs-list-unordered", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("docs-list docs-list-ordered", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={cn("docs-list-item", className)} {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="docs-table-scroll">
      <table className={cn("docs-table", className)} {...props} />
    </div>
  ),
  thead: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className={cn("docs-table-head", className)} {...props} />
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn("docs-table-row", className)} {...props} />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className={cn("docs-table-heading", className)} {...props} />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className={cn("docs-table-cell", className)} {...props} />
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <CustomLink className={cn("docs-link", className)} {...props} />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("docs-paragraph", className)} {...props} />
  ),
  blockquote: ({
    className,
    ...props
  }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className={cn("docs-blockquote", className)} {...props} />
  ),
  Divider: () => <div className="docs-divider" />,
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
  AgentTable,
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
                className={cn("docs-heading docs-heading-h1", headingClassName)}
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
        "docs-prose",
        headerActions && "lg:[&>h1]:pr-28",
        className,
      )}
      data-context="component-article"
    >
      <Component components={mdxComponents} />
    </article>
  );
}
