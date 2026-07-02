import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Podešavanja sajta",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Naziv", type: "string" }),
    defineField({ name: "phone", title: "Telefon", type: "string" }),
    defineField({ name: "email", title: "Mejl", type: "string" }),
    defineField({ name: "instagram", title: "Instagram", type: "string" }),
    defineField({ name: "whatsapp", title: "WhatsApp broj", type: "string" }),
    defineField({ name: "address", title: "Adresa", type: "string" }),
    defineField({ name: "region", title: "Region", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Podešavanja sajta" }) },
});
