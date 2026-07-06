import Image from "next/image";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { CookieSettingsLink } from "./CookieSettingsLink";
import { site } from "@/lib/site";
import styles from "./Footer.module.css";

const columns = [
  {
    title: "Proizvodi",
    links: [
      { label: "Dunja", href: "/rakije/dunja" },
      { label: "Kajsija", href: "/rakije/kajsija" },
      { label: "Viljamovka", href: "/rakije/viljamovka" },
      { label: "Sve rakije", href: "/rakije" },
    ],
  },
  {
    title: "Mapa sajta",
    links: [
      { label: "Rakije", href: "/rakije" },
      { label: "Veleprodaja", href: "/veleprodaja" },
      { label: "O nama", href: "/#o-nama" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    title: "Info",
    links: [
      { label: "Kontakt", href: "/kontakt" },
      { label: "Privatnost", href: "/privatnost" },
      { label: "Kolačići", href: "/kolacici" },
    ],
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.orchard} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <Image
              src="/images/logo-white.png"
              alt="Destilerija Maoduš"
              width={200}
              height={52}
              className={styles.logo}
            />
            <p className={styles.tagline}>
              Destilerija Maoduš je porodična destilerija iz Kanjiže u Vojvodini
              koja već tri generacije proizvodi rakiju od dunje, kajsije,
              viljamovke, jabuke i šljive za ugostitelje i kupce širom regiona.
            </p>
            <div className={styles.contact}>
              <address className={styles.address}>{site.address}</address>
              <a href={site.phoneHref} className={styles.contactLink}>
                {site.phone}
              </a>
              <a href={site.emailHref} className={styles.contactLink}>
                {site.email}
              </a>
            </div>
          </div>

          <div className={styles.newsletter}>
            <div className={styles.newsletterTitle}>Novosti i nova izdanja</div>
            <p className={styles.newsletterNote}>
              Povremeno, bez spama, samo za punoletne (18+).
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className={styles.columns}>
          {columns.map((col) => (
            <div key={col.title}>
              <div className={styles.colTitle}>{col.title}</div>
              <div className={styles.colLinks}>
                {col.links.map((l) => (
                  <a key={l.label} href={l.href} className={styles.colLink}>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.legal}>
          <span className={styles.copy}>
            © 2026 Destilerija Maoduš. Sva prava zadržana.
          </span>
          <div className={styles.legalRight}>
            <span className={styles.responsible}>
              <span className={styles.badge}>18+</span> Uživajte odgovorno.
            </span>
            <a href="/privatnost" className={styles.legalLink}>
              Privatnost
            </a>
            <a href="/kolacici" className={styles.legalLink}>
              Kolačići
            </a>
            <CookieSettingsLink className={styles.legalLink}>
              Podešavanja kolačića
            </CookieSettingsLink>
          </div>
        </div>
      </div>

      <div className={styles.wordmarkWrap} aria-hidden="true">
        <span className={styles.wordmark}>DESTILERIJA MAODUŠ</span>
      </div>
    </footer>
  );
}
