import { allDocs, type Doc } from "content-collections";
import { NextResponse } from "next/server";

// API: /api/md?slug=accordion -> raw MDX/markdown of the doc as text/markdown
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { error: "Missing 'slug' query parameter." },
      { status: 400 },
    );
  }

  const doc = allDocs.find((d: Doc) => d.slug === slug);

  if (!doc) {
    return NextResponse.json(
      { error: `Doc not found: ${slug}` },
      { status: 404 },
    );
  }

  return new NextResponse(doc.body.raw, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
