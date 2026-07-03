import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { bento, type BentoCard } from "@/lib/content";
import styles from "./BentoCrossroads.module.css";

function tintGradient([r, g, b]: [number, number, number]) {
  return `linear-gradient(to top, rgba(${r},${g},${b},.93) 0%, rgba(${r},${g},${b},.5) 46%, rgba(${r},${g},${b},.08) 80%)`;
}

function Card({ card, index }: { card: BentoCard; index: number }) {
  return (
    <RevealItem
      href={card.href}
      index={index}
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
    </RevealItem>
  );
}

export function BentoCrossroads() {
  return (
    <section id="zakoga" className={styles.section} aria-label="Za koga je Maoduš">
      <div className={styles.inner}>
        <Reveal className={styles.header}>
          <Eyebrow className={styles.eyebrow}>Za koga je Maoduš?</Eyebrow>
          <h2 className={styles.h2}>Izaberite svoj put</h2>
          <p className={styles.intro}>
            Recite nam priliku, predložićemo rakiju i količinu.
          </p>
        </Reveal>

        <div className={styles.bento}>
          <div className={styles.row}>
            <Card card={bento[0]} index={0} />
            <Card card={bento[1]} index={1} />
          </div>
          <div className={styles.row}>
            <Card card={bento[2]} index={0} />
            <Card card={bento[3]} index={1} />
          </div>
        </div>
      </div>
    </section>
  );
}
