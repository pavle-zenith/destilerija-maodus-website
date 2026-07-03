import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import styles from "./HowToOrder.module.css";

export type OrderStep = { n: string; title: string; text: string };

const defaultSteps: OrderStep[] = [
  {
    n: "1",
    title: "Izaberite rakiju",
    text: "Pogledajte asortiman i izdvojite šta vam treba: za poklon, proslavu, meni ili za sebe.",
  },
  {
    n: "2",
    title: "Pošaljite upit",
    text: "Napišite količinu, priliku i grad. Možete preko forme, telefona, mejla ili Instagrama.",
  },
  {
    n: "3",
    title: "Dogovaramo isporuku",
    text: "Potvrđujemo dostupnost, cenu i način plaćanja. Odgovaramo u roku od 24–48h.",
  },
];

export function HowToOrder({
  showCtas = true,
  eyebrow = "Kako naručiti",
  accentWord = "porudžbine",
  intro = "Nema webshopa i nema komplikovanja: javite šta vam treba, vraćamo se sa predlogom i dogovorom oko isporuke.",
  steps = defaultSteps,
  reassure = "Ponudu pravimo prema količini, nameni i mestu isporuke.",
}: {
  showCtas?: boolean;
  eyebrow?: string;
  /** the accented word in "Tri koraka do …" */
  accentWord?: string;
  intro?: string;
  steps?: OrderStep[];
  reassure?: string;
}) {
  return (
    <section className={styles.section} aria-label={eyebrow}>
      <div className={styles.inner}>
        <Reveal>
          <Eyebrow variant="pill" color="red" className={styles.eyebrow}>
            {eyebrow}
          </Eyebrow>
          <h2 className={styles.h2}>
            Tri koraka do <span className={styles.accent}>{accentWord}</span>
          </h2>
          <p className={styles.intro}>{intro}</p>
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
          {reassure}
        </p>

        {showCtas && (
          <div className={styles.ctas}>
            <Button href="/kontakt" variant="red" size="lg" glow track="Pošaljite upit (Kako naručiti)">
              Pošaljite upit
            </Button>
            <Button href="/veleprodaja" variant="text" track="Zatražite veleprodaju">
              Zatražite veleprodaju →
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
