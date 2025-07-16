import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shadcn Icon Picker - Beautiful Icon Selection Component",
  description:
    "A modern, accessible, and customizable icon picker component built with Shadcn UI, Tabler React and Tanstack Virtual. Perfect for React applications needing a beautiful icon selection interface.",
  keywords: [
    "shadcn",
    "icon picker",
    "react component",
    "ui component",
    "icon selection",
    "next.js",
    "typescript",
    "tanstack virtual",
    "tabler react",
    "fuse.js",
  ],
  authors: [{ name: "Emre Tuna", url: "https://github.com/emretuna" }],
  openGraph: {
    title: "Shadcn Icon Picker",
    description:
      "A modern, accessible, and customizable icon picker component built with Shadcn UI, Tabler React and Tanstack Virtual.",
    type: "website",
    url: "https://github.com/emretuna/shadcn-iconpicker-tabler",
    siteName: "Shadcn Icon Picker",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shadcn Icon Picker",
    description:
      "A modern, accessible, and customizable icon picker component built with Shadcn UI, Tabler React and Tanstack Virtual.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <ThemeProvider
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
