import { allDocs, type Doc } from "content-collections";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import type { DocsPageLink } from "@/components/docs-page-navigation/docs-page-navigation";
import { componentNavigationLinks } from "@/config/components";
import { SITE_METADATA } from "@/config/site";
import { FIRST_COMP_LINK } from "@/lib/constants";
import DocClient from "./DocClient";

async function getDocFromParams({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  // `slug` is an array for the [[...slug]] catch-all (e.g. ["ripple-button"]).
  const slugPath = slug?.join("/");

  if (!slugPath) {
    redirect(FIRST_COMP_LINK);
  }

  // Find the document by slug
  const doc = allDocs.find((doc: Doc) => doc.slug === slugPath);

  if (!doc) {
    notFound();
  }

  return doc;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const doc = await getDocFromParams({ params });

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      url: `${SITE_METADATA.siteLink}/docs/${doc.slug}`,
      images: [
        {
          url: `${SITE_METADATA.siteLink}/og/${doc.slug}-og.png`,
          width: 1200,
          height: 630,
          alt: doc.title,
        },
      ],
    },
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const doc = await getDocFromParams({ params });

  if (!doc) {
    notFound();
  }

  const currentIndex = componentNavigationLinks.findIndex(
    (item) => item.slug === doc.slug,
  );
  const previousItem =
    currentIndex > 0 ? componentNavigationLinks[currentIndex - 1] : undefined;
  const nextItem =
    currentIndex >= 0 ? componentNavigationLinks[currentIndex + 1] : undefined;
  const previous: DocsPageLink | undefined = previousItem && {
    title: previousItem.name,
    href: previousItem.href,
  };
  const next: DocsPageLink | undefined = nextItem && {
    title: nextItem.name,
    href: nextItem.href,
  };

  return (
    <DocClient
      doc={{
        title: doc.title,
        slug: doc.slug,
        body: { code: doc.body.code, raw: doc.body.raw },
      }}
      navigation={{ previous, next }}
    />
  );
}
