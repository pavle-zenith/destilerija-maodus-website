import { defineType, defineField } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "Često pitanje",
  type: "document",
  fields: [
    defineField({ name: "q", title: "Pitanje", type: "string", validation: (r) => r.required() }),
    defineField({ name: "a", title: "Odgovor", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "order", title: "Redosled", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "q" } },
});
