"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon, type IconName } from "./Icon";
import styles from "./SensorySlider.module.css";

type Panel = {
  key: string;
  label: string;
  text: string;
  icon?: IconName;
  /** per-panel background; falls back to the shared `image` prop */
  image?: string;
};

const AUTOPLAY_MS = 8000;

/**
 * iskraclub-style featured slider: the active sense fills a wide panel while the
 * other two collapse to narrow slivers on the side. Auto-advances continuously
 * (hover does NOT pause it), clicking a sliver jumps to it, and reduced-motion
 * disables autoplay. Each panel shows its own texture (falling back to the
 * shared `image` prop) with a per-sense colour tint.
 */
export function SensorySlider({
  image,
  alt,
  panels,
}: {
  image: string;
  alt: string;
  panels: Panel[];
}) {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const advance = useCallback(() => {
    setActive((i) => (i + 1) % panels.length);
  }, [panels.length]);

  // single owner of the timer: each active panel gets a full window, then
  // auto-advances. keyed on `active` so a click restarts the window cleanly.
  // no pause path — the slider runs continuously (except reduced-motion).
  useEffect(() => {
    if (reduced || panels.length < 2) return;

    const id = setTimeout(advance, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [active, reduced, advance, panels.length]);

  const isRunning = !reduced && panels.length > 1;

  return (
    <div
      className={styles.track}
      role="tablist"
      aria-label="Senzorni opis"
    >
      {panels.map((p, i) => {
        const isActive = i === active;
        return (
          <button
            key={p.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={p.label}
            className={`${styles.panel} ${styles[p.key] ?? ""} ${
              isActive ? styles.active : styles.collapsed
            }`}
            onClick={() => setActive(i)}
          >
            <Image
              src={p.image ?? image}
              alt={isActive ? alt : ""}
              fill
              sizes="(max-width: 760px) 100vw, 60vw"
              className={styles.photo}
              aria-hidden={!isActive}
            />
            <span className={styles.tint} aria-hidden="true" />

            {/* collapsed: vertical label only */}
            <span className={styles.spineLabel} aria-hidden={isActive}>
              {p.label}
            </span>

            {/* active: full content */}
            <span className={styles.content} aria-hidden={!isActive}>
              {p.icon && (
                <span className={styles.contentIcon} aria-hidden="true">
                  <Icon name={p.icon} size={30} />
                </span>
              )}
              <span className={styles.label}>{p.label}</span>
              {p.text && <span className={styles.text}>{p.text}</span>}
              {panels.length > 1 && (
                <span className={styles.progress} aria-hidden="true">
                  {/* keyed on `active` so the bar restarts per panel; when not
                      running (reduced-motion) it's frozen via progressPaused */}
                  <span
                    key={active}
                    className={`${styles.progressBar} ${
                      isActive ? styles.progressRun : ""
                    } ${!isRunning ? styles.progressPaused : ""}`}
                  />
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
