import { readFile } from "node:fs/promises";
import path from "node:path";

export async function getSocialImageFonts() {
  const fontDir = path.join(process.cwd(), "src/fonts/helvetica-neue");
  const [regular, medium, bold] = await Promise.all([
    readFile(path.join(fontDir, "HelveticaNeue-Regular.ttf")),
    readFile(path.join(fontDir, "HelveticaNeue-Medium.ttf")),
    readFile(path.join(fontDir, "HelveticaNeue-Bold.ttf")),
  ]);

  return [
    {
      name: "Helvetica Neue",
      data: regular,
      style: "normal" as const,
      weight: 400 as const,
    },
    {
      name: "Helvetica Neue",
      data: medium,
      style: "normal" as const,
      weight: 500 as const,
    },
    {
      name: "Helvetica Neue",
      data: bold,
      style: "normal" as const,
      weight: 700 as const,
    },
  ];
}
