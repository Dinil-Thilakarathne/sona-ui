import type { ShikiTransformer } from "shiki";
import { parseLineRange } from "./utils";

/**
 * Shiki transformer that adds focus attributes to lines
 * - Adds data-line-number to all lines for targeting
 * - Adds data-focused to specified lines
 *
 * @param lines - Line numbers to focus (1-indexed) or range string like "1-3,5"
 * @returns Shiki transformer
 */
export function createFocusTransformer(
  lines: number[] | string | undefined,
): ShikiTransformer {
  const focusedLines = parseLineRange(lines);
  const focusSet = new Set(focusedLines);

  return {
    name: "focus",
    line(node, lineNumber) {
      // lineNumber is already 1-indexed by Shiki
      // Add line number to all lines for CSS targeting
      node.properties["data-line-number"] = String(lineNumber);

      // Mark focused lines
      if (focusSet.has(lineNumber)) {
        node.properties["data-focused"] = "true";
      }
    },
  };
}
