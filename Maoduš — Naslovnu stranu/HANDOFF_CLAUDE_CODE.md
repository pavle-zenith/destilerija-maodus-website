# Handoff: Destilerija Maoduš — Homepage (Naslovna strana)

## Overview
This bundle contains the **homepage** for *Destilerija Maoduš*, a family-run fruit-brandy (rakija) distillery from Vojvodina, Serbia. The page is a **conversion-first landing page** built around two parallel funnels:

1. **B2B / Veleprodaja** — restaurants, bars, event halls, wine shops (wholesale).
2. **B2C / Poručivanje** — private buyers ordering for gifts, celebrations (slava, weddings), or personal use.

Everything on the page routes visitors toward one of those two flows while building trust (origin story, process, lab-tested quality, partner proof). Site language is **Serbian (latinica)**. There is no webshop — all CTAs lead to an inquiry/contact flow.

---

## About the Design Files
The file `Naslovna.dc.html` is a **design reference**, not production code to ship as-is. It is a self-contained HTML prototype (built on an internal "Design Component" runtime — `support.js` + `image-slot.js`) that demonstrates the intended **look, layout, copy, and interactions**.

**Your task:** recreate this design in the target codebase's real environment (React/Next, Vue/Nuxt, Astro, SvelteKit, plain HTML/CSS, etc.) using its established patterns, component conventions, and image pipeline. If no codebase exists yet, **Next.js (App Router) + Tailwind** is a good fit for a marketing site like this, but any modern framework works.

Do **not** try to reuse `support.js`, `image-slot.js`, the `<x-dc>` wrapper, `<sc-for>`/`<sc-if>` tags, or the `data-dc-script` logic class — those are prototype-runtime artifacts. Reimplement the equivalent behavior with the target framework's native primitives (component props, `map()`, conditional rendering, state hooks).

This is a **high-fidelity (hifi)** design: colors, typography, spacing, and interactions are final. Recreate it pixel-faithfully, then wire the forms/links to real backends.

---

## Tech Notes & Fonts
- **Fonts (Google Fonts):**
  - **Fraunces** — display serif for all headings, brand wordmark, italic accents. Weights used: 400, 500, 600; italics 400/500. Must include Latin-Extended for Serbian diacritics (č, ć, š, ž, đ).
  - **Inter** — body/UI. Weights 400, 500, 600.
  - Import: `https://fonts.googleapis.com/css2?family=Fraunces:opsz,ital,wght@9..144,0,400;9..144,0,500;9..144,0,600;9..144,1,400;9..144,1,500&family=Inter:wght@400;500;600&display=swap`
- **Global resets:** `box-sizing:border-box` everywhere; body background `#FAF6EE`; `overflow-x:hidden` on the page wrapper; custom `::selection` (bg `#B53232`, text `#FAF6EE`).
- **Responsiveness** is done almost entirely with `clamp()` for fluid font sizes / paddings, plus `flex-wrap` and `auto-fit` grids — very few hard breakpoints. Keep that approach; it means the layout reflows continuously rather than at fixed steps.
- **Two JS-driven breakpoints** exist (see State Management): `<900px` toggles the mobile hamburger nav; `<1024px` swaps the hero's featured card from a floating overlay to an in-flow block.
- **Icons** are inline hand-drawn SVGs (stroke-based, `stroke-width:1.6`, round caps/joins). No icon library — copy the SVG paths or substitute equivalents from your icon set (Lucide matches the style closely).

---

## Design Tokens

### Colors
| Token | Hex | Usage |
|---|---|---|
| Paper (page bg) | `#FAF6EE` | Default page background |
| Paper hero top | `#F5EDDE` | Hero gradient start |
| Paper hero mid | `#EEE3D1` | Hero gradient mid / alt light section (`#EFE5D2`) |
| Paper hero bottom | `#E7DBCC` | Hero gradient end |
| Card cream | `#FFFDF9` | Blog/FAQ cards |
| Deep charcoal (warm) | `#1C1815` | Trust strip, B2B section, final CTA base |
| Footer black | `#141110` | Footer |
| Card dark | `#241E19` | Product cards, USP cards |
| Deep plum (šljiva) | `#4A1E2A` | "O nama" section background |
| **Red accent (primary)** | **`#B53232`** | **CTAs, links, eyebrows, active accents** |
| Red accent hover | `#8E2626` | Button hover |
| Old gold | `#C9A34E` | Premium accents, bento tags, italic subtitles, B2B icons |
| Cream text | `#F4ECDD` | Text on dark |
| Warm off-white | `#F7EFE0` | Card headings on dark |
| Muted taupe | `#A99A82` | Secondary text on dark |
| Body brown | `#221B14` | Primary text on light |
| Body brown 2 | `#3A3025` | Nav links |
| Muted brown | `#6E5D48` / `#5A4A38` | Body paragraphs on light |
| Caption brown | `#8A7A61` | Small captions on light |
| Card border (light) | `#E7DCC8` | Light card borders |

