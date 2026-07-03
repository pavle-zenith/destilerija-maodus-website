/**
 * Typed content fallbacks — the current homepage copy.
 * The homepage renders from these when Sanity is empty, so the page
 * works before any CMS content is entered. When Sanity has documents,
 * queries in sanity/queries.ts override these.
 */

export type RakijaGroupId = "vocne-bele" | "barrique" | "classic";

export type Rakija = {
  slug: string;
  name: string;
  category: string; // gold italic subtitle
  group: RakijaGroupId;
  abv: string;
  volume: string;
  image: string;
  /**
   * One-line tasting/aroma note for the /rakije hub cards.
   * TODO: only Dunja is final copy from the client — the other 7 are
   * placeholders and must be replaced before launch.
   */
  tastingNote: string;
};

/** A single price row. `price` in RSD, or "na upit" when not fixed. */
export type PriceRow = { volume: string; price: number | "na upit" };

/**
 * Rich per-product content for /rakije/{slug}, keyed by slug.
 * Prices are real (client-supplied 2026-07-03, VAT 20% included).
 * Everything else marked TODO is a plausible draft to be replaced with
 * final client copy before launch.
 */
export type RakijaDetail = {
  /** oak ageing summary; null for non-aged whites */
  oak: string | null;
  sensory: { nose: string; taste: string; finish: string };
  /** occasion + serving temperature (JTBD) */
  whenToDrink: string;
  servingTemp: string;
  /** 3–5 sentence variety/process story specific to this rakija */
  story: string;
  /** food-pairing line — only set for true barrique products */
  pairing?: string;
  /**
   * Price rows in intentional anchoring order (1L → 0,7L → 0,5L → 0,1L).
   * Variable length: Classic SKUs are 0,7L only; some lack 0,1L.
   */
  prices: PriceRow[];
};

/**
 * All 8 SKUs. Ordering here is hero-first within each group (Dunja / Dunja
 * Barrique lead as the flagship), which is the order the hub renders.
 * The homepage carousel reads the first 6 (photographed) SKUs via `rakije`.
 */
export const allRakije: Rakija[] = [
  // ── Voćne bele ──
  { slug: "dunja", name: "Dunja", category: "Voćna bela", group: "vocne-bele", abv: "40% vol", volume: "0,70 l", image: "/images/dunja.png", tastingNote: "Kraljica voćnih rakija sa punim mirisom zrele dunje i baršunastim završetkom." },
  { slug: "kajsija", name: "Kajsija", category: "Voćna bela", group: "vocne-bele", abv: "40% vol", volume: "0,70 l", image: "/images/kajsija.png", tastingNote: "Sočna aroma zrele kajsije, mekana i cvetna. Klasičan aperitiv." /* TODO: finalna nota */ },
  { slug: "viljamovka", name: "Viljamovka", category: "Voćna bela", group: "vocne-bele", abv: "40% vol", volume: "0,70 l", image: "/images/viljamovka.png", tastingNote: "Intenzivan miris kruške vilijamovke, svež i elegantan." /* TODO: finalna nota */ },
  // ── Barrique ──
  { slug: "dunja-barrique", name: "Dunja Barrique", category: "Barrique", group: "barrique", abv: "42% vol", volume: "0,70 l", image: "/images/dunja-barrique.png", tastingNote: "Odležana dunja u hrastu, dubljeg ukusa sa notama vanile i zlatnom bojom." /* TODO: finalna nota */ },
  { slug: "sljiva-barrique", name: "Šljiva Barrique", category: "Barrique", group: "barrique", abv: "42% vol", volume: "0,70 l", image: "/images/sljiva-barrique.png", tastingNote: "Tradicionalna šljiva oplemenjena hrastom, topla i zaokružena. Odličan digestiv." /* TODO: finalna nota */ },
  { slug: "jabuka-barrique", name: "Jabuka Barrique", category: "Barrique", group: "barrique", abv: "42% vol", volume: "0,70 l", image: "/images/jabuka-barrique.png", tastingNote: "Jabuka odležana u buretu, blage slatkoće i prijatnog, dugog završetka." /* TODO: finalna nota */ },
  // ── Classic / koktel (bez fotografija — koriste barrique sliku kao privremeni placeholder) ──
  { slug: "sljiva-barrique-classic", name: "Šljiva Barrique Classic", category: "Classic", group: "classic", abv: "40% vol", volume: "0,70 l", image: "/images/sljiva-barrique.png", tastingNote: "Lakša i pristupačna šljiva, odlična baza za koktele i mešane napitke." /* TODO: finalna nota + fotografija */ },
  { slug: "jabuka-barrique-classic", name: "Jabuka Barrique Classic", category: "Classic", group: "classic", abv: "40% vol", volume: "0,70 l", image: "/images/jabuka-barrique.png", tastingNote: "Pitka jabuka blažeg karaktera, koktel-prijateljska varijanta." /* TODO: finalna nota + fotografija */ },
];

