import type { ReactNode } from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactCtas } from "@/components/forms/ContactCtas";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import styles from "./FinalCta.module.css";

export function FinalCta({
  eyebrow = "Javite nam šta vam treba",
  title = "Za poklon, proslavu, meni ili ličnu porudžbinu",
  showSlogan = true,
  showContact = false,
  children,
}: {
  eyebrow?: string;
  title?: string;
  showSlogan?: boolean;
  /** phone · email · instagram line under the CTAs */
  showContact?: boolean;
  /** custom CTA block; defaults to the B2C ContactCtas pair */
  children?: ReactNode;
}) {
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

      <Reveal className={styles.content}>
        <Eyebrow variant="rules" color="gold" className={styles.eyebrow}>
          {eyebrow}
        </Eyebrow>
        <h2 className={styles.h2}>{title}</h2>
        {showSlogan && <p className={styles.slogan}>„{site.slogan}"</p>}

        {children ?? <ContactCtas />}

        {showContact && (
          <p className={styles.contact}>
            Pozovite{" "}
            <a href={site.phoneHref} className={styles.contactLink}>
              {site.phone}
            </a>
            , pišite na{" "}
            <a href={site.emailHref} className={styles.contactLink}>
              {site.email}
            </a>{" "}
            ili na Instagram{" "}
            <a
              href={site.instagramHref}
              className={styles.contactLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.instagram}
            </a>
          </p>
        )}
      </Reveal>
    </section>
  );
}
