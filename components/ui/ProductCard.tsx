import Image from "next/image";
import styles from "./ProductCard.module.css";

export type ProductCardProps = {
  name: string;
  category: string;
  abv: string;
  volume: string;
  image: string;
  href?: string;
  eyebrow?: string;
  /** slightly larger type used by the floating hero card */
  size?: "md" | "lg";
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** clone used only to fill the infinite-carousel loop — hidden from a11y/tab */
  duplicate?: boolean;
};

export function ProductCard({
  name,
  category,
  abv,
  volume,
  image,
  href = "#kontakt",
  eyebrow,
  size = "md",
  priority,
  sizes = "338px",
  className,
  duplicate,
}: ProductCardProps) {
  return (
    <article
      className={`${styles.card} ${styles[size]} ${className ?? ""}`}
      aria-hidden={duplicate || undefined}
      inert={duplicate || undefined}
    >
      <Image
        src={image}
        alt={name}
        fill
        sizes={sizes}
        className={styles.photo}
        priority={priority}
      />
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.top}>
        {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.category}>{category}</div>
      </div>

      <div className={styles.bottom}>
        <div>
          <div className={styles.abv}>{abv}</div>
          <div className={styles.volume}>{volume}</div>
        </div>
        <a
          href={href}
          aria-label={`Poručite ${name}`}
          className={styles.plus}
        >
          +
        </a>
      </div>
    </article>
  );
}
