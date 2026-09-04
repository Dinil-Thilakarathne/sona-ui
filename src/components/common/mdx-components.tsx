import { useMDXComponent } from "@content-collections/mdx/react";
import Image from "next/image";
import Link from "@/components/common/link";
import { Children } from "react";
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
import { ComponentInstallationServer } from "./component-installation-server";
import ComponentPlayground from "./component-playground";
import { ComponentPreviewServer as ComponentPreview } from "./component-preview-server";
import ComponentWrapper from "./component-wrapper";
import PropTable from "./prop-table";
import Tabs from "./tabs";

function getHeadingId(children: React.ReactNode) {
  if (typeof children !== "string") return undefined;
  return children
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function ChangelogReleaseHeading({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  const releaseDate = Children.toArray(children)
    .filter((child): child is string => typeof child === "string")
    .map((child) => child.match(/\((\d{4}-\d{2}-\d{2})\)/)?.[1])
    .find(Boolean);

  return (
    <h2
      data-doc-heading
      className={cn(
        "docs-heading docs-heading-h2 changelog-release",
        className,
      )}
      {...props}
    >
      <span className="changelog-release-version">
        {Children.map(children, (child) =>
          typeof child === "string"
            ? child.replace(/\s*\(\d{4}-\d{2}-\d{2}\)/, "")
            : child,
        )}
      </span>
      {releaseDate && (
        <time className="changelog-release-date" dateTime={releaseDate}>
          {releaseDate}
        </time>
      )}
    </h2>
  );
}

function ChangelogHeading({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  const isRelease = Children.toArray(children).some(
    (child) => typeof child === "string" && /\(\d{4}-\d{2}-\d{2}\)/.test(child),
  );

  if (isRelease) {
    return (
      <ChangelogReleaseHeading className={className} {...props}>
        {children}
      </ChangelogReleaseHeading>
    );
  }

  return (
    <h1
      data-doc-heading
      className={cn("docs-heading docs-heading-h1", className)}
      {...props}
    >
      {children}
    </h1>
  );
}

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
  h2: ({
    className,
    id,
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      data-doc-heading
      id={id ?? getHeadingId(children)}
      className={cn("docs-heading docs-heading-h2", className)}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({
    className,
    id,
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      data-doc-heading
      id={id ?? getHeadingId(children)}
      className={cn("docs-heading docs-heading-h3", className)}
      {...props}
    >
      {children}
    </h3>
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
  Divider: () => <div className="docs-divider h-0!" />,
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
  sourceFiles?: Record<string, string>;
}

export function Mdx({
  code,
  className,
  headerActions,
  mobileHeaderContent,
  sourceFiles,
}: MDXProps) {
  const Component = useMDXComponent(code);
  const isChangelog = className?.includes("docs-changelog-prose");
  const mdxComponents = {
    ...components,
    ...(isChangelog
      ? { h1: ChangelogHeading, h2: ChangelogReleaseHeading }
      : {}),
    SourceCode: ({
      source,
      filename,
      language = "typescript",
    }: {
      source: string;
      filename?: string;
      language?: string;
    }) => (
      <InternalCodeBlock
        code={
          sourceFiles?.[source] ??
          `// Source unavailable for documentation key: ${source}`
        }
        filename={filename}
        language={language}
      />
    ),
    ...(headerActions || mobileHeaderContent
      ? {
          h1: ({
            className: headingClassName,
            children,
            ...headingProps
          }: React.HTMLAttributes<HTMLHeadingElement>) => {
            const isRelease =
              isChangelog &&
              Children.toArray(children).some(
                (child) =>
                  typeof child === "string" &&
                  /\(\d{4}-\d{2}-\d{2}\)/.test(child),
              );

            if (isRelease) {
              return (
                <ChangelogReleaseHeading
                  className={headingClassName}
                  {...headingProps}
                >
                  {children}
                </ChangelogReleaseHeading>
              );
            }

            return (
              <>
                <h1
                  data-doc-heading
                  className={cn(
                    "docs-heading docs-heading-h1",
                    headingClassName,
                  )}
                  {...headingProps}
                >
                  {children}
                </h1>
                <div className="flex flex-col gap-4 md:pt-4 mobile:mb-2 lg:absolute lg:top-0 lg:right-0 lg:block lg:pt-0">
                  {headerActions}
                  {mobileHeaderContent && (
                    <div className="lg:hidden">{mobileHeaderContent}</div>
                  )}
                </div>
              </>
            );
          },
        }
      : {}),
  };

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
