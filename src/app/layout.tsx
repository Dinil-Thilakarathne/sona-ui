import type { ReactNode } from "react";

import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import FeaturedBar from "@/components/common/featured-bar";
import { ThemeProvider } from "@/components/common/theme-provider";
import Header from "@/components/header";
import { siteMetaData } from "@/config/metadata";
import { clashDisplay } from "@/fonts";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistMono.variable} ${geistSans.variable} ${clashDisplay.variable} bg-background text-foreground antialiased`}
      >
        <PostHogProvider>
          <ThemeProvider>
            {FEATURE_FLAG && <FeaturedBar />}
            <Header />
            {children}
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
