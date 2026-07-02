import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import styles from "./HowToOrder.module.css";

const steps = [
  {
    n: "1",
    title: "Izaberite rakiju",
    text: "Pogledajte asortiman i izdvojite šta vam treba za poklon, proslavu, meni ili ličnu porudžbinu.",
  },
  {
    n: "2",
    title: "Pošaljite upit",
    text: "Napišite količinu, priliku i grad. Možete preko forme, telefona, mejla ili društvenih mreža.",
  },
  {
    n: "3",
    title: "Dogovaramo isporuku",
    text: "Potvrđujemo dostupnost, cenu, isporuku i način plaćanja.",
  },
];

export function HowToOrder() {
  return (
    <section className={styles.section} aria-label="Kako naručiti">
      <div className={styles.inner}>
        <Reveal>
          <Eyebrow variant="pill" color="red" className={styles.eyebrow}>
            Kako naručiti
          </Eyebrow>
          <h2 className={styles.h2}>
            Tri koraka do <span className={styles.accent}>porudžbine</span>
          </h2>
          <p className={styles.intro}>
            Nema webshopa i nema komplikovanja. Javite nam šta vam treba, a mi se
            vraćamo sa predlogom, količinom i dogovorom oko isporuke.
          </p>
        </Reveal>

        <div className={styles.timeline}>
          <div className={styles.connector} aria-hidden="true" />
          <div className={styles.steps}>
            {steps.map((s, i) => (
              <RevealItem key={s.n} className={styles.step} index={i}>
                <div className={styles.circle}>{s.n}</div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepText}>{s.text}</p>
              </RevealItem>
            ))}
          </div>
        </div>

        <p className={styles.reassure}>
          <Icon name="lock" size={17} className={styles.lock} />
          Ponudu pravimo prema količini, nameni i mestu isporuke.
        </p>

        <div className={styles.ctas}>
          <Button href="#kontakt" variant="red" size="lg" glow track="Pošaljite upit (Kako naručiti)">
            Pošaljite upit
          </Button>
          <Button href="#veleprodaja" variant="text" track="Zatražite veleprodaju">
            Zatražite veleprodaju →
          </Button>
        </div>
      </div>
    </section>
  );
}
