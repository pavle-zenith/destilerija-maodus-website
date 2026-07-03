import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { partners } from "@/lib/content";
import styles from "./Proof.module.css";

const checks = [
  "Laboratorijske analize",
  "Fotografije procesa i voćnjaka",
  "Direktan kontakt sa proizvođačem",
];

export function Proof({
  eyebrow = "Poverenje",
  title = "Dokaz umesto obećanja",
  intro = "Dobra rakija ne traži mnogo objašnjenja, ali traži poverenje. Zato pokazujemo poreklo, proces, analize i ljude koji stoje iza svake boce.",
  showChecks = true,
}: {
  eyebrow?: string;
  title?: string;
  /** pass null to drop the intro paragraph */
  intro?: string | null;
  showChecks?: boolean;
}) {
  const loop = [...partners, ...partners];

  return (
    <section id="partneri" className={styles.section} aria-label="Poverenje">
      <div className={styles.inner}>
        <Reveal className={styles.header}>
          <Eyebrow className={styles.eyebrow}>{eyebrow}</Eyebrow>
          <h2 className={styles.h2}>{title}</h2>
          {intro && <p className={styles.intro}>{intro}</p>}
        </Reveal>

        <div className={styles.marqueeMask}>
          <div className={styles.marquee}>
            {loop.map((p, i) => (
              <div key={`${p.name}-${i}`} className={styles.logo}>
                <Image
                  src={p.logo}
                  alt={`Partner ${p.name}`}
                  width={200}
                  height={p.maxHeight}
                  className={styles.logoImg}
                  style={{ maxHeight: p.maxHeight }}
                />
              </div>
            ))}
          </div>
        </div>

        {showChecks && (
          <ul className={styles.checks}>
            {checks.map((c) => (
              <li key={c} className={styles.check}>
                <span className={styles.tick} aria-hidden="true">✓</span> {c}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
