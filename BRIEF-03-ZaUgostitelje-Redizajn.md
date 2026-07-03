# Brief za Claude Code — redizajn sekcije „Za ugostitelje" na /veleprodaja

**3. jul 2026.** · Odnosi se SAMO na sekciju sa eyebrow-om „ZA UGOSTITELJE" (H2 „Rakija za meni koji ima šta da preporuči.") — između sekcije „Tri šanka" i sekcije „Tri koraka do saradnje". Ostatak stranice ne dirati.

---

## 1. Zašto redizajn

Trenutna sekcija deluje generički („cookie-cutter") iz dva razloga:

1. **Sadržaj ponavlja stranicu.** 3 od 4 kartice govore ono što stranica već kaže na drugom mestu: „Degustacija pre odluke" = hero + korak 2; „Jasan izbor za meni" = segmenti + asortiman; „Etiketa" = event segment. Sekcija ne dodaje nijednu novu informaciju.
2. **Jezik je apstraktan.** „Stabilan kvalitet", „jasan izbor" — tvrdnje koje bi svaka destilerija mogla da nalepi. Bez mehanizma, bez brojeva, bez dokaza. Jedina objektivna stvar (laboratorijska analiza) je zakopana kao sitan muted tekst ispod kartica.

**Novi posao sekcije:** autoritet + poverenje kroz KONKRETNO — mehanizam konzistentnosti, laboratorijski dokaz, priča kao alat za maržu, direktan kontakt sa porodicom.

## 2. Novi sadržaj (finalan copy — koristiti doslovno)

**Eyebrow:** ZA UGOSTITELJE

**H2:** Rakija za meni koji ima šta da preporuči.

**Intro (uz H2):** Radimo sa restoranima, barovima, salama i vinotekama — i stojimo iza svake flaše koju vaš konobar otvori pred gostom.

**Blok 1 — ISTAKNUTI (featured):**
- Naslov: **Isti ukus u januaru i u julu**
- Tekst: Zrelo voće, kontrolisana fermentacija i dvostruka destilacija u bakarnom kazanu — zato svaka šarža ima isti ukus. Bez posrednika: količine, ritam isporuke i izbor dogovaramo direktno, prema vašem lokalu i sezoni.

**Blok 2:**
- Naslov: **Laboratorija, ne obećanje**
- Tekst: Svaku šaržu potvrđujemo laboratorijskom analizom pre nego što izađe iz destilerije. Papir postoji — tražite ga uz uzorak.

**Blok 3:**
- Naslov: **Priča koju konobar prenese u jednoj rečenici**
- Tekst: „Dunja iz porodičnog voćnjaka u Vojvodini — kraljica voćnih rakija." Gost pamti, druga runda se ne prodaje sama. Priča je marža.

**Blok 4:**
- Naslov: **Etiketa za lokal ili događaj**
- Tekst: Personalizovana etiketa za sale, svadbe i poslovne poklone — ime mladenaca, vaše firme ili vašeg lokala na boci koju pravimo mi.

**Završna linija (zamenjuje postojeću rečenicu o laboratoriji):** Na upit odgovara isti čovek koji peče rakiju — dogovara isporuku i pamti šta vaši gosti piju.

**CTA dugme:** Zatražite uzorak → `#upit` (nepromenjeno)

### Mapiranje staro → novo

| Staro | Novo |
|---|---|
| Stabilan kvalitet i direktna isporuka (featured) | Isti ukus u januaru i u julu (featured) |
| Jasan izbor za meni | → uklonjeno (pokriva asortiman sekcija); zamenjuje ga „Priča koju konobar prenese…" |
| Degustacija pre odluke | → uklonjeno (pokrivaju hero, korak 2 i CTA) |
| Etiketa za lokal ili događaj | zadržano, konkretizovan tekst |
| — (novo) | Laboratorija, ne obećanje — promovisano iz muted footer teksta u punopravan blok |
| Muted rečenica o laboratoriji + porodici | → nova završna linija o direktnom kontaktu |

## 3. Layout smernice

Konačan layout bira Pavle — struktura 1 featured + 3 bloka može da ostane. Ograničenja bez obzira na layout:

- **NE koristiti `b2b-sank.png`** u ovoj sekciji — ta slika je već na hero-u i na kartici „Barovi i kafići" (treće ponavljanje na istoj strani je glavni „template" signal). Ili bez fotografije, ili nova/druga slika (npr. makro detalj bakarnog kazana, kapi, laboratorijska flaša).
- **Bez generičkih ikonica u rounded-square čipovima** (lista/poklon/tag glifovi) — to je najprepoznatljiviji SaaS šablon. Ako treba vizuelni marker po bloku: broj (01–04) u Fraunces-u, ili tanak bakarni linijski akcenat, ili ništa.
- Blokovi ne moraju biti identičnih dimenzija — hijerarhija je poželjna (featured nosi najviše težine, lab blok drugi po težini).
- Postojeći dizajn sistem važi: Fraunces naslovi, Inter telo, paleta ugalj/šljiva/krem/bakar, zlato `#C9A34E` samo za premium/dokaz momente (lab blok je legitiman kandidat za zlatni akcenat).
- Završna linija + CTA ostaju na dnu sekcije, levo poravnato kao sada je OK.

## 4. TODO / provere pre deploy-a (pitati Pavla)

- [ ] „porodični voćnjak" u bloku 3 — potvrditi da je voće zaista iz sopstvenog voćnjaka. Ako nije 100%: zameniti sa „iz Vojvodine, od pažljivo odabranog voća".
- [ ] „Papir postoji — tražite ga uz uzorak" — potvrditi da lab analiza sme da se pokaže partnerima na zahtev. Ako ne: ublažiti u „Svaku šaržu potvrđujemo laboratorijskom analizom."

## 5. Acceptance checklist

- [ ] Svih 6 tekstualnih elemenata (H2, intro, 4 bloka, završna linija) doslovno kao u sekciji 2 — dijakritike (č, ć, š, ž, đ) ispravne.
- [ ] Nema `b2b-sank.png` u sekciji.
- [ ] Nema icon-chip kartica.
- [ ] CTA i dalje vodi na `#upit`.
- [ ] Mobilno: blokovi se slažu vertikalno, featured prvi; ništa ispod 15px za body tekst.
- [ ] Ostale sekcije stranice vizuelno i sadržajno nepromenjene.
