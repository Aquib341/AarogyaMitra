import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Background from "@/components/ui/Background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AarogyaMitra - Trusted Health Companion",
  description: "Multilingual, verified health information assistant for students and underserved communities.",
};

import { AccessibilityProvider } from "@/context/AccessibilityContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative overflow-hidden`}
      >
        <AccessibilityProvider>
           <Background />
           <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
             {children}
           </main>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
