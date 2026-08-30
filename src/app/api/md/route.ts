import { allDocs, type Doc } from "content-collections";
import { NextResponse } from "next/server";
import { apiError } from "@/lib/api-error";

// API: /api/md?slug=accordion -> raw MDX/markdown of the doc as text/markdown
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return apiError({
      code: "INVALID_REQUEST",
      message: "Missing 'slug' query parameter.",
      resolution: "Provide the slug of a documented Sona UI component.",
      status: 400,
    });
  }

  const doc = allDocs.find((d: Doc) => d.slug === slug);

  if (!doc) {
    return apiError({
      code: "NOT_FOUND",
      message: `No documentation was found for '${slug}'.`,
      resolution: "Read /agent/catalog.json for the available component slugs.",
      status: 404,
    });
  }

  return new NextResponse(doc.body.raw, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
