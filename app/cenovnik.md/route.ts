import { allRakije, rakijaDetails, rakijeGroups } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * Plain-text price list (O11) generated from the live content in lib/content.ts,
 * so it never drifts from what the site shows. Served at /cenovnik.md for AI
 * answer engines and anyone who wants the raw prices.
 */
export const dynamic = "force-static";

function fmtPrice(price: number | "na upit"): string {
  if (price === "na upit") return "na upit";
  return `${price.toLocaleString("sr-RS")} RSD`;
}

function build(): string {
  const lines: string[] = [];
  lines.push(`# Cenovnik — ${site.name}`);
  lines.push("");
  lines.push(
    "Maloprodajne cene sa uključenim PDV-om (20%). Poručivanje upitom: " +
      `telefon ${site.phone}, mejl ${site.email}. Cene „na upit" dogovaraju se direktno.`,
  );
  lines.push("");

  for (const group of rakijeGroups) {
    const items = allRakije.filter((r) => r.group === group.id);
    if (items.length === 0) continue;

    lines.push(`## ${group.title}`);
    lines.push(group.description);
    lines.push("");

    for (const r of items) {
      lines.push(`### ${r.name} (${r.abv})`);
      const detail = rakijaDetails[r.slug];
      if (detail?.prices?.length) {
        for (const p of detail.prices) {
          lines.push(`- ${p.volume}: ${fmtPrice(p.price)}`);
        }
      } else {
        lines.push(`- ${r.volume}: na upit`);
      }
      lines.push(`URL: ${site.domain}/rakije/${r.slug}`);
      lines.push("");
    }
  }

  return lines.join("\n").trimEnd() + "\n";
}

export function GET() {
  return new Response(build(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
