import Link from "next/link";
import { Fragment } from "react";
import styles from "./Breadcrumbs.module.css";

export type Crumb = { label: string; href?: string };

/**
 * Visual breadcrumb trail. Pair with a BreadcrumbList JSON-LD on the page for
 * search/GEO legibility (this renders the human-visible version only).
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Putanja" className={styles.nav}>
      <ol className={styles.list}>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={c.label}>
              <li className={styles.item}>
                {c.href && !last ? (
                  <Link href={c.href} className={styles.link}>
                    {c.label}
                  </Link>
                ) : (
                  <span className={styles.current} aria-current={last ? "page" : undefined}>
                    {c.label}
                  </span>
                )}
              </li>
              {!last && (
                <li className={styles.sep} aria-hidden="true">
                  ›
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
