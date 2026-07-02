import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactCtas } from "@/components/forms/ContactCtas";
import { Reveal } from "@/components/ui/Reveal";
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

      <Reveal className={styles.content}>
        <Eyebrow variant="rules" color="gold" className={styles.eyebrow}>
          Poručite direktno
        </Eyebrow>
        <h2 className={styles.h2}>
          Za poklon, proslavu, meni ili ličnu porudžbinu
        </h2>
        <p className={styles.slogan}>„{site.slogan}"</p>

        <ContactCtas />
      </Reveal>
    </section>
  );
}
