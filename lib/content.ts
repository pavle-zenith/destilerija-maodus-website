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
   * Canonical copy from COPYWRITING-GUIDE DEO II [4] / DEO II-B.
   */
  tastingNote: string;
};

/** A single price row. `price` in RSD, or "na upit" when not fixed. */
export type PriceRow = { volume: string; price: number | "na upit" };

/** A per-product FAQ entry (Dunja carries its own FAQPage schema). */
export type RakijaFaq = { q: string; a: string };

/**
 * Rich per-product content for /rakije/{slug}, keyed by slug.
 * Finalna copy iz COPYWRITING-GUIDE DEO II-C (2026-07-03).
 * Prices are real (client-supplied, VAT 20% included).
 */
export type RakijaDetail = {
  /**
   * SEO meta from the guide. `metaTitle` is the part BEFORE the site suffix —
   * the layout template appends " | Destilerija Maoduš", so this holds
   * "{Ime} | {fraza pretrage}".
   */
  metaTitle: string;
  metaDescription: string;
  /** dedicated lifestyle image for the closing CTA; falls back to the bottle shot */
  ctaImage?: string;
  /** per-rakija bottle lineup (all volumes) for the Cenovnik section */
  groupImage?: string;
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
  /** cocktail line — only for the Classic line (replaces pairing) */
  cocktail?: string;
  /**
   * Explicit related slugs per the guide (two from the same group + the
   * white/aged sibling of the same fruit where one exists).
   */
  relatedSlugs: string[];
  /** per-product FAQ; only Dunja has one (drives FAQPage schema). */
  faq?: RakijaFaq[];
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
  { slug: "dunja", name: "Dunja", category: "Voćna bela", group: "vocne-bele", abv: "40% vol", volume: "0,70 l", image: "/images/dunja.png", tastingNote: "Kraljica voćnih rakija. Pun miris zrele dunje i baršunast završetak." },
  { slug: "kajsija", name: "Kajsija", category: "Voćna bela", group: "vocne-bele", abv: "40% vol", volume: "0,70 l", image: "/images/kajsija.png", tastingNote: "Sočna aroma zrele kajsije, mekana i cvetna. Klasičan aperitiv." },
  { slug: "viljamovka", name: "Viljamovka", category: "Voćna bela", group: "vocne-bele", abv: "40% vol", volume: "0,70 l", image: "/images/viljamovka.png", tastingNote: "Intenzivan miris viljamovke kruške, svež i elegantan." },
  // ── Barrique ──
  { slug: "dunja-barrique", name: "Dunja Barrique", category: "Barrique", group: "barrique", abv: "42% vol", volume: "0,70 l", image: "/images/dunja-barrique.png", tastingNote: "Dunja odležana u hrastu. Note karamele, ćilibarno zlatna boja, dublji ukus." },
  { slug: "sljiva-barrique", name: "Šljiva Barrique", category: "Barrique", group: "barrique", abv: "42% vol", volume: "0,70 l", image: "/images/sljiva-barrique.png", tastingNote: "Tradicionalna šljiva oplemenjena hrastom, topla i zaokružena. Odličan digestiv." },
  { slug: "jabuka-barrique", name: "Jabuka Barrique", category: "Barrique", group: "barrique", abv: "42% vol", volume: "0,70 l", image: "/images/jabuka-barrique.png", tastingNote: "Jabuka iz bureta. Blaga slatkoća i dug, prijatan završetak." },
  // ── Classic / koktel (bez fotografija — koriste barrique sliku kao privremeni placeholder) ──
  // abv sa etikete (šarža 2019); potvrditi za tekuću šaržu, guide DEO III. Fotografije još nema (koristi barrique sliku).
  { slug: "sljiva-barrique-classic", name: "Šljiva Barrique Classic", category: "Classic", group: "classic", abv: "43,0% vol", volume: "0,70 l", image: "/images/sljiva-barrique.png", tastingNote: "Lakša šljiva za druženje i koktele." },
  { slug: "jabuka-barrique-classic", name: "Jabuka Barrique Classic", category: "Classic", group: "classic", abv: "43,5% vol", volume: "0,70 l", image: "/images/jabuka-barrique.png", tastingNote: "Pristupačna jabuka iz hrasta, rađena za koktel program." },
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
    description: "Čiste i mirisne, bez odležavanja u hrastu. Pravi ukus voća od prve do poslednje kapi, idealne kao aperitiv.",
    items: allRakije.filter((r) => r.group === "vocne-bele"),
  },
  {
    id: "barrique",
    title: "Barrique",
    description: "Odležane godinama u hrastovim buradima. Dublji ukus, zlatna boja, aperitiv i digestiv u jednom.",
    items: allRakije.filter((r) => r.group === "barrique"),
  },
  {
    id: "classic",
    title: "Classic",
    description: "Lakše i pristupačnije varijante, rađene za druženje i koktele.",
    items: allRakije.filter((r) => r.group === "classic"),
  },
];

