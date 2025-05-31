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

export const metadata = siteMetaData;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${clashDisplay.variable} font-clash-display bg-slate-200 antialiased dark:bg-slate-950 dark:text-slate-100`}
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
