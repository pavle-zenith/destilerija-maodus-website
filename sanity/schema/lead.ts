import { defineType, defineField } from "sanity";

export const lead = defineType({
  name: "lead",
  title: "Upit / Lead",
  type: "document",
  // leads are created via the API; read-only in the studio
  fields: [
    defineField({
      name: "kind",
      title: "Tip",
      type: "string",
      options: {
        list: [
          { title: "Porudžbina (B2C)", value: "inquiry" },
          { title: "Veleprodaja (B2B)", value: "wholesale" },
          { title: "Newsletter", value: "newsletter" },
        ],
      },
    }),
    defineField({ name: "businessName", title: "Lokal / firma", type: "string" }),
    defineField({ name: "name", title: "Ime", type: "string" }),
    defineField({ name: "contact", title: "Kontakt", type: "string" }),
    defineField({ name: "city", title: "Grad", type: "string" }),
    defineField({ name: "rakija", title: "Rakija", type: "string" }),
    defineField({ name: "quantity", title: "Količina", type: "string" }),
    defineField({ name: "occasion", title: "Prilika", type: "string" }),
    defineField({ name: "message", title: "Poruka", type: "text" }),
    defineField({ name: "createdAt", title: "Primljeno", type: "datetime" }),
  ],
  orderings: [
    { title: "Najnovije", name: "newest", by: [{ field: "createdAt", direction: "desc" }] },
  ],
  preview: {
    select: { kind: "kind", name: "name", business: "businessName", contact: "contact" },
    prepare({ kind, name, business, contact }) {
      return {
        title: business || name || contact || "Lead",
        subtitle: kind,
      };
    },
  },
});
