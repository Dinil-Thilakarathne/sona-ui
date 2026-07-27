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
  const helveticaNeue = await readFile(
    path.join(
      process.cwd(),
      "src/fonts/helvetica-neue/HelveticaNeue-Medium.ttf",
    ),
  );

  return new ImageResponse(<SonaSocialImage />, {
    ...size,
    fonts: [
      {
        name: "Helvetica Neue",
        data: helveticaNeue,
        style: "normal",
        weight: 500,
      },
    ],
  });
}
