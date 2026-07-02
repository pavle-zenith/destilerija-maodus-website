/**
 * Typed content fallbacks — the current homepage copy.
 * The homepage renders from these when Sanity is empty, so the page
 * works before any CMS content is entered. When Sanity has documents,
 * queries in sanity/queries.ts override these.
 */

export type Rakija = {
  slug: string;
  name: string;
  category: string; // gold italic subtitle
  abv: string;
  volume: string;
  image: string;
};

export const rakije: Rakija[] = [
  { slug: "dunja", name: "Dunja", category: "Voćna bela", abv: "40% vol", volume: "0,70 l", image: "/images/dunja.png" },
  { slug: "kajsija", name: "Kajsija", category: "Voćna bela", abv: "40% vol", volume: "0,70 l", image: "/images/kajsija.png" },
  { slug: "viljamovka", name: "Viljamovka", category: "Voćna bela", abv: "40% vol", volume: "0,70 l", image: "/images/viljamovka.png" },
  { slug: "dunja-barrique", name: "Dunja Barrique", category: "Barrique", abv: "42% vol", volume: "0,70 l", image: "/images/dunja-barrique.png" },
  { slug: "sljiva-barrique", name: "Šljiva Barrique", category: "Barrique", abv: "42% vol", volume: "0,70 l", image: "/images/sljiva-barrique.png" },
  { slug: "jabuka-barrique", name: "Jabuka Barrique", category: "Barrique", abv: "42% vol", volume: "0,70 l", image: "/images/jabuka-barrique.png" },
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
