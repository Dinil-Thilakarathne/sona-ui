import type { ReactNode } from "react";

import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import FeaturedBar from "@/components/common/featured-bar";
import { ThemeProvider } from "@/components/common/theme-provider";
import { TracwellProvider } from "@/components/common/tracwell-provider";
import Header from "@/components/header";
import { siteMetaData } from "@/config/metadata";
import { clashDisplay, HelveticaNeue } from "@/fonts";
import { FEATURE_FLAG } from "@/lib/constants";
import { DevelopmentGuideframe } from "./development-guideframe";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteMetaData.title,
  description: siteMetaData.description,
  url: "https://sonaui.com",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  author: {
    "@type": "Person",
    name: "Dinil Thilakarathne",
    url: "https://github.com/Dinil-Thilakarathne",
  },
};
const structuredDataJson = JSON.stringify(structuredData).replace(
  /</g,
  "\\u003c",
);

const themeInitializationScript = `
  (() => {
    try {
      const savedTheme = window.localStorage.getItem("theme");
      const theme =
        savedTheme === "light" || savedTheme === "dark"
          ? savedTheme
          : window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
      const root = document.documentElement;
      root.dataset.theme = theme;
      root.style.colorScheme = theme;
    } catch {}
  })();
`;
export const metadata: Metadata = siteMetaData;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static theme bootstrap script
          dangerouslySetInnerHTML={{ __html: themeInitializationScript }}
        />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: serialized static site metadata
          dangerouslySetInnerHTML={{ __html: structuredDataJson }}
        />
      </head>
      <body
        className={`${geistMono.variable} ${geistSans.variable} ${clashDisplay.variable} ${HelveticaNeue.variable} bg-background text-foreground antialiased relative`}
      >
        <TracwellProvider>
          <ThemeProvider>
            {FEATURE_FLAG && <FeaturedBar />}
            <Header />
            {children}
            <Toaster position="bottom-right" richColors />
            <DevelopmentGuideframe />
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </TracwellProvider>
      </body>
    </html>
  );
}