> **Accent discipline:** the red `#B53232` is used *sparingly* — only on CTAs, links, eyebrow labels, and small accent marks. Gold `#C9A34E` is reserved for premium/label moments (bento tags, italic "Kraljica voćnih rakija" subtitles, B2B card icons). Don't spread either color into large fills.

### Typography scale (fluid)
| Role | Family / weight | Size (clamp) | Line-height | Notes |
|---|---|---|---|---|
| H1 hero | Fraunces 500 | `clamp(40px,5.6vw,68px)` | 1.03 | letter-spacing -.022em; "Rakija" span in red |
| H2 section | Fraunces 500 | `clamp(30–32px, 4.4–4.8vw, 48–56px)` | 1.06–1.1 | italic red span on some |
| H3 card | Fraunces 500 | 20–33px | 1.04–1.25 | |
| Eyebrow/label | Inter 600 | 11–13px | — | uppercase, letter-spacing .18–.24em |
| Body | Inter 400 | `clamp(16px,1.4vw,18–19px)` | 1.6–1.7 | |
| Small caption | Inter 400–500 | 12–15px | 1.6 | |
| Buttons | Inter 600 | 15–16px | — | |
| Giant footer wordmark | Fraunces 600 | `min(9.1vw,150px)` | .9 | color `rgba(244,236,221,.06)`, nowrap |

### Radius & shadows
- Radii are small and understated: buttons `2–3px`, cards `5–8px`, icon chips `10px`, pills `999px`, avatars `50%`.
- Shadows: CTA glow `0 10px 26px rgba(181,50,50,.28–.34)`; card hover `0 20–26px 44–54px rgba(34,27,20,.1–.22)`; floating hero card `0 30px 70px rgba(34,27,20,.28)`.
- Section vertical rhythm: `clamp(60px,8–9vw,120–128px)` top/bottom padding. Max content width **1280px** (some sections 880–1080px), horizontal padding `clamp(20px,5vw,56px)`.

---

## Screens / Views (single page, top → bottom)

The page is one continuous scroll. Sections in order:

### 0. Age Gate (18+) — modal
- **Purpose:** legal age verification on first visit.
- **Behavior:** full-screen overlay `rgba(20,15,10,.78)` + `backdrop-filter:blur(8px)`. Centered dark card (max 440px, bg `#1C1815`, red-tinted border). Brand wordmark "MAODUŠ" / "Destilerija" label / red gradient divider, then the question **"Da li imate 18 ili više godina?"** with two buttons: **"Da, imam 18+"** (red) and **"Nemam"** (outline).
- On **Da** → persist and dismiss (see State). On **Nemam** → swap card content to a polite refusal: "Žao nam je." + "Naš sajt je dostupan samo punoletnim posetiocima. Uživajte odgovorno." (no way forward).
- Persist the "yes" choice (prototype uses `localStorage['maodus_age_ok']='1'`; production should use a cookie so SSR can gate too).

### 1. Header / Nav — sticky
- **Layout:** sticky top, `rgba(250,246,238,.9)` + `backdrop-filter:blur(12px)`, 1px bottom border. Inner max-1280, `padding:16px clamp(20px,5vw,56px)`, flex space-between.
- **Left:** logo image (`logo.png`, height 46px).
- **Desktop nav (≥900px):** links **Za koga · Rakije · Veleprodaja · O nama · Blog · Kontakt** (Inter 500, 15px, hover → red), then a red pill CTA **"Poručite"** (→ `#kontakt`).
- **Mobile (<900px):** red "Poručite" pill stays visible + hamburger button (44×44 hit target). Tapping opens a stacked full-width menu with the same links (17px rows, divided by hairlines); each link closes the menu on click.

