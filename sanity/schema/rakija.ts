import { defineType, defineField } from "sanity";

export const rakija = defineType({
  name: "rakija",
  title: "Rakija",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Naziv", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Kategorija (podnaslov)",
      type: "string",
      description: 'npr. "Voćna bela", "Barrique", "Classic"',
    }),
    defineField({ name: "abv", title: "Jačina", type: "string", initialValue: "40% vol" }),
    defineField({ name: "volume", title: "Zapremina", type: "string", initialValue: "0,70 l" }),
    defineField({
      name: "image",
      title: "Fotografija boce",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "order", title: "Redosled", type: "number", initialValue: 0 }),
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "image" },
  },
});
