import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { stats } from "@/lib/content";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="o-nama" className={styles.section} aria-label="O nama">
      <div className={styles.inner}>
        <Reveal>
          <Eyebrow color="gold" className={styles.eyebrow}>O nama</Eyebrow>
          <h2 className={styles.h2}>Tri generacije posvećene rakiji</h2>
          <p className={styles.para}>
            Destilerija Maoduš je porodična destilerija voćne rakije iz Velebita
            kod Kanjiže (Vojvodina), koja od 2007. samostalno proizvodi rakiju
            dvostrukom destilacijom u bakarnim kazanima, na temeljima porodičnog
            voćarstva od 1960-ih. Bez žurbe i bez prečica: zrelo voće iz
            sopstvenog voćnjaka, kontrolisana fermentacija i ukus koji ostaje čist
            i prepoznatljiv.
          </p>
          <div className={styles.cta}>
            <Button href="/kontakt" variant="red" track="Poručite rakiju (O nama)">
              Poručite rakiju →
            </Button>
          </div>

          <div className={styles.stats}>
            {stats.map((s, i) => (
              <RevealItem key={s.label} className={styles.stat} index={i}>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </RevealItem>
            ))}
          </div>
        </Reveal>

        <Reveal className={styles.photoWrap} delay={0.1}>
          <ImageSlot
            className={styles.photo}
            label="Porodica / voćnjak / destilerija"
            ratio="4 / 5"
          />
        </Reveal>
      </div>
    </section>
  );
}
