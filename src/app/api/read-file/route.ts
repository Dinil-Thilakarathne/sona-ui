import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { apiError } from "@/lib/api-error";

const REGISTRY_SOURCE_CACHE_CONTROL =
  "public, max-age=60, s-maxage=3600, stale-while-revalidate=86400";

const REGISTRY_SOURCE_ROOT = path.join(
  process.cwd(),
  "src",
  "registry",
  "sonaui",
);

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

    // Resolve the in-repo registry source. The documented contract passes the
    // file stem without an extension (e.g. `file=accordion`), so `.tsx` is
    // appended to match the real source at src/registry/sonaui/<folder>/<file>.tsx.
    const sourceFilePath = path.join(
      REGISTRY_SOURCE_ROOT,
      folder,
      `${file}.tsx`,
    );

    let content: string;
    try {
      content = await fs.promises.readFile(sourceFilePath, "utf-8");
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") {
        return apiError({
          code: "NOT_FOUND",
          message: "The requested registry source file was not found.",
          resolution:
            "Read /r/registry.json to discover available registry items.",
          status: 404,
        });
      }
      throw err;
    }

    return NextResponse.json(
      { content },
      { headers: { "Cache-Control": REGISTRY_SOURCE_CACHE_CONTROL } },
    );
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