### 2. Hero
- **Purpose:** state what's sold and to whom; split into the two funnels immediately.
- **Layout:** `min-height:clamp(760px,96vh,1000px)`. Background = paper gradient (`#F5EDDE → #EEE3D1 → #E7DBCC`, 180deg) with a faint full-bleed **pen-ink distillery illustration** (`hero-distillery.png`, `object-fit:cover`, `object-position:center 22%`, `opacity:.28`) and a second top-down paper gradient overlay to keep text legible. Content is **top-aligned** (not centered), max-width 700px, left side.
- **Content:**
  - Eyebrow: red 14×14 square + **"Porodična destilerija iz Vojvodine"** (red, uppercase, .2em).
  - H1: **"Rakija za poklon, proslavu i dobar meni."** ("Rakija" in red, forced line break before "proslavu").
  - Sub: **"Voćne rakije od pažljivo odabranog voća, kontrolisane fermentacije i dvostruke destilacije u bakru."** (max 452px).
  - Two CTAs: **"Za lokale i proslave"** (red, → `#veleprodaja`) and **"Poručite za sebe ili poklon"** (dark `#1C1815`, → `#kontakt`). Both have shadows.
  - Avatar trust strip: 3 overlapping circular image slots (46px, -14px overlap) + label **"Biraju nas kupci, domaćini i ugostitelji"**.
- **Featured product card (Dunja Barrique):** appears twice in source but only one shows at a time based on width:
  - **≥1024px:** floats absolutely bottom-right, aligned to the 1280 container (width `clamp(300px,26vw,332px)`, min-height 440px).
  - **<1024px:** rendered in-flow below the avatar strip (max 340px).
  - Card: full-bleed `dunja-barrique.png` + top-to-bottom dark gradient; top: gold "Izdvajamo" eyebrow, "Dunja Barrique", gold italic "Kraljica voćnih rakija"; bottom: "42% vol" / "0,70 l" and a round "+" button (→ `#kontakt`, hover fills red).

### 3. Trust Strip
- **Layout:** dark band (`#1C1815`), hairline top/bottom borders, centered flex-wrap row.
- **4 items,** each = red rounded-square icon chip (46px, bg `#B53232`, cream SVG) + label (cream, Inter 500, 15px):
  1. **Tradicija od 1960-ih**
  2. **Dvostruka destilacija u bakru**
  3. **Kontrolisana proizvodnja**
  4. **Voće iz sopstvenog voćnjaka**

### 4. Rakije — full-bleed carousel
- **Purpose:** browse the range; anchor perception of quality.
- **Section bg:** paper `#FAF6EE` at 93% over the `orchard-texture.png` ink texture (`background-size:cover`).
- **Header row** (max-1280): eyebrow "Asortiman", H2 **"Naše rakije"**, intro paragraph, and on the right two round arrow buttons (54px) for prev/next (hover fill red).
- **Track:** horizontal `overflow-x:auto` flex row, `gap:24px`, scrollbar hidden. Cards **bleed off the right edge**; the left edge is padded to line up the first card with the 1280 container (`padding-left:calc(max(0px,(100% - 1280px)/2) + clamp(20px,5vw,56px))`), and a left **mask fade** dissolves the leftmost card into the paper (`mask-image:linear-gradient(to right,transparent,#000 clamp(48px,7vw,120px),#000)`).
- **Cards (6):** each `flex:0 0 clamp(280px,80vw,338px)`, min-height 462px, dark `#241E19`, full-bleed bottle photo + the standard top/bottom dark gradient. Top: Fraunces name + gold italic category. Bottom: ABV / volume + round "+" (→ `#kontakt`). Data:
  | Name | Category (cat) | ABV | Vol | Image |
  |---|---|---|---|---|
  | Dunja | Voćna bela | 40% vol | 0,70 l | `dunja.png` |
  | Kajsija | Voćna bela | 40% vol | 0,70 l | `kajsija.png` |
  | Viljamovka | Voćna bela | 40% vol | 0,70 l | `viljamovka.png` |
  | Dunja Barrique | Barrique | 42% vol | 0,70 l | `dunja-barrique.png` |
  | Šljiva Barrique | Barrique | 42% vol | 0,70 l | `sljiva-barrique.png` |
  | Jabuka Barrique | Barrique | 42% vol | 0,70 l | `jabuka-barrique.png` |
  > There are **8 SKUs total** in the brand; two "Classic" variants (Šljiva Classic, Jabuka Classic) are intentionally not in the carousel yet — add them when photos exist.
