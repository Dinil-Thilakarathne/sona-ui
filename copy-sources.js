import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Support __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const sourceBase = path.join(__dirname, "src", "registry", "sonaui");
const targetBase = path.join(__dirname, "public", "__registry__", "sonaui");

// Add a function to log messages to a file
const logFilePath = path.join(__dirname, "copy-sources.log");

function logMessage(message) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logFilePath, `[${timestamp}] ${message}\n`, "utf-8");
}

function copyTSXFilesRecursively(srcDir, targetDir) {
  const items = fs.readdirSync(srcDir, { withFileTypes: true });

  items.forEach((item) => {
    const srcPath = path.join(srcDir, item.name);
    const targetPath = path.join(targetDir, item.name);

    if (item.isDirectory()) {
      copyTSXFilesRecursively(srcPath, targetPath); // Recurse into subfolders
    } else if (item.isFile() && path.extname(item.name) === ".tsx") {
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const content = fs.readFileSync(srcPath, "utf-8");
      const fileName = path.basename(item.name, ".tsx") + ".txt";
      const destPath = path.join(targetDir, fileName);

      fs.writeFileSync(destPath, content, "utf-8");
      logMessage(`✔ Copied: ${srcPath} → ${destPath}`);
    }
  });
}

try {
  copyTSXFilesRecursively(sourceBase, targetBase);
  logMessage(
    "✅ All .tsx files copied and converted to .txt under /public/__registry__/",
  );
} catch (err) {
  logMessage(`❌ Error during copy: ${err.message}`);
}
