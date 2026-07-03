import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Analytics } from "@/components/analytics/Analytics";
import { CookieConsent } from "@/components/layout/CookieConsent";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "Destilerija Maoduš | Voćna rakija iz Kanjiže, Vojvodina",
    template: "%s | Destilerija Maoduš",
  },
  description: site.description,
  keywords: [
    "rakija",
    "voćna rakija",
    "destilerija",
    "Kanjiža",
    "rakija Kanjiža",
    "Vojvodina",
    "veleprodaja rakije",
    "rakija za poklon",
    "barrique rakija",
    "dunja",
    "kajsija",
    "viljamovka",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.domain,
    siteName: site.name,
    title: "Destilerija Maoduš | Voćna rakija iz Kanjiže, Vojvodina",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sr" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        {children}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
