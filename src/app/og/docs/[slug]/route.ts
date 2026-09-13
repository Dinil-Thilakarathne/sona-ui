import { allDocs, type Doc } from "content-collections";
import { ImageResponse } from "next/og";
import { SonaSocialImage } from "@/components/social/sona-social-image";
import { getDocDescription } from "@/lib/docs-metadata";
import { getSocialImageFonts } from "@/lib/social-image-fonts";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const doc = allDocs.find((item: Doc) => item.slug === slug);

  if (!doc) {
    return new Response("Documentation page not found", { status: 404 });
  }

  return new ImageResponse(
    SonaSocialImage({
      description: getDocDescription(doc),
      eyebrow: "Documentation",
      title: doc.title,
    }),
    {
      width: 1200,
      height: 630,
      fonts: await getSocialImageFonts(),
    },
  );
}
