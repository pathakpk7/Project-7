import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap"
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "600", "700", "900"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://captaincooldecoded.com"),
  title: "Captain Cool: Decoded | MS Dhoni Interactive Career Experience",
  description: "An interactive, cinematic, data-driven journey through MS Dhoni's career, captaincy, batting, wicketkeeping, iconic moments and legacy.",
  keywords: ["MS Dhoni", "Captain Cool", "Cricket Data Warehouse", "CSK", "Indian Cricket", "MSD", "Finisher", "Cricket Analytics"],
  authors: [{ name: "Childhood Dhoni Fan & Lead Data Engineer" }],
  icons: {
    icon: [
      { url: "/images/brand/dhoni_icon.jpg" },
      { url: "/favicon.jpg" }
    ],
    shortcut: "/images/brand/dhoni_icon.jpg",
    apple: "/images/brand/dhoni_icon.jpg",
  },
  openGraph: {
    title: "CAPTAIN COOL: DECODED",
    description: "The numbers. The decisions. The moments. Decoding the man behind No. 7.",
    type: "website",
    locale: "en_US",
    siteName: "Captain Cool: Decoded",
    images: [
      {
        url: "/images/brand/dhoni_icon.jpg",
        width: 1024,
        height: 1024,
        alt: "MS Dhoni Captain Cool No. 7 Icon"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable} ${cinzel.variable} ${cormorant.variable}`}>
      <body className="min-h-screen bg-background text-slate-100 font-sans antialiased selection:bg-csk-gold selection:text-black film-grain story-vignette relative">
        {children}
      </body>
    </html>
  );
}
