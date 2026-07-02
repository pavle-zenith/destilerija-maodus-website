import { defineType, defineField } from "sanity";

export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Naziv", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "logo",
      title: "Logo (po mogućstvu transparentni PNG)",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "maxHeight",
      title: "Maks. visina (px)",
      type: "number",
      initialValue: 70,
    }),
    defineField({ name: "order", title: "Redosled", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "name", media: "logo" } },
});