/**
 * Per-slug detail content for /rakije/{slug}.
 * Finalna copy iz COPYWRITING-GUIDE DEO II-C (2026-07-03).
 * PRICES: real, client-supplied, RSD, VAT 20% included.
 * Preostali [TODO] iz guide-a: Classic % vol (43,0% / 43,5% sa etikete šarže 2019 — potvrditi tekuću šaržu) i
 * Jabuka Barrique temperatura (pretpostavka 15–18°C) — potvrditi sa Pavlom.
 */
export const rakijaDetails: Record<string, RakijaDetail> = {
  dunja: {
    metaTitle: "Rakija od dunje (dunjevača)",
    metaDescription:
      "Dunjevača od dunje sorte Leskovačka, kraljica voćnih rakija. Bez hrasta, da miris dunje ostane čist. 40% vol. Cena od 1.650 RSD, poručivanje upitom.",
    ctaImage: "/images/dunja-cta.png",
    groupImage: "/images/dunja-grupna.png",
    oak: null,
    sensory: {
      nose: "Zrela dunja, cvet i med, miris koji ostane u čaši i kad je ispijete.",
      taste: "Pun i voćan, mekan na jeziku, dunja verna plodu od prvog gutljaja.",
      finish: "Duga i baršunasta, sa toplinom koja ne pecka.",
    },
    whenToDrink: "Aperitiv i prva boca za poklon i dolazak u goste.",
    servingTemp: "10–12°C, rashlađena",
    story:
      "Dunju pečemo od sorte Leskovačka, koju struka smatra najboljom sortom za dunjevaču. Plodove beremo ručno i puštamo ih da nakon berbe dozru do potpune zrelosti, jer dunja tek tada da pun miris. Rakija ne ide u hrast nego odležava u prohromskim i staklenim sudovima, da miris dunje ostane čist i prepoznatljiv. Zato dunjevaču zovu kraljicom voćnih rakija.",
    relatedSlugs: ["kajsija", "viljamovka", "dunja-barrique"],
    faq: [
      {
        q: "Šta je dunjevača?",
        a: "Dunjevača je voćna rakija od ploda dunje. Dunjevača Destilerije Maoduš pravi se od dunje sorte Leskovačka, kontrolisanom fermentacijom i dvostrukom destilacijom u bakarnim kazanima, i ima 40% vol. Služi se rashlađena na 10–12°C kao aperitiv.",
      },
      {
        q: "Na kojoj temperaturi se služi rakija od dunje?",
        a: "Bela rakija od dunje služi se na 10–12°C kao aperitiv. Odležana verzija (Dunja Barrique) služi se na 15–18°C, kao aperitiv ili digestiv. Hladnija čaša naglašava miris dunje, toplija otvara note hrasta.",
      },
    ],
    prices: [
      { volume: "1 l", price: 2950 },
      { volume: "0,7 l", price: 2360 },
      { volume: "0,5 l", price: 1650 },
      { volume: "0,1 l", price: "na upit" },
    ],
  },
  kajsija: {
    metaTitle: "Rakija od kajsije (kajsijevača)",
    ctaImage: "/images/kajsija-cta.png",
    groupImage: "/images/kajsija-grupna.png",
    metaDescription:
      "Kajsijevača od sorte Mađarska najbolja, poznate po aromi. Mekana i cvetna, klasičan aperitiv. 40% vol. Cena od 1.650 RSD, poručivanje upitom.",
    oak: null,
    sensory: {
      nose: "Sočna, potpuno zrela kajsija sa laganom cvetnom notom.",
      taste: "Mekan i zaokružen, kajsija bez oštrine, kristalne bistrine u čaši.",
      finish: "Zanosna završnica zrelog ploda kajsije, čista i topla.",
    },
    whenToDrink: "Aperitiv za početak ručka i za goste koji vole mekši ukus.",
    servingTemp: "12–15°C",
    story:
      "Kajsiju pečemo od više sorti, a dominira Mađarska najbolja, neprikosnovena rakijska sorta izrazite arome. Beremo je potpuno zrelu, jer kajsija oprašta manje nego ijedno voće: šta uđe u kazan, to se pije. Bez hrasta, da aroma ostane sveža.",
    relatedSlugs: ["dunja", "viljamovka", "dunja-barrique"],
    prices: [
      { volume: "1 l", price: 2950 },
      { volume: "0,7 l", price: 2360 },
      { volume: "0,5 l", price: 1650 },
      { volume: "0,1 l", price: "na upit" },
    ],
  },
  viljamovka: {
    metaTitle: "Viljamovka | Rakija od kruške",
    ctaImage: "/images/viljamovka-cta.png",
    groupImage: "/images/viljamovka-grupna.png",
    metaDescription:
      "Viljamovka od kruške Williams, svetskog standarda za rakiju od kruške. Svež i elegantan ukus. 40% vol. Cena od 1.650 RSD, poručivanje upitom.",
    oak: null,
    sensory: {
      nose: "Intenzivna zrela viljamovka, miris koji se prepozna čim se otvori boca.",
      taste: "Elegantan i svež, sa sočnošću zrele kruške i mirnom sredinom.",
      finish: "Čista i mirisna, srednje duga, bez težine.",
    },
    whenToDrink: "Aperitiv, elegantan izbor uz lagana predjela.",
    servingTemp: "12–15°C",
    story:
      "Viljamovku pečemo od kruške Williams, svetski najcenjenije sorte za rakiju od kruške. Williams nosi visok sadržaj eteričnih ulja, i baš ona daju rakiji prefinjenu aromu i mirisnu notu sveže kruške. Kruška se bere u tačno određenom trenutku zrelosti, a dvostruka destilacija u bakru čuva tu aromu do čaše.",
    relatedSlugs: ["dunja", "kajsija", "sljiva-barrique"],
    prices: [
      { volume: "1 l", price: 2950 },
      { volume: "0,7 l", price: 2360 },
      { volume: "0,5 l", price: 1650 },
      { volume: "0,1 l", price: "na upit" },
    ],
  },
  "dunja-barrique": {
    metaTitle: "Dunja Barrique | Odležana dunjevača",
    ctaImage: "/images/dunja-barrique-cta.png",
    groupImage: "/images/dunja-barrique-grupna.png",
    metaDescription:
      "Dunjevača odležana najmanje 3 godine u buretu od hrasta kitnjaka. Ćilibarno zlatna boja, note karamele, dublji ukus. 42% vol. Cena od 1.830 RSD, poručivanje upitom.",
    oak: "Najmanje 3 godine, hrast kitnjak",
    sensory: {
      nose: "Zrela dunja kroz drvenaste, začinske i cvetne note hrasta.",
      taste: "Dublji i zaokruženiji od bele dunje, sa blagim notama karamele.",
      finish: "Duga i topla, sa prijatnim tragom bureta.",
    },
    whenToDrink: "Aperitiv i digestiv, boca za polako ispijanje i posebne prilike.",
    servingTemp: "15–18°C",
    story:
      "Ista Leskovačka dunja kao u beloj rakiji, ali sa strpljenjem: najmanje tri godine u buretu od hrasta kitnjaka. Bure daje ćilibarno zlatnu boju, karamelu i dubinu, a dunja ostaje glavna. Ovo je boca koju otvarate kad želite da se razgovor produži.",
    pairing: "Zreli tvrdi sirevi, orasi i suvo voće, tamna čokolada.",
    relatedSlugs: ["dunja", "sljiva-barrique", "jabuka-barrique"],
    prices: [
      { volume: "1 l", price: 2990 },
      { volume: "0,7 l", price: 2570 },
      { volume: "0,5 l", price: 1830 },
      { volume: "0,1 l", price: "na upit" },
    ],
  },
  "sljiva-barrique": {
    metaTitle: "Šljiva Barrique | Odležana šljivovica",
    ctaImage: "/images/sljiva-barrique-cta.png",
    groupImage: "/images/sljiva-barrique-grupna.png",
    metaDescription:
      "Šljivovica od šest sorti šljive, odležana godinama u hrastu. Topla i zaokružena, odličan digestiv. 42% vol. Cena od 1.660 RSD, poručivanje upitom.",
    oak: "Višegodišnje, hrastovo bure",
    sensory: {
      nose: "Zrela šljiva sa voćnim i začinskim notama i blagom aromom dima.",
      taste: "Topao i zaokružen, tradicionalna šljivovica koju je bure smirilo i produbilo.",
      finish: "Duga, sa notama začina i blagog dima.",
    },
    whenToDrink: "Digestiv, rakija za slavu, kraj večere i ozbiljan razgovor.",
    servingTemp: "15–18°C",
    story:
      "Naša šljiva nije jedna sorta nego kupaža destilata šest sorti: Čačanska Rodna, Čačanska Lepotica, Trnovača, Crvena Ranka, Crnošljiva i Požegača. Svaka daje svoje, od mirisa do punoće, a višegodišnje bure ih sastavi u celinu boje starog zlata. Ovako se šljivovica pekla i pre nas, mi smo samo dodali strpljenje.",
    pairing: "Pršuta i dimljeno meso, kulen, tamna čokolada.",
    relatedSlugs: ["sljiva-barrique-classic", "dunja-barrique", "jabuka-barrique"],
    prices: [
      { volume: "1 l", price: 2650 },
      { volume: "0,7 l", price: 2260 },
      { volume: "0,5 l", price: 1660 },
      { volume: "0,1 l", price: "na upit" },
    ],
  },
  "jabuka-barrique": {
    metaTitle: "Jabuka Barrique | Rakija od jabuke",
    ctaImage: "/images/jabuka-barrique-cta.png",
    groupImage: "/images/jabuka-barrique-grupna.png",
    metaDescription:
      "Rakija od fermentisanog soka jabuke, odležana godinama u hrastu. Ćilibarna boja, blaga slatkoća, dug završetak. 42% vol. Cena od 1.530 RSD, poručivanje upitom.",
    oak: "Višegodišnje, hrastovo bure",
    sensory: {
      nose: "Zrela jabuka sa voćnim i začinskim notama i blagim mirisom hrasta.",
      taste: "Mekan, sa blagom slatkoćom jabuke i ćilibarnom dubinom.",
      finish: "Duga i prijatna, sa blago slatkastim krajem.",
    },
    whenToDrink: "Digestiv, retka boca rakije od jabuke za posebne prilike.",
    // temperatura nije u katalogu (guide TODO): usvojena barrique vrednost 15–18°C
    servingTemp: "15–18°C",
    story:
      "Ova rakija ne nastaje od kljuka nego od fermentisanog soka jabuke, pa je destilat od starta čist i mekan. Godine u hrastovom buretu daju boju ćilibara i blagu aromu hrasta. Retka boca: rakija od jabuke se malo gde peče ovako.",
    pairing: "Štrudla i kolači sa jabukom, blagi sirevi, dezerti sa cimetom.",
    relatedSlugs: ["jabuka-barrique-classic", "sljiva-barrique", "dunja-barrique"],
    prices: [
      { volume: "1 l", price: 2450 },
      { volume: "0,7 l", price: 2090 },
      { volume: "0,5 l", price: 1530 },
    ],
  },
  "sljiva-barrique-classic": {
    metaTitle: "Šljiva Barrique Classic",
    metaDescription:
      "Lakša šljivovica od sorte Stenlej, bez koštice i pokožice pre fermentacije. Pitka, čista, rađena za koktele. Cena 1.590 RSD (0,7 l), poručivanje upitom.",
    oak: "Višegodišnje, hrastovo bure",
    sensory: {
      nose: "Čista šljiva, lagana i voćna, bez teških tonova.",
      taste: "Lakši i pitkiji od klasične šljivovice, bez gorčine koštice.",
      finish: "Kratka i čista, ostavlja prostor za sledeći gutljaj.",
    },
    whenToDrink: "Druženje i kokteli, rashlađena.",
    servingTemp: "10–12°C, rashlađena",
    story:
      "Šljivu sorte Stenlej oslobodimo koštice i pokožice pre fermentacije, pa u destilat ne ulazi ništa gorko ni teško. Ostane čista, pitka šljiva koju je bure zaoblilo. Pravili smo je namerno ovako: za šank, za koktele i za goste koji tek ulaze u rakiju.",
    cocktail: "Osnova za rakija old fashioned ili jednostavno sa ledom i koricom pomorandže.",
    relatedSlugs: ["jabuka-barrique-classic", "sljiva-barrique", "viljamovka"],
    prices: [{ volume: "0,7 l", price: 1590 }],
  },
  "jabuka-barrique-classic": {
    metaTitle: "Jabuka Barrique Classic",
    metaDescription:
      "Pristupačna rakija od jabuke iz hrasta: Ajdared, Zlatni Delišes, Melroza i Crveni Delišes. Pitka i lagana, rađena za koktel program. Cena 1.590 RSD (0,7 l).",
    oak: "Višegodišnje, hrastovo bure",
    sensory: {
      nose: "Sveža jabuka sa blagom notom hrasta.",
      taste: "Pitka i pristupačna, sa blagom slatkoćom jabuke.",
      finish: "Meke cvetne note, čista i lagana.",
    },
    whenToDrink: "Druženje i kokteli, rashlađena.",
    servingTemp: "10–12°C, rashlađena",
    story:
      "Četiri sorte jabuke, Ajdared, Zlatni Delišes, Melroza i Crveni Delišes, svaka dodaje svoju stranu ukusa. Bure ih smiri i zaokruži. Namerno pristupačna: boca koja na šanku radi svaki dan, a u koktelu ne gubi karakter.",
    cocktail: "Sa jabukovim sokom i cimetom, ili kao highball sa tonikom i limunom.",
    relatedSlugs: ["sljiva-barrique-classic", "jabuka-barrique", "kajsija"],
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
export type ProductFeature = {
  icon: string;
  label: string;
  text: string;
  /** per-panel background texture for the sensory slider */
  image: string;
};

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
          image: "/images/teksture-hrast.png",
        }
      : {
          icon: "leaf",
          label: "Čist izraz voća",
          text: "Bez odležavanja u hrastu, čuva svež miris i karakter voća.",
          image: "/images/teksture-cist-izraz.png",
        },
    {
      icon: "drop",
      label: "Bakarni kotao",
      text: "Dvostruka destilacija u bakru izvlači čistu, prepoznatljivu aromu.",
      image: "/images/teksture-bakar.png",
    },
    aged
      ? {
          icon: "glass",
          label: "Mekan finiš",
          text: "Odležavanje zaokružuje ukus u baršunast, dug završetak.",
          image: "/images/teksture-mekan-finis.png",
        }
      : {
          icon: "glass",
          label: "Pitak finiš",
          text: "Svež i mirisan završetak, lagan i prijatan za piće.",
          image: "/images/teksture-pitak-finis.png",
        },
  ];
}

