import { type ReactNode } from "react";

import "./globals.css";
import "@radix-ui/themes/styles.css";

import { PostHogProvider } from "./providers";
import Header from "@/components/header";
import FeaturedBar from "@/components/common/featured-bar";
import { FEATURE_FLAG } from "@/lib/constants";
import { siteMetaData } from "@/config/metadata";
import { Geist, Geist_Mono } from "next/font/google";
import { clashDisplay } from "@/fonts";
import { ThemeProvider } from "@/components/common/theme-provider";

export const metadata = siteMetaData;

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
        className={`${geistMono.variable} ${geistSans.variable} ${clashDisplay.variable} bg-background antialiased`}
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
