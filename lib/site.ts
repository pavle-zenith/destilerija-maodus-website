/** Central site configuration — brand contact + canonical URLs. */

export const site = {
  name: "Destilerija Maoduš",
  shortName: "Maoduš",
  domain: "https://destilerijamaodus.rs",
  locale: "sr_RS",
  description:
    "Porodična destilerija voćne rakije iz Kanjiže, Vojvodina. Rakija za poklon, proslavu i dobar meni — od pažljivo odabranog voća, kontrolisane fermentacije i dvostruke destilacije u bakru.",
  phone: "+381 64 61 59 033",
  phoneHref: "tel:+381646159033",
  phoneDigits: "381646159033", // for wa.me / viber
  email: "destilerijamaodus@gmail.com",
  emailHref: "mailto:destilerijamaodus@gmail.com",
  instagram: "@destilerija.maodus",
  instagramHref: "https://instagram.com/destilerija.maodus",
  region: "Vojvodina, Srbija",
  address: "Stevana Novkovića 25, 24426 Velebit, Srbija",
  addressShort: "Stevana Novkovića 25, 24426 Velebit",
  coords: { lat: 46.008, lng: 19.94 },
  slogan: "Dobra do poslednje kapi.",
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
