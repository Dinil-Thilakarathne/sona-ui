import { Metadata } from "next";
import { notFound } from "next/navigation";

import { allDocs, Doc } from ".content-collections/generated";
import { SITE_METADATA } from "@/config/site";
import DocClient from "./DocClient";

async function getDocFromParams({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  // Find the document by slug
  const doc = allDocs.find((doc: Doc) => doc.slug == slug);


  if (!doc) {
    notFound();
  }

  return doc;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
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
  params: Promise<{ slug: string }>;
}) {
  const doc = await getDocFromParams({ params });

  if (!doc) {
    notFound();
  }
  return <DocClient doc={doc} />;
}
