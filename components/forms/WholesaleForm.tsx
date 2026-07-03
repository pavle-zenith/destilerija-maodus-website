"use client";

import { useActionState, useEffect, useState } from "react";
import { submitWholesale } from "@/app/actions/leads";
import { idleState, type WholesaleWant } from "@/lib/leadSchemas";
import { allSkuNames, venueTypes } from "@/lib/content";
import { track } from "@/lib/analytics";
import { site, whatsappHref } from "@/lib/site";
import { Field } from "./Field";
import { Turnstile } from "./Turnstile";
import styles from "./fields.module.css";

const WANTS: { value: WholesaleWant; label: string }[] = [
  { value: "uzorak", label: "Besplatan degustacioni uzorak" },
  { value: "ponuda", label: "Ponudu i cene" },
  { value: "oboje", label: "Oboje" },
];

export function WholesaleForm({
  defaultWant = "uzorak",
  defaultVenue = "",
}: {
  defaultWant?: WholesaleWant;
  defaultVenue?: string;
}) {
  const [state, action, pending] = useActionState(submitWholesale, idleState);
  const [want, setWant] = useState<WholesaleWant>(defaultWant);

  useEffect(() => {
    if (state.ok) track.formSubmit("wholesale");
  }, [state.ok]);

  if (state.ok) {
    return (
      <div className={styles.success}>
        <p className={styles.successTitle}>Hvala! Upit je poslat.</p>
        <p className={styles.successText}>
          Javljamo se u roku od 24–48h
          {want !== "ponuda" ? " i dogovaramo slanje degustacionog uzorka" : ""}.
          Ponudu pravimo prema tipu objekta, količini i ritmu isporuke.
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

      <Field label="Šta želite?" name="want" error={fe.want} required>
        <div className={styles.radioRow} role="radiogroup" aria-label="Šta želite?">
          {WANTS.map((w) => (
            <label
              key={w.value}
              className={`${styles.radio} ${want === w.value ? styles.radioActive : ""}`}
            >
              <input
                type="radio"
                name="want"
                value={w.value}
                checked={want === w.value}
                onChange={() => setWant(w.value)}
                className={styles.radioInput}
              />
              {w.label}
            </label>
          ))}
        </div>
      </Field>

      <div className={styles.row}>
        <Field label="Naziv lokala / firme" name="businessName" error={fe.businessName} required>
          <input name="businessName" className={styles.input} required />
        </Field>
        <Field label="Tip objekta" name="venueType" error={fe.venueType} required>
          <select
            name="venueType"
            className={styles.select}
            defaultValue={defaultVenue}
            required
          >
            <option value="" disabled>
              Izaberite tip objekta
            </option>
            {venueTypes.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className={styles.row}>
        <Field label="Kontakt osoba" name="name" error={fe.name} required>
          <input name="name" className={styles.input} required />
        </Field>
        <Field label="Grad" name="city" error={fe.city} required>
          <input name="city" className={styles.input} required />
        </Field>
      </div>

      <div className={styles.row}>
        <Field label="Telefon" name="phone" error={fe.phone} required>
          <input name="phone" type="tel" className={styles.input} required />
        </Field>
        <Field label="Email" name="email" error={fe.email} required>
          <input name="email" type="email" className={styles.input} required />
        </Field>
      </div>

      <Field label="Koje rakije vas zanimaju? (opciono)" name="rakije" error={fe.rakije}>
        <div className={styles.checkGrid}>
          {allSkuNames.map((name) => (
            <label key={name} className={styles.check}>
              <input type="checkbox" name="rakije" value={name} className={styles.checkInput} />
              {name}
            </label>
          ))}
          <label className={styles.check}>
            <input
              type="checkbox"
              name="rakije"
              value="Nisam siguran, pomozite mi da izaberem"
              className={styles.checkInput}
            />
            Nisam siguran, pomozite mi da izaberem
          </label>
        </div>
      </Field>

      <Field label="Okvirna količina / učestalost (opciono)" name="volume" error={fe.volume}>
        <input
          name="volume"
          className={styles.input}
          placeholder="Primer: 12 boca mesečno, jednokratno za događaj…"
        />
      </Field>

      <Field label="Poruka / dodatne napomene (opciono)" name="message" error={fe.message}>
        <textarea
          name="message"
          className={styles.textarea}
          placeholder="Meni, kokteli, etiketa za lokal, termin događaja…"
        />
      </Field>

      <Turnstile />

      {state.error && <p className={styles.formError}>{state.error}</p>}

      <div className={styles.submitRow}>
        <button type="submit" className={styles.submit} disabled={pending}>
          {pending ? "Slanje…" : want === "ponuda" ? "Pošaljite upit" : "Zatražite uzorak"}
        </button>
      </div>

      <p className={styles.alt}>
        Odgovaramo u roku od 24–48h. Radije direktno?{" "}
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
