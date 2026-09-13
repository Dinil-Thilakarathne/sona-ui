import type { Metadata } from "next";
import { SITE_METADATA } from "./site";

export const siteMetaData: Metadata = {
  title: {
    default: SITE_METADATA.title,
    template: "%s | Sona UI",
  },
  description: SITE_METADATA.description,
  keywords: SITE_METADATA.keywords,
  authors: [{ name: SITE_METADATA.author, url: SITE_METADATA.authorGithub }],
  creator: SITE_METADATA.author,

  metadataBase: new URL(SITE_METADATA.siteLink),

  alternates: {
    canonical: "./",
  },

  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    url: "./",
    siteName: SITE_METADATA.siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    creator: SITE_METADATA.authorTwitter,
  },
  //   manifest: "/site.webmanifest",p
};