/**
 * Related rakije for the detail page. Uses the explicit per-product list from
 * the guide (rakijaDetails[slug].relatedSlugs) when present; otherwise falls
 * back to same-group-first, hero-first ordering. Never includes self.
 */
export function getRelatedRakije(slug: string, count = 3): Rakija[] {
  const explicit = rakijaDetails[slug]?.relatedSlugs;
  if (explicit?.length) {
    const picked = explicit
      .filter((s) => s !== slug)
      .map((s) => allRakije.find((r) => r.slug === s))
      .filter((r): r is Rakija => Boolean(r));
    if (picked.length >= count) return picked.slice(0, count);
    // top up from same group if the explicit list is short
    const extra = allRakije.filter(
      (r) => r.slug !== slug && !picked.some((p) => p.slug === r.slug),
    );
    return [...picked, ...extra].slice(0, count);
  }

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
  tagline:
    "Kraljica voćnih rakija, odležana najmanje 3 godine u buretu od hrasta kitnjaka.",
};

/** All 8 SKU names for form selects — derived so names always match products. */
export const allSkuNames: string[] = allRakije.map((r) => r.name);

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Kako mogu da poručim rakiju?",
    a: "Rakiju Destilerije Maoduš poručujete upitom: preko forme na sajtu, telefonom na +381 64 61 59 033, mejlom ili porukom na Instagram @destilerija.maodus. Potvrdimo dostupnost, cenu i isporuku u roku od 24–48h. Svaku porudžbinu dogovarate direktno sa porodicom.",
  },
  {
    q: "Da li radite veleprodaju za restorane i sale?",
    a: "Da. Destilerija Maoduš direktno snabdeva restorane, barove, vinoteke i sale za proslave u Srbiji, bez posrednika. Pre prve porudžbine šaljemo besplatan degustacioni uzorak, a cene formiramo prema količini i ritmu isporuke. Detalji na stranici Veleprodaja.",
  },
  {
    q: "Da li šaljete širom Srbije?",
    a: "Isporuku dogovaramo prema količini i lokaciji. U upitu nam napišite grad i broj boca, pa ćemo potvrditi mogućnosti i rok.",
  },
  {
    q: "Da li nudite poklon pakovanja?",
    a: "Da. Rakije se mogu poručiti za poklon, slavu, poslovni poklon ili proslavu. Za posebne prilike radimo i rakiju pod vašim brendom: vi date etiketu, mi punimo naše boce našom rakijom.",
  },
  {
    q: "Kolika je jačina vaših rakija?",
    a: "Voćne bele rakije Maoduš (dunja, kajsija, viljamovka) imaju 40% vol, a barrique izdanja odležana u hrastu 42% vol. Sve rakije nastaju dvostrukom destilacijom u bakarnim kazanima i prolaze laboratorijsku analizu pre punjenja.",
  },
];

