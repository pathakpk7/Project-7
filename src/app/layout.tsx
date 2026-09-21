import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Captain Cool: Decoded | MS Dhoni Interactive Career Experience",
  description: "An interactive, cinematic, data-driven journey through MS Dhoni's career, captaincy, batting, wicketkeeping, iconic moments and legacy.",
  keywords: ["MS Dhoni", "Captain Cool", "Cricket Data Warehouse", "CSK", "Indian Cricket", "MSD", "Finisher", "Cricket Analytics"],
  authors: [{ name: "Childhood Dhoni Fan & Lead Data Engineer" }],
  openGraph: {
    title: "CAPTAIN COOL: DECODED",
    description: "The numbers. The decisions. The moments. Decoding the man behind No. 7.",
    type: "website",
    locale: "en_US",
    siteName: "Captain Cool: Decoded"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-background text-slate-100 font-sans antialiased selection:bg-csk-gold selection:text-black film-grain relative">
        {children}
      </body>
    </html>
  );
}
