import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medieval Poetry Generator - Fun Poetry",
  description: "Create authentic medieval-style poems with AI. Choose your character, setting, event, and emotions to craft personalized verses in English or Classical Chinese.",
  keywords: ["medieval poetry", "poem generator", "AI poetry", "classical Chinese poetry", "medieval verse", "fun poetry", "creative writing"],
  authors: [{ name: "Fun Poetry Team" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", sizes: "1024x1024", type: "image/png" }
    ],
    apple: { url: "/favicon.png", sizes: "1024x1024", type: "image/png" },
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Medieval Poetry Generator",
    description: "Craft authentic medieval verses with AI-powered poetry generation",
    url: "https://github.com/HoneyGpt/Fun-Poetry",
    siteName: "Fun Poetry",
    type: "website",
    images: [
      {
        url: "/favicon.png",
        width: 1024,
        height: 1024,
        alt: "Medieval Poetry Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medieval Poetry Generator",
    description: "Create authentic medieval-style poems with AI",
    images: ["/favicon.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
