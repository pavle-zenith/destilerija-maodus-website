import type { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AgeGate } from "@/components/layout/AgeGate";
import { CallButton } from "@/components/layout/CallButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { HubProductCard } from "@/components/ui/HubProductCard";
import { Proof } from "@/components/sections/Proof";
import { HowToOrder, type OrderStep } from "@/components/sections/HowToOrder";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { WholesaleForm } from "@/components/forms/WholesaleForm";
import { rakije, b2bSegments, wholesaleFaqs, venueTypes } from "@/lib/content";
import type { WholesaleWant } from "@/lib/leadSchemas";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Veleprodaja · rakija za ugostitelje",
  description:
    "Rakija za restorane, barove, sale i vinoteke: besplatan degustacioni uzorak pre odluke, direktna isporuka bez posrednika i personalizovana etiketa. Destilerija Maoduš, Kanjiža, Vojvodina.",
  alternates: { canonical: "/veleprodaja" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: `${site.domain}/veleprodaja`,
    siteName: site.name,
    title: "Veleprodaja · rakija za ugostitelje · Destilerija Maoduš",
    description:
      "Besplatan degustacioni uzorak za restorane, barove, sale i vinoteke. Direktna saradnja sa porodičnom destilerijom iz Vojvodine.",
  },
};

const trustBullets = [
  "Bez posrednika",
  "Direktna isporuka po dogovoru",
  "Besplatan degustacioni uzorak",
  "Etiketa za vaš lokal na zahtev",
];

