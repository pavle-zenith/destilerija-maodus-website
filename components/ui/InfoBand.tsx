import Link from "next/link";
import styles from "./InfoBand.module.css";

/**
 * Low, thin band — a soft off-ramp inside a page (not a full section).
 * Used on /rakije as the "Niste sigurni?" fallback toward /kontakt.
 */
export function InfoBand({
  text,
  ctaLabel,
  ctaHref,
}: {
  text: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <div className={styles.band}>
      <div className={styles.inner}>
        <p className={styles.text}>{text}</p>
        <Link href={ctaHref} className={styles.cta}>
          {ctaLabel} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
