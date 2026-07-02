"use client";

import { useRef } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import type { Rakija } from "@/lib/content";
import styles from "./RakijeCarousel.module.css";

/** One card + gap, measured from the DOM (card width is fluid via clamp()). */
function getStep(el: HTMLElement) {
  const first = el.firstElementChild as HTMLElement | null;
  const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 24;
  const cardWidth = first?.getBoundingClientRect().width ?? 338;
  return cardWidth + gap;
}

export function RakijeCarousel({ items }: { items: Rakija[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Slide one card at a time. Trailing padding (CSS) lets the last card come
  // fully into view; reaching the end + "next" resets to the start, and "prev"
  // at the start jumps to the end.
  const next = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (el.scrollLeft >= max - 2) {
      el.scrollTo({ left: 0, behavior: "smooth" }); // slid to the end → back to start
    } else {
      el.scrollBy({ left: getStep(el), behavior: "smooth" });
    }
  };

  const prev = () => {
    const el = trackRef.current;
    if (!el) return;
    if (el.scrollLeft <= 2) {
      const max = el.scrollWidth - el.clientWidth;
      el.scrollTo({ left: max, behavior: "smooth" }); // at start → jump to the end
    } else {
      el.scrollBy({ left: -getStep(el), behavior: "smooth" });
    }
  };

  const arrowButtons = (
    <>
      <button type="button" aria-label="Prethodna rakija" className={styles.arrow} onClick={prev}>
        ←
      </button>
      <button type="button" aria-label="Sledeća rakija" className={styles.arrow} onClick={next}>
        →
      </button>
    </>
  );

  return (
    <section id="rakije" className={styles.section} aria-label="Naše rakije">
      <div className={styles.header}>
        <Reveal className={styles.headText}>
          <Eyebrow className={styles.eyebrow}>Asortiman</Eyebrow>
          <h2 className={styles.h2}>Naše rakije</h2>
          <p className={styles.intro}>
            Od mirisnih voćnih rakija do odležanih barrique izdanja. Izaberite bocu
            za poklon, proslavu, meni ili kućnu kolekciju.
          </p>
        </Reveal>
        <div className={`${styles.arrows} ${styles.arrowsDesktop}`}>{arrowButtons}</div>
      </div>

      <div ref={trackRef} className={styles.track}>
        {items.map((r) => (
          <ProductCard
            key={r.slug}
            className={styles.slide}
            name={r.name}
            category={r.category}
            abv={r.abv}
            volume={r.volume}
            image={r.image}
            sizes="clamp(280px, 80vw, 338px)"
          />
        ))}
      </div>

      <div className={`${styles.arrows} ${styles.arrowsMobile}`}>{arrowButtons}</div>

      <div className={styles.cta}>
        <Button href="/rakije" variant="red" size="lg" glow track="Pogledajte sve rakije">
          Pogledajte sve rakije →
        </Button>
      </div>
    </section>
  );
}
