import { type ReactNode } from "react";

import "./globals.css";
import "@radix-ui/themes/styles.css";

import { clashDisplay } from "@/fonts";
import { PostHogProvider } from "./providers";
import { ThemeProvider } from "@/components/Common/theme-provider";
import Header from "@/components/Header";
import FeaturedBar from "@/components/Common/FeaturedBar";
import { FEATURE_FLAG } from "@/lib/constants";
import { siteMetaData } from "@/config/metadata";
import { Geist, Geist_Mono } from "next/font/google";

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
        className={`${geistMono.variable} ${geistSans.variable} ${clashDisplay.variable} bg-background antialiased dark:text-slate-100`}
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
