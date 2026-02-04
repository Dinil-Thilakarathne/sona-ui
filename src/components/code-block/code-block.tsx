"use client";

import {
  useLayoutEffect,
  useState,
  useMemo,
  ComponentType,
  createContext,
  useContext,
} from "react";
import * as React from "react";
import { Menu } from "@base-ui/react/menu";
import { ChevronDown, Check } from "lucide-react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "@/lib/utils";
import { Terminal } from "lucide-react";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
} from "@icons-pack/react-simple-icons";
import type { BundledLanguage } from "shiki/langs";
import { Tabs, TabsList, TabsTrigger } from "@/components/tabs/tabs";
import {
  ScrollArea,
  type FadeEdges,
} from "@/components/scroll-area/scroll-area";
import { highlight } from "./lib/shiki-shared";
import { stripDiffMarker } from "./lib/transformers/utils";
import { CopyButton } from "../copy-button/copy-button";

// Context for sharing code block state
interface CodeBlockContextValue {
  code: string;
  language: string;
  nodes: React.ReactElement | undefined;
  lines: string[];
  hasFocus: boolean;
  showDiff: boolean;
  floatingCopy: boolean;
}

const CodeBlockContext = createContext<CodeBlockContextValue | null>(null);

function useCodeBlock() {
  const context = useContext(CodeBlockContext);
  if (!context) {
    throw new Error(
      "CodeBlock subcomponents must be used within a CodeBlock component",
    );
  }
  return context;
}

// Language icon mapping
const LANGUAGE_ICONS: Record<
  string,
  ComponentType<{ size: number; className: string }>
> = {
  typescript: SiTypescript,
  ts: SiTypescript,
  tsx: SiTypescript,
  javascript: SiJavascript,
  js: SiJavascript,
  jsx: SiJavascript,
  bash: Terminal,
  sh: Terminal,
  shell: Terminal,
  python: SiPython,
  py: SiPython,
};

function getLanguageIcon(language: string) {
  const normalized = language.toLowerCase();
  const Icon = LANGUAGE_ICONS[normalized];

  if (Icon) {
    return <Icon size={16} className="text-muted-foreground" />;
  }

  return <span className="text-muted-foreground text-sm">{language}</span>;
}

// Root component
interface CodeBlockProps extends Omit<
  useRender.ComponentProps<"div">,
  "children"
> {
  code: string;
  language?: string;
  initial?: React.ReactElement;
  floatingCopy?: boolean;
  highlightLines?: number[] | string;
  showDiff?: boolean;
  focusLines?: number[] | string;
  children: React.ReactNode;
}

function CodeBlock({
  code,
  language = "javascript",
  initial,
  floatingCopy = false,
  highlightLines,
  showDiff,
  focusLines,
  className,
  render,
  children,
  ...props
}: CodeBlockProps) {
  const [nodes, setNodes] = useState(initial);

  // Track previous initial value to detect prop changes
  const [prevInitial, setPrevInitial] = useState(initial);

  // React 18+ pattern: update state during render when props change
  // This avoids synchronous setState in effects which causes cascading renders
  if (initial !== prevInitial) {
    setPrevInitial(initial);
    if (initial) {
      setNodes(initial);
    }
  }

  // Memoize line calculations
  const lines = useMemo(() => code.split("\n"), [code]);

  useLayoutEffect(() => {
    // Only run async highlighting when no pre-rendered content
    if (!initial) {
      const normalizedLanguage = (language as BundledLanguage) || "javascript";
      void highlight(code, normalizedLanguage, {
        highlightLines,
        showDiff,
        focusLines,
      }).then(setNodes);
    }
  }, [code, language, initial, highlightLines, showDiff, focusLines]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      language,
      code,
      nodes,
      lines,
      hasFocus: !!focusLines,
      showDiff: !!showDiff,
      floatingCopy,
    }),
    [language, code, nodes, lines, focusLines, showDiff, floatingCopy],
  );

  // Wrap children with context
  const content = (
    <CodeBlockContext.Provider value={contextValue}>
      {children}
    </CodeBlockContext.Provider>
  );

  const defaultProps = {
    "data-slot": "code-block",
    className: cn(
      "group bg-muted border border-border/60 max-w-full w-full rounded-xl p-1 pt-0 relative",
      // Restore top padding when there's no header
      "has-[[data-slot='code-block-pre']:first-child]:pt-1",
      className,
    ),
    children: content,
  };

  const element = useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(defaultProps, props),
  });

  return element;
}

