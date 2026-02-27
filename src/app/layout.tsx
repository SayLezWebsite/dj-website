import type { Metadata } from "next";
import { Bebas_Neue, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import RadioPlayer from "@/components/RadioPlayer";
import SiteHeader from "@/components/SiteHeader";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Say Lez",
  description: "Say Lez — DJ/Producer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bebas.variable} ${inter.variable} ${playfair.variable} antialiased`}>
        <SiteHeader />
        <main className="pt-24 md:pt-16">{children}</main>
        <RadioPlayer />
      </body>
    </html>
  );
}
