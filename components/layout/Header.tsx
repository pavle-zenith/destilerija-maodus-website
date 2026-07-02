"use client";

import { useState } from "react";
import Image from "next/image";
import { navLinks, site } from "@/lib/site";
import { track } from "@/lib/analytics";
import { Icon } from "@/components/ui/Icon";
import styles from "./Header.module.css";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo} aria-label="Destilerija Maoduš — početna">
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
              href="#veleprodaja"
              className={styles.secondary}
              onClick={() => track.cta("Veleprodaja (nav)", "#veleprodaja")}
            >
              Veleprodaja
            </a>
            <a
              href="#kontakt"
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
            href={site.phoneHref}
            className={styles.phone}
            aria-label={`Pozovite ${site.phone}`}
            onClick={() => track.cta("Telefon (nav)", site.phoneHref)}
          >
            <Icon name="phone" size={20} />
          </a>
          <a
            href="#kontakt"
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

      {open && (
        <nav className={styles.mobileMenu} aria-label="Mobilna navigacija">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={styles.mobileLink}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#veleprodaja"
            className={styles.mobileSecondary}
            onClick={() => setOpen(false)}
          >
            Veleprodaja
          </a>
        </nav>
      )}
    </header>
  );
}
