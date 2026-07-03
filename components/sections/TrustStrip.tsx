import { Icon, type IconName } from "@/components/ui/Icon";
import { RevealItem } from "@/components/ui/Reveal";
import styles from "./TrustStrip.module.css";

const items: { icon: IconName; label: string }[] = [
  { icon: "award", label: "Tradicija od 1960-ih" },
  { icon: "drop", label: "Dvostruka destilacija u bakru" },
  { icon: "flask", label: "Laboratorijska analiza svake šarže" },
  { icon: "leaf", label: "Voće iz sopstvenog voćnjaka" },
];

export function TrustStrip() {
  return (
    <section className={styles.strip} aria-label="Zašto Maoduš">
      <div className={styles.inner}>
        {items.map((it, i) => (
          <RevealItem key={it.label} className={styles.item} index={i}>
            <span className={styles.chip}>
              <Icon name={it.icon} size={22} />
            </span>
            <span className={styles.label}>{it.label}</span>
          </RevealItem>
        ))}
      </div>
    </section>
  );
}
