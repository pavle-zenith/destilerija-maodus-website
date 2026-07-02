"use client";

import { useActionState, useEffect } from "react";
import { submitInquiry } from "@/app/actions/leads";
import { idleState } from "@/lib/leadSchemas";
import { rakije } from "@/lib/content";
import { track } from "@/lib/analytics";
import { site, whatsappHref } from "@/lib/site";
import { Field } from "./Field";
import { Turnstile } from "./Turnstile";
import styles from "./fields.module.css";

export function InquiryForm({ defaultRakija = "" }: { defaultRakija?: string }) {
  const [state, action, pending] = useActionState(submitInquiry, idleState);

  useEffect(() => {
    if (state.ok) track.formSubmit("inquiry");
  }, [state.ok]);

  if (state.ok) {
    return (
      <div className={styles.success}>
        <p className={styles.successTitle}>Hvala! Upit je poslat.</p>
        <p className={styles.successText}>
          Javićemo se u najkraćem roku sa predlogom, količinom i dogovorom oko
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
        <Field label="Telefon ili mejl" name="contact" error={fe.contact} required>
          <input name="contact" className={styles.input} required />
        </Field>
      </div>

      <div className={styles.row}>
        <Field label="Grad isporuke" name="city" error={fe.city} required>
          <input name="city" className={styles.input} required />
        </Field>
        <Field label="Rakija" name="rakija" error={fe.rakija}>
          <select name="rakija" className={styles.select} defaultValue={defaultRakija}>
            <option value="">Nisam siguran/na</option>
            {rakije.map((r) => (
              <option key={r.slug} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className={styles.row}>
        <Field label="Količina (boca)" name="quantity" error={fe.quantity}>
          <input name="quantity" className={styles.input} inputMode="numeric" />
        </Field>
        <Field label="Prilika" name="occasion" error={fe.occasion}>
          <input name="occasion" className={styles.input} placeholder="Poklon, slava, meni…" />
        </Field>
      </div>

      <Field label="Poruka (opciono)" name="message" error={fe.message}>
        <textarea name="message" className={styles.textarea} />
      </Field>

      <Turnstile />

      {state.error && <p className={styles.formError}>{state.error}</p>}

      <div className={styles.submitRow}>
        <button type="submit" className={styles.submit} disabled={pending}>
          {pending ? "Slanje…" : "Pošaljite upit"}
        </button>
      </div>

      <p className={styles.alt}>
        Radije direktno?{" "}
        <a
          className={styles.altLink}
          href={whatsappHref("Zdravo! Zainteresovan/na sam za porudžbinu rakije.")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track.whatsapp("inquiry")}
        >
          Pišite na WhatsApp
        </a>{" "}
        ili pozovite {site.phone}.
      </p>
    </form>
  );
}
