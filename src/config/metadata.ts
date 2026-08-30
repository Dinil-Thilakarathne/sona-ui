import type { Metadata } from "next";
import { SITE_METADATA } from "./site";

export const siteMetaData: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  keywords: SITE_METADATA.keywords,
  authors: [{ name: SITE_METADATA.author, url: SITE_METADATA.authorGithub }],
  creator: SITE_METADATA.author,

  metadataBase: new URL(SITE_METADATA.siteLink),

  alternates: {
    canonical: SITE_METADATA.siteLink,
  },

  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    url: SITE_METADATA.siteLink,
    siteName: SITE_METADATA.siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sona UI component library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    creator: SITE_METADATA.authorTwitter,
  },
  //   manifest: "/site.webmanifest",p
};
