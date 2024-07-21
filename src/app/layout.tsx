import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Image toolkits from Guludoc",
  description: "Various image toolkits to help you with your image processing needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
      )}>{children}</body>
    </html>
  );
}