// Header component
interface CodeBlockHeaderProps
  extends useRender.ComponentProps<"div">, Partial<BaseTabsProps> {
  filename?: string;
  tabVariant?: React.ComponentProps<typeof TabsList>["variant"];
  customIcon?: React.ReactNode;
  showCopy?: boolean;
}

function CodeBlockHeader({
  className,
  render,
  children,
  filename,
  tabs,
  activeTab,
  onTabChange,
  tabVariant,
  customIcon,
  showCopy = true,
  ...props
}: CodeBlockHeaderProps) {
  const context = useCodeBlock();
  const language = context.language;
  const code = context.code;

  // Auto-layout content (only used when children not provided)
  const startContent = (
    <div className="flex min-w-0 items-center gap-2">
      {language && (
        <CodeBlockLanguage language={language} customIcon={customIcon} />
      )}
      {filename && <CodeBlockFilename>{filename}</CodeBlockFilename>}
      {tabs && activeTab && onTabChange && (
        <CodeBlockTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={onTabChange}
          variant={tabVariant}
        />
      )}
    </div>
  );

  const endContent = showCopy && code && (
    <div className="flex items-center gap-2">
      <CopyButton data-slot="code-block-copy-button" content={code} />
    </div>
  );

  // Use custom children if provided, otherwise use auto-layout
  const content = children ?? (
    <>
      {startContent}
      {endContent}
    </>
  );

  const defaultProps = {
    "data-slot": "code-block-header",
    className: cn(
      "flex items-center justify-between bg-transparent px-3 py-3",
      className,
    ),
    children: content,
  };

  const element = useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(defaultProps, props),
  });

  return element;
}

// Language icon component
interface CodeBlockLanguageProps extends useRender.ComponentProps<"div"> {
  language: string;
  customIcon?: React.ReactNode;
}

function CodeBlockLanguage({
  language,
  customIcon,
  className,
  render,
  ...props
}: CodeBlockLanguageProps) {
  // Use custom icon if provided, otherwise get default language icon
  const icon = customIcon ?? getLanguageIcon(language);

  const defaultProps = {
    "data-slot": "code-block-language",
    className: cn("flex items-center gap-1.5", className),
    children: icon,
  };

  const element = useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(defaultProps, props),
  });

  return element;
}

// Filename component
type CodeBlockFilenameProps = useRender.ComponentProps<"span">;

function CodeBlockFilename({
  className,
  render,
  children,
  ...props
}: CodeBlockFilenameProps) {
  const defaultProps = {
    "data-slot": "code-block-filename",
    className: cn("text-sm font-medium", className),
    children,
  };

  const element = useRender({
    defaultTagName: "span",
    render,
    props: mergeProps<"span">(defaultProps, props),
  });

  return element;
}

// Tabs component
interface HeaderTab {
  value: string;
  label: string;
}

// Shared base type for tabs configuration
interface BaseTabsProps {
  tabs: HeaderTab[];
  activeTab: React.ComponentProps<typeof Tabs>["value"];
  onTabChange: React.ComponentProps<typeof Tabs>["onValueChange"];
}

interface CodeBlockTabsProps
  extends useRender.ComponentProps<"div">, BaseTabsProps {
  variant?: React.ComponentProps<typeof TabsList>["variant"];
}

