import { ImageResponse } from "next/og";
import { SonaSocialImage } from "@/components/social/sona-social-image";
import { getSocialImageFonts } from "@/lib/social-image-fonts";

export const alt = "Sona UI | Well-crafted animated React components.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(<SonaSocialImage />, {
    ...size,
    fonts: await getSocialImageFonts(),
  });
}