- **Below track:** centered red CTA **"Pogledajte sve rakije →"** (currently `href="#"` — wire to `/rakije`).
- **Carousel behavior:** see Interactions. Snaps to computed stops (~362px step), with a final full stop and wrap-around.

### 5. Za ugostitelje (B2B / Veleprodaja)
- **Section bg:** dark `#1C1815`. `id="veleprodaja"`.
- **Header** (headline sits *outside* the cards): eyebrow "Za ugostitelje" (gold, with a short red dash), H2 **"Rakija za meni koji ima šta da preporuči."** (cream) on the left; supporting paragraph on the right (max 400px, taupe).
- **Wide USP hero card:** full-bleed bg image `b2b-sank.png` (`object-position:70% center`), left→right dark gradient (`rgba(18,13,9,.95)→.28`) + a red radial glow bottom-left. Content bottom-left (max 560px): gold-outlined check icon chip, H3 **"Stabilan kvalitet i direktna isporuka"**, paragraph "Bez posrednika i bez nagađanja. Dogovaramo količine, ritam isporuke i izbor rakija prema vašem lokalu, meniju ili sezoni proslava." Min-height `clamp(340px,34vw,440px)`.
- **3 USP cards** (auto-fit grid, min 240px, dark `#241E19`, gold-tinted border, red radial glow from top): icon chip pinned top, text pinned bottom (`margin-top:auto`):
  1. **Jasan izbor za meni** — "Voćne bele, barrique i classic rakije — za aperitiv, digestiv, poklon bocu ili preporuku uz obrok."
  2. **Degustacija pre odluke** — "Probajte, uporedite i izaberite ono što odgovara vašim gostima pre prve veće porudžbine."
  3. **Etiketa za lokal ili događaj** — "Personalizovana etiketa za sale, svadbe, poslovne poklone i posebne prilike."
- **CTAs:** red **"Zatražite veleprodajnu ponudu"** + outline **"Pitajte za degustacioni uzorak"** (both → `#kontakt`).

### 6. Za koga je Maoduš — bento crossroads
- **Section bg:** paper 93% over orchard texture. `id="zakoga"`.
- **Header:** eyebrow "Za koga je Maoduš?", H2 **"Izaberite svoj put"**, intro paragraph.
- **Bento** = 2 rows, **zig-zag proportions** (`flex` ratios, wrap at 280–300px):
  - Row 1: **wide** "Za restorane i barove" (`flex:1.7`) + **narrow** "Za sale i svadbe" (`flex:1`).
  - Row 2 flips: **narrow** "Za poslovne poklone" (`flex:1`) + **wide** "Za privatne kupce" (`flex:1.7`).
- **Each card:** min-height `clamp(300px,30vw,400px)`, full-bleed photo + **intent-tinted** bottom-up gradient, a **gold tag** pill top-left (uppercase), Fraunces title + one-line description bottom-left. Hover lifts 4px with shadow.
  | Title | Tag | Gradient tint | Link | Image | Copy |
  |---|---|---|---|---|---|
  | Za restorane i barove | Veleprodaja | copper `rgba(58,26,6,…)` | `#veleprodaja` | `bento-restoran.png` | "Rakija za meni, preporuku osoblja i goste koji traže domaći izbor." |
  | Za sale i svadbe | Proslave | plum `rgba(58,18,32,…)` | `#veleprodaja` | `bento-svadba.png` (`object-position:center 72%`) | "Boce za posluženje, poklon pakovanja i etikete za događaj." |
  | Za poslovne poklone | Pokloni | gold-brown `rgba(52,38,12,…)` | `#kontakt` | `bento-poklon.png` | "Poklon boce za klijente, partnere i ljude kojima želite da pošaljete nešto domaće i ozbiljno." |
  | Za privatne kupce | Porudžbina | wine `rgba(38,12,22,…)` | `#kontakt` | `bento-slava.png` | "Za slavu, poklon, odlazak u goste ili ličnu kolekciju." |

