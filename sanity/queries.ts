import { client } from "./client";
import { urlFor } from "./image";
import {
  rakije as fallbackRakije,
  faqs as fallbackFaqs,
  partners as fallbackPartners,
  type Rakija,
  type RakijaGroupId,
  type Faq,
  type Partner,
} from "@/lib/content";

const RAKIJE_QUERY = `*[_type == "rakija"] | order(order asc){
  "slug": slug.current, name, category, group, abv, volume, image, tastingNote
}`;
const FAQ_QUERY = `*[_type == "faqItem"] | order(order asc){ q, a }`;
const PARTNER_QUERY = `*[_type == "partner"] | order(order asc){ name, logo, maxHeight }`;

// revalidate CMS content hourly (ISR); on-demand webhook can override later
const opts = { next: { revalidate: 3600 } } as const;

export async function getRakije(): Promise<Rakija[]> {
  if (!client) return fallbackRakije;
  try {
    const docs = await client.fetch<
      {
        slug: string;
        name: string;
        category: string;
        group?: RakijaGroupId;
        abv: string;
        volume: string;
        image: unknown;
        tastingNote?: string;
      }[]
    >(RAKIJE_QUERY, {}, opts);
    if (!docs?.length) return fallbackRakije;
    return docs.map((d) => ({
      slug: d.slug,
      name: d.name,
      category: d.category,
      // `group`/`tastingNote` aren't in the lean homepage schema yet — fall back
      // until the schema is extended when we mirror the hub model into Sanity.
      group: d.group ?? "vocne-bele",
      abv: d.abv,
      volume: d.volume,
      image: d.image ? urlFor(d.image)?.width(700).height(920).fit("crop").url() ?? "" : "",
      tastingNote: d.tastingNote ?? "",
    }));
  } catch {
    return fallbackRakije;
  }
}

export async function getFaqs(): Promise<Faq[]> {
  if (!client) return fallbackFaqs;
  try {
    const docs = await client.fetch<Faq[]>(FAQ_QUERY, {}, opts);
    return docs?.length ? docs : fallbackFaqs;
  } catch {
    return fallbackFaqs;
  }
}

export async function getPartners(): Promise<Partner[]> {
  if (!client) return fallbackPartners;
  try {
    const docs = await client.fetch<
      { name: string; logo: unknown; maxHeight?: number }[]
    >(PARTNER_QUERY, {}, opts);
    if (!docs?.length) return fallbackPartners;
    return docs.map((d) => ({
      name: d.name,
      logo: d.logo ? urlFor(d.logo)?.width(400).url() ?? "" : "",
      maxHeight: d.maxHeight ?? 70,
    }));
  } catch {
    return fallbackPartners;
  }
}
