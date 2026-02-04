/**
 * Parse line range syntax into an array of line numbers
 * Supports formats:
 * - Array: [1, 2, 3]
 * - String: "1,3,5" or "1-3,5,7-9"
 * - Mixed: "1-3,5" becomes [1, 2, 3, 5]
 *
 * @param input - Line numbers as array or range string
 * @returns Array of line numbers (1-indexed)
 */
export function parseLineRange(
  input: number[] | string | undefined,
): number[] {
  if (!input) return [];
  if (Array.isArray(input)) return input;

  const lines = new Set<number>();
  const parts = input.split(",").map((s) => s.trim());

  for (const part of parts) {
    // Range format: "1-3"
    if (part.includes("-")) {
      const [start, end] = part.split("-").map((s) => Number.parseInt(s, 10));
      if (!Number.isNaN(start) && !Number.isNaN(end)) {
        for (let i = start; i <= end; i++) {
          lines.add(i);
        }
      }
    } else {
      // Single number
      const num = Number.parseInt(part, 10);
      if (!Number.isNaN(num)) {
        lines.add(num);
      }
    }
  }

  return Array.from(lines).sort((a, b) => a - b);
}

/**
 * Detect diff markers in code lines
 * Supports:
 * - Prefix markers: "+", "-", "!"
 * - Comment markers: "// +", "// -", "// !"
 *
 * @param line - Code line to check
 * @returns Diff type or null
 */
export function detectDiffMarker(
  line: string,
): "added" | "removed" | "modified" | null {
  const trimmed = line.trim();

  // Direct prefix markers
  if (trimmed.startsWith("+")) return "added";
  if (trimmed.startsWith("-")) return "removed";
  if (trimmed.startsWith("!")) return "modified";

  // Comment markers (for languages that don't support bare +/-)
  if (trimmed.startsWith("// +")) return "added";
  if (trimmed.startsWith("// -")) return "removed";
  if (trimmed.startsWith("// !")) return "modified";

  return null;
}

/**
 * Strip diff markers from a code line
 *
 * @param line - Code line with potential diff marker
 * @returns Line with marker removed
 */
export function stripDiffMarker(line: string): string {
  const trimmed = line.trim();

  // Direct prefix markers
  if (trimmed.startsWith("+") || trimmed.startsWith("-") || trimmed.startsWith("!")) {
    return line.replace(/^(\s*)[-+!](\s?)/, "$1");
  }

  // Comment markers
  if (trimmed.startsWith("// +") || trimmed.startsWith("// -") || trimmed.startsWith("// !")) {
    return line.replace(/^(\s*)\/\/\s*[-+!](\s?)/, "$1");
  }

  return line;
}
