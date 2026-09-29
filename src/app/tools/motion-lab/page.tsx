import type { Metadata } from "next";
import { MotionLab } from "@/components/motion-lab/motion-lab";
import { SITE_METADATA } from "@/config/site";

const title = "Motion Lab | Tune UI Motion Visually";
const description =
  "Tune springs, easing, movement, and reduced-motion behavior on real interface patterns, then copy production-ready Motion code.";
const canonical = `${SITE_METADATA.siteLink}/tools/motion-lab`;

export const metadata: Metadata = {
  title: { absolute: `${title} | Sona UI` },
  description,
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: canonical,
    siteName: SITE_METADATA.siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: SITE_METADATA.authorTwitter,
  },
};

export default function MotionLabPage() {
  return <MotionLab />;
}
