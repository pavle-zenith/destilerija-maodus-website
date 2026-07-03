import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AgeGate } from "@/components/layout/AgeGate";
import { CallButton } from "@/components/layout/CallButton";
import { ContactSection } from "@/components/kontakt/ContactSection";
import { HowToOrder } from "@/components/sections/HowToOrder";
import { Faq } from "@/components/sections/Faq";
import { consumerFaqs, allRakije } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt · poručite rakiju",
  description:
    "Poručite Maoduš voćnu rakiju iz Kanjiže, Vojvodina za poklon, proslavu, slavu ili ličnu porudžbinu. Pošaljite upit, pozovite +381 64 61 59 033 ili pišite na mejl. Odgovaramo u roku od 24–48h.",
  alternates: { canonical: "/kontakt" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: `${site.domain}/kontakt`,
    siteName: site.name,
    title: "Kontakt · poručite rakiju · Destilerija Maoduš",
    description:
      "Poručite voćnu rakiju iz Kanjiže, Vojvodina za poklon, proslavu ili ličnu porudžbinu. Odgovaramo u roku od 24–48h.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Kontakt · Destilerija Maoduš",
  url: `${site.domain}/kontakt`,
  inLanguage: "sr-Latn-RS",
  about: { "@id": `${site.domain}/#business` },
};

export default async function KontaktPage({
  searchParams,
}: {
  searchParams: Promise<{ rakija?: string }>;
}) {
  const cookieStore = await cookies();
  const ageOk = cookieStore.get("maodus_age_ok")?.value === "1";

  // prefill the form's rakija select when arriving from a detail page (?rakija=slug)
  const { rakija: rakijaSlug } = await searchParams;
  const preselected = rakijaSlug
    ? allRakije.find((r) => r.slug === rakijaSlug)?.name ?? ""
    : "";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AgeGate defaultOpen={!ageOk} />
      <Header />
      <main>
        <ContactSection defaultRakija={preselected} />
        <HowToOrder showCtas={false} />
        <Faq items={consumerFaqs} />
      </main>
      <Footer />
      <CallButton />
    </>
  );
}
