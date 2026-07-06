"use client";

import { useActionState, useEffect } from "react";
import { submitInquiry } from "@/app/actions/leads";
import { idleState } from "@/lib/leadSchemas";
import { allSkuNames } from "@/lib/content";
import { track } from "@/lib/analytics";
import { Field } from "./Field";
import { Turnstile } from "./Turnstile";
import styles from "./fields.module.css";

const OCCASIONS = ["Poklon", "Lična porudžbina", "Slava", "Proslava", "Drugo"];

export function InquiryForm({
  defaultRakija = "",
  variant = "modal",
}: {
  defaultRakija?: string;
  /** "consumer" = full page variant (/kontakt); "modal" = compact in-modal */
  variant?: "modal" | "consumer";
}) {
  const [state, action, pending] = useActionState(submitInquiry, idleState);
  const isConsumer = variant === "consumer";

  useEffect(() => {
    if (state.ok) track.formSubmit(isConsumer ? "inquiry_page" : "inquiry");
  }, [state.ok, isConsumer]);

  if (state.ok) {
    return (
      <div className={styles.success}>
        <p className={styles.successTitle}>Hvala! Poruka je poslata.</p>
        <p className={styles.successText}>
          Javićemo se u roku od 24–48h sa predlogom, količinom i dogovorom oko
          isporuke.
        </p>
      </div>
    );
  }

  const fe = state.fieldErrors ?? {};

  return (
    <form action={action} className={styles.form}>
      <div className={styles.honeypot} aria-hidden="true">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className={styles.row}>
        <Field label="Ime i prezime" name="name" error={fe.name} required>
          <input name="name" className={styles.input} required />
        </Field>
        <Field label="Telefon ili email" name="contact" error={fe.contact} required>
          <input name="contact" className={styles.input} required />
        </Field>
      </div>

      <div className={styles.row}>
        <Field label="Koja rakija vas zanima" name="rakija" error={fe.rakija}>
          <select name="rakija" className={styles.select} defaultValue={defaultRakija}>
            <option value="">Nisam siguran/na, pomozite mi da izaberem</option>
            {allSkuNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Količina (boca)" name="quantity" error={fe.quantity}>
          <input name="quantity" className={styles.input} inputMode="numeric" placeholder="Primer: 6" />
        </Field>
      </div>

      <div className={styles.row}>
        <Field label="Grad / mesto isporuke" name="city" error={fe.city} required>
          <input name="city" className={styles.input} required />
        </Field>
        <Field label="Prilika" name="occasion" error={fe.occasion}>
          <select name="occasion" className={styles.select} defaultValue="">
            <option value="">Izaberite priliku</option>
            {OCCASIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Poruka (opciono)" name="message" error={fe.message}>
        <textarea
          name="message"
          className={styles.textarea}
          placeholder="Napišite nam par reči: prilika, rok, posebni zahtevi…"
        />
      </Field>

      <Turnstile />

      {state.error && <p className={styles.formError}>{state.error}</p>}

      <div className={styles.submitRow}>
        <button type="submit" className={styles.submit} disabled={pending}>
          {pending ? "Slanje…" : isConsumer ? "Pošaljite poruku" : "Pošaljite upit"}
        </button>
      </div>

      {isConsumer && (
        <p className={styles.alt}>
          Odgovaramo u roku od 24–48h. Rakiju prodajemo isključivo punoletnim
          osobama.
        </p>
      )}
    </form>
  );
}
