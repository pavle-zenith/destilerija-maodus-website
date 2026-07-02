"use client";

import Script from "next/script";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/**
 * Cloudflare Turnstile widget. Renders only when configured; injects a hidden
 * `cf-turnstile-response` input the server action verifies. No-op otherwise.
 */
export function Turnstile() {
  if (!SITE_KEY) return null;
  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />
      <div className="cf-turnstile" data-sitekey={SITE_KEY} data-theme="light" />
    </>
  );
}
