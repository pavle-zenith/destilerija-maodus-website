import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import styles from "./B2BSection.module.css";

const usps: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "menu",
    title: "Jasan izbor za meni",
    text: "Voćne bele, barrique i classic rakije — za aperitiv, digestiv, poklon bocu ili preporuku uz obrok.",
  },
  {
    icon: "goblet",
    title: "Degustacija pre odluke",
    text: "Probajte, uporedite i izaberite ono što odgovara vašim gostima pre prve veće porudžbine.",
  },
  {
    icon: "tag",
    title: "Etiketa za lokal ili događaj",
    text: "Personalizovana etiketa za sale, svadbe, poslovne poklone i posebne prilike.",
  },
];

export function B2BSection() {
  return (
    <section id="veleprodaja" className={styles.section} aria-label="Za ugostitelje">
      <div className={styles.inner}>
        <Reveal className={styles.header}>
          <div className={styles.headLeft}>
            <Eyebrow variant="dash" color="gold" className={styles.eyebrow}>
              Za ugostitelje
            </Eyebrow>
            <h2 className={styles.h2}>Rakija za meni koji ima šta da preporuči.</h2>
          </div>
          <p className={styles.headText}>
            Radimo sa restoranima, barovima, salama i vinotekama koje žele domaću
            rakiju sa stabilnim kvalitetom, jasnim izborom i pričom koju osoblje
            može da prenese gostu.
          </p>
        </Reveal>

        {/* wide hero USP */}
        <Reveal className={styles.heroCard}>
          <Image
            src="/images/b2b-sank.png"
            alt="Rakija na šanku"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className={styles.heroImg}
          />
          <div className={styles.heroScrim} aria-hidden="true" />
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.heroContent}>
            <div className={styles.goldChip}>
              <Icon name="checkCircle" size={24} />
            </div>
            <h3 className={styles.heroTitle}>Stabilan kvalitet i direktna isporuka</h3>
            <p className={styles.heroPara}>
              Bez posrednika i bez nagađanja. Dogovaramo količine, ritam isporuke i
              izbor rakija prema vašem lokalu, meniju ili sezoni proslava.
            </p>
          </div>
        </Reveal>

        {/* 3 USP cards */}
        <div className={styles.grid}>
          {usps.map((u, i) => (
            <RevealItem key={u.title} className={styles.card} index={i}>
              <div className={styles.cardGlow} aria-hidden="true" />
              <div className={styles.goldChip}>
                <Icon name={u.icon} size={24} />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{u.title}</h3>
                <p className={styles.cardText}>{u.text}</p>
              </div>
            </RevealItem>
          ))}
        </div>

        <div className={styles.ctas}>
          <Button href="#kontakt" variant="red" track="Zatražite veleprodajnu ponudu">
            Zatražite veleprodajnu ponudu
          </Button>
          <Button href="#kontakt" variant="outlineGold" track="Pitajte za degustacioni uzorak">
            Pitajte za degustacioni uzorak
          </Button>
        </div>
      </div>
    </section>
  );
}
