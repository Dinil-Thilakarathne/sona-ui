import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const directory = searchParams.get("directory");
  const fileName = searchParams.get("fileName");

  if (!directory || !fileName) {
    return NextResponse.json({ error: "Missing directory or fileName" }, { status: 400 });
  }

  const fullPath = path.join(process.cwd(),directory, fileName);

  try {
    const fileContent = fs.readFileSync(fullPath, "utf-8");
    return NextResponse.json({ content: fileContent });
  } catch (error) {
    console.error(`Error reading file at ${fullPath}:`, error);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}