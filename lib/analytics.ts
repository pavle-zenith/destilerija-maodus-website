/** Thin GA4 wrapper. No-ops until consent is granted + gtag is loaded. */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export type TrackParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, params?: TrackParams) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params ?? {});
}

/** Conversion helpers used across CTAs and forms. */
export const track = {
  cta: (label: string, destination?: string) =>
    trackEvent("cta_click", { cta_label: label, destination }),
  whatsapp: (context?: string) =>
    trackEvent("whatsapp_click", { context }),
  formSubmit: (form: string) => trackEvent("form_submit", { form_name: form }),
  newsletter: () => trackEvent("newsletter_signup", {}),
};
