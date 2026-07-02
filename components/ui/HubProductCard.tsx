import Image from "next/image";
import Link from "next/link";
import type { Rakija } from "@/lib/content";
import styles from "./HubProductCard.module.css";

/**
 * /rakije hub card. Dark, full-bleed photo card like the homepage carousel.
 * Stats (abv · volume) sit at the top; the tasting note sits above a full-width
 * "Pogledaj" CTA at the bottom. The whole card is a link.
 */
export function HubProductCard({
  rakija,
  priority,
}: {
  rakija: Rakija;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/rakije/${rakija.slug}`}
      className={styles.card}
      aria-label={`${rakija.name} — pogledaj rakiju`}
    >
      <Image
        src={rakija.image}
        alt={rakija.name}
        fill
        sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
        className={styles.photo}
        priority={priority}
      />
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.top}>
        <div className={styles.meta}>
          <span className={styles.abv}>{rakija.abv}</span>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.volume}>{rakija.volume}</span>
        </div>
        <h3 className={styles.name}>{rakija.name}</h3>
      </div>

      <div className={styles.bottom}>
        <p className={styles.note}>{rakija.tastingNote}</p>
        <span className={styles.cta} aria-hidden="true">
          Pogledaj <span className={styles.arrow}>→</span>
        </span>
      </div>
    </Link>
  );
}
