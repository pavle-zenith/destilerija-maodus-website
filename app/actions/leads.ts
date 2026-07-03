"use server";

import { Resend } from "resend";
import {
  inquirySchema,
  wholesaleSchema,
  newsletterSchema,
  type ActionState,
} from "@/lib/leadSchemas";
import { createLead } from "@/sanity/writeClient";
import { site } from "@/lib/site";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
const FROM = process.env.RESEND_FROM || "Maoduš sajt <onboarding@resend.dev>";

function zodErrors(issues: readonly { path: PropertyKey[]; message: string }[]) {
  const fieldErrors: Record<string, string> = {};
  for (const i of issues) {
    const key = String(i.path[0] ?? "");
    if (key && !fieldErrors[key]) fieldErrors[key] = i.message;
  }
  return fieldErrors;
}

/** Cloudflare Turnstile — verified only when configured. */
async function verifyTurnstile(token: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured → skip
  if (!token) return false;
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ secret, response: token }),
      }
    );
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

async function sendEmail(subject: string, lines: string[]) {
  if (!resend) return;
  await resend.emails.send({
    from: FROM,
    to: site.email,
    subject,
    replyTo: site.email,
    text: lines.join("\n"),
  });
}

const genericError =
  "Došlo je do greške. Pokušajte ponovo ili nas pozovite na " + site.phone + ".";

export async function submitInquiry(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = inquirySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, fieldErrors: zodErrors(parsed.error.issues) };
  }
  const d = parsed.data;
  if (d.company) return { ok: true }; // honeypot tripped — silently accept

  const human = await verifyTurnstile(formData.get("cf-turnstile-response") as string | null);
  if (!human) return { ok: false, error: "Potvrdite da niste robot." };

  try {
    await Promise.all([
      createLead({
        kind: "inquiry",
        name: d.name,
        contact: d.contact,
        city: d.city,
        rakija: d.rakija,
        quantity: d.quantity,
        occasion: d.occasion,
        message: d.message,
      }),
      sendEmail(`Nova porudžbina / upit: ${d.name}`, [
        `Ime: ${d.name}`,
        `Kontakt: ${d.contact}`,
        `Grad: ${d.city}`,
        `Rakija: ${d.rakija || "-"}`,
        `Količina: ${d.quantity || "-"}`,
        `Prilika: ${d.occasion || "-"}`,
        `Poruka: ${d.message || "-"}`,
      ]),
    ]);
    return { ok: true };
  } catch {
    return { ok: false, error: genericError };
  }
}

const wantLabels: Record<string, string> = {
  uzorak: "Besplatan degustacioni uzorak",
  ponuda: "Ponudu i cene",
  oboje: "Uzorak i ponudu",
};

export async function submitWholesale(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  // checkboxes submit one entry per checked box — Object.fromEntries keeps only the last
  const parsed = wholesaleSchema.safeParse({
    ...Object.fromEntries(formData),
    rakije: formData.getAll("rakije").map(String),
  });
  if (!parsed.success) {
    return { ok: false, fieldErrors: zodErrors(parsed.error.issues) };
  }
  const d = parsed.data;
  if (d.company) return { ok: true };

  const human = await verifyTurnstile(formData.get("cf-turnstile-response") as string | null);
  if (!human) return { ok: false, error: "Potvrdite da niste robot." };

  const subject =
    d.want === "uzorak"
      ? `Zahtev za degustacioni uzorak: ${d.businessName}`
      : `Veleprodajni upit: ${d.businessName}`;

  try {
    await Promise.all([
      createLead({
        kind: "wholesale",
        want: d.want,
        businessName: d.businessName,
        venueType: d.venueType,
        name: d.name,
        phone: d.phone,
        email: d.email,
        city: d.city,
        rakije: d.rakije,
        volume: d.volume,
        message: d.message,
      }),
      sendEmail(subject, [
        `Šta žele: ${wantLabels[d.want] ?? d.want}`,
        `Lokal / firma: ${d.businessName}`,
        `Tip objekta: ${d.venueType}`,
        `Kontakt osoba: ${d.name}`,
        `Telefon: ${d.phone}`,
        `Email: ${d.email}`,
        `Grad: ${d.city}`,
        `Rakije: ${d.rakije.length ? d.rakije.join(", ") : "-"}`,
        `Okvirna količina / učestalost: ${d.volume || "-"}`,
        `Poruka: ${d.message || "-"}`,
      ]),
    ]);
    return { ok: true };
  } catch {
    return { ok: false, error: genericError };
  }
}

export async function subscribe(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = newsletterSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, fieldErrors: zodErrors(parsed.error.issues) };
  }
  const d = parsed.data;
  if (d.company) return { ok: true };

  try {
    await createLead({ kind: "newsletter", contact: d.email });
    if (resend && process.env.RESEND_AUDIENCE_ID) {
      await resend.contacts.create({
        email: d.email,
        audienceId: process.env.RESEND_AUDIENCE_ID,
        unsubscribed: false,
      });
    }
    return { ok: true };
  } catch {
    return { ok: false, error: genericError };
  }
}
