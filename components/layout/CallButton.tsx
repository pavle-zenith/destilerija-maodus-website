"use client";

import { site } from "@/lib/site";
import { track } from "@/lib/analytics";
import { Icon } from "@/components/ui/Icon";
import styles from "./CallButton.module.css";

export function CallButton() {
  return (
    <a
      href={site.phoneHref}
      className={styles.button}
      aria-label={`Pozovite nas — ${site.phone}`}
      onClick={() => track.cta("Pozovite nas (floating)", site.phoneHref)}
    >
      <span className={styles.icon}>
        <Icon name="phone" size={20} />
      </span>
      <span className={styles.label}>Pozovite nas</span>
    </a>
  );
}
