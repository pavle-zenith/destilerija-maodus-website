"use client";

import { useEffect, useState } from "react";
import styles from "./CookieConsent.module.css";

const COOKIE = "maodus_consent";

function setConsentCookie(value: "granted" | "denied") {
  document.cookie = `${COOKIE}=${value}; max-age=${60 * 60 * 24 * 180}; path=/; SameSite=Lax`;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const has = document.cookie.includes(`${COOKIE}=`);
    if (!has) setVisible(true);
    // footer "Kolačići" link reopens settings
    const reopen = () => setVisible(true);
    window.addEventListener("open-cookie-settings", reopen);
    return () => window.removeEventListener("open-cookie-settings", reopen);
  }, []);

  if (!visible) return null;

  const accept = () => {
    setConsentCookie("granted");
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
    setVisible(false);
  };

  const decline = () => {
    setConsentCookie("denied");
    window.gtag?.("consent", "update", { analytics_storage: "denied" });
    setVisible(false);
  };

  return (
    <div className={styles.banner} role="dialog" aria-label="Saglasnost za kolačiće">
      <p className={styles.text}>
        Koristimo kolačiće za analitiku posete kako bismo poboljšali sajt. Možete
        prihvatiti ili odbiti. Pogledajte{" "}
        <a href="/kolacici" className={styles.link}>
          politiku kolačića
        </a>
        .
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.decline} onClick={decline}>
          Odbijam
        </button>
        <button type="button" className={styles.accept} onClick={accept}>
          Prihvatam
        </button>
      </div>
    </div>
  );
}