const cooperationSteps: OrderStep[] = [
  {
    n: "1",
    title: "Pošaljete upit",
    text: "Kažete nam tip lokala i šta vas zanima, preko forme, telefona ili mejla.",
  },
  {
    n: "2",
    title: "Stiže degustacioni uzorak",
    text: "Probate sa svojim timom, na miru i bez ikakve obaveze.",
  },
  {
    n: "3",
    title: "Dogovaramo uslove i isporuku",
    text: "Količine, ritam isporuke i etiketa po želji za vaš lokal ili događaj.",
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Početna", item: site.domain },
    { "@type": "ListItem", position: 2, name: "Veleprodaja", item: `${site.domain}/veleprodaja` },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: wholesaleFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/** builds a same-page CTA href that prefills the form and scrolls to it */
const upitHref = (want: WholesaleWant, venue?: string) =>
  `/veleprodaja?zelja=${want}${venue ? `&tip=${encodeURIComponent(venue)}` : ""}#upit`;

export default async function VeleprodajaPage({
  searchParams,
}: {
  searchParams: Promise<{ zelja?: string; tip?: string }>;
}) {
  const cookieStore = await cookies();
  const ageOk = cookieStore.get("maodus_age_ok")?.value === "1";

  // CTA links prefill the form via ?zelja= (šta žele) and ?tip= (tip objekta)
  const { zelja, tip } = await searchParams;
  const defaultWant: WholesaleWant =
    zelja === "ponuda" ? "ponuda" : zelja === "oboje" ? "oboje" : "uzorak";
  const defaultVenue = (venueTypes as readonly string[]).includes(tip ?? "")
    ? (tip as string)
    : "";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <AgeGate defaultOpen={!ageOk} />
      <Header />

      <main>
        {/* [1] Hero — sample-first */}
        <section className={styles.hero} aria-labelledby="veleprodaja-h1">
          <Image
            src="/images/b2b-sank.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.heroBg}
          />
          <div className={styles.heroScrim} aria-hidden="true" />
          <div className={styles.heroInner}>
            <Eyebrow variant="dash" color="gold" className={styles.heroEyebrow}>
              Za ugostitelje i organizatore
            </Eyebrow>
            <h1 id="veleprodaja-h1" className={styles.h1}>
              Probajte pre nego što odlučite
            </h1>
            <p className={styles.heroSub}>
              Porodična destilerija iz Vojvodine. Radimo direktno, bez posrednika,
              sa restoranima, barovima, salama i vinotekama.
            </p>
            <div className={styles.heroCtas}>
              <Button
                href={upitHref("uzorak")}
                variant="red"
                size="lg"
                glow
                track="Zatražite degustacioni uzorak (hero)"
              >
                Zatražite besplatan degustacioni uzorak
              </Button>
              <Button
                href={upitHref("ponuda")}
                variant="outlineGold"
                size="lg"
                track="Pošaljite veleprodajni upit (hero)"
              >
                Pošaljite veleprodajni upit
              </Button>
            </div>
            <p className={styles.heroNote}>Vaši gosti već traže pravu domaću rakiju.</p>
            <ul className={styles.heroBullets}>
              {trustBullets.map((b) => (
                <li key={b} className={styles.heroBullet}>
                  <span className={styles.tick} aria-hidden="true">✓</span> {b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* [2] Partner wall — proof right after the hero */}
        <Proof
          eyebrow="Već nam veruju"
          title="Restorani, barovi i sale koji služe Maoduš"
          intro={null}
          showChecks={false}
        />

        {/* [3] Segments — "Za vaš tip lokala" */}
        <section className={styles.section} aria-labelledby="segmenti">
          <div className={styles.sectionInner}>
            <Eyebrow className={styles.sectionEyebrow}>Za vaš tip lokala</Eyebrow>
            <h2 id="segmenti" className={styles.h2}>
              Jedna destilerija, tri različita šanka
            </h2>
            <p className={styles.lede}>
              Restoran, bar i sala ne služe rakiju na isti način. Zato predlažemo
              izbor prema vašim gostima, a uzorak šaljemo da proverite pre odluke.
            </p>

            <div className={styles.segmentStack}>
              {b2bSegments.map((s) => (
                <article key={s.id} className={styles.segment}>
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className={styles.segmentPhoto}
                  />
                  <span className={styles.segmentTint} aria-hidden="true" />
                  <div className={styles.segmentBody}>
                    <span className={styles.segmentIcon} aria-hidden="true">
                      <Icon name={s.icon as IconName} size={30} />
                    </span>
                    <h3 className={styles.segmentTitle}>{s.title}</h3>
                    <p className={styles.segmentPitch}>{s.pitch}</p>
                    <p className={styles.segmentRecLabel}>Preporučujemo</p>
                    <ul className={styles.segmentRecs}>
                      {s.recommended.map((r) => (
                        <li key={r} className={styles.segmentRec}>
                          {r}
                        </li>
                      ))}
                    </ul>
                    {s.id === "sale" && (
                      /* TODO: /veleprodaja/vas-brend (white-label podstranica) još ne postoji — izgraditi kasnije */
                      <p className={styles.whiteLabel}>
                        Želite rakiju pod sopstvenim brendom?{" "}
                        <Link href="/veleprodaja/vas-brend" className={styles.whiteLabelLink}>
                          Saznajte više
                        </Link>
                      </p>
                    )}
                  </div>
                  <div className={styles.segmentAction}>
                    <Button
                      href={upitHref("uzorak", s.venueType)}
                      variant="red"
                      size="lg"
                      glow
                      track={s.ctaLabel}
                    >
                      {s.ctaLabel}
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* [4] Za ugostitelje — authority through specifics (redesign 2026-07-03) */}
        <section id="zasto-maodus" className={styles.why} aria-label="Za ugostitelje">
          <div className={styles.whyInner}>
            <div className={styles.whyHeader}>
              <div>
                <Eyebrow variant="dash" color="gold" className={styles.whyEyebrow}>
                  Za ugostitelje
                </Eyebrow>
                <h2 className={styles.whyH2}>
                  Rakija za meni koji ima šta da preporuči.
                </h2>
              </div>
              <p className={styles.whyIntro}>
                Radimo sa restoranima, barovima, salama i vinotekama i stojimo iza
                svake flaše koju vaš konobar otvori pred gostom.
              </p>
            </div>

            <div className={styles.whyLayout}>
              {/* image panel with a pill tag */}
              <div className={styles.whyMedia}>
                <Image
                  src="/images/b2b-sank.png"
                  alt="Rakija Maoduš na šanku restorana"
                  fill
                  sizes="(max-width: 960px) 100vw, 42vw"
                  className={styles.whyMediaImg}
                />
                <span className={styles.whyMediaScrim} aria-hidden="true" />
                <span className={styles.whyPill}>
                  <Icon name="checkCircle" size={15} />
                  Isti ukus u svakoj šarži
                </span>
              </div>

              {/* 2×2 card grid — one tight line each */}
              <div className={styles.whyGrid}>
                <div className={styles.whyCard}>
                  <span className={styles.whyIcon} aria-hidden="true">
                    <Icon name="barrel" size={22} />
                  </span>
                  <h3 className={styles.whyCardTitle}>Isti ukus, cele godine</h3>
                  <p className={styles.whyCardText}>
                    Dvostruka destilacija u bakru i kontrolisana fermentacija drže
                    svaku šaržu istom.
                  </p>
                </div>

                {/* TODO (Pavle): potvrditi da lab analiza sme da se pokaže partnerima na zahtev */}
                <div className={styles.whyCard}>
                  <span className={styles.whyIcon} aria-hidden="true">
                    <Icon name="flask" size={22} />
                  </span>
                  <h3 className={styles.whyCardTitle}>Laboratorija, ne obećanje</h3>
                  <p className={styles.whyCardText}>
                    Svaku šaržu potvrđuje laboratorijska analiza. Papir tražite uz
                    uzorak.
                  </p>
                </div>

                {/* TODO (Pavle): potvrditi „porodični voćnjak" */}
                <div className={styles.whyCard}>
                  <span className={styles.whyIcon} aria-hidden="true">
                    <Icon name="leaf" size={22} />
                  </span>
                  <h3 className={styles.whyCardTitle}>Priča koja prodaje drugu rundu</h3>
                  <p className={styles.whyCardText}>
                    Dunja iz porodičnog voćnjaka u Vojvodini, priču konobar prenese
                    u jednoj rečenici.
                  </p>
                </div>

                <div className={styles.whyCard}>
                  <span className={styles.whyIcon} aria-hidden="true">
                    <Icon name="tag" size={22} />
                  </span>
                  <h3 className={styles.whyCardTitle}>Etiketa za lokal ili događaj</h3>
                  <p className={styles.whyCardText}>
                    Ime lokala, firme ili mladenaca na boci koju pravimo za vas.
                  </p>
                </div>
              </div>
            </div>

            {/* closing line + CTA, full width under the layout */}
            <div className={styles.whyFooter}>
              <p className={styles.whyClosing}>
                Sa vama radimo direktno: dogovaramo isporuku, pratimo šta vaši gosti
                najviše traže i držimo ukus istim iz porudžbine u porudžbinu.
              </p>
              <Button href="#upit" variant="red" track="Zatražite uzorak (Za ugostitelje)">
                Zatražite uzorak
              </Button>
            </div>
          </div>
        </section>

        {/* [5] Kako izgleda saradnja — 3 koraka */}
        <HowToOrder
          eyebrow="Kako izgleda saradnja"
          accentWord="saradnje"
          intro="Bez komplikovanja i bez obaveza na početku. Prvi korak je upit, a drugi je rakija u vašoj čaši."
          steps={cooperationSteps}
          reassure="Odgovaramo u roku od 24–48h."
          showCtas={false}
        />

        {/* [6] Asortiman — condensed grid */}
        <section className={styles.alt} aria-labelledby="asortiman">
          <div className={styles.sectionInner}>
            <Eyebrow className={styles.sectionEyebrow}>Asortiman</Eyebrow>
            <h2 id="asortiman" className={styles.h2}>
              Osam rakija: voćne bele, barrique i classic linija
            </h2>
            <p className={styles.lede}>
              Jasan izbor za aperitiv, digestiv, shot i koktel program. Kliknite na
              rakiju za senzorni opis i cenovnik.
            </p>
            <div className={styles.rakijeGrid}>
              {rakije.map((r) => (
                <HubProductCard key={r.slug} rakija={r} />
              ))}
            </div>
            <div className={styles.rakijeMore}>
              <Button href="/rakije" variant="text" track="Ceo asortiman (veleprodaja)">
                Pogledajte ceo asortiman →
              </Button>
            </div>
          </div>

          {/* [7] Cenovna napomena — na upit */}
          {/* TODO (Pavle stariji): definisati veleprodajne cenovne razrede — do tada su cene "na upit" */}
          <div className={styles.priceNote}>
            <div className={styles.priceNoteCard}>
              <div className={styles.priceNoteBody}>
                <p className={styles.priceNoteTitle}>Veleprodajne cene</p>
                <p className={styles.priceNoteText}>
                  Veleprodajne cene formiramo prema količini, tipu objekta i
                  učestalosti isporuke. Pošaljite upit, a mi odgovaramo konkretnom
                  ponudom u roku od 48h.
                </p>
              </div>
              <Button href="#upit" variant="red" track="Pošaljite upit (Veleprodajne cene)">
                Pošaljite upit
              </Button>
            </div>
          </div>
        </section>

        {/* [8] Upit — kontakt + forma */}
        <section id="upit" className={`${styles.section} ${styles.inquiry}`} aria-labelledby="upit-h2">
          <div className={styles.inquiryInner}>
            <div className={styles.inquiryIntro}>
              <Eyebrow className={styles.sectionEyebrow}>Pošaljite upit</Eyebrow>
              <h2 id="upit-h2" className={styles.h2}>
                Zatražite uzorak ili ponudu
              </h2>
              <p className={styles.inquiryText}>
                Recite nam tip lokala i šta vas zanima. Ako niste sigurni šta bi
                radilo kod vaših gostiju, napišite i to: predložićemo izbor prema
                meniju i prilici.
              </p>
              <ul className={styles.contactRows}>
                <li className={styles.contactRow}>
                  <a href={site.phoneHref} className={styles.contactLink}>
                    <span className={styles.contactChip}>
                      <Icon name="phone" size={19} />
                    </span>
                    <span className={styles.contactValue}>{site.phone}</span>
                  </a>
                </li>
                <li className={styles.contactRow}>
                  <a href={site.emailHref} className={styles.contactLink}>
                    <span className={styles.contactChip}>
                      <Icon name="mail" size={19} />
                    </span>
                    <span className={styles.contactValue}>{site.email}</span>
                  </a>
                </li>
                <li className={styles.contactRow}>
                  <a
                    href={site.instagramHref}
                    className={styles.contactLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.contactChip}>
                      <Icon name="instagram" size={19} />
                    </span>
                    <span className={styles.contactValue}>{site.instagram}</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Veleprodajni upit</h3>
              <WholesaleForm
                key={`${defaultWant}-${defaultVenue}`}
                defaultWant={defaultWant}
                defaultVenue={defaultVenue}
              />
            </div>
          </div>
        </section>

        {/* [9] FAQ */}
        <Faq items={wholesaleFaqs} />

        {/* [10] Final CTA */}
        <FinalCta
          eyebrow="Za ugostitelje"
          title="Spremni da rakiju stavite na svoj meni?"
          showSlogan={false}
          showContact
        >
          <Button href="#upit" variant="red" size="lg" glow track="Zatražite uzorak (finalni CTA)">
            Zatražite uzorak
          </Button>
        </FinalCta>
      </main>

      <Footer />
      <CallButton />
    </>
  );
}
