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
    description: "Čiste i mirisne, bez odležavanja u hrastu — savršene kao aperitiv.",
    items: allRakije.filter((r) => r.group === "vocne-bele"),
  },
  {
    id: "barrique",
    title: "Barrique",
    description: "Odležane godinama u hrastovim buradima — dublji ukus, zlatna boja, za aperitiv i digestiv.",
    items: allRakije.filter((r) => r.group === "barrique"),
  },
  {
    id: "classic",
    title: "Classic / koktel",
    description: "Lakše i pristupačnije varijante, prijateljske prema koktelima i mešanim napicima.",
    items: allRakije.filter((r) => r.group === "classic"),
  },
];

/** Featured hero card. */
export const featuredRakija: Rakija & { eyebrow: string; tagline: string } = {
  ...rakije[3],
  eyebrow: "Izdvajamo",
  tagline: "Kraljica voćnih rakija",
};

/** All 8 SKU names for form selects (2 "Classic" have no photos yet). */
export const allSkuNames = [
  "Dunja",
  "Kajsija",
  "Viljamovka",
  "Dunja Barrique",
  "Šljiva Barrique",
  "Jabuka Barrique",
  "Šljiva Classic",
  "Jabuka Classic",
] as const;

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
