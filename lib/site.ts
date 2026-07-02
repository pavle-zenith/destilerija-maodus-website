/** Central site configuration — brand contact + canonical URLs. */

export const site = {
  name: "Destilerija Maoduš",
  shortName: "Maoduš",
  domain: "https://destilerijamaodus.rs",
  locale: "sr_RS",
  description:
    "Porodična destilerija voćne rakije iz Vojvodine. Rakija za poklon, proslavu i dobar meni — od pažljivo odabranog voća, kontrolisane fermentacije i dvostruke destilacije u bakru.",
  phone: "+381 64 61 59 033",
  phoneHref: "tel:+381646159033",
  phoneDigits: "381646159033", // for wa.me / viber
  email: "info@destilerijamaodus.rs",
  emailHref: "mailto:info@destilerijamaodus.rs",
  instagram: "@destilerija.maodus",
  instagramHref: "https://instagram.com/destilerija.maodus",
  region: "Vojvodina, Srbija",
  slogan: "Dobra do poslednje kapi.",
} as const;

export const whatsappHref = (message?: string) =>
  `https://wa.me/${site.phoneDigits}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

export const viberHref = (message?: string) =>
  `viber://chat?number=%2B${site.phoneDigits}${
    message ? `&text=${encodeURIComponent(message)}` : ""
  }`;

/** Primary navigation (matches the in-page section anchors). */
export const navLinks = [
  { href: "#zakoga", label: "Za koga" },
  { href: "#rakije", label: "Rakije" },
  { href: "#veleprodaja", label: "Veleprodaja" },
  { href: "#o-nama", label: "O nama" },
  { href: "#blog", label: "Blog" },
  { href: "#kontakt", label: "Kontakt" },
] as const;
