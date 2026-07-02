import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactCtas } from "@/components/forms/ContactCtas";
import { site } from "@/lib/site";
import styles from "./FinalCta.module.css";

export function FinalCta() {
  return (
    <section id="kontakt" className={styles.section} aria-label="Kontakt">
      <Image
        src="/images/cta-bar.png"
        alt="Maoduš rakije na šanku"
        fill
        sizes="100vw"
        className={styles.bg}
      />
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.content}>
        <Eyebrow variant="rules" color="gold" className={styles.eyebrow}>
          Javite nam šta vam treba
        </Eyebrow>
        <h2 className={styles.h2}>
          Za poklon, proslavu, meni ili ličnu porudžbinu
        </h2>
        <p className={styles.slogan}>„{site.slogan}"</p>

        <ContactCtas />

        <p className={styles.contact}>
          Pozovite{" "}
          <a href={site.phoneHref} className={styles.contactLink}>
            {site.phone}
          </a>{" "}
          &nbsp;·&nbsp;{" "}
          <a href={site.emailHref} className={styles.contactLink}>
            {site.email}
          </a>{" "}
          &nbsp;·&nbsp;{" "}
          <a
            href={site.instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            {site.instagram}
          </a>
        </p>
      </div>
    </section>
  );
}