### 7. O nama
- **Section bg:** deep plum `#4A1E2A`. `id="o-nama"`. Two-column auto-fit grid (min 320px), gap `clamp(40px,6vw,80px)`.
- **Left:** eyebrow "O nama" (gold), H2 **"Tri generacije posvećene rakiji"** (cream), paragraph ("Maoduš je porodična destilerija iz Vojvodine…"), red CTA **"Poručite rakiju →"** (→ `#kontakt`), then a **2×2 stat grid** (dark translucent cards, gold-tinted border):
  | Stat | Label |
  |---|---|
  | **1960-e** | Početak tradicije |
  | **3** | Generacije porodice |
  | **8** | Rakija u asortimanu |
  | **Vojvodina** | Naš kraj i naše voće |
- **Right:** portrait image (4/5 aspect, radius 6px, big soft shadow) — family / orchard / distillery photo.

### 8. Poverenje (proof)
- **Section bg:** paper `#FAF6EE`.
- **Centered header:** eyebrow "Poverenje", H2 **"Dokaz umesto obećanja"**, intro paragraph.
- **Partner logo marquee:** infinite horizontal auto-scroll (CSS `@keyframes partnerscroll{to{transform:translateX(-50%)}}`, 26s linear infinite). Logos duplicated once for a seamless loop; edges fade via a horizontal mask. Logos use `mix-blend-mode:multiply`, `opacity:.82`, max-height ~66–74px. Partners: `partner-bonanza.jpg`, `partner-tiska.jpg`, `partner-strand.png`, `partner-basch.png`. *(The two JPGs have near-white backgrounds; prefer transparent PNGs in production.)*
- **Proof checklist row** (centered, red ✓): **Laboratorijske analize · Fotografije procesa i voćnjaka · Direktan kontakt sa proizvođačem**.

### 9. Kako naručiti
- **Section bg:** `#EFE5D2` at 93% over orchard texture. Centered content, max-1080.
- **Header:** pill eyebrow "Kako naručiti", H2 **"Tri koraka do _porudžbine_"** (last word italic red), intro paragraph.
- **3-step timeline:** a horizontal connector line (`top:30px`, from 16.66%→83.33%, red 32% alpha) sits behind three numbered circles (60px, red, Fraunces number, with a `0 0 0 10px #EFE5D2` ring to "cut" the line). Steps:
  1. **Izaberite rakiju** — "Pogledajte asortiman i izdvojite šta vam treba za poklon, proslavu, meni ili ličnu porudžbinu."
  2. **Pošaljite upit** — "Napišite količinu, priliku i grad. Možete preko forme, telefona, mejla ili društvenih mreža."
  3. **Dogovaramo isporuku** — "Potvrđujemo dostupnost, cenu, isporuku i način plaćanja."
- **Reassurance line** (lock icon): "Ponudu pravimo prema količini, nameni i mestu isporuke."
- **CTAs:** red **"Pošaljite upit"** (→ `#kontakt`) + text link **"Zatražite veleprodaju →"** (→ `#veleprodaja`).

### 10. Blog teaser
- **Section bg:** paper. `id="blog"`.
- **Header row:** eyebrow "Edukacija i saveti", H2 **"Iz naše radionice"**, right-aligned "Svi tekstovi →" link.
- **3 cards** (auto-fit min 280px, cream `#FFFDF9`, border `#E7DCC8`, hover red border + lift): image slot (190px) + red category eyebrow + Fraunces title. Placeholder posts:
  - Za ugostitelje — "Kako izabrati rakiju za restoran?"
  - Pokloni — "Rakija kao poklon: koju odabrati?"
  - Saveti — "Na kojoj temperaturi se služi voćna rakija?"
- *This is a Phase-2 placeholder — links are `#`. Wire to a real blog/CMS when ready, or hide until launch.*