function CodeBlockTabsMobileDropDown({
  tabs,
  activeTab,
  onTabChange,
}: BaseTabsProps) {
  const activeLabel = tabs.find((t) => t.value === activeTab)?.label;

  return (
    <div className="w-full md:hidden">
      <Menu.Root>
        <Menu.Trigger className="border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring data-[state=open]:border-ring flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50">
          <span>{activeLabel}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner
            align="start"
            sideOffset={4}
            className="z-50 w-(--anchor-width)"
          >
            <Menu.Popup className="bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-(--anchor-width) overflow-hidden rounded-md border p-1 shadow-md">
              {tabs.map((tab) => (
                <Menu.Item
                  key={tab.value}
                  className="focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50"
                  onClick={(e) => onTabChange?.(tab.value, e as any)}
                >
                  <span className="flex items-center gap-2">{tab.label}</span>
                  {tab.value === activeTab && (
                    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                </Menu.Item>
              ))}
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </div>
  );
}

function CodeBlockTabs({
  tabs,
  activeTab,
  onTabChange,
  variant = "capsule",
  className,
  render,
  ...props
}: CodeBlockTabsProps) {
  const tabsElement = (
    <>
      <div className="hidden md:flex">
        <Tabs value={activeTab} onValueChange={onTabChange} className="gap-1">
          <div className="scrollbar-hide flex max-w-full items-center overflow-x-auto">
            <TabsList
              variant={variant}
              size="small"
              className="w-max bg-transparent p-0 shadow-none! ring-0"
            >
              {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
      </div>
      <CodeBlockTabsMobileDropDown
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
    </>
  );

  const defaultProps = {
    "data-slot": "code-block-tabs",
    className: cn("ml-2 min-w-0 overflow-hidden", className),
    children: tabsElement,
  };

  const element = useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(defaultProps, props),
  });

  return element;
}

// Floating copy button component (wrapper with positioning)
type CodeBlockFloatingCopyProps = useRender.ComponentProps<"div">;

function CodeBlockFloatingCopy({
  className,
  render,
  ...props
}: CodeBlockFloatingCopyProps) {
  const context = useCodeBlock();
  const code = context.code;

  const defaultProps = {
    "data-slot": "code-block-floating-copy",
    className: cn("absolute pointer-events-none z-1 top-2 right-2", className),
    children: (
      <CopyButton
        data-slot="code-block-floating-copy"
        content={code}
        className="pointer-events-auto backdrop-blur-sm"
      />
    ),
  };

  const element = useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(defaultProps, props),
  });

  return element;
}

// Pre component (wrapper for content)
interface CodeBlockPreProps extends useRender.ComponentProps<"pre"> {
  /** Show line numbers in the gutter */
  lineNumbers?: boolean;
  /** Configure fade edges to indicate scrollable content. Defaults to true. */
  fadeEdges?: FadeEdges;
  /** Hide scrollbars while keeping scroll functionality */
  hideScrollbar?: boolean;
  /** Use native browser scrolling instead of Base UI ScrollArea */
  nativeScroll?: boolean;
}

function CodeBlockPre({
  className,
  render,
  children,
  lineNumbers = false,
  fadeEdges = true,
  hideScrollbar = false,
  nativeScroll = false,
  ...props
}: CodeBlockPreProps) {
  const context = useCodeBlock();
  const lines = context.lines;
  const hasFocus = context.hasFocus;
  const floatingCopy = context.floatingCopy;

  // If lineNumbers is enabled, wrap children in flex layout
  const content =
    lineNumbers && lines.length > 0 ? (
      <div className="flex">
        <CodeBlockLineNumbers lines={lines} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    ) : (
      children
    );

  const defaultProps = {
    "data-slot": "code-block-pre",
    "data-has-focus": hasFocus ? "true" : undefined,
    className: cn(
      "relative bg-card border border-border/60 rounded-lg whitespace-pre overflow-hidden max-h-96 flex flex-col",
      // Focus mode: blur and dim non-focused lines
      "[&[data-has-focus]_.line:not([data-focused])]:opacity-50 [&[data-has-focus]_.line:not([data-focused])]:blur-[1px] [&[data-has-focus]_.line:not([data-focused])]:transition-all",
      className,
    ),
    children: (
      <>
        {floatingCopy && <CodeBlockFloatingCopy />}
        <ScrollArea
          fadeEdges={fadeEdges}
          hideScrollbar={hideScrollbar}
          nativeScroll={nativeScroll}
          viewportClassName="py-3"
          className="min-h-0 flex-1"
        >
          {content}
        </ScrollArea>
      </>
    ),
  };

  const element = useRender({
    defaultTagName: "pre",
    render,
    props: mergeProps<"pre">(defaultProps, props),
  });

  return element;
}

