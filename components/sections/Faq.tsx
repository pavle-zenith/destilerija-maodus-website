"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import type { Faq as FaqType } from "@/lib/content";
import styles from "./Faq.module.css";

export function Faq({ items }: { items: FaqType[] }) {
  const [open, setOpen] = useState(-1);

  return (
    <section id="faq" className={styles.section} aria-label="Česta pitanja">
      <div className={styles.inner}>
        <Reveal className={styles.header}>
          <Eyebrow variant="pill" color="muted" className={styles.eyebrow}>
            Česta pitanja
          </Eyebrow>
          <h2 className={styles.h2}>
            Najčešća <span className={styles.accent}>pitanja</span>
          </h2>
          <p className={styles.sub}>Kratki odgovori pre nego što pošaljete upit.</p>
        </Reveal>

        <div className={styles.list}>
          {items.map((f, i) => {
            const isOpen = i === open;
            return (
              <RevealItem key={f.q} className={styles.item} index={i}>
                <button
                  type="button"
                  className={styles.toggle}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className={styles.q}>{f.q}</span>
                  <span className={styles.sign} aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className={styles.answer}>
                    <p className={styles.a}>{f.a}</p>
                  </div>
                )}
              </RevealItem>
            );
          })}
        </div>
      </div>
    </section>
  );
}
