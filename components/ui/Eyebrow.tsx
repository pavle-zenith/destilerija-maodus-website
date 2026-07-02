import type { ReactNode } from "react";
import styles from "./Eyebrow.module.css";

type Variant = "plain" | "square" | "dash" | "pill" | "rules";
type Color = "red" | "gold" | "muted";

export function Eyebrow({
  children,
  variant = "plain",
  color = "red",
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  color?: Color;
  className?: string;
}) {
  const cls = [styles.eyebrow, styles[variant], styles[color], className]
    .filter(Boolean)
    .join(" ");

  if (variant === "square") {
    return (
      <div className={cls}>
        <span className={styles.mark} aria-hidden="true" />
        <span className={styles.label}>{children}</span>
      </div>
    );
  }
  if (variant === "dash") {
    return (
      <div className={cls}>
        <span className={styles.markLine} aria-hidden="true" />
        <span className={styles.label}>{children}</span>
      </div>
    );
  }
  if (variant === "pill") {
    return (
      <div className={cls}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.label}>{children}</span>
      </div>
    );
  }
  if (variant === "rules") {
    return (
      <div className={cls}>
        <span className={styles.rule} aria-hidden="true" />
        <span className={styles.label}>{children}</span>
        <span className={styles.rule} aria-hidden="true" />
      </div>
    );
  }
  return <div className={cls}>{children}</div>;
}
