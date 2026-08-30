import { allDocs, type Doc } from "content-collections";
import { type NextRequest, NextResponse } from "next/server";
import { homeMarkdown, notFoundMarkdown } from "@/lib/agent-markdown";

const markdownHeaders = {
  "Content-Type": "text/markdown; charset=utf-8",
  Vary: "Accept, Accept-Encoding",
};

function acceptsMarkdown(request: NextRequest) {
  return request.headers.get("accept")?.includes("text/markdown") ?? false;
}

function markdownResponse(content: string, status = 200) {
  return new NextResponse(content, { status, headers: markdownHeaders });
}

export function proxy(request: NextRequest) {
  if (!acceptsMarkdown(request)) return NextResponse.next();

  const { pathname } = request.nextUrl;

  if (pathname === "/") return markdownResponse(homeMarkdown);

  if (pathname.startsWith("/docs/")) {
    const slug = pathname.slice("/docs/".length);
    const doc = allDocs.find((item: Doc) => item.slug === slug);
    return doc
      ? markdownResponse(doc.body.raw)
      : markdownResponse(notFoundMarkdown(pathname), 404);
  }

  const knownPaths = new Set(["/components", "/llms.txt", "/llms-full.txt"]);
  if (
    knownPaths.has(pathname) ||
    pathname.startsWith("/agent/") ||
    pathname.startsWith("/r/")
  ) {
    return NextResponse.next();
  }

  return markdownResponse(notFoundMarkdown(pathname), 404);
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|sitemap.xml|robots.txt).*)"],
};
