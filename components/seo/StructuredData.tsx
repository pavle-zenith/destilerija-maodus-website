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
      description: site.description,
      url: site.domain,
      telephone: site.phone,
      email: site.email,
      areaServed: "RS",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Vojvodina",
        addressCountry: "RS",
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
    ...rakije.map((r) => ({
      "@type": "Product",
      name: `${site.shortName} ${r.name}`,
      category: r.category,
      brand: { "@type": "Brand", name: site.shortName },
      additionalProperty: [
        { "@type": "PropertyValue", name: "Jačina", value: r.abv },
        { "@type": "PropertyValue", name: "Zapremina", value: r.volume },
      ],
      image: r.image?.startsWith("http") ? r.image : `${site.domain}${r.image}`,
    })),
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