### 11. FAQ
- **Section bg:** paper. `id="faq"`. Max-880, centered header.
- **Header:** pill eyebrow "Česta pitanja", H2 **"Najčešća _pitanja_"** (italic red), sub "Kratki odgovori pre nego što pošaljete upit."
- **Accordion (5 items),** single-open. Each row: cream card, button with Fraunces question + red 40px square toggle showing **+** (closed) / **−** (open); answer reveals below when open. Content:
  1. **Kako mogu da poručim rakiju?** — "Pošaljite nam upit preko forme, telefonom, mejlom ili porukom na društvenim mrežama. Javite koju rakiju želite, količinu i grad isporuke."
  2. **Da li radite veleprodaju za restorane i sale?** — "Da. Sarađujemo sa restoranima, barovima, salama, vinotekama i drugim ugostiteljima. Za veće količine šaljemo ponudu po meri."
  3. **Da li šaljete širom Srbije?** — "Isporuku dogovaramo prema količini i lokaciji. U upitu nam napišite grad i broj boca, pa ćemo potvrditi mogućnosti i rok."
  4. **Da li nudite poklon pakovanja?** — "Da. Rakije se mogu poručiti za poklon, slavu, poslovni poklon ili proslavu. Za posebne prilike možemo dogovoriti i personalizovanu etiketu."
  5. **Kolika je jačina vaših rakija?** — "Voćne bele i classic rakije su 40% vol, dok su barrique izdanja 42% vol."

### 12. Final CTA (dark)
- **Section bg:** `#1C1815` with full-bleed `cta-bar.png` (Maoduš bottles on a bar) + a top→bottom dark gradient that **fades to the footer color `#141110`** at the bottom (the footer has `margin-top:-1px` and no top border, so the two visually merge). `id="kontakt"`.
- **Centered content** (max-900): eyebrow between two red rules "Javite nam šta vam treba", H2 **"Za poklon, proslavu, meni ili ličnu porudžbinu"**, gold italic slogan **„Dobra do poslednje kapi."**, two CTAs — red **"Veleprodajni upit"** (→ `#veleprodaja`) + outline **"Porudžbina za sebe"** — and a contact line: phone **+381 64 61 59 033**, email **info@destilerijamaodus.rs**, Instagram **@destilerija.maodus**.

### 13. Footer
- **Bg:** `#141110`, with the orchard photo (`footer-orchard.png`) faintly bleeding along the bottom (`opacity:.17`, masked to fade upward).
- **Top block** (2-col auto-fit): left = white logo (`logo-white.png`, 52px) + tagline + phone/email; right = **newsletter** "Novosti i nova izdanja" with an email input + red arrow submit + "Povremeno, bez spama. Samo za punoletne."
- **4 link columns:**
  - **Proizvodi:** Dunja · Kajsija · Viljamovka · Sve rakije
  - **Za porudžbinu:** Kako naručiti · Poklon pakovanja · Rakija za proslave · Personalizovana etiketa
  - **Za ugostitelje:** Veleprodaja · Restorani i barovi · Sale i svadbe · Zatražite ponudu
  - **Info:** O nama · Blog · Kontakt · Privatnost
- **Legal bar:** "© 2026 Destilerija Maoduš. Sva prava zadržana." · **18+** badge "Uživajte odgovorno." · Privatnost · Kolačići.
- **Giant faded wordmark:** "DESTILERIJA MAODUŠ" spanning the full width in one non-wrapping line, `font-size:min(9.1vw,150px)`, color `rgba(244,236,221,.06)`. Keep it viewport-scaled so it never clips.

---

## Interactions & Behavior
- **Age gate:** blocks the page until confirmed; persists (cookie/localStorage). Decline → dead-end refusal message. Recommend a real cookie so server-side rendering can gate too.
- **Sticky header:** translucent + blur; the only "scroll" behavior is CSS stickiness (no JS scroll listener in the design).
- **Mobile nav:** `<900px` shows hamburger; toggling opens/closes a stacked menu; links close it on click. Keep the "Poručite" CTA always visible.
- **Hero featured card swap:** `<1024px` renders the card in-flow; `≥1024px` floats it bottom-right. Reimplement with a CSS breakpoint or a resize hook.
- **Rakije carousel:**
  - Prev/next arrows tween `scrollLeft` (~380ms, ease-out cubic) to computed stops (step ≈362px = card 338 + gap 24). It merges a too-close final stop and **wraps** (next past the end → 0; prev before start → last).
  - Track is also free-scrollable/swipeable (native `overflow-x`). Scrollbar hidden.
  - In a framework, prefer a ref to the track element + a scroll helper; or use a headless carousel lib configured to the same step and mask fade.
