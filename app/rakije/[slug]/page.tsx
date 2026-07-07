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
import { StoryReveal } from "@/components/ui/StoryReveal";
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
  if (!found || !found.detail) return {};
  const { rakija, detail } = found;
  // guide formula: "{Ime} | {fraza pretrage}" — layout template appends
  // " | Destilerija Maoduš" automatically.
  const title = detail.metaTitle;
  const description = detail.metaDescription;
  return {
    title,
    description,
    alternates: { canonical: `/rakije/${slug}` },
    openGraph: {
      type: "website",
      locale: site.locale,
      url: `${site.domain}/rakije/${slug}`,
      siteName: site.name,
      title: `${title} | ${site.name}`,
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

  // All volumes with a numeric price feed the AggregateOffer + per-volume Offers,
  // so search + AI agents read the full price range, not a single SKU.
  const productUrl = `${site.domain}/rakije/${slug}`;
  const pricedRows = detail.prices.filter(
    (p): p is { volume: string; price: number } => typeof p.price === "number",
  );
  const numericPrices = pricedRows.map((p) => p.price);

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: rakija.name,
    category: rakija.category,
    image: `${site.domain}${rakija.image}`,
    description: `${detail.sensory.nose} ${detail.sensory.taste}`,
    brand: { "@type": "Brand", name: site.name },
    ...(numericPrices.length > 0
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "RSD",
            lowPrice: Math.min(...numericPrices),
            highPrice: Math.max(...numericPrices),
            offerCount: pricedRows.length,
            availability: "https://schema.org/InStock",
            url: productUrl,
            offers: pricedRows.map((p) => ({
              "@type": "Offer",
              name: `${rakija.name} ${p.volume}`,
              price: p.price,
              priceCurrency: "RSD",
              availability: "https://schema.org/InStock",
              url: productUrl,
            })),
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

  // Per-product FAQ (only Dunja, per guide) gets its own FAQPage schema.
  // Everything else shows the general consumer FAQ without duplicate markup.
  const productFaqs = detail.faq ?? consumerFaqs;
  const faqLd = detail.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: detail.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

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
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <AgeGate defaultOpen={!ageOk} />
      <Header />

      <main>
        {/* [1] Breadcrumb + [2] Hero */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.crumbs}>
              <Breadcrumbs items={breadcrumbs} />
            </div>

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
                <span className={styles.abvTag}>{rakija.abv}</span>
              </div>
            </div>

            <div className={styles.heroText}>
              <div className={styles.eyebrowRow}>
                <Eyebrow className={styles.eyebrow}>{groupTitle(rakija.group)}</Eyebrow>
              </div>
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
                  image: f.image,
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

            {/* barrique → uparivanje; classic → u koktelu */}
            {(detail.pairing || detail.cocktail) && (
              <p className={styles.pairing}>
                <span className={styles.pairingLabel}>
                  {detail.cocktail ? "U koktelu" : "Uparite sa"}
                </span>
                {detail.cocktail ?? detail.pairing}
              </p>
            )}
          </div>
        </section>

        {/* [6] Priča — poreklo, sorta, proces */}
        <section className={`${styles.section} ${styles.alt}`} aria-labelledby="prica">
          <div className={`${styles.sectionInnerNarrow} ${styles.storyInner}`}>
            <div className={styles.storyKicker}>
              <Eyebrow className={styles.sectionEyebrow}>Priča</Eyebrow>
              <h2 id="prica" className={styles.storyHeading}>
                Kako nastaje {rakija.name}
              </h2>
            </div>
            <StoryReveal text={detail.story} emphasis={detail.storyEmphasis} />
          </div>
        </section>

        {/* [5] Cenovnik — full price list next to the bottle lineup */}
        <section className={styles.section} aria-labelledby="cenovnik">
          <div className={`${styles.sectionInner} ${styles.priceInner}`}>
            <div className={styles.priceMedia}>
              <div className={styles.pricePhotoWrap}>
                <Image
                  src={detail.groupImage ?? "/images/cenovnik-lineup.png"}
                  alt={`${rakija.name}, sve zapremine od 0,5 l do 1 l`}
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
                Dostupno u više zapremina, od 0,5 l do litarske flaše.
              </p>
              <PriceTable rows={detail.prices} />
            </div>
          </div>
        </section>

        {/* [8] Dual CTA — inset card with the bottle popping outside */}
        <section className={styles.ctaWrap} aria-label="Poručite">
          <div className={styles.ctaCard}>
            <span className={styles.ctaOrchard} aria-hidden="true" />
            <div className={styles.ctaBody}>
              <h2 className={styles.ctaH2}>Poručite {rakija.accusative}</h2>
              <p className={styles.ctaSub}>
                Pošaljite upit ili nas pozovite, a mi se vraćamo sa predlogom,
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
              <p className={styles.ctaSlogan}>„{site.slogan}"</p>
            </div>
            <div className={styles.ctaMedia} aria-hidden="true">
              <Image
                src={detail.ctaImage ?? rakija.image}
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
        <Faq items={productFaqs} />
      </main>

      <Footer />
      <CallButton />
    </>
  );
}
