import fs from "fs";
import path from "path";

const filePath = process.argv[2];

if (!filePath) {
  console.error("Please provide a file path.");
  process.exit(1);
}

const absolutePath = path.resolve(process.cwd(), filePath);

if (!fs.existsSync(absolutePath)) {
  console.error(`File not found: ${absolutePath}`);
  process.exit(1);
}

try {
  const content = fs.readFileSync(absolutePath, "utf-8");
  const lines = content.split("\n");
  console.log(JSON.stringify(lines, null, 2));
} catch (error) {
  console.error("Error reading file:", error);
  process.exit(1);
}
