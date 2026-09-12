import type { Metadata } from "next";
import { ComponentShowcase } from "@/components/component-showcase";
import { LandingFooter } from "@/components/landing/sections/landing-footer";
import { SiteGridFrame, SiteGridGap } from "@/components/landing/site-grid";
import { SITE_METADATA } from "@/config/site";

const title = "Animated React Components | Sona UI";

export const metadata: Metadata = {
  title: { absolute: title },
  description: SITE_METADATA.description,
  alternates: { canonical: `${SITE_METADATA.siteLink}/components` },
  openGraph: {
    title,
    description: SITE_METADATA.description,
    url: `${SITE_METADATA.siteLink}/components`,
    siteName: SITE_METADATA.siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE_METADATA.description,
    creator: SITE_METADATA.authorTwitter,
  },
};

export default function ComponentsPage() {
  return (
    <SiteGridFrame className="relative z-10 overflow-x-clip">
      <ComponentShowcase />
      <SiteGridGap />
      <LandingFooter />
    </SiteGridFrame>
  );
}
