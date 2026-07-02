import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { stats } from "@/lib/content";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="o-nama" className={styles.section} aria-label="O nama">
      <div className={styles.inner}>
        <div>
          <Eyebrow color="gold" className={styles.eyebrow}>O nama</Eyebrow>
          <h2 className={styles.h2}>Tri generacije posvećene rakiji</h2>
          <p className={styles.para}>
            Maoduš je porodična destilerija iz Vojvodine. Rakiju pravimo od pažljivo
            odabranog voća, uz kontrolisanu fermentaciju i dvostruku destilaciju u
            bakarnim kazanima. Bez žurbe, bez prečica, sa ukusom koji treba da
            ostane čist, voćan i prepoznatljiv.
          </p>
          <div className={styles.cta}>
            <Button href="#kontakt" variant="red" track="Poručite rakiju (O nama)">
              Poručite rakiju →
            </Button>
          </div>

          <div className={styles.stats}>
            {stats.map((s) => (
              <div key={s.label} className={styles.stat}>
                <div className={`${styles.statValue} ${s.small ? styles.statValueSmall : ""}`}>
                  {s.value}
                </div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.photoWrap}>
          <ImageSlot
            className={styles.photo}
            label="Porodica / voćnjak / destilerija"
            ratio="4 / 5"
          />
        </div>
      </div>
    </section>
  );
}
