"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { navLinks, site } from "@/lib/site";
import { track } from "@/lib/analytics";
import { Icon } from "@/components/ui/Icon";
import styles from "./Header.module.css";

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // lock body scroll while the fullscreen menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo} aria-label="Destilerija Maoduš — početna" onClick={close}>
          <Image src="/images/logo.png" alt="Destilerija Maoduš" width={180} height={46} priority className={styles.logoImg} />
        </a>

        {/* desktop nav (>=900px) */}
        <div className={styles.desktopNav}>
          <nav className={styles.links} aria-label="Glavna navigacija">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className={styles.link}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className={styles.actions}>
            <a
              href={site.phoneHref}
              className={styles.phone}
              aria-label={`Pozovite ${site.phone}`}
              onClick={() => track.cta("Telefon (nav)", site.phoneHref)}
            >
              <Icon name="phone" size={20} />
            </a>
            <a
              href="/#veleprodaja"
              className={styles.secondary}
              onClick={() => track.cta("Veleprodaja (nav)", "#veleprodaja")}
            >
              Veleprodaja
            </a>
            <a
              href="/kontakt"
              className={styles.pill}
              onClick={() => track.cta("Poručite (nav)", "#kontakt")}
            >
              Poručite
            </a>
          </div>
        </div>

        {/* mobile controls (<900px) */}
        <div className={styles.mobileControls}>
          <a
            href="/kontakt"
            className={styles.pillSm}
            onClick={() => track.cta("Poručite (nav)", "#kontakt")}
          >
            Poručite
          </a>
          <button
            type="button"
            aria-label="Meni"
            aria-expanded={open}
            className={styles.hamburger}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>

      {/* fullscreen mobile menu — sibling of <header> so `position: fixed`
          escapes the header's backdrop-filter containing block */}
      {open && (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Meni">
          <div className={styles.overlayTop}>
            <a href="/" aria-label="Destilerija Maoduš — početna" onClick={close}>
              <Image src="/images/logo.png" alt="Destilerija Maoduš" width={180} height={46} className={styles.logoImg} />
            </a>
            <button
              type="button"
              aria-label="Zatvorite meni"
              className={styles.close}
              onClick={close}
            >
              <span />
              <span />
            </button>
          </div>

          <nav className={styles.overlayLinks} aria-label="Mobilna navigacija">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className={styles.overlayLink} onClick={close}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className={styles.overlayFooter}>
            <a
              href={site.phoneHref}
              className={styles.overlayPhone}
              onClick={() => {
                track.cta("Telefon (mobilni meni)", site.phoneHref);
                close();
              }}
            >
              <Icon name="phone" size={20} />
              {site.phone}
            </a>
            <div className={styles.overlayCtas}>
              <a href="/#veleprodaja" className={styles.overlaySecondary} onClick={close}>
                Veleprodaja
              </a>
              <a href="/kontakt" className={styles.overlayPrimary} onClick={close}>
                Poručite
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
