import { promises as fs } from "fs";
import path from "path";

/**
 * Reads the content of a file from the project root.
 * @param filePath - The path to the file relative to the project root.
 * @returns The content of the file as a string.
 */
export async function readFileContent(filePath: string): Promise<string> {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const content = await fs.readFile(fullPath, "utf-8");
    return content;
  } catch (error) {
    console.error(`Error reading file at ${filePath}:`, error);
    return `// Error reading file: ${filePath}`;
  }
}
