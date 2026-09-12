"use client";

import {
  SiJavascript,
  SiPython,
  SiTypescript,
} from "@icons-pack/react-simple-icons";
import { codeToHtml, type ShikiTransformer } from "shiki";
import { Check, Copy, Terminal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/sona-utils";

export interface CodeBlockProps {
  /** Source code to render. */
  code: string;
  /** Language identifier used for syntax highlighting. @default "tsx" */
  language?: string;
  /** Optional filename shown in the header. @default undefined */
  filename?: string;
  /** Shows a numbered gutter. @default false */
  showLineNumbers?: boolean;
  /** Lines to emphasize, as numbers or a comma-separated range. @default undefined */
  highlightLines?: number[] | string;
  /** Removes leading diff markers and styles added or removed lines. @default false */
  showDiff?: boolean;
  /** Lines to keep visually focused. @default undefined */
  focusLines?: number[] | string;
  /** Additional classes for the code block. @default undefined */
  className?: string;
}

function parseLines(value: number[] | string | undefined) {
  if (!value) return new Set<number>();
  if (Array.isArray(value)) return new Set(value);
  const lines = new Set<number>();
  value.split(",").forEach((part) => {
    const [start, end] = part.split("-").map(Number);
    if (!Number.isFinite(start)) return;
    for (let line = start; line <= (Number.isFinite(end) ? end : start); line++)
      lines.add(line);
  });
  return lines;
}

function languageIcon(language: string) {
  const normalized = language.toLowerCase();
  if (["ts", "tsx", "typescript"].includes(normalized))
    return <SiTypescript className="size-4" />;
  if (["js", "jsx", "javascript"].includes(normalized))
    return <SiJavascript className="size-4" />;
  if (["py", "python"].includes(normalized))
    return <SiPython className="size-4" />;
  if (["bash", "sh", "shell"].includes(normalized))
    return <Terminal className="size-4" />;
  return null;
}

function createLineTransformers(
  code: string,
  options: Pick<CodeBlockProps, "highlightLines" | "focusLines" | "showDiff">,
): ShikiTransformer[] {
  const highlighted = parseLines(options.highlightLines);
  const focused = parseLines(options.focusLines);
  const originalLines = code.split("\n");
  return [
    {
      name: "code-block-lines",
      preprocess(source) {
        return options.showDiff
          ? source.split("\n").map((line) => line.replace(/^[-+ ]/, "")).join("\n")
          : source;
      },
      line(node, lineNumber) {
        node.properties["data-line-number"] = String(lineNumber);
        if (highlighted.has(lineNumber)) node.properties["data-highlighted"] = "true";
        if (focused.has(lineNumber)) node.properties["data-focused"] = "true";
        if (options.showDiff) {
          const original = originalLines[lineNumber - 1] ?? "";
          if (original.startsWith("+")) node.properties["data-diff"] = "added";
          if (original.startsWith("-")) node.properties["data-diff"] = "removed";
        }
      },
    },
  ];
}

export default function CodeBlock({
  code,
  language = "tsx",
  filename,
  showLineNumbers = false,
  highlightLines,
  showDiff = false,
  focusLines,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const emphasized = parseLines(highlightLines);
  const focused = parseLines(focusLines);
  const lines = useMemo(() => code.split("\n"), [code]);
  const source = useMemo(() => {
    const source = showDiff
      ? lines.map((line) => line.replace(/^[-+ ]/, "")).join("\n")
      : code;
    return source;
  }, [code, lines, showDiff]);
  const [html, setHtml] = useState("");
  useEffect(() => {
    let active = true;
    void codeToHtml(source, { lang: language, themes: { light: "github-light", dark: "github-dark" }, defaultColor: "light-dark()", transformers: createLineTransformers(code, { highlightLines, focusLines, showDiff }) }).then((result) => {
      if (active) setHtml(result.replace(/^<pre[^>]*><code>/, "").replace(/<\/code><\/pre>$/, ""));
    });
    return () => { active = false; };
  }, [code, focusLines, highlightLines, language, showDiff, source]);

  async function copyCode() {
    await navigator.clipboard.writeText(
      showDiff
        ? lines.map((line) => line.replace(/^[-+ ]/, "")).join("\n")
        : code,
    );
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-border/60 bg-card",
        className,
      )}
    >
      {(filename || language) && (
        <div className="flex h-11 items-center justify-between border-b border-border/60 px-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            {languageIcon(language)}
            {filename ?? language}
          </span>
          <button
            type="button"
            onClick={copyCode}
            className="rounded-md p-1.5 hover:bg-accent"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="size-4" />
            ) : (
              <Copy className="size-4" />
            )}
          </button>
        </div>
      )}
      <div className="overflow-x-auto p-4 text-[.8125rem] leading-normal">
        <div
          className={cn(
            "flex min-w-max",
            focusLines && "[&_.line:not([data-focused])]:opacity-45",
          )}
        >
          {showLineNumbers && (
            <div className="mr-4 select-none text-right text-muted-foreground">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          )}
          <div
            className="th-code-content block w-full whitespace-pre [&_.line]:inline-block [&_.line]:w-full [&_.line]:min-w-full [&_.th-line]:inline-block [&_.th-line]:w-full [&_.th-line]:min-w-full [&_.line[data-highlighted]]:bg-primary/10 [&_.line[data-diff=added]]:bg-green-500/10 [&_.line[data-diff=removed]]:bg-red-500/10 [&_.line[data-focused]]:font-medium"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
}
