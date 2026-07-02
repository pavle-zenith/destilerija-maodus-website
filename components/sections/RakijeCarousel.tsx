"use client";

import { useRef } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import type { Rakija } from "@/lib/content";
import styles from "./RakijeCarousel.module.css";

const STEP = 362; // card 338 + gap 24

function computeStops(el: HTMLElement) {
  const max = el.scrollWidth - el.clientWidth;
  const stops: number[] = [];
  for (let i = 0; i * STEP < max; i++) stops.push(i * STEP);
  stops.push(max);
  // merge a too-close final stop
  while (stops.length >= 2 && max - stops[stops.length - 2] < STEP * 0.55) {
    stops.splice(stops.length - 2, 1);
  }
  return { stops, max };
}

export function RakijeCarousel({ items }: { items: Rakija[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const tween = (el: HTMLElement, target: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const start = el.scrollLeft;
    const delta = target - start;
    if (Math.abs(delta) < 1) return;
    const dur = 380;
    const t0 = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      el.scrollLeft = start + delta * ease(p);
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const next = () => {
    const el = trackRef.current;
    if (!el) return;
    const { stops } = computeStops(el);
    const cur = el.scrollLeft;
    const target = stops.find((s) => s > cur + 4);
    tween(el, target == null ? 0 : target); // wrap to start
  };

  const prev = () => {
    const el = trackRef.current;
    if (!el) return;
    const { stops } = computeStops(el);
    const cur = el.scrollLeft;
    let target: number | null = null;
    for (const s of stops) if (s < cur - 4) target = s;
    tween(el, target == null ? stops[stops.length - 1] : target); // wrap to end
  };

  return (
    <section id="rakije" className={styles.section} aria-label="Naše rakije">
      <div className={styles.header}>
        <div className={styles.headText}>
          <Eyebrow className={styles.eyebrow}>Asortiman</Eyebrow>
          <h2 className={styles.h2}>Naše rakije</h2>
          <p className={styles.intro}>
            Od mirisnih voćnih rakija do odležanih barrique izdanja. Izaberite bocu
            za poklon, proslavu, meni ili kućnu kolekciju.
          </p>
        </div>
        <div className={styles.arrows}>
          <button
            type="button"
            aria-label="Prethodna rakija"
            className={styles.arrow}
            onClick={prev}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Sledeća rakija"
            className={styles.arrow}
            onClick={next}
          >
            →
          </button>
        </div>
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

      <div className={styles.cta}>
        <Button href="/rakije" variant="red" size="lg" glow track="Pogledajte sve rakije">
          Pogledajte sve rakije →
        </Button>
      </div>
    </section>
  );
}
