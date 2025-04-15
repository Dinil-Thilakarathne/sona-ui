import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { clashDisplay } from "@/fonts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sona UI - Modern React Component Library",
  description:
    "A modern UI component library built with React and TailwindCSS to help you build beautiful and accessible web applications faster.",
  keywords: [
    "React",
    "UI Components",
    "TailwindCSS",
    "Component Library",
    "Sona UI",
    "Modern UI",
    "Accessible Web",
  ],
  authors: [{ name: "Dinil Thilakarathne", url: "https://github.com/Dinil-Thilakarathne" }],
  creator: "Dinil Thilakarathne",
  openGraph: {
    title: "Sona UI - Modern React Component Library",
    description:
      "A modern UI component library built with React and TailwindCSS to help you build beautiful and accessible web applications faster.",
    url: "https://sona-ui.vercel.app",
    siteName: "Sona UI",
    images: [
      {
        url: "https://sona-ui.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sona UI - Modern React Component Library",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sona UI - Modern React Component Library",
    description:
      "A modern UI component library built with React and TailwindCSS to help you build beautiful and accessible web applications faster.",
    images: ["https://sona-ui.vercel.app/og-image.png"],
    creator: "@codebydinil",
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
        <Header />
        {children}
      </body>
    </html>
  );
}
