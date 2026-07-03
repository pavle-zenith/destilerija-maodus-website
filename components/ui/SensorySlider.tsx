"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon, type IconName } from "./Icon";
import styles from "./SensorySlider.module.css";

type Panel = { key: string; label: string; text: string; icon?: IconName };

const AUTOPLAY_MS = 8000;

/**
 * iskraclub-style featured slider: the active sense fills a wide panel while the
 * other two collapse to narrow slivers on the side. Auto-advances, clicking a
 * sliver jumps to it, hover pauses *without resetting* the timer, and
 * reduced-motion disables autoplay. Panels share the product photo with a
 * per-sense colour tint.
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
  const [paused, setPaused] = useState(false);
  const reducedRef = useRef(false);

  // deadline-based timer so hover pauses without losing progress
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const remainingRef = useRef(AUTOPLAY_MS);
  const startedAtRef = useRef(0);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const clear = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  };

  const advance = useCallback(() => {
    setActive((i) => (i + 1) % panels.length);
  }, [panels.length]);

  // (re)start the countdown from a fresh full interval — used when the active
  // panel changes (auto-advance or click)
  useEffect(() => {
    remainingRef.current = AUTOPLAY_MS;
    if (reducedRef.current || panels.length < 2) return;
    if (paused) return; // don't run while hovered; resume effect handles it
    startedAtRef.current = Date.now();
    clear();
    timeoutRef.current = setTimeout(advance, AUTOPLAY_MS);
    return clear;
    // intentionally keyed on `active` so each panel gets a full window
  }, [active, advance, panels.length, paused]);

  // pause/resume WITHOUT resetting: bank elapsed on pause, resume the remainder
  useEffect(() => {
    if (reducedRef.current || panels.length < 2) return;
    if (paused) {
      const elapsed = Date.now() - startedAtRef.current;
      remainingRef.current = Math.max(0, remainingRef.current - elapsed);
      clear();
    } else if (timeoutRef.current === null && remainingRef.current < AUTOPLAY_MS) {
      // resuming mid-interval
      startedAtRef.current = Date.now();
      timeoutRef.current = setTimeout(advance, remainingRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  const isRunning = !paused && !reducedRef.current && panels.length > 1;

  return (
    <div
      className={styles.track}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
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
              src={image}
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
                  {/* keyed on `active` so the bar restarts per panel; paused
                      freezes it via animation-play-state (no reset) */}
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
