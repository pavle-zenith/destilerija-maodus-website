import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AgeGate } from "@/components/layout/AgeGate";
import { CallButton } from "@/components/layout/CallButton";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { HeroPrice } from "@/components/ui/HeroPrice";
import { PriceTable } from "@/components/ui/PriceTable";
import { HubProductCard } from "@/components/ui/HubProductCard";
import { SensorySlider } from "@/components/ui/SensorySlider";
import { Faq } from "@/components/sections/Faq";
import {
  allRakije,
  getRakijaBySlug,
  getRelatedRakije,
  getFeatures,
  rakijeGroups,
  consumerFaqs,
} from "@/lib/content";
import type { IconName } from "@/components/ui/Icon";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export function generateStaticParams() {
  return allRakije.map((r) => ({ slug: r.slug }));
}

const groupTitle = (id: string) =>
  rakijeGroups.find((g) => g.id === id)?.title ?? "Rakija";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = getRakijaBySlug(slug);
  if (!found) return {};
  const { rakija } = found;
  const title = `${rakija.name} · ${rakija.category}`;
  const description = `${rakija.name}: ${rakija.tastingNote} ${rakija.abv}, ${rakija.volume}. Poručite direktno od Destilerije Maoduš iz Kanjiže, Vojvodina.`;
  return {
    title,
    description,
    alternates: { canonical: `/rakije/${slug}` },
    openGraph: {
      type: "website",
      locale: site.locale,
      url: `${site.domain}/rakije/${slug}`,
      siteName: site.name,
      title: `${title} · Destilerija Maoduš`,
      description,
      images: [{ url: rakija.image }],
    },
  };
}

