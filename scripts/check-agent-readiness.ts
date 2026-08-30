import fs from "node:fs";
import path from "node:path";
import { homeMarkdown, notFoundMarkdown } from "../src/lib/agent-markdown";
import { apiErrorBody } from "../src/lib/api-error";

const root = process.cwd();
const errors: string[] = [];
const openApiPath = path.join(root, "public/openapi.json");

if (!fs.existsSync(openApiPath)) {
  errors.push("missing public/openapi.json");
} else {
  const specification = JSON.parse(fs.readFileSync(openApiPath, "utf8")) as {
    openapi?: string;
    paths?: Record<string, { get?: { operationId?: string } }>;
  };
  if (specification.openapi !== "3.1.1")
    errors.push("OpenAPI version must be 3.1.1");
  for (const endpoint of [
    "/api/md",
    "/api/read-file",
    "/api/github-contributions",
  ]) {
    if (!specification.paths?.[endpoint]?.get?.operationId) {
      errors.push(`${endpoint}: missing GET operationId`);
    }
  }
}

const apiError = apiErrorBody({
  code: "NOT_FOUND",
  message: "Not found",
  resolution: "Read the catalog.",
  status: 404,
});
if (
  !apiError.error.code ||
  !apiError.error.message ||
  !apiError.error.resolution
) {
  errors.push("API error body is missing required agent fields");
}

if (
  !homeMarkdown.includes("# Sona UI") ||
  !homeMarkdown.includes("/agent/catalog.json")
) {
  errors.push("homepage Markdown contract is incomplete");
}
if (!notFoundMarkdown("/missing").includes("# Not found")) {
  errors.push("Markdown 404 contract is incomplete");
}

const llms = fs.readFileSync(path.join(root, "public/llms.txt"), "utf8");
if (!llms.includes("/openapi.json"))
  errors.push("llms.txt does not link to OpenAPI");

if (errors.length > 0) {
  console.error("Agent readiness check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Agent readiness contract check passed.");