/** The 6 photographed SKUs the homepage carousel renders. */
export const rakije: Rakija[] = allRakije.slice(0, 6);

export type RakijaGroup = {
  id: RakijaGroupId;
  title: string;
  /** one sentence describing what DEFINES the category (not just the name) */
  description: string;
  items: Rakija[];
};

/** Grouped for the /rakije hub — 3 categories, rendered top-to-bottom. */
export const rakijeGroups: RakijaGroup[] = [
  {
    id: "vocne-bele",
    title: "Voćne bele",
    description: "Čiste i mirisne, bez odležavanja u hrastu, savršene kao aperitiv.",
    items: allRakije.filter((r) => r.group === "vocne-bele"),
  },
  {
    id: "barrique",
    title: "Barrique",
    description: "Odležane godinama u hrastovim buradima: dublji ukus, zlatna boja, za aperitiv i digestiv.",
    items: allRakije.filter((r) => r.group === "barrique"),
  },
  {
    id: "classic",
    title: "Classic / koktel",
    description: "Lakše i pristupačnije varijante, prijateljske prema koktelima i mešanim napicima.",
    items: allRakije.filter((r) => r.group === "classic"),
  },
];

/**
 * Per-slug detail content for /rakije/{slug}.
 * PRICES: real, client-supplied (2026-07-03), RSD, VAT 20% included.
 * SENSORY / STORY / PAIRING / TEMP: TODO — drafts, replace with final copy.
 */