- **FAQ accordion:** single-open; clicking an open row closes it. `+`/`−` toggle.
- **Hover states** (transitions ~.2–.25s):
  - Red buttons → `#8E2626`.
  - Dark buttons → `#332B24`.
  - Outline buttons → border/text to red or gold.
  - Nav links → red.
  - Cards (bento/blog/product) → `translateY(-4px)` + shadow.
  - Round "+" buttons → fill red.
- **All CTAs currently point to in-page anchors** (`#veleprodaja`, `#kontakt`) or `#` placeholders. In production, wire them to real routes/forms: an **inquiry form** (`/upit` or a modal) capturing rakija + quantity + occasion + city + contact, a **wholesale form** (`/veleprodaja`), the full **catalog** (`/rakije`), the **blog**, and legal pages (Privatnost, Kolačići).

## State Management
Minimal, all client-side:
- `ageOk: boolean` — age confirmed (persisted).
- `denied: boolean` — user clicked "Nemam".
- `navOpen: boolean` — mobile menu open.
- `isMobile: boolean` — `window.innerWidth < 900` (hamburger vs desktop nav).
- `wide: boolean` — `window.innerWidth >= 1024` (hero card float vs in-flow).
- `faqOpen: number` — index of open FAQ (`-1` = none).
- Carousel scroll position is read from the DOM element on demand (not stored in state).

No data fetching in the prototype — product list and FAQ are static arrays (see the logic class in `Naslovna.dc.html`). In production, source products/FAQ/blog from a CMS or config, and POST the forms to your backend/email/CRM.

---

## Assets
All in the bundle root (AI-generated & brand art — replace with final photography where noted):
- `logo.png` — primary logo (dark-on-light header).
- `logo-white.png` — white logo (footer).
- `hero-distillery.png` — pen-ink distillery landscape (hero backdrop watermark).
- `orchard-texture.png` — faint ink texture used behind several light sections.
- `footer-orchard.png` — orchard photo bleeding into the footer.
- **Product bottles:** `dunja.png`, `kajsija.png`, `viljamovka.png`, `dunja-barrique.png`, `sljiva-barrique.png`, `jabuka-barrique.png`, `jabuka-barrique.png` (also `jabuka-barrique`), plus `dunja-barrique.png` for the hero card.
- **Bento:** `bento-restoran.png`, `bento-svadba.png`, `bento-poklon.png`, `bento-slava.png`.
- **B2B:** `b2b-sank.png`.
- **Final CTA:** `cta-bar.png`.
- **Partners:** `partner-bonanza.jpg`, `partner-tiska.jpg`, `partner-strand.png`, `partner-basch.png`.
- **User-fillable slots** (empty in the design, filled via drag-drop in the prototype): 3 hero avatars (`hero-av-1..3`), `about-photo`, `blog-1..3`. In production these are just `<img>` targets — supply real images or a CMS field.

> Optimize all images to **WebP/AVIF**, add width/height, and lazy-load below-the-fold (speed is an SEO factor, and this page is image-heavy).

## Files
- `Naslovna.dc.html` — the full homepage design reference (markup + inline styles + the small logic class at the bottom). **Read this for exact values.**
- `Destilerija Maoduš - Naslovna.html` — a self-contained/inlined export of the same page (for quick offline preview in a browser).
- `image-slot.js`, `support.js` — prototype-runtime files; **do not port**, reimplement with native framework primitives.
- Image assets — as listed above.

---

## Implementation checklist
1. Scaffold the target project; add Fraunces + Inter, global resets, and the color tokens above.
2. Build shared primitives: `Button` (red / dark / outline / text variants), `Eyebrow`, `SectionHeading`, `ProductCard`, `BentoCard`, `USPCard`, `StatCard`, `FaqItem`, icon set.
3. Recreate sections top-to-bottom using the measurements/copy here; keep the `clamp()`-based fluid sizing.
4. Implement the 6 interactions (age gate, sticky header, mobile nav, hero card swap, carousel, FAQ).
5. Replace anchor CTAs with real routes/forms; wire inquiry + wholesale forms and the newsletter to your backend.
6. Swap AI/placeholder imagery for final photography; optimize + lazy-load.
7. Add the two missing "Classic" SKUs to the carousel when photos exist.
8. QA Serbian diacritics render in Fraunces + Inter; verify contrast on dark sections; test the age-gate cookie under SSR.