/** Consumer-focused subset for the /kontakt page (drops the wholesale question). */
export const consumerFaqs: Faq[] = [faqs[0], faqs[2], faqs[3], faqs[4]];

/** Wholesale FAQ for /veleprodaja. */
export const wholesaleFaqs: Faq[] = [
  {
    q: "Koja je minimalna količina za veleprodaju?",
    a: "Nemamo krutu minimalnu količinu. Uslove dogovaramo prema tipu objekta, izboru rakija i ritmu isporuke, pa se javite i za manje početne porudžbine.",
  },
  {
    q: "Da li je degustacioni uzorak zaista besplatan i bez obaveze?",
    a: "Da. Pošaljete upit, mi šaljemo uzorak, a vi probate sa svojim timom. Ako se ukusi ne poklope, ne dugujete nam ništa.",
  },
  {
    q: "Da li pravite rakiju pod našim brendom (white-label)?",
    a: "Da. Vi date etiketu i brendiranje, a mi punimo naše boce našom rakijom, za restorane, barove, sale, svadbe i poslovne poklone. Napišite u upitu šta vam treba i za koju priliku.",
  },
  {
    q: "Koji su rokovi isporuke?",
    a: "Zavisi od količine i lokacije. Za standardne porudžbine potvrđujemo rok odmah uz ponudu, a odgovaramo u roku od 24–48h.",
  },
  {
    q: "Da li radite i sa manjim lokalima, ili samo veće narudžbine?",
    a: "Radimo i sa manjim kafićima i vinotekama. Važnije nam je da rakija stoji na pravom mestu nego da porudžbina bude velika.",
  },
  {
    q: "Koje rakije preporučujete za koktele?",
    a: "Classic liniju: Šljiva Barrique Classic i Jabuka Barrique Classic su pravljene kao koktel baza, uz konzistentan profil i pristupačnu cenu. Za shot i aperitiv ponudu dodajte Viljamovku.",
  },
];

