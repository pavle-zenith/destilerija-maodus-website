# Pregled sajta: AEO / SEO / dizajn / CRO (6.7.2026)

Pregledano uživo na destilerija-maodus-website.vercel.app: početna, /rakije, /rakije/dunja (template), /veleprodaja, /kontakt + robots.txt, sitemap.xml, llms.txt. Ocena ukupno: **sajt je u odličnom stanju, spreman za produkciju posle ispravke stavki iz sekcije 1.**

## 1. Ispraviti pre lansiranja (visok prioritet)

1. **Product schema ima samo jednu cenu.** Na /rakije/{slug} JSON-LD nosi jedan Offer (2.950 za 1 l) iako stranica prodaje 3 do 4 zapremine. Zameniti sa `AggregateOffer` (lowPrice 1.650, highPrice 2.950, priceCurrency RSD) ili nizom Offer-a po zapremini. Ovo je i AEO stavka: AI agenti čitaju raspon cena.
2. **Dupli Product markup.** Početna ima 6 Product schema, a iste proizvode markiraju i pojedinačne stranice. Na početnoj zameniti sa `ItemList` koji linkuje na /rakije/{slug} URL-ove (kao što hub već radi). Dva Product entiteta za isti proizvod na dva URL-a se takmiče u indeksu.
3. **Meta description predugačke.** Početna 230 karaktera, /rakije 218, /kontakt ~190. Google seče na ~160: skratiti po formuli O10 (vrednost + dokaz + poziv). Predlog za početnu: `Porodična destilerija iz Vojvodine: rakija od dunje, kajsije i viljamovke i barrique izdanja iz sopstvenog voćnjaka. Poručite ili zatražite veleprodajnu ponudu.` (159)
4. **Hero slika proizvoda ima spor fade-in.** Dva puta uhvaćena kao crna kutija pre završetka animacije. LCP element ne sme da kreće od opacity 0: skinuti fade sa hero slike (ili animirati samo transform), dodati `priority`/eager loading na prvu sliku.
5. **`/cenovnik.md` ne postoji** (O11). Generisati iz cenovnik.json pri build-u.

## 2. Srednji prioritet

6. **Separator u title tagovima nije dosledan.** /veleprodaja i /kontakt koriste `·` pa `|` („Veleprodaja · rakija za ugostitelje | Destilerija Maoduš"). O10 kaže samo `|`.
7. **Kontakt forma nema WhatsApp alternativu** ispod dugmeta (O9), veleprodajna je ima. Dodati istu liniju.
8. **3 slike bez alt atributa na stranici proizvoda.** Ako su dekorativne, `alt=""` je u redu, ali proveriti da li su među njima product/lineup slike.
9. **Default zapremina na proizvodu je 0,7 l.** Pilovi idu 1 l → 0,1 l (dobro za anchoring), ali je selektovan 0,7 l pa se prva vidi cena 2.360. Za pun anchoring efekat razmotriti default 1 l (2.950), da 0,7 l deluje kao razuman izbor. Test kandidat, ne obavezna izmena.
10. **Slogan se ne pojavljuje na stranici proizvoda.** „Dobra do poslednje kapi." kao potpis u završnom CTA bloku (O6) postoji na početnoj, na proizvodu ne. Sitna doslednost brenda.

## 3. Šta je odlično (ne dirati)

- **Meta osnove:** title tagovi po guide-u na svim stranama, canonical pokazuje na produkcioni domen, lang="sr", jedan H1 po strani.
- **robots.txt** dozvoljava sve AI botove, Host + Sitemap postavljeni na produkcioni domen.
- **llms.txt je živ i tačan**, uključuje asortiman, cene modele i kako naručiti. (Napomena: navodi Classic 40% vol, čeka potvrdu od Pavla starijeg.)
- **Schema pokrivenost:** Organization/Distillery/LocalBusiness + WebSite (početna), BreadcrumbList + ItemList (hub), Product + BreadcrumbList + FAQPage (dunja), FAQPage (veleprodaja), ContactPage (kontakt). FAQPage bez dupliranja među stranama, tačno po odluci iz guide-a.
- **Entitet:** Velebit + Kanjiža prisutni u footeru na svakoj strani.
- **CRO tok:** dupli CTA svuda, sample-first hero na veleprodaji sa radio poljem „Šta želite?", telefon dugme uz Poručite, plutajuće „Pozovite nas", forma sa 3 obavezna polja na kontaktu (nizak prag), WhatsApp na veleprodaji, mapa na kontaktu.
- **Copy:** implementiran doslovno iz guide-a, uključujući senzorne opise, FAQ blokove sa odgovorima od 40–60 reči i „na upit" cenovnu napomenu.
- **Interno linkovanje:** hub → 8 proizvoda, breadcrumbs, bez generičkih anchor-a („ovde/saznaj više": 0 na svim proverenim stranama).

## 4. Nije provereno (za sledeći krug)

- Core Web Vitals / brzina na mobilnom (PageSpeed Insights kad sajt bude na produkcionom domenu).
- 301 redirekcije sa starih .html URL-ova (rade tek kad se domen prebaci; mapa je u SCRAPE-stari-sajt-2026-07-03.md).
- Slanje formi (backend) i poruka uspeha po O9.
- Google Business Profile povezivanje (otvoreno pitanje iz strategije).
- Age-gate: prikazao se pri prvom fetch-u, u Chrome sesiji nije ometao pregled; proveriti da ne blokira Googlebot rendering (server-side sadržaj je prisutan u HTML-u, pa je rizik nizak).
