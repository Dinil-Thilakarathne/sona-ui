import type { ReactNode } from "react";

import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import FeaturedBar from "@/components/common/featured-bar";
import { ThemeProvider } from "@/components/common/theme-provider";
import Header from "@/components/header";
import { siteMetaData } from "@/config/metadata";
import { clashDisplay, HelveticaNeue } from "@/fonts";
import { FEATURE_FLAG } from "@/lib/constants";
import { PostHogProvider } from "./providers";

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
      <body
        className={`${geistMono.variable} ${geistSans.variable} ${clashDisplay.variable} ${HelveticaNeue.variable} bg-background text-foreground antialiased relative`}
      >
        <PostHogProvider>
          <ThemeProvider>
            {FEATURE_FLAG && <FeaturedBar />}
            <Header />
            {children}
            <Toaster position="bottom-right" richColors />
            <div className="bg-[radial-gradient(120%_75%_at_50%_-5%,#ffffff12,#0000_60%)] fixed min-h-svh w-full top-0 left-0 select-none z-0"></div>
            <GuideframeGrid
              panel={true}
              rulers={true}
              maxWidth={768}
              margin={8}
              columns={{ desktop: 6, tablet: 4, mobile: 3 }}
              gutter={8}
              defaultVisible={false}
            />
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
