import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { apiError } from "@/lib/api-error";

// API: /api/read-file?folder=accordion&file=accordion
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get("folder");
    const file = searchParams.get("file");

    if (!folder || !file) {
      return apiError({
        code: "INVALID_REQUEST",
        message: "Missing 'folder' or 'file' query parameter.",
        resolution: "Provide both the registry folder and file name.",
        status: 400,
      });
    }

    // Basic sanitization
    if (folder.includes("..") || file.includes("..")) {
      return apiError({
        code: "INVALID_REQUEST",
        message: "Path traversal is not allowed.",
        resolution:
          "Use a registry folder and file name without path separators.",
        status: 400,
      });
    }

    // 🔄 Correct path to public/sonaui/folder/file.txt
    const txtFilePath = path.join(
      process.cwd(),
      "public",
      "__registry__",
      "sonaui",
      folder,
      `${file}.txt`,
    );

    if (!fs.existsSync(txtFilePath)) {
      return apiError({
        code: "NOT_FOUND",
        message: "The requested registry source file was not found.",
        resolution:
          "Read /r/registry.json to discover available registry items.",
        status: 404,
      });
    }

    const content = fs.readFileSync(txtFilePath, "utf-8");

    return NextResponse.json({ content });
  } catch (err) {
    console.error("Error reading component source file:", err);
    return apiError({
      code: "INTERNAL_ERROR",
      message: "The registry source file could not be read.",
      resolution:
        "Retry the request. If it continues, report the issue on GitHub.",
      status: 500,
    });
  }
}