export const rakijaDetails: Record<string, RakijaDetail> = {
  dunja: {
    oak: null,
    sensory: {
      nose: "Intenzivan miris zrele dunje i cvet bagrema, sa nagoveštajem meda.", // TODO
      taste: "Pun i baršunast, sa jasnom voćnom slatkoćom bez oštrine.", // TODO
      finish: "Dug, mekan završetak koji zadržava miris svežeg voća.", // TODO
    },
    whenToDrink: "Aperitiv i poklon, savršena za svečane trenutke.", // TODO
    servingTemp: "10–12°C kao aperitiv",
    story:
      "Dunja se pravi od pažljivo odabrane, potpuno zrele dunje leskovačke sorte. Nazivaju je kraljicom voćnih rakija zbog izražene arome i pune teksture. Fermentacija je kontrolisana, a dvostruka destilacija u bakarnom kotlu čuva svežinu voća. Bez odležavanja u hrastu, čista i mirisna.", // TODO: doraditi
    prices: [
      { volume: "1 l", price: 2950 },
      { volume: "0,7 l", price: 2360 },
      { volume: "0,5 l", price: 1650 },
      { volume: "0,1 l", price: "na upit" },
    ],
  },
  kajsija: {
    oak: null,
    sensory: {
      nose: "Sočna aroma zrele kajsije sa cvetnim tonovima.", // TODO
      taste: "Mekan i voćan, sa prijatnom, blagom slatkoćom.", // TODO
      finish: "Svež i čist završetak srednje dužine.", // TODO
    },
    whenToDrink: "Klasičan aperitiv za svaku priliku.", // TODO
    servingTemp: "10–12°C kao aperitiv",
    story:
      "Kajsija se destiluje od zrelih plodova iz vojvođanskih voćnjaka, u trenutku pune aromatične zrelosti. Pažljiva fermentacija i dvostruka destilacija u bakru izvlače prepoznatljiv miris kajsije. Bez odležavanja u hrastu, svetla i cvetna.", // TODO: doraditi
    prices: [
      { volume: "1 l", price: 2950 },
      { volume: "0,7 l", price: 2360 },
      { volume: "0,5 l", price: 1650 },
      { volume: "0,1 l", price: "na upit" },
    ],
  },
  viljamovka: {
    oak: null,
    sensory: {
      nose: "Intenzivan, prepoznatljiv miris kruške vilijamovke.", // TODO
      taste: "Svež i elegantan, sa čistim ukusom kruške.", // TODO
      finish: "Živahan, osvežavajući završetak.", // TODO
    },
    whenToDrink: "Elegantan aperitiv, odličan i uz desert.", // TODO
    servingTemp: "8–10°C kao aperitiv",
    story:
      "Viljamovka nastaje od aromatične kruške vilijamovke, poznate po intenzivnom mirisu. Plodovi se beru u punoj zrelosti, a destilacija u bakru čuva prepoznatljiv karakter sorte. Bez odležavanja u hrastu, svež i mirisan izraz kruške.", // TODO: doraditi
    prices: [
      { volume: "1 l", price: 2950 },
      { volume: "0,7 l", price: 2360 },
      { volume: "0,5 l", price: 1650 },
      { volume: "0,1 l", price: "na upit" },
    ],
  },
  "dunja-barrique": {
    oak: "Da, min. 3 godine, hrast kitnjak",
    sensory: {
      nose: "Zrela dunja isprepletena notama vanile i hrasta.", // TODO
      taste: "Dublji i zaokružen, sa toplim tonovima drveta i suvog voća.", // TODO
      finish: "Dug, topao završetak sa blagom začinskom notom.", // TODO
    },
    whenToDrink: "Aperitiv i digestiv, za mirna, svečana druženja.", // TODO
    servingTemp: "15–18°C",
    story:
      "Dunja barrique počinje kao naša klasična dunja, a potom najmanje tri godine odležava u buradima od hrasta kitnjaka. Drvo joj daje zlatnu boju, note vanile i zaokruženiju teksturu, uz očuvan miris voća. Vreme u hrastu pretvara svežu rakiju u ozbiljan digestiv.", // TODO: doraditi
    pairing: "Uparite sa zrelim tvrdim sirevima, tamnom čokoladom ili dimljenim mesom.", // TODO
    prices: [
      { volume: "1 l", price: 2990 },
      { volume: "0,7 l", price: 2570 },
      { volume: "0,5 l", price: 1830 },
      { volume: "0,1 l", price: "na upit" },
    ],
  },
  "sljiva-barrique": {
    oak: "Da, odležava u hrastu",
    sensory: {
      nose: "Tradicionalna šljiva sa toplim notama hrasta i suvih šljiva.", // TODO
      taste: "Pun i topao, zaokružen odležavanjem, bez oštrine.", // TODO
      finish: "Dug, zaobljen završetak koji podseća na suvo voće.", // TODO
    },
    whenToDrink: "Odličan digestiv, za kraj obroka i posebne prilike.", // TODO
    servingTemp: "15–18°C",
    story:
      "Šljiva barrique čuva srpsku tradiciju šljivovice, oplemenjenu odležavanjem u hrastu. Zrele šljive se destiluju u bakru, a potom rakija sazreva u buradima gde dobija dubinu, boju i mekoću. Rezultat je topao, zaokružen digestiv.", // TODO: doraditi
    pairing: "Uparite sa dimljenim mesom, suvomesnatim narescima ili tamnom čokoladom.", // TODO
    prices: [
      { volume: "1 l", price: 2650 },
      { volume: "0,7 l", price: 2260 },
      { volume: "0,5 l", price: 1660 },
      { volume: "0,1 l", price: "na upit" },
    ],
  },
  "jabuka-barrique": {
    oak: "Da, odležava u hrastu",
    sensory: {
      nose: "Zrela jabuka sa blagim notama vanile iz hrasta.", // TODO
      taste: "Blaga slatkoća i mekana tekstura, prijatan i pitak.", // TODO
      finish: "Dug, prijatan završetak sa voćnim tonovima.", // TODO
    },
    whenToDrink: "Aperitiv i digestiv, svestrana za razne prilike.", // TODO
    servingTemp: "15–18°C",
    story:
      "Jabuka barrique se pravi od aromatičnih sorti jabuka i odležava u hrastovim buradima. Odležavanje joj daje blagu slatkoću, mekoću i topao karakter, uz prepoznatljiv miris jabuke. Pitka i zaokružena.", // TODO: doraditi
    pairing: "Uparite sa zrelim sirevima, jabukama i orasima ili blagim desertima.", // TODO
    prices: [
      { volume: "1 l", price: 2450 },
      { volume: "0,7 l", price: 2090 },
      { volume: "0,5 l", price: 1530 },
    ],
  },
  "sljiva-barrique-classic": {
    oak: "Da, odležava u hrastu (lakša linija)",
    sensory: {
      nose: "Blaga šljiva sa nežnim tonovima hrasta.", // TODO
      taste: "Lakša i pristupačna, mekana i pitka.", // TODO
      finish: "Čist, srednje dug završetak.", // TODO
    },
    whenToDrink: "Koktel-prijateljska, odlična baza za mešane napitke.", // TODO
    servingTemp: "12–16°C ili u koktelu",
    story:
      "Šljiva barrique classic je lakša i pristupačnija verzija naše barrique šljive. Zadržava karakter odležavanja u hrastu, ali u blažem, svestranijem izdanju, idealna kao baza za koktele i mešane napitke.", // TODO: doraditi
    prices: [{ volume: "0,7 l", price: 1590 }],
  },
  "jabuka-barrique-classic": {
    oak: "Da, odležava u hrastu (lakša linija)",
    sensory: {
      nose: "Sveža jabuka sa nagoveštajem hrasta.", // TODO
      taste: "Pitka i blaga, koktel-prijateljskog karaktera.", // TODO
      finish: "Lagan, osvežavajući završetak.", // TODO
    },
    whenToDrink: "Koktel-prijateljska, za mešane napitke i lakša druženja.", // TODO
    servingTemp: "12–16°C ili u koktelu",
    story:
      "Jabuka barrique classic je lakša varijanta naše barrique jabuke. Blagog karaktera i pitka, sa nežnim tonovima hrasta, stvorena da bude svestrana baza za koktele i mešane napitke.", // TODO: doraditi
    prices: [{ volume: "0,7 l", price: 1590 }],
  },
};

