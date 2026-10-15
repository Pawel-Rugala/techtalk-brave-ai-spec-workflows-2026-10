---
id: "09"
order: 9
title: "Co to właściwie jest spec?"
section: "02 · Spec-driven development"
tag: "blue"
must_include:
  - "Co to właściwie jest spec?"
  - "40-stronicowy Word"
  - "bez zadawania 20 pytań."
  - "specs/create-payment.md"
  - "# Create Payment"
  - "## Business rules"
  - "operation must be idempotent"
  - "duplicate clientRequestId → same payment"
---

# 09 · Co to właściwie jest spec?

## Cel
Odczarować słowo „spec”: to nie jest 40-stronicowy dokument w Wordzie, tylko krótki markdown w repo. Kryterium: inny developer albo agent może zaimplementować feature bez zadawania 20 pytań. Po prawej konkretny przykład specu dla PAY-123.

## Treść
**Tag:** `02 · Spec-driven development` (niebieski wariant)

**Lewa kolumna:**
- Nagłówek (h2, duży, ok. 84 px): `Co to właściwie jest spec?`
- Linia w foncie nagłówkowym (ok. 44 px): `Spec ≠` `40-stronicowy Word` (przekreślone)
- Żółta karta (tekst ok. 36 px): `Spec jest wystarczająco konkretny, żeby` **inny developer albo agent** `zaimplementował feature` **bez zadawania 20 pytań.**

**Prawa kolumna — jasny terminal z plikiem markdown:**
- tytuł paska: `specs/create-payment.md`
- treść (nagłówki markdown wyróżnione kolorem; `#` mocniej, `##` słabiej):
```
# Create Payment

## Goal
User can create a payment for an existing invoice.

## API
POST /payments  { invoiceId, amount, clientRequestId }

## Business rules
- invoice must exist
- invoice cannot already be paid
- amount must equal outstanding balance
- operation must be idempotent

## Events
PaymentCreated · PaymentFailed

## Error cases
404 INVOICE_NOT_FOUND · 409 PAYMENT_ALREADY_EXISTS

## Acceptance criteria
- [ ] duplicate clientRequestId → same payment
```

## Układ
- Slajd „top”. Tag u góry, potem rząd dwóch kolumn (odstęp ok. 70 px, wyrównane do góry). Nagłówek h2 jest WEWNĄTRZ lewej kolumny (nie nad rzędem).
- Lewa kolumna: stała szerokość ok. 700 px, pionowy stos z odstępami ok. 36 px: h2 → linia „Spec ≠ …” → żółta karta.
- Prawa kolumna: jasny terminal zajmuje resztę szerokości; font ok. 25 px, interlinia ok. 1.42 — cały spec musi się zmieścić w pionie bez przewijania.
- Terminal może mieć efekt pisania (typewriter, szybki), ale w stanie końcowym cały tekst widoczny.

## Komponenty
- `section.top`, `span.tag.blue`
- `.row`, `.col` (lewa, stała szerokość)
- `h2`, akapit w `var(--font-head)` z `span.strike-line`
- `.card.yellow` ze `strong`
- `.term.light` z `span.title`; nagłówki markdown jako `span.h1md` i `span.h2md`. Opcjonalnie `.type` z `data-speed`.

## Kryteria akceptacji
- [ ] „40-stronicowy Word” jest przekreślony.
- [ ] Spec w terminalu zawiera wszystkie sekcje: Goal, API, Business rules, Events, Error cases, Acceptance criteria — cały widoczny, nic nie ucięte.
- [ ] `clientRequestId` widoczne w linii API.
- [ ] Mieści się w 1920×1080, brak overflow.
- [ ] Notatki prelegenta obecne.

## Notatki prelegenta
**[9:00–10:15]**
Od razu zaznacz: spec to NIE 40-stronicowy dokument w Wordzie. To krótki markdown w repo, obok kodu, z review jak kod.
Test z żółtej karty: czy inny developer albo agent zrobi to bez zadawania 20 pytań?
Pokaż sekcje po prawej: Goal, API, reguły biznesowe, eventy, przypadki błędów, acceptance criteria. Zwróć uwagę na clientRequestId w API — to jest odpowiedź na pierwszy stempel.
