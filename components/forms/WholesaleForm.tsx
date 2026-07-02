"use client";

import { useActionState, useEffect } from "react";
import { submitWholesale } from "@/app/actions/leads";
import { idleState } from "@/lib/leadSchemas";
import { track } from "@/lib/analytics";
import { site, whatsappHref } from "@/lib/site";
import { Field } from "./Field";
import { Turnstile } from "./Turnstile";
import styles from "./fields.module.css";

export function WholesaleForm() {
  const [state, action, pending] = useActionState(submitWholesale, idleState);

  useEffect(() => {
    if (state.ok) track.formSubmit("wholesale");
  }, [state.ok]);

  if (state.ok) {
    return (
      <div className={styles.success}>
        <p className={styles.successTitle}>Hvala! Upit je poslat.</p>
        <p className={styles.successText}>
          Vraćamo se sa ponudom po meri — količine, ritam isporuke i izbor rakija
          prema vašem lokalu.
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
        <Field label="Naziv lokala / firme" name="businessName" error={fe.businessName} required>
          <input name="businessName" className={styles.input} required />
        </Field>
        <Field label="Kontakt osoba" name="name" error={fe.name} required>
          <input name="name" className={styles.input} required />
        </Field>
      </div>

      <div className={styles.row}>
        <Field label="Telefon ili mejl" name="contact" error={fe.contact} required>
          <input name="contact" className={styles.input} required />
        </Field>
        <Field label="Grad" name="city" error={fe.city} required>
          <input name="city" className={styles.input} required />
        </Field>
      </div>

      <Field label="Šta vam treba? (opciono)" name="message" error={fe.message}>
        <textarea
          name="message"
          className={styles.textarea}
          placeholder="Vrste rakija, količine, sezona, degustacija…"
        />
      </Field>

      <Turnstile />

      {state.error && <p className={styles.formError}>{state.error}</p>}

      <div className={styles.submitRow}>
        <button type="submit" className={styles.submit} disabled={pending}>
          {pending ? "Slanje…" : "Zatražite ponudu"}
        </button>
      </div>

      <p className={styles.alt}>
        Radije direktno?{" "}
        <a
          className={styles.altLink}
          href={whatsappHref("Zdravo! Zainteresovani smo za veleprodaju rakije.")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track.whatsapp("wholesale")}
        >
          Pišite na WhatsApp
        </a>{" "}
        ili pozovite {site.phone}.
      </p>
    </form>
  );
}
