/** Central site configuration — brand contact + canonical URLs. */

export const site = {
  name: "Destilerija Maoduš",
  shortName: "Maoduš",
  domain: "https://destilerijamaodus.rs",
  locale: "sr_RS",
  description:
    "Porodična destilerija iz Vojvodine: rakija od dunje, kajsije, viljamovke i barrique izdanja. Voće iz sopstvenog voćnjaka, dvostruka destilacija u bakru, laboratorijski potvrđen kvalitet. Poručite ili zatražite veleprodajnu ponudu.",
  phone: "+381 64 61 59 033",
  phoneHref: "tel:+381646159033",
  phoneDigits: "381646159033", // for wa.me / viber
  email: "destilerijamaodus@gmail.com",
  emailHref: "mailto:destilerijamaodus@gmail.com",
  instagram: "@destilerija.maodus",
  instagramHref: "https://instagram.com/destilerija.maodus",
  region: "Vojvodina, Srbija",
  address: "25 Stevana Novkovića, 24207, Velebit 24426, Srbija",
  addressShort: "25 Stevana Novkovića, 24207, Velebit 24426",
  coords: { lat: 46.008, lng: 19.94 },
  slogan: "Dobra do poslednje kapi.",
  /** Zvanični podaci iz APR-a (rukovalac podacima o ličnosti). */
  legal: {
    businessName: "NATAŠA MAODUŠ PR, SR DESTILERIJA MAODUŠ, VELEBIT",
    legalForm: "Preduzetnik",
    registrationNumber: "61267972", // matični broj
    taxId: "106554400", // PIB
    registeredSince: "31.03.2010.",
    activityCode: "1101",
    activity: "Destilacija, prečišćavanje i mešanje pića",
  },
} as const;

/** Keyless Google Maps embed (no API key required). */
export const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  site.address
)}&z=15&output=embed`;

export const mapLinkHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.address
)}`;

export const whatsappHref = (message?: string) =>
  `https://wa.me/${site.phoneDigits}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

export const viberHref = (message?: string) =>
  `viber://chat?number=%2B${site.phoneDigits}${
    message ? `&text=${encodeURIComponent(message)}` : ""
  }`;

/**
 * Primary navigation. Home-section links are absolute (/#...) so they work from
 * any page (e.g. /kontakt); Kontakt is a real route.
 */
export const navLinks = [
  { href: "/rakije", label: "Rakije" },
  { href: "/#o-nama", label: "O nama" },
  { href: "/#partneri", label: "Partneri" },
  { href: "/kontakt", label: "Kontakt" },
] as const;
