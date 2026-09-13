import { highlight } from "@tanstack/highlight";
import { Fragment, type ReactElement, type ReactNode } from "react";
import { stripDiffMarker } from "./transformers/utils";

export interface HighlightOptions {
  highlightLines?: number[] | string;
  showDiff?: boolean;
  focusLines?: number[] | string;
}

const LANGUAGE_ALIASES: Record<string, string> = {
  bash: "shell",
  js: "js",
  javascript: "js",
  jsx: "jsx",
  py: "python",
  sh: "shell",
  shell: "shell",
  ts: "ts",
  typescript: "ts",
  tsx: "tsx",
};

function parseLines(value: number[] | string | undefined) {
  if (!value) return new Set<number>();
  if (Array.isArray(value)) return new Set(value);
  const result = new Set<number>();
  for (const part of value.split(",")) {
    const [start, end] = part.split("-").map(Number);
    if (!Number.isFinite(start)) continue;
    for (
      let line = start;
      line <= (Number.isFinite(end) ? end : start);
      line++
    ) {
      result.add(line);
    }
  }
  return result;
}

function tokenClass(className: string | undefined) {
  return className ? `th-token th-${className}` : undefined;
}

export function highlightWithTanStack(
  code: string,
  language: string,
  options?: HighlightOptions,
): ReactElement {
  const source = options?.showDiff
    ? code.split("\n").map(stripDiffMarker).join("\n")
    : code;
  const result = highlight(source, {
    lang: LANGUAGE_ALIASES[language.toLowerCase()] ?? language,
  });
  const highlightedLines = parseLines(options?.highlightLines);
  const focusedLines = parseLines(options?.focusLines);
  const lineTokens: ReactNode[][] = [[]];

  let tokenKey = 0;
  for (const token of result.tokens) {
    const parts = token.value.split("\n");
    for (let index = 0; index < parts.length; index++) {
      const part = parts[index];
      if (part) {
        lineTokens[lineTokens.length - 1].push(
          token.className ? (
            <span
              className={tokenClass(token.className)}
              key={`token-${tokenKey++}`}
            >
              {part}
            </span>
          ) : (
            part
          ),
        );
      }
      if (index < parts.length - 1) lineTokens.push([]);
    }
  }

  return (
    <code className="th-code-content">
      {lineTokens.map((tokens, index) => {
        const line = index + 1;
        const original = code.split("\n")[index] ?? "";
        const diff = original.startsWith("+")
          ? "added"
          : original.startsWith("-")
            ? "removed"
            : undefined;
        return (
          <Fragment key={line}>
            <span
              className="line"
              data-diff={options?.showDiff ? diff : undefined}
              data-focused={focusedLines.has(line) ? "true" : undefined}
              data-highlighted={highlightedLines.has(line) ? "true" : undefined}
            >
              {tokens.length ? tokens : " "}
            </span>
            {index < lineTokens.length - 1 ? "\n" : null}
          </Fragment>
        );
      })}
    </code>
  );
}
