import type { SchemaTypeDefinition } from "sanity";
import { rakija } from "./rakija";
import { faqItem } from "./faqItem";
import { partner } from "./partner";
import { blogPost } from "./blogPost";
import { siteSettings } from "./siteSettings";
import { lead } from "./lead";

export const schemaTypes: SchemaTypeDefinition[] = [
  rakija,
  faqItem,
  partner,
  blogPost,
  siteSettings,
  lead,
];
