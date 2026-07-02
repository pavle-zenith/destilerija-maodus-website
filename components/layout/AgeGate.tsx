"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./AgeGate.module.css";

const COOKIE = "maodus_age_ok";

export function AgeGate({ defaultOpen }: { defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [denied, setDenied] = useState(false);

  // lock body scroll while the gate is up
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  if (!open) return null;

  const confirm = () => {
    // 1 year, so SSR can gate on repeat visits
    document.cookie = `${COOKIE}=1; max-age=${60 * 60 * 24 * 365}; path=/; SameSite=Lax`;
    setOpen(false);
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Provera punoletstva">
      <div className={styles.card}>
        <Image
          src="/images/logo-white.png"
          alt="Destilerija Maoduš"
          width={200}
          height={54}
          priority
          className={styles.logo}
        />
        <div className={styles.divider} aria-hidden="true" />

        {denied ? (
          <>
            <p className={styles.deniedTitle}>Žao nam je.</p>
            <p className={styles.deniedText}>
              Naš sajt je dostupan samo punoletnim posetiocima. Uživajte odgovorno.
            </p>
          </>
        ) : (
          <>
            <h2 className={styles.question}>Da li imate 18 ili više godina?</h2>
            <p className={styles.sub}>
              Sadržaj sajta namenjen je isključivo punoletnim osobama.
            </p>
            <div className={styles.actions}>
              <button type="button" className={styles.yes} onClick={confirm}>
                Da, imam 18+
              </button>
              <button
                type="button"
                className={styles.no}
                onClick={() => setDenied(true)}
              >
                Nemam
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
