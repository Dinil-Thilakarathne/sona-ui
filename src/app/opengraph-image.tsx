import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { SonaSocialImage } from "@/components/social/sona-social-image";

export const alt = "Sona UI — Beautiful interactions, owned by your codebase.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const fontDir = path.join(process.cwd(), "src/fonts/helvetica-neue");
  const [regular, medium, bold] = await Promise.all([
    readFile(path.join(fontDir, "HelveticaNeue-Regular.ttf")),
    readFile(path.join(fontDir, "HelveticaNeue-Medium.ttf")),
    readFile(path.join(fontDir, "HelveticaNeue-Bold.ttf")),
  ]);

  return new ImageResponse(<SonaSocialImage />, {
    ...size,
    fonts: [
      { name: "Helvetica Neue", data: regular, style: "normal", weight: 400 },
      { name: "Helvetica Neue", data: medium, style: "normal", weight: 500 },
      { name: "Helvetica Neue", data: bold, style: "normal", weight: 700 },
    ],
  });
}
