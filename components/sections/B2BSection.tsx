import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import styles from "./B2BSection.module.css";

const usps: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "flask",
    title: "Laboratorija, ne obećanje",
    text: "Svaku šaržu potvrđujemo laboratorijskom analizom pre nego što izađe iz destilerije.",
  },
  {
    icon: "menu",
    title: "Priča koju konobar prenese u jednoj rečenici",
    text: "„Dunja iz porodičnog voćnjaka u Vojvodini, kraljica voćnih rakija.\" Gost pamti, druga runda se ne prodaje sama.",
  },
  {
    icon: "tag",
    title: "Rakija pod vašim brendom",
    text: "Vi date etiketu, mi punimo naše boce našom rakijom: za sale, svadbe i poslovne poklone, sa imenom mladenaca, vaše firme ili vašeg lokala.",
  },
];

type Cta = { href: string; label: string };

export function B2BSection({
  id = "veleprodaja",
  primaryCta = { href: "/veleprodaja", label: "Zatražite besplatan uzorak" },
  secondaryCta = { href: "/veleprodaja", label: "Sve o veleprodaji" },
  note,
}: {
  id?: string;
  /** pass null to hide */
  primaryCta?: Cta | null;
  secondaryCta?: Cta | null;
  /** small proof line above the CTAs (e.g. lab-verified quality) */
  note?: string;
}) {
  return (
    <section id={id} className={styles.section} aria-label="Za ugostitelje">
      <div className={styles.inner}>
        <Reveal className={styles.header}>
          <div className={styles.headLeft}>
            <Eyebrow variant="dash" color="gold" className={styles.eyebrow}>
              Za ugostitelje
            </Eyebrow>
            <h2 className={styles.h2}>Rakija za meni koji ima šta da preporuči.</h2>
          </div>
          <p className={styles.headText}>
            Radimo sa restoranima, barovima, salama i vinotekama. Stojimo iza
            svake flaše koju vaš konobar otvori pred gostom.
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
            <div className={styles.heroText}>
              <h3 className={styles.heroTitle}>Isti ukus u januaru i u julu</h3>
              <p className={styles.heroPara}>
                Zrelo voće, kontrolisana fermentacija i dvostruka destilacija u
                bakarnom kazanu, zato svaka šarža ima isti ukus. Bez posrednika:
                količine, ritam isporuke i izbor dogovaramo direktno, prema vašem
                lokalu i sezoni.
              </p>
            </div>
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

        {note && <p className={styles.note}>{note}</p>}

        {(primaryCta || secondaryCta) && (
          <div className={styles.ctas}>
            {primaryCta && (
              <Button href={primaryCta.href} variant="red" track={primaryCta.label}>
                {primaryCta.label}
              </Button>
            )}
            {secondaryCta && (
              <Button href={secondaryCta.href} variant="outlineGold" track={secondaryCta.label}>
                {secondaryCta.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
