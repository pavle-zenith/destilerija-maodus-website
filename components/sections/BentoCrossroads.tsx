import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { bento, type BentoCard } from "@/lib/content";
import styles from "./BentoCrossroads.module.css";

function tintGradient([r, g, b]: [number, number, number]) {
  return `linear-gradient(to top, rgba(${r},${g},${b},.93) 0%, rgba(${r},${g},${b},.5) 46%, rgba(${r},${g},${b},.08) 80%)`;
}

function Card({ card }: { card: BentoCard }) {
  return (
    <a
      href={card.href}
      className={`${styles.card} ${card.wide ? styles.wide : styles.narrow}`}
    >
      <Image
        src={card.image}
        alt={card.title}
        fill
        sizes="(max-width: 760px) 100vw, 640px"
        className={styles.img}
        style={card.objectPosition ? { objectPosition: card.objectPosition } : undefined}
      />
      <div
        className={styles.scrim}
        style={{ background: tintGradient(card.tint) }}
        aria-hidden="true"
      />
      <span className={styles.tag}>{card.tag}</span>
      <div className={styles.body}>
        <h3 className={styles.title}>{card.title}</h3>
        <p className={styles.copy}>{card.copy}</p>
      </div>
    </a>
  );
}

export function BentoCrossroads() {
  return (
    <section id="zakoga" className={styles.section} aria-label="Za koga je Maoduš">
      <div className={styles.inner}>
        <div className={styles.header}>
          <Eyebrow className={styles.eyebrow}>Za koga je Maoduš?</Eyebrow>
          <h2 className={styles.h2}>Izaberite svoj put</h2>
          <p className={styles.intro}>
            Bilo da birate bocu za poklon, spremate proslavu ili tražite rakiju za
            meni, javite nam šta vam treba. Predložićemo izbor i količinu.
          </p>
        </div>

        <div className={styles.bento}>
          <div className={styles.row}>
            <Card card={bento[0]} />
            <Card card={bento[1]} />
          </div>
          <div className={styles.row}>
            <Card card={bento[2]} />
            <Card card={bento[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}
