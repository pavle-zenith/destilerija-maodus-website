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

          <div className={styles.block}>
            <h3 className={styles.subhead}>Od voćnjaka do destilerije</h3>
            <p className={styles.para}>
              Destilerija Maoduš je porodična destilerija voćne rakije iz
              Velebita kod Kanjiže (Vojvodina). Kao samostalna radnja osnovana je
              2007, ali priča počinje šezdesetih godina, sa prvim porodičnim
              voćnjakom i rakijom prethodne generacije.
            </p>
          </div>

          <div className={styles.block}>
            <h3 className={styles.subhead}>Kako pravimo rakiju</h3>
            <p className={styles.para}>
              Rakiju od dunje, kajsije, viljamovke, šljive i jabuke pravimo od
              zrelog voća iz sopstvenog voćnjaka, kontrolisanom fermentacijom i
              dvostrukom destilacijom u bakarnim kazanima ručne izrade. Ukus
              potvrđuju visoke ocene iskusnih degustatora i analize akreditovanih
              laboratorija.
            </p>
          </div>

          <div className={styles.cta}>
            <Button href="/kontakt" variant="red" track="Poručite rakiju (O nama)">
              Poručite rakiju →
            </Button>
          </div>
        </Reveal>

        <Reveal className={styles.photoWrap} delay={0.1}>
          <ImageSlot
            className={styles.photo}
            label="Porodica / voćnjak / destilerija"
            ratio="4 / 5"
          />
          <div className={styles.stats}>
            {stats.map((s, i) => (
              <RevealItem key={s.label} className={styles.stat} index={i}>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
