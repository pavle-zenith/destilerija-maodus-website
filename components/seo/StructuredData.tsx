import { site } from "@/lib/site";
import type { Rakija, Faq } from "@/lib/content";

/** JSON-LD for search + AI answer engines (Organization, LocalBusiness, FAQ, Products). */
export function StructuredData({
  rakije,
  faqs,
}: {
  rakije: Rakija[];
  faqs: Faq[];
}) {
  const graph = [
    {
      "@type": ["Organization", "Distillery", "LocalBusiness"],
      "@id": `${site.domain}/#business`,
      name: site.name,
      alternateName: site.shortName,
      legalName: site.legal.businessName,
      taxID: site.legal.taxId,
      foundingDate: "2010-03-31",
      description: site.description,
      url: site.domain,
      telephone: site.phone,
      email: site.email,
      areaServed: "RS",
      address: {
        "@type": "PostalAddress",
        streetAddress: "25 Stevana Novkovića",
        postalCode: "24426",
        addressLocality: "Velebit",
        addressRegion: "Vojvodina",
        addressCountry: "RS",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: site.coords.lat,
        longitude: site.coords.lng,
      },
      sameAs: [site.instagramHref],
    },
    {
      "@type": "WebSite",
      "@id": `${site.domain}/#website`,
      url: site.domain,
      name: site.name,
      inLanguage: "sr-Latn-RS",
      publisher: { "@id": `${site.domain}/#business` },
    },
    // ItemList linking to the canonical /rakije/{slug} URLs. The per-product
    // Product markup lives on those detail pages, so the two don't compete in
    // the index for the same entity.
    {
      "@type": "ItemList",
      "@id": `${site.domain}/#rakije`,
      name: "Rakije",
      itemListElement: rakije.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: r.name,
        url: `${site.domain}/rakije/${r.slug}`,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${site.domain}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  const json = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
