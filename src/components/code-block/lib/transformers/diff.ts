import type { ShikiTransformer } from "shiki";
import { detectDiffMarker, stripDiffMarker } from "./utils";

/**
 * Shiki transformer that detects diff markers and adds data-diff attributes
 * Supports:
 * - "+" prefix for added lines
 * - "-" prefix for removed lines
 * - "!" prefix for modified lines
 * - Comment variants: "// +", "// -", "// !"
 *
 * The markers are stripped from the displayed code for clean output
 *
 * @returns Shiki transformer
 */
export function createDiffTransformer(): ShikiTransformer {
  // Store original code lines for diff detection
  let codeLines: string[] = [];

  return {
    name: "diff",
    preprocess(code) {
      // Store original lines before Shiki processes them
      codeLines = code.split("\n");
      // Strip diff markers from the code that will be highlighted
      return code
        .split("\n")
        .map((line) => stripDiffMarker(line))
        .join("\n");
    },
    line(node, lineNumber) {
      // lineNumber is 1-indexed by Shiki, convert to 0-indexed for array access
      const originalLine = codeLines[lineNumber - 1];
      if (!originalLine) return;

      const diffType = detectDiffMarker(originalLine);
      if (diffType) {
        node.properties["data-diff"] = diffType;
      }
    },
  };
}
