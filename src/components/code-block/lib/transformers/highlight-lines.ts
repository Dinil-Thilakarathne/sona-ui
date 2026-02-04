import type { ShikiTransformer } from "shiki";
import { parseLineRange } from "./utils";

/**
 * Shiki transformer that adds data-highlighted attribute to specified lines
 *
 * @param lines - Line numbers to highlight (1-indexed) or range string like "1-3,5,7-9"
 * @returns Shiki transformer
 */
export function createHighlightLinesTransformer(
  lines: number[] | string | undefined,
): ShikiTransformer {
  const highlightedLines = parseLineRange(lines);
  const highlightSet = new Set(highlightedLines);

  return {
    name: "highlight-lines",
    line(node, lineNumber) {
      // lineNumber is already 1-indexed by Shiki
      if (highlightSet.has(lineNumber)) {
        node.properties["data-highlighted"] = "true";
      }
    },
  };
}