/** Look up a rakija (+ its detail) by slug. */
export function getRakijaBySlug(slug: string) {
  const rakija = allRakije.find((r) => r.slug === slug);
  if (!rakija) return null;
  return { rakija, detail: rakijaDetails[slug] ?? null };
}

/** A brand-feature panel: line icon + short gold title + one-line description. */
export type ProductFeature = { icon: string; label: string; text: string };

/**
 * The 3 process/brand features shown as the sliding trio on the detail page.
 * Derived from whether the rakija is oak-aged, so every SKU gets a sensible
 * trio without hand-authoring all eight.
 */
export function getFeatures(detail: RakijaDetail): ProductFeature[] {
  const aged = Boolean(detail.oak);
  return [
    aged
      ? {
          icon: "barrel",
          label: "Hrastovo bure",
          text: "Odležava u hrastovim buradima koja daju boju, dubinu i note vanile.",
        }
      : {
          icon: "leaf",
          label: "Čist izraz voća",
          text: "Bez odležavanja u hrastu, čuva svež miris i karakter voća.",
        },
    {
      icon: "drop",
      label: "Bakarni kotao",
      text: "Dvostruka destilacija u bakru izvlači čistu, prepoznatljivu aromu.",
    },
    aged
      ? {
          icon: "goblet",
          label: "Mekan finiš",
          text: "Odležavanje zaokružuje ukus u baršunast, dug završetak.",
        }
      : {
          icon: "goblet",
          label: "Pitak finiš",
          text: "Svež i mirisan završetak, lagan i prijatan za piće.",
        },
  ];
}

/**
 * Related rakije for the detail page: same group first, then top up from
 * other groups (hero-first order) to reach `count`. Never includes self.
 */
export function getRelatedRakije(slug: string, count = 3): Rakija[] {
  const current = allRakije.find((r) => r.slug === slug);
  if (!current) return allRakije.slice(0, count);
  const sameGroup = allRakije.filter(
    (r) => r.group === current.group && r.slug !== slug,
  );
  const others = allRakije.filter(
    (r) => r.group !== current.group && r.slug !== slug,
  );
  return [...sameGroup, ...others].slice(0, count);
}

/** Featured hero card. */
export const featuredRakija: Rakija & { eyebrow: string; tagline: string } = {
  ...rakije[3],
  eyebrow: "Izdvajamo",
  tagline: "Kraljica voćnih rakija",
};

