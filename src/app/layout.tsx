import type { ReactNode } from "react";

import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import FeaturedBar from "@/components/common/featured-bar";
import { ThemeProvider } from "@/components/common/theme-provider";
import Header from "@/components/header";
import { siteMetaData } from "@/config/metadata";
import { clashDisplay, HelveticaNeue } from "@/fonts";
import { FEATURE_FLAG } from "@/lib/constants";

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

import { GuideframeGrid } from "@guideframe/react";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script>{themeInitializationScript}</script>
        <script type="application/ld+json">{structuredDataJson}</script>
      </head>
      <body
        className={`${geistMono.variable} ${geistSans.variable} ${clashDisplay.variable} ${HelveticaNeue.variable} bg-background text-foreground antialiased relative`}
      >
        <ThemeProvider>
          {FEATURE_FLAG && <FeaturedBar />}
          <Header />
          {children}
          <Toaster position="bottom-right" richColors />
          <GuideframeGrid
            panel={true}
            rulers={true}
            maxWidth={768}
            margin={8}
            columns={{ desktop: 6, tablet: 4, mobile: 3 }}
            gutter={8}
            defaultVisible={false}
          />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
