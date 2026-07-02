# Destilerija Maoduš — sajt

Marketing sajt (conversion-first landing) za porodičnu destileriju voćne rakije iz Vojvodine. Bez webshopa — svi CTA-ovi vode ka upitu (B2B veleprodaja / B2C porudžbina).

## Stack

- **Next.js 16** (App Router, React 19, TypeScript, Turbopack)
- **CSS Modules** + design tokeni kao CSS varijable (`app/tokens.css`)
- **next/font** — Fraunces (naslovi) + Inter (telo), `latin-ext` za č/ć/š/ž/đ
- **Sanity** CMS (embedded Studio na `/studio`) — lean, samo za sadržaj naslovne
- **Resend** (mejl + newsletter) · **Cloudflare Turnstile** (anti-spam)
- **GA4** + Consent Mode v2 iza banera za kolačiće
- Deploy: **Vercel**

## Pokretanje

```bash
npm install
cp .env.example .env.local   # popuniti po potrebi (sve je opciono za dev)
npm run dev                  # http://localhost:3000
```

Sajt radi i bez ijedne env promenljive — koristi ugrađeni sadržaj (`lib/content.ts`) i tiho preskače GA / Sanity / Resend / Turnstile dok se ne konfigurišu.

## Struktura

- `app/page.tsx` — naslovna; čita cookie punoletstva (SSR), povlači rakije/FAQ (Sanity → fallback)
- `components/sections/*` — 13 sekcija dizajna, svaka sa svojim `.module.css`
- `components/ui/*` — Button, Icon, Eyebrow, ProductCard, ImageSlot
- `components/layout/*` — Header, Footer, AgeGate, CookieConsent
- `components/forms/*` — upit / veleprodaja (modali) + newsletter; Server Actions u `app/actions/leads.ts`
- `sanity/*` + `sanity.config.ts` — klijent, upiti, šeme (`rakija`, `faqItem`, `partner`, `blogPost`, `siteSettings`, `lead`)
- SEO/GEO: `components/seo/StructuredData.tsx` (JSON-LD), `app/sitemap.ts`, `app/robots.ts`, `public/llms.txt`

## Konfiguracija (env)

| Grupa | Ključ | Napomena |
|---|---|---|
| Analytics | `NEXT_PUBLIC_GA_ID` | prazno = GA isključen |
| Sanity | `NEXT_PUBLIC_SANITY_PROJECT_ID`, `SANITY_API_WRITE_TOKEN` | write token samo server-side (za lead-ove) |
| Mejl | `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_AUDIENCE_ID` | |
| Anti-spam | `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | prazno = widget isključen |

## Napomene / dalje

- Dizajnirana je **samo naslovna**. Rute `/rakije`, `/blog`, pravne stranice još ne postoje — ti linkovi ostaju kao `#`/placeholder dok se ne naprave. Sanity šeme namerno pokrivaju samo sadržaj naslovne.
- Slike porodice/voćnjaka i blog fotke su placeholderi (`ImageSlot`) — zameniti pravom fotografijom ili Sanity poljem.
- Dodati 2 „Classic" rakije u karusel kad stignu fotografije.
- Izvorni dizajn: `Maoduš — Naslovnu stranu/` (referenca, ne build).
