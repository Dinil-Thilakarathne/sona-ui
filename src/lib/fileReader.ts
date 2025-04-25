import fs from "fs";
import path from "path";

/**
 * Reads the content of a file from the given directory.
 * @param directory - The directory where the file is located.
 * @param fileName - The name of the file to read.
 * @returns The content of the file as a string, or an error message if the file cannot be read.
 */
export const readFileContent = (directory: string, fileName: string): string => {
  const fullPath = path.join(process.cwd(), directory, fileName);
  try {
    return fs.readFileSync(fullPath, "utf-8");
  } catch (error) {
    console.error(`Error reading file at ${fullPath}:`, error);
    return ""; // Return an empty string if the file cannot be read
  }
};