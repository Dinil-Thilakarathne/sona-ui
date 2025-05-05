import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

// API: /api/read-file?folder=accordion&file=accordion
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get("folder");
    const file = searchParams.get("file");

    if (!folder || !file) {
      return NextResponse.json(
        { error: "Missing 'folder' or 'file' query parameter." },
        { status: 400 }
      );
    }

    // Basic sanitization
    if (folder.includes("..") || file.includes("..")) {
      return NextResponse.json({ error: "Invalid path." }, { status: 400 });
    }

    // 🔄 Correct path to public/sonaui/folder/file.txt
    const txtFilePath = path.join(
      process.cwd(),
      "public",
      "__registry__",
      "sonaui",
      folder,
      `${file}.txt`
    );

    if (!fs.existsSync(txtFilePath)) {
      return NextResponse.json(
        { error: `File not found: ${txtFilePath}` },
        { status: 404 }
      );
    }

    const content = fs.readFileSync(txtFilePath, "utf-8");

    return NextResponse.json({ content });
  } catch (err) {
    console.error("Error reading component source file:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}