import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AgeGate } from "@/components/layout/AgeGate";
import { CallButton } from "@/components/layout/CallButton";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HubProductCard } from "@/components/ui/HubProductCard";
import { Button } from "@/components/ui/Button";
import { allRakije } from "@/lib/content";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Domaća voćna rakija iz Vojvodine",
  description:
    "Osam domaćih voćnih rakija: voćne bele (dunja, kajsija, viljamovka), barrique u hrastu i classic za koktele. Voće iz sopstvenog voćnjaka. Pogledajte cene.",
  alternates: { canonical: "/rakije" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: `${site.domain}/rakije`,
    siteName: site.name,
    title: "Domaća voćna rakija iz Vojvodine | Destilerija Maoduš",
    description:
      "Osam domaćih voćnih rakija u tri linije: voćne bele, barrique odležane u hrastu i classic za koktele. Pogledajte asortiman i cene.",
  },
};

const breadcrumbs = [
  { label: "Početna", href: "/" },
  { label: "Rakije" },
];

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Početna", item: site.domain },
    { "@type": "ListItem", position: 2, name: "Rakije", item: `${site.domain}/rakije` },
  ],
};

const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Rakije · Destilerija Maoduš",
  itemListElement: allRakije.map((r, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: r.name,
    url: `${site.domain}/rakije/${r.slug}`,
  })),
};

export default async function RakijePage() {
  const cookieStore = await cookies();
  const ageOk = cookieStore.get("maodus_age_ok")?.value === "1";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <AgeGate defaultOpen={!ageOk} />
      <Header />

      <main>
        {/* [1] Breadcrumb + intro */}
        <section className={styles.intro} aria-labelledby="rakije-h1">
          <div className={styles.introInner}>
            <div className={styles.introText}>
              <Breadcrumbs items={breadcrumbs} />
              <Eyebrow className={styles.eyebrow}>Asortiman</Eyebrow>
              <h1 id="rakije-h1" className={styles.h1}>
                Naše rakije
              </h1>
              <p className={styles.lede}>
                Osam domaćih voćnih rakija, svaka od voća iz sopstvenog voćnjaka i
                dvostruke destilacije u bakru. Izaberite bocu za poklon, proslavu,
                meni ili kućnu kolekciju.
              </p>
            </div>
            <div className={styles.introCta}>
              <Button href="/kontakt" variant="red" size="lg" glow track="Poručite (rakije hero)">
                Poručite rakiju →
              </Button>
            </div>
          </div>
        </section>

        {/* [2] All rakije — single grid, no categories */}
        <section className={styles.products} aria-label="Sve rakije">
          <div className={styles.grid}>
            {allRakije.map((r, i) => (
              <HubProductCard key={r.slug} rakija={r} priority={i === 0} />
            ))}
          </div>
        </section>

        {/* [3] Closing CTA — same block as the homepage */}
        <FinalCta />
      </main>

      <Footer />
      <CallButton />
    </>
  );
}
