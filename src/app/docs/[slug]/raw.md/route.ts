import { allDocs, type Doc } from "content-collections";
import { NextResponse } from "next/server";

const DOCUMENTATION_CACHE_CONTROL =
  "public, max-age=60, s-maxage=3600, stale-while-revalidate=86400";

export function generateStaticParams() {
  return allDocs.map((doc: Doc) => ({ slug: doc.slug }));
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const doc = allDocs.find((item: Doc) => item.slug === slug);

  if (!doc) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(doc.body.raw, {
    status: 200,
    headers: {
      "Cache-Control": DOCUMENTATION_CACHE_CONTROL,
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
