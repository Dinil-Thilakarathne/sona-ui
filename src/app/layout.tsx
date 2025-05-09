import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";

import Header from "@/components/Header";
import { clashDisplay } from "@/fonts";
import { PostHogProvider } from "./providers";
import { SITE_METADATA } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  keywords: SITE_METADATA.keywords,
  authors: [{ name: SITE_METADATA.author, url: SITE_METADATA.authorGithub }],
  creator: SITE_METADATA.author,

  metadataBase: new URL(SITE_METADATA.siteLink),

  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    url: SITE_METADATA.siteLink,
    siteName: SITE_METADATA.siteName,
    images: [
      {
        url: SITE_METADATA.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_METADATA.title,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    images: [SITE_METADATA.twitterImage],
    creator: SITE_METADATA.authorTwitter,
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${clashDisplay.variable} font-clash-display bg-slate-200 antialiased`}
      >
        <PostHogProvider>
          <Header />
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
