"use client";

import { useActionState, useEffect } from "react";
import { subscribe } from "@/app/actions/leads";
import { idleState } from "@/lib/leadSchemas";
import { track } from "@/lib/analytics";
import styles from "./newsletter.module.css";

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribe, idleState);

  useEffect(() => {
    if (state.ok) track.newsletter();
  }, [state.ok]);

  if (state.ok) {
    return <p className={styles.done}>Hvala! Prijavljeni ste na novosti.</p>;
  }

  return (
    <form action={action}>
      <div className={styles.honeypot} aria-hidden="true">
        <input name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className={styles.box}>
        <input
          type="email"
          name="email"
          placeholder="Vaša mejl adresa"
          aria-label="Mejl adresa"
          required
          className={styles.input}
        />
        <button
          type="submit"
          aria-label="Prijavite se"
          className={styles.submit}
          disabled={pending}
        >
          →
        </button>
      </div>
      {state.fieldErrors?.email && (
        <p className={styles.error}>{state.fieldErrors.email}</p>
      )}
      <p className={styles.note}>Povremeno, bez spama. Samo za punoletne.</p>
    </form>
  );
}