export default async function RakijaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = getRakijaBySlug(slug);
  if (!found || !found.detail) notFound();
  const { rakija, detail } = found;
  const related = getRelatedRakije(slug);
  const features = getFeatures(detail);

  // the 3-icon sensory row (per-product nose / taste / finish)
  const sensoryIcons: { icon: IconName; label: string; text: string }[] = [
    { icon: "drop", label: "Miris", text: detail.sensory.nose },
    { icon: "flask", label: "Ukus", text: detail.sensory.taste },
    { icon: "glass", label: "Završnica", text: detail.sensory.finish },
  ];

  const cookieStore = await cookies();
  const ageOk = cookieStore.get("maodus_age_ok")?.value === "1";

  const breadcrumbs = [
    { label: "Početna", href: "/" },
    { label: "Rakije", href: "/rakije" },
    { label: rakija.name },
  ];

  const lowestPrice = detail.prices.find((p) => typeof p.price === "number");

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: rakija.name,
    category: rakija.category,
    image: `${site.domain}${rakija.image}`,
    description: `${detail.sensory.nose} ${detail.sensory.taste}`,
    brand: { "@type": "Brand", name: site.name },
    ...(lowestPrice && typeof lowestPrice.price === "number"
      ? {
          offers: {
            "@type": "Offer",
            price: lowestPrice.price,
            priceCurrency: "RSD",
            availability: "https://schema.org/InStock",
            url: `${site.domain}/rakije/${slug}`,
          },
        }
      : {}),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Početna", item: site.domain },
      { "@type": "ListItem", position: 2, name: "Rakije", item: `${site.domain}/rakije` },
      { "@type": "ListItem", position: 3, name: rakija.name, item: `${site.domain}/rakije/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <AgeGate defaultOpen={!ageOk} />
      <Header />

      <main>
        {/* [1] Breadcrumb + [2] Hero */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.gallery}>
              <div className={styles.photoWrap}>
                <Image
                  src={rakija.image}
                  alt={rakija.name}
                  fill
                  sizes="(max-width: 900px) 100vw, 46vw"
                  className={styles.photo}
                  priority
                />
              </div>
            </div>

            <div className={styles.heroText}>
              <Breadcrumbs items={breadcrumbs} />
              <p className={styles.eyebrowRow}>
                <Eyebrow className={styles.eyebrow}>{groupTitle(rakija.group)}</Eyebrow>
                <span className={styles.abvTag}>{rakija.abv}</span>
              </p>
              <h1 className={styles.h1}>{rakija.name}</h1>
              <p className={styles.tastingNote}>{rakija.tastingNote}</p>

              {/* headline price with a volume toggle, store-style */}
              <HeroPrice rows={detail.prices} />

              <div className={styles.heroCtas}>
                <Button
                  href={`/kontakt?rakija=${slug}`}
                  variant="red"
                  size="lg"
                  glow
                  track={`Poručite ${rakija.name}`}
                >
                  Poručite
                </Button>
                <a
                  href={site.phoneHref}
                  className={styles.callBtn}
                  aria-label={`Pozovite nas: ${site.phone}`}
                >
                  <Icon name="phone" size={20} aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* [3] Sensory */}
        {/* [3+4] Kada piti + senzorni opis (merged) */}
        <section className={styles.section} aria-labelledby="senzorni">
          <div className={styles.sectionInner}>
            <Eyebrow className={styles.sectionEyebrow}>Kada piti</Eyebrow>
            <h2 id="senzorni" className={styles.h2}>
              {detail.whenToDrink}
            </h2>
            <p className={styles.body}>
              Temperatura služenja: {detail.servingTemp}.
            </p>

            {/* brand-feature trio as the sliding component */}
            <div className={styles.featureSlider}>
              <SensorySlider
                image={rakija.image}
                alt={rakija.name}
                panels={features.map((f, i) => ({
                  key: `f${i}`,
                  label: f.label,
                  text: f.text,
                  icon: f.icon as IconName,
                }))}
              />
            </div>

            {/* per-product sensory notes, 3-icon row (Jack Daniels style) */}
            <ul className={styles.sensoryRow}>
              {sensoryIcons.map((s) => (
                <li key={s.label} className={styles.sensoryItem}>
                  <span className={styles.sensoryIcon} aria-hidden="true">
                    <Icon name={s.icon} size={40} />
                  </span>
                  <span className={styles.sensoryLabel}>{s.label}</span>
                  <span className={styles.sensoryText}>{s.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* [5] Cenovnik — full price list next to the bottle lineup */}
        <section className={styles.section} aria-labelledby="cenovnik">
          <div className={`${styles.sectionInner} ${styles.priceInner}`}>
            <div className={styles.priceMedia}>
              <div className={styles.pricePhotoWrap}>
                <Image
                  src="/images/cenovnik-lineup.png"
                  alt="Sve zapremine, od 1 l do 0,1 l"
                  fill
                  sizes="(max-width: 900px) 100vw, 52vw"
                  className={styles.pricePhoto}
                />
              </div>
            </div>
            <div className={styles.priceContent}>
              <Eyebrow className={styles.sectionEyebrow}>Cenovnik</Eyebrow>
              <h2 id="cenovnik" className={styles.h2}>
                Sve zapremine
              </h2>
              <p className={styles.body}>
                Dostupno u više pakovanja, od poklon bočice do litarske flaše.
              </p>
              <PriceTable rows={detail.prices} />
            </div>
          </div>
        </section>

        {/* [6] Story — hidden for now (copy pending) */}

        {/* [8] Dual CTA — inset card with the bottle popping outside */}
        <section className={styles.ctaWrap} aria-label="Poručite">
          <div className={styles.ctaCard}>
            <span className={styles.ctaOrchard} aria-hidden="true" />
            <div className={styles.ctaBody}>
              <h2 className={styles.ctaH2}>Poručite {rakija.name}</h2>
              <p className={styles.ctaSub}>
                Bez webshopa: javite šta vam treba, a mi se vraćamo sa predlogom,
                količinom i dogovorom oko isporuke.
              </p>
              <div className={styles.ctaBtns}>
                <Button
                  href={`/kontakt?rakija=${slug}`}
                  variant="red"
                  size="lg"
                  glow
                  track={`Poručite ${rakija.name} (CTA)`}
                >
                  Poručite
                </Button>
                <Button
                  href="/veleprodaja"
                  variant="outline"
                  size="lg"
                  track={`Ponuda za veleprodaju (${rakija.name})`}
                >
                  Ponuda za veleprodaju
                </Button>
              </div>
            </div>
            <div className={styles.ctaMedia} aria-hidden="true">
              <Image
                src={rakija.image}
                alt=""
                width={520}
                height={650}
                className={styles.ctaBottle}
              />
            </div>
          </div>
        </section>

        {/* [9] Related */}
        <section className={styles.section} aria-labelledby="srodne">
          <div className={styles.sectionInner}>
            <Eyebrow className={styles.sectionEyebrow}>Srodne rakije</Eyebrow>
            <h2 id="srodne" className={styles.h2}>
              Možda vam se svidi i
            </h2>
            <div className={styles.relatedGrid}>
              {related.map((r) => (
                <HubProductCard key={r.slug} rakija={r} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <Faq items={consumerFaqs} />
      </main>

      <Footer />
      <CallButton />
    </>
  );
}