// Line numbers component
interface CodeBlockLineNumbersProps extends useRender.ComponentProps<"div"> {
  lines: string[];
}

function CodeBlockLineNumbers({
  className,
  render,
  lines,
  ...props
}: CodeBlockLineNumbersProps) {
  const lineNumbers = lines.map((_, index) => (
    <div
      key={index}
      className="text-right text-[.8125rem] leading-normal tabular-nums"
    >
      {index + 1}
    </div>
  ));

  const defaultProps = {
    "data-slot": "code-block-line-numbers",
    "data-line-numbers": "true",
    className: cn("text-muted-foreground pl-3 select-none", className),
    children: lineNumbers,
  };

  const element = useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(defaultProps, props),
  });

  return element;
}

// Code component (the highlighted code)
type CodeBlockCodeProps = useRender.ComponentProps<"div">;

function CodeBlockCode({ className, render, ...props }: CodeBlockCodeProps) {
  const context = useCodeBlock();
  const code = context.code;
  const nodes = context.nodes;
  const showDiff = context.showDiff;

  const prehighlightedCode = useMemo(() => {
    const originalLines = code.split("\n");
    let lines = [...originalLines];

    // Strip diff markers if showDiff is enabled (match Shiki behavior)
    if (showDiff) {
      lines = lines.map((line) => stripDiffMarker(line));
    }

    // Create structure matching Shiki: spans with newlines between them
    const elements: React.ReactNode[] = [];
    lines.forEach((line, index) => {
      elements.push(
        <span key={`line-${index}`} className="line">
          {line || " "}
        </span>,
      );
      // Add newline after each line except the last
      if (index < lines.length - 1) {
        elements.push("\n");
      }
    });
    return <code>{elements}</code>;
  }, [code, showDiff]);

  const defaultProps = {
    "data-slot": "code-block-code",
    className: cn(
      "block text-[.8125rem] leading-normal whitespace-pre w-fit min-w-full",
      // Base padding
      "[&:not(:has(.line))]:px-3 [&_.line]:!px-3 [&:not(:has(.line))]:pr-8 [&_.line]:!pr-8",
      // Make lines span full width with inline-block and 100% width
      "[&_.line]:inline-block [&_.line]:min-w-full",
      // Highlighted lines - match pre-highlighted padding so border fits in the space
      "[&_.line[data-highlighted]]:bg-primary/10 [&_.line[data-highlighted]]:border-l-2 [&_.line[data-highlighted]]:border-primary/50 [&_.line[data-highlighted]]:!pl-[calc(0.75rem-2px)]",
      // Diff: added lines
      "[&_.line[data-diff='added']]:bg-green-500/10 [&_.line[data-diff='added']]:border-l-2 [&_.line[data-diff='added']]:border-green-500/70 [&_.line[data-diff='added']]:!pl-[calc(0.75rem-2px)]",
      // Diff: removed lines
      "[&_.line[data-diff='removed']]:bg-red-500/10 [&_.line[data-diff='removed']]:border-l-2 [&_.line[data-diff='removed']]:border-red-500/70 [&_.line[data-diff='removed']]:!pl-[calc(0.75rem-2px)]",
      // Diff: modified lines
      "[&_.line[data-diff='modified']]:bg-yellow-500/10 [&_.line[data-diff='modified']]:border-l-2 [&_.line[data-diff='modified']]:border-yellow-500/70 [&_.line[data-diff='modified']]:!pl-[calc(0.75rem-2px)]",
      className,
    ),
    children: nodes || prehighlightedCode,
  };

  const element = useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(defaultProps, props),
  });

  return element;
}

export {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockFloatingCopy,
  CodeBlockPre,
  CodeBlockLineNumbers,
  CodeBlockCode,
  useCodeBlock,
};
export type { FadeEdges };
