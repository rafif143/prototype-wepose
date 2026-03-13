import type { Metadata } from "next";
import { Poppins, DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/shared/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wepose Travel - Visa Application Mode Easy",
  description: "Platform visa terpercaya untuk traveler Indonesia. Urus visa ke 35+ negara dengan mudah, cepat, dan aman bersama Wepose Travel.",
  icons: {
    icon: "/wepose-logo-mini.svg",
    shortcut: "/wepose-logo-mini.svg",
    apple: "/wepose-logo-mini.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body
        className={`${poppins.variable} ${dmSans.variable} antialiased font-dm-sans`}
      >
        {children}
      </body>
    </html>
  );
}