/** Venue types for the wholesale form select (+ segment CTA prefill values). */
export const venueTypes = [
  "Restoran",
  "Bar / kafić",
  "Sala za venčanja i proslave",
  "Vinoteka / prodavnica",
  "Hotel",
  "Drugo",
] as const;

/** A B2B segment card on /veleprodaja: pitch + recommended pours per venue type. */
export type B2BSegment = {
  id: string;
  title: string;
  pitch: string;
  recommended: string[];
  image: string;
  icon: string;
  ctaLabel: string;
  /** value fed into the form's "Tip objekta" select via ?tip= */
  venueType: (typeof venueTypes)[number];
};

export const b2bSegments: B2BSegment[] = [
  {
    id: "restorani",
    title: "Restorani i vinoteke",
    icon: "menu",
    pitch:
      "Domaća premium rakija sa pričom podiže doživljaj i maržu. Barrique linija radi kao aperitiv i digestiv na meniju, uz preporuku osoblja uz jelo.",
    recommended: ["Dunja Barrique", "Šljiva Barrique", "Jabuka Barrique", "Dunja (aperitiv)"],
    image: "/images/bento-restoran.png",
    ctaLabel: "Uzorak za vaš meni",
    venueType: "Restoran",
  },
  {
    id: "barovi",
    title: "Barovi i kafići",
    icon: "glass",
    pitch:
      "Rakija koktel kultura raste, a Classic linija je pravljena baš za to: pristupačna cena i konzistentan profil. Voćne bele rade kao shot i aperitiv ponuda.",
    // TODO: dodati 1-2 konkretna predloga koktela sa rakijom (copy + kasnije blog tema)
    recommended: ["Šljiva Barrique Classic", "Jabuka Barrique Classic", "Viljamovka"],
    image: "/images/b2b-sank.png",
    ctaLabel: "Uzorak za vaš bar",
    venueType: "Bar / kafić",
  },
  {
    id: "sale",
    title: "Sale, svadbe i event prostori",
    icon: "goblet",
    pitch:
      "Welcome rakija za doček gostiju i rakija pod vašim brendom: vi date etiketu, mi punimo naše boce našom rakijom. Za mladence, firmu ili vaš prostor.",
    recommended: ["Dunja (welcome rakija)", "Rakija sa vašom etiketom (0,5–1 l)"],
    image: "/images/bento-svadba.png",
    ctaLabel: "Uzorak za vaš događaj",
    venueType: "Sala za venčanja i proslave",
  },
];

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
    href: "/veleprodaja",
    image: "/images/bento-restoran.png",
    copy: "Rakija za meni, preporuku osoblja i goste koji traže domaće.",
    tint: [58, 26, 6],
    wide: true,
  },
  {
    title: "Za sale i svadbe",
    tag: "Proslave",
    href: "/veleprodaja",
    image: "/images/bento-svadba.png",
    copy: "Welcome rakija i boca pod vašim brendom, sa imenima mladenaca na etiketi.",
    tint: [58, 18, 32],
    objectPosition: "center 72%",
  },
  {
    title: "Za poslovne poklone",
    tag: "Pokloni",
    href: "/kontakt",
    image: "/images/bento-poklon.png",
    copy: "Naša rakija u našoj boci, sa logom vaše firme na etiketi.",
    tint: [52, 38, 12],
  },
  {
    title: "Za privatne kupce",
    tag: "Porudžbina",
    href: "/kontakt",
    image: "/images/bento-slava.png",
    copy: "Za slavu, poklon, odlazak u goste ili kućnu kolekciju.",
    tint: [38, 12, 22],
    wide: true,
  },
];

export const stats = [
  { value: "1960-e", label: "Početak voćnjaka" },
  { value: "3", label: "Generacije porodice" },
  { value: "8", label: "Rakija u asortimanu" },
  { value: "2007.", label: "Samostalna destilerija" },
];

export const blogTeasers = [
  { category: "Za ugostitelje", title: "Kako izabrati rakiju za restoran?", href: "#" },
  { category: "Pokloni", title: "Rakija kao poklon: koju odabrati?", href: "#" },
  { category: "Saveti", title: "Na kojoj temperaturi se služi voćna rakija?", href: "#" },
];
