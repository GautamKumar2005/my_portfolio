import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gautam Kumar - Software Engineer & AI Enthusiast",
  description:
    "Portfolio of Gautam Kumar, DTU Software Engineering student. Specializing in AI/ML, Full-Stack Development, and Competitive Programming.",
  keywords:
    "software engineer, AI, machine learning, full-stack, Next.js, Python, competitive programming",
  authors: [{ name: "Gautam Kumar" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gautamkumar.dev",
    title: "Gautam Kumar - Software Engineer & AI Enthusiast",
    description:
      "Portfolio showcasing projects, skills, and experience in software development and AI/ML",
    images: [
      {
        url: "https://gautamkumar.dev/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth h-full antialiased`}
    >
      <body className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
