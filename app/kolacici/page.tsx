import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AgeGate } from "@/components/layout/AgeGate";
import { CallButton } from "@/components/layout/CallButton";
import { CookieSettingsLink } from "@/components/layout/CookieSettingsLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/lib/site";
import styles from "@/components/legal/LegalPage.module.css";

const UPDATED = "6. jul 2026.";

export const metadata: Metadata = {
  title: "Politika kolačića",
  description:
    "Koje kolačiće koristi sajt Destilerije Maoduš, čemu služe i kako da upravljate saglasnošću. Neophodni kolačići za rad sajta i analitika uz vašu saglasnost.",
  alternates: { canonical: "/kolacici" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: `${site.domain}/kolacici`,
    siteName: site.name,
    title: "Politika kolačića · Destilerija Maoduš",
    description:
      "Koje kolačiće koristimo, čemu služe i kako da upravljate saglasnošću.",
  },
};

export default async function KolaciciPage() {
  const cookieStore = await cookies();
  const ageOk = cookieStore.get("maodus_age_ok")?.value === "1";

  return (
    <>
      <AgeGate defaultOpen={!ageOk} />
      <Header />
      <main>
        <section className={styles.section} aria-labelledby="kolacici-h1">
          <div className={styles.inner}>
            <Eyebrow color="gold" className={styles.eyebrow}>
              Pravne informacije
            </Eyebrow>
            <h1 id="kolacici-h1" className={styles.h1}>
              Politika kolačića
            </h1>
            <p className={styles.updated}>Poslednje ažuriranje: {UPDATED}</p>

            <p className={styles.lead}>
              Kolačići su male tekstualne datoteke koje sajt čuva na vašem
              uređaju. Koristimo ih da bismo zapamtili osnovna podešavanja i, uz
              vašu saglasnost, da razumemo kako se sajt koristi kako bismo ga
              poboljšali.
            </p>

            <div className={styles.prose}>
              <h2>Vrste kolačića koje koristimo</h2>

              <h3>Neophodni kolačići</h3>
              <p>
                Potrebni su za osnovni rad sajta i pamćenje vaših izbora. Uvek su
                aktivni i ne zahtevaju saglasnost jer bez njih sajt ne funkcioniše
                kako treba.
              </p>

              <h3>Analitički kolačići</h3>
              <p>
                Pomažu nam da izmerimo posetu i vidimo koje stranice su korisne.
                Postavljaju se <strong>samo ako ih prihvatite</strong> preko
                banera za kolačiće. Ako ih odbijete, analitika se ne pokreće.
              </p>

              <h2>Spisak kolačića</h2>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Kolačić</th>
                      <th>Svrha</th>
                      <th>Vrsta</th>
                      <th>Trajanje</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>maodus_age_ok</td>
                      <td>Pamti da ste potvrdili da imate 18+ godina.</td>
                      <td>Neophodan</td>
                      <td>12 meseci</td>
                    </tr>
                    <tr>
                      <td>maodus_consent</td>
                      <td>Pamti vaš izbor u vezi sa analitičkim kolačićima.</td>
                      <td>Neophodan</td>
                      <td>6 meseci</td>
                    </tr>
                    <tr>
                      <td>_ga, _ga_*</td>
                      <td>
                        Google Analytics: razlikuje posetioce i meri posetu.
                        Postavlja se tek nakon saglasnosti.
                      </td>
                      <td>Analitički</td>
                      <td>do 24 meseca</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>Upravljanje saglasnošću</h2>
              <p>
                Svoj izbor možete promeniti u svakom trenutku:{" "}
                <CookieSettingsLink>otvorite podešavanja kolačića</CookieSettingsLink>{" "}
                i prihvatite ili odbijete analitiku. Kolačiće možete obrisati i u
                podešavanjima svog internet pregledača, ali imajte u vidu da bez
                neophodnih kolačića delovi sajta možda neće raditi ispravno.
              </p>

              <h2>Više informacija</h2>
              <p>
                Kako postupamo sa ličnim podacima uopšte, uključujući podatke
                prikupljene analitikom, opisano je u našoj{" "}
                <a href="/privatnost">Politici privatnosti</a>. Za sva pitanja
                pišite nam na <a href={site.emailHref}>{site.email}</a>.
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
