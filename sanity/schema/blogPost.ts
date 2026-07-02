import { defineType, defineField } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog tekst",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Naslov", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "category", title: "Kategorija", type: "string" }),
    defineField({ name: "excerpt", title: "Kratak opis", type: "text", rows: 2 }),
    defineField({ name: "coverImage", title: "Naslovna slika", type: "image", options: { hotspot: true } }),
    defineField({ name: "body", title: "Sadržaj", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "publishedAt", title: "Datum objave", type: "datetime" }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "coverImage" } },
});