/** All 8 SKU names for form selects — derived so names always match products. */
export const allSkuNames: string[] = allRakije.map((r) => r.name);

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Kako mogu da poručim rakiju?",
    a: "Pošaljite nam upit preko forme, telefonom, mejlom ili porukom na društvenim mrežama. Javite koju rakiju želite, količinu i grad isporuke.",
  },
  {
    q: "Da li radite veleprodaju za restorane i sale?",
    a: "Da. Sarađujemo sa restoranima, barovima, salama, vinotekama i drugim ugostiteljima. Za veće količine šaljemo ponudu po meri.",
  },
  {
    q: "Da li šaljete širom Srbije?",
    a: "Isporuku dogovaramo prema količini i lokaciji. U upitu nam napišite grad i broj boca, pa ćemo potvrditi mogućnosti i rok.",
  },
  {
    q: "Da li nudite poklon pakovanja?",
    a: "Da. Rakije se mogu poručiti za poklon, slavu, poslovni poklon ili proslavu. Za posebne prilike možemo dogovoriti i personalizovanu etiketu.",
  },
  {
    q: "Kolika je jačina vaših rakija?",
    a: "Voćne bele i classic rakije su 40% vol, dok su barrique izdanja 42% vol.",
  },
];

/** Consumer-focused subset for the /kontakt page (drops the wholesale question). */
export const consumerFaqs: Faq[] = [faqs[0], faqs[2], faqs[3], faqs[4]];

export type Partner = { name: string; logo: string; maxHeight: number };

export const partners: Partner[] = [
  { name: "Bonanza", logo: "/images/partner-bonanza.jpg", maxHeight: 66 },
  { name: "Tiska", logo: "/images/partner-tiska.jpg", maxHeight: 66 },
  { name: "Strand", logo: "/images/partner-strand.png", maxHeight: 70 },
  { name: "Basch", logo: "/images/partner-basch.png", maxHeight: 74 },
  { name: "Ananas", logo: "/images/partner-ananas.png", maxHeight: 42 },
  { name: "AlatCoop", logo: "/images/partner-alatcoop.png", maxHeight: 48 },
  { name: "Svelatron", logo: "/images/partner-svelatron.png", maxHeight: 34 },
  { name: "Galaxis-I", logo: "/images/partner-galaxis.jpeg", maxHeight: 74 },
  { name: "Čarda Kapetanski rit", logo: "/images/partner-kapetanski-rit.jpeg", maxHeight: 70 },
  { name: "PiZSU", logo: "/images/partner-pizsu.jpeg", maxHeight: 74 },
];

export type BentoCard = {
  title: string;
  tag: string;
  href: string;
  image: string;
  copy: string;
  /** bottom-up gradient tint (rgb triplet used at .93 / .5 / .08 alpha) */
  tint: [number, number, number];
  wide?: boolean;
  objectPosition?: string;
};

export const bento: BentoCard[] = [
  {
    title: "Za restorane i barove",
    tag: "Veleprodaja",
    href: "#veleprodaja",
    image: "/images/bento-restoran.png",
    copy: "Rakija za meni, preporuku osoblja i goste koji traže domaći izbor.",
    tint: [58, 26, 6],
    wide: true,
  },
  {
    title: "Za sale i svadbe",
    tag: "Proslave",
    href: "#veleprodaja",
    image: "/images/bento-svadba.png",
    copy: "Boce za posluženje, poklon pakovanja i etikete za događaj.",
    tint: [58, 18, 32],
    objectPosition: "center 72%",
  },
  {
    title: "Za poslovne poklone",
    tag: "Pokloni",
    href: "/kontakt",
    image: "/images/bento-poklon.png",
    copy: "Poklon boce za klijente, partnere i ljude kojima želite da pošaljete nešto domaće i ozbiljno.",
    tint: [52, 38, 12],
  },
  {
    title: "Za privatne kupce",
    tag: "Porudžbina",
    href: "/kontakt",
    image: "/images/bento-slava.png",
    copy: "Za slavu, poklon, odlazak u goste ili ličnu kolekciju.",
    tint: [38, 12, 22],
    wide: true,
  },
];

export const stats = [
  { value: "1960-e", label: "Početak tradicije" },
  { value: "3", label: "Generacije porodice" },
  { value: "8", label: "Rakija u asortimanu" },
  { value: "Vojvodina", label: "Naš kraj i naše voće", small: true },
];

export const blogTeasers = [
  { category: "Za ugostitelje", title: "Kako izabrati rakiju za restoran?", href: "#" },
  { category: "Pokloni", title: "Rakija kao poklon: koju odabrati?", href: "#" },
  { category: "Saveti", title: "Na kojoj temperaturi se služi voćna rakija?", href: "#" },
];
