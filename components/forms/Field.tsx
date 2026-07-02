import type { ReactNode } from "react";
import styles from "./fields.module.css";

export function Field({
  label,
  name,
  error,
  children,
  required,
}: {
  label: string;
  name: string;
  error?: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>
        {label}
        {required && <span className={styles.req}> *</span>}
      </span>
      {children}
      {error && (
        <span className={styles.error} id={`${name}-error`}>
          {error}
        </span>
      )}
    </label>
  );
}
