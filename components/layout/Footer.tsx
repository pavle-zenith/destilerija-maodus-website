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
    title: "Za porudžbinu",
    links: [
      { label: "Kako naručiti", href: "/kontakt" },
      { label: "Poklon pakovanja", href: "/kontakt" },
      { label: "Rakija za proslave", href: "/#zakoga" },
      { label: "Personalizovana etiketa", href: "/#veleprodaja" },
    ],
  },
  {
    title: "Za ugostitelje",
    links: [
      { label: "Veleprodaja", href: "/#veleprodaja" },
      { label: "Restorani i barovi", href: "/#veleprodaja" },
      { label: "Sale i svadbe", href: "/#zakoga" },
      { label: "Zatražite ponudu", href: "/kontakt" },
    ],
  },
  {
    title: "Info",
    links: [
      { label: "O nama", href: "/#o-nama" },
      { label: "Kontakt", href: "/kontakt" },
      { label: "Privatnost", href: "/privatnost" },
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
              Porodična vojvođanska destilerija voćne rakije — od pažljivo
              odabranog voća i dvostruke destilacije u bakru.
            </p>
            <div className={styles.contact}>
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
            <CookieSettingsLink className={styles.legalLink} />
          </div>
        </div>
      </div>

      <div className={styles.wordmarkWrap} aria-hidden="true">
        <span className={styles.wordmark}>DESTILERIJA MAODUŠ</span>
      </div>
    </footer>
  );
}
