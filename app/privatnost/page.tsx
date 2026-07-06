import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AgeGate } from "@/components/layout/AgeGate";
import { CallButton } from "@/components/layout/CallButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/lib/site";
import styles from "@/components/legal/LegalPage.module.css";

const UPDATED = "6. jul 2026.";

export const metadata: Metadata = {
  title: "Politika privatnosti",
  description:
    "Kako Destilerija Maoduš prikuplja, koristi i štiti vaše lične podatke kada nam pošaljete upit, poručite rakiju ili posetite sajt. Vaša prava i kontakt rukovaoca.",
  alternates: { canonical: "/privatnost" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: `${site.domain}/privatnost`,
    siteName: site.name,
    title: "Politika privatnosti · Destilerija Maoduš",
    description:
      "Kako prikupljamo, koristimo i štitimo vaše lične podatke, i koja su vaša prava.",
  },
};

export default async function PrivatnostPage() {
  const cookieStore = await cookies();
  const ageOk = cookieStore.get("maodus_age_ok")?.value === "1";

  return (
    <>
      <AgeGate defaultOpen={!ageOk} />
      <Header />
      <main>
        <section className={styles.section} aria-labelledby="privatnost-h1">
          <div className={styles.inner}>
            <Eyebrow color="gold" className={styles.eyebrow}>
              Pravne informacije
            </Eyebrow>
            <h1 id="privatnost-h1" className={styles.h1}>
              Politika privatnosti
            </h1>
            <p className={styles.updated}>Poslednje ažuriranje: {UPDATED}</p>

            <p className={styles.lead}>
              Ova politika objašnjava koje lične podatke prikupljamo kada nam se
              obratite ili posetite naš sajt, zašto ih obrađujemo i koja prava
              imate. Podatke tražimo samo kada su nam potrebni da bismo odgovorili
              na vaš upit ili dogovorili porudžbinu.
            </p>

            <div className={styles.prose}>
              <h2>Ko je rukovalac podacima</h2>
              <p>
                Rukovalac vaših ličnih podataka je preduzetnička radnja koja
                posluje pod poslovnim imenom Destilerija Maoduš:
              </p>
              <div className={styles.card}>
                <dl>
                  <dt>Poslovno ime</dt>
                  <dd>{site.legal.businessName}</dd>
                  <dt>Pravna forma</dt>
                  <dd>{site.legal.legalForm}</dd>
                  <dt>Matični broj</dt>
                  <dd>{site.legal.registrationNumber}</dd>
                  <dt>PIB</dt>
                  <dd>{site.legal.taxId}</dd>
                  <dt>Adresa</dt>
                  <dd>{site.addressShort}</dd>
                  <dt>Telefon</dt>
                  <dd>
                    <a href={site.phoneHref}>{site.phone}</a>
                  </dd>
                  <dt>Mejl</dt>
                  <dd>
                    <a href={site.emailHref}>{site.email}</a>
                  </dd>
                </dl>
              </div>

              <h2>Koje podatke prikupljamo</h2>
              <p>
                Prikupljamo samo podatke koje nam vi dobrovoljno ostavite i
                osnovne tehničke podatke o poseti sajtu:
              </p>
              <ul>
                <li>
                  <strong>Kontakt i upit:</strong> ime, telefon i/ili mejl, grad,
                  a kod veleprodaje i naziv objekta i tip lokala. Uz to i sadržaj
                  poruke koju sami napišete (rakija koja vas zanima, količina,
                  prilika).
                </li>
                <li>
                  <strong>Prijava na novosti:</strong> mejl adresa, ako se
                  prijavite na naše obaveštenja.
                </li>
                <li>
                  <strong>Tehnički podaci:</strong> anonimizovani podaci o poseti
                  (posećene stranice, tip uređaja, približna lokacija), ali samo
                  ako prihvatite analitičke kolačiće.
                </li>
              </ul>
              <p>
                Ne tražimo i ne obrađujemo posebne kategorije podataka, niti
                svesno prikupljamo podatke maloletnika. Sajt je namenjen
                punoletnim osobama (18+).
              </p>

              <h2>Zašto obrađujemo podatke i po kom osnovu</h2>
              <ul>
                <li>
                  <strong>Da odgovorimo na upit i dogovorimo porudžbinu.</strong>{" "}
                  Osnov je preduzimanje radnji na vaš zahtev pre zaključenja i
                  radi izvršenja ugovora.
                </li>
                <li>
                  <strong>Da vam šaljemo novosti,</strong> ako ste se prijavili.
                  Osnov je vaša saglasnost, koju možete povući u svakom trenutku.
                </li>
                <li>
                  <strong>Da merimo i poboljšavamo sajt</strong> putem analitike.
                  Osnov je vaša saglasnost data preko banera za kolačiće.
                </li>
                <li>
                  <strong>Da ispunimo zakonske obaveze</strong> (npr. poresko
                  računovodstvene), kada je porudžbina realizovana. Osnov je
                  zakonska obaveza.
                </li>
              </ul>

              <h2>Kome poveravamo podatke</h2>
              <p>
                Vaše podatke ne prodajemo. Delimo ih samo sa pouzdanim pružaocima
                usluga koji nam pomažu da vodimo sajt i odgovorimo na upite, i to
                u meri koja je neophodna:
              </p>
              <ul>
                <li>
                  <strong>Vercel</strong> (hosting sajta),
                </li>
                <li>
                  <strong>Resend</strong> (dostava mejla sa vašim upitom nama),
                </li>
                <li>
                  <strong>Sanity</strong> (bezbedno čuvanje pristiglih upita),
                </li>
                <li>
                  <strong>Google Analytics</strong> (analitika posete, samo uz
                  vašu saglasnost).
                </li>
              </ul>
              <p>
                Neki od ovih pružalaca obrađuju podatke van Srbije. U tim
                slučajevima prenos se vrši uz odgovarajuće mere zaštite u skladu
                sa propisima.
              </p>

              <h2>Koliko dugo čuvamo podatke</h2>
              <p>
                Upite i prepisku čuvamo koliko je potrebno da odgovorimo i vodimo
                saradnju, a najduže dve godine od poslednjeg kontakta, osim ako
                zakon ne nalaže duže (npr. računovodstvena dokumentacija).
                Prijavu na novosti čuvamo dok se ne odjavite. Analitički podaci
                čuvaju se u skladu sa podešavanjima Google Analytics servisa.
              </p>

              <h2>Vaša prava</h2>
              <p>U vezi sa svojim podacima imate pravo da:</p>
              <ul>
                <li>zatražite pristup podacima koje o vama imamo,</li>
                <li>tražite ispravku netačnih ili dopunu nepotpunih podataka,</li>
                <li>tražite brisanje podataka („pravo na zaborav"),</li>
                <li>tražite ograničenje ili uložite prigovor na obradu,</li>
                <li>povučete datu saglasnost, bez uticaja na prethodnu obradu,</li>
                <li>
                  podnesete pritužbu Povereniku za informacije od javnog značaja
                  i zaštitu podataka o ličnosti.
                </li>
              </ul>
              <p>
                Za ostvarivanje bilo kog prava pišite nam na{" "}
                <a href={site.emailHref}>{site.email}</a> ili nas pozovite na{" "}
                <a href={site.phoneHref}>{site.phone}</a>. Odgovaramo u razumnom
                roku.
              </p>

              <h2>Kolačići</h2>
              <p>
                Sajt koristi kolačiće neophodne za rad i, uz vašu saglasnost,
                analitičke kolačiće. Detalje pogledajte u{" "}
                <a href="/kolacici">Politici kolačića</a>.
              </p>

              <h2>Izmene ove politike</h2>
              <p>
                Ovu politiku možemo povremeno ažurirati. Aktuelna verzija uvek je
                dostupna na ovoj stranici, sa datumom poslednjeg ažuriranja na
                vrhu.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CallButton />
    </>
  );
}
