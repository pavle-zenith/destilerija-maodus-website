import type { PriceRow } from "@/lib/content";
import styles from "./PriceTable.module.css";

const rsd = new Intl.NumberFormat("sr-RS");

function formatPrice(price: number | "na upit") {
  return price === "na upit" ? "na upit" : `${rsd.format(price)} RSD`;
}

/**
 * Price list per volume. Rows are passed already in anchoring order
 * (1L → 0,7L → 0,5L → 0,1L) and may be a variable subset per product.
 * `compact` = a tight, header-less see-through variant for the hero.
 */
export function PriceTable({
  rows,
  compact = false,
}: {
  rows: PriceRow[];
  compact?: boolean;
}) {
  return (
    <div className={`${styles.wrap} ${compact ? styles.compact : ""}`}>
      <table className={styles.table}>
        <caption className="sr-only">Cenovnik po zapremini</caption>
        {!compact && (
          <thead>
            <tr>
              <th scope="col">Zapremina</th>
              <th scope="col" className={styles.priceCol}>
                Cena
              </th>
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((r) => (
            <tr key={r.volume}>
              <th scope="row" className={styles.vol}>
                {r.volume}
              </th>
              <td
                className={`${styles.price} ${
                  r.price === "na upit" ? styles.onRequest : ""
                }`}
              >
                {formatPrice(r.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={styles.note}>Cena uključuje PDV (20%).</p>
    </div>
  );
}
