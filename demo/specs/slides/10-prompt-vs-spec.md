---
id: "10"
order: 10
title: "Dobry spec vs zły prompt"
section: "02 · Spec-driven development"
tag: "blue"
must_include:
  - "Dobry spec vs zły prompt"
  - "Add payment endpoint."
  - "…i agent zgaduje resztę."
  - "payment.amount ≤ invoice.remainingAmount"
  - "optimistic lock on invoice"
  - "404 · 409 · 422 → retry only 5xx"
  - "mniej zgadywania."
---

# 10 · Dobry spec vs zły prompt

## Cel
Pokazać ten sam feature dwa razy: jako jednolinijkowy prompt (agent zgaduje) i jako zwięzły spec, w którym każdy wiersz zamyka jedną dziurę z przykładu PAY-123. Puenta: AI nie potrzebuje kreatywniejszych promptów, tylko mniej zgadywania.

## Treść
**Tag:** `02 · Spec-driven development` (niebieski wariant)

**Nagłówek (h2):** `Dobry spec vs zły prompt`

**Lewa kolumna:**
- Biała karta z etykietą `PROMPT`, a w niej (monospace, ok. 38 px, bold, bez zawijania): `Add payment endpoint.` — przekreślone
- Pod kartą mały przygaszony tekst: `…i agent zgaduje resztę.`

**Prawa kolumna — niebieska karta z etykietą `SPEC` (monospace, ok. 30 px, interlinia ~1.45), wiersze:**
1. **`POST /payments`**
2. **`Preconditions:`** `invoice exists · status = OPEN`
3. **`Invariant:`** `payment.amount ≤ invoice.remainingAmount`
4. **`Idempotency:`** `clientRequestId`
5. **`Concurrency:`** `optimistic lock on invoice`
6. **`Side effects:`** `PaymentCreated event`
7. **`Failure modes:`** `404 · 409 · 422 → retry only 5xx`
(etykiety przed dwukropkiem pogrubione)

**Karta na dole (żółta, font nagłówkowy, ok. 48 px):**
`AI nie potrzebuje bardziej kreatywnych promptów.` ⏎ `AI potrzebuje` `mniej zgadywania.` (różowy marker)

## Układ
- Slajd „top”: tag, nagłówek, rząd dwóch kolumn (odstęp ok. 60 px, wyrównanie do góry), żółta karta na dole wyrównana do lewej (nie na całą szerokość).
- Lewa kolumna stała szerokość ok. 560 px; prawa niebieska karta rośnie na resztę szerokości.
- Kontrast: lewa strona to jedna krótka, przekreślona linijka; prawa — gęsta, precyzyjna lista.

## Komponenty
- `section.top`, `span.tag.blue`, `h2`
- `.row`, `.col`
- `.card` z `span.label` „PROMPT”, `span.strike-line` na prompt
- `p.muted.small`
- `.card.blue.grow` z `span.label` „SPEC”, wiersze jako `div` ze `strong`
- `.card.yellow` + `span.mark.pink`

## Kryteria akceptacji
- [ ] Prompt jest przekreślony i mieści się w jednej linii.
- [ ] Spec ma 7 wierszy w podanej kolejności, wszystkie widoczne.
- [ ] Symbole `≤`, `·`, `→` wyświetlają się poprawnie.
- [ ] „mniej zgadywania.” na różowym markerze.
- [ ] Mieści się w 1920×1080, brak overflow.
- [ ] Notatki prelegenta obecne.

## Notatki prelegenta
**[10:15–11:15]**
Lewa strona: to, co dziś zwykle wrzucamy agentowi — „Add payment endpoint.” I agent zgaduje resztę.
Prawa strona: to samo, ale bez niedomówień. Każdy wiersz zamyka jeden stempel z przykładu:
• Preconditions (status OPEN) → opłacona faktura. • Idempotency (clientRequestId) → podwójna płatność. • Concurrency (optimistic lock) → równoległe płatności. • Side effects (PaymentCreated) → brak eventu. • Failure modes → co gdy się wywali.
Puenta z żółtej karty: AI nie potrzebuje bardziej kreatywnych promptów. Potrzebuje mniej zgadywania. Każda luka w specu to miejsce, w którym agent zgaduje — i zgaduje pewnie siebie.
