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
    if (slug.includes("/")) return NextResponse.next();
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
  // Only run the Proxy for Markdown content negotiation. Matching ordinary
  // document and RSC requests here would turn otherwise static CDN hits into
  // Proxy invocations before they can be served.
  matcher: [
    {
      source: "/",
      has: [{ type: "header", key: "accept", value: ".*text/markdown.*" }],
    },
    {
      source: "/docs/:path*",
      has: [{ type: "header", key: "accept", value: ".*text/markdown.*" }],
    },
  ],
};
