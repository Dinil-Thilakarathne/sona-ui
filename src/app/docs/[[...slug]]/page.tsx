import { allDocs, Doc } from ".content-collections/generated";
import { Metadata } from "next";
import { SITE_METADATA } from "@/config/site";
import DocClient from "./DocClient";
import { notFound } from "next/navigation";

async function getDocFromParams({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;


  if (!slug) {
    throw new Error("Slug is undefined");
  }

  // Find the document by slug
  const doc = allDocs.find((doc: Doc) => doc.slugAsParams === `docs/${slug}`);

  if (!doc) {
    throw new Error("Document not found");
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
