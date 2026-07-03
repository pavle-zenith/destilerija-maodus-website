"use client";

import { useState } from "react";
import type { PriceRow } from "@/lib/content";
import styles from "./HeroPrice.module.css";

const rsd = new Intl.NumberFormat("sr-RS");

/**
 * Store-style price with a volume toggle. Selecting a size swaps the
 * headline price. Defaults to the 0,7 l bottle (or the first row).
 */
export function HeroPrice({ rows }: { rows: PriceRow[] }) {
  const defaultIndex = Math.max(
    0,
    rows.findIndex((r) => r.volume === "0,7 l"),
  );
  const [active, setActive] = useState(defaultIndex);
  const current = rows[active];
  if (!current) return null;

  const single = rows.length === 1;

  return (
    <div className={styles.wrap}>
      <p className={styles.price} aria-live="polite">
        {typeof current.price === "number" ? (
          <>
            <span className={styles.amount}>{rsd.format(current.price)} RSD</span>
            <span className={styles.vat}>/ sa PDV-om</span>
          </>
        ) : (
          <span className={styles.amount}>Cena na upit</span>
        )}
      </p>

      {!single && (
        <div className={styles.sizes} role="group" aria-label="Zapremina">
          {rows.map((r, i) => (
            <button
              key={r.volume}
              type="button"
              className={`${styles.size} ${i === active ? styles.active : ""}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              {r.volume}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
