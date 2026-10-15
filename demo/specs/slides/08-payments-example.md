---
id: "08"
order: 8
title: "Przykład: POST /payments"
section: "02 · Spec-driven development"
tag: "blue"
must_include:
  - "POST /payments"
  - "JIRA · PAY-123"
  - "Add endpoint allowing a user to pay an invoice."
  - "no idempotency key"
  - "invoice already paid?"
  - "what if it fails?"
  - "Kod jest sensowny."
---

# 08 · Przykład: POST /payments

## Cel
Wprowadzić przykład PAY-123, który przewija się przez resztę prezentacji. Jednozdaniowy ticket → agent generuje sensownie wyglądający endpoint → pieczątki pokazują dziury, o których nikt agentowi nie powiedział. Problem nie leży w modelu, tylko we wejściu.

## Treść
**Tag:** `02 · Spec-driven development` (niebieski wariant)

**Nagłówek (h2):** `Przykład:` + `POST /payments` w formacie kodu (monospace, ok. 0.85 rozmiaru nagłówka)

**Lewa karta (żółta) — ticket:**
- etykieta: `JIRA · PAY-123`
- treść (ok. 40 px, bold): `Add endpoint allowing a user to pay an invoice.`
- mały tekst pod spodem: `Priority: High · Estimate: 1 SP 🙂`

**Prawa strona — terminal (ciemny) z kodem:**
- tytuł paska terminala: `agent · payments.ts`
- kod (z kolorowaniem: komentarz, słowa kluczowe, funkcje, stringi, liczby):
```
// 🤖 agent: "Done! Endpoint ready ✅"
router.post('/payments', async (req, res) => {
  const invoice = await db.invoices.find(req.body.invoiceId);
  const payment = await db.payments.create({
    invoiceId: invoice.id,
    amount: req.body.amount,
  });
  res.status(201).json(payment);
});
```

**Pieczątki nałożone na terminal (5 sztuk, lekko obrócone, rozrzucone):**
1. `no idempotency key` — prawy górny róg, wystaje nieco poza prawą krawędź terminala, obrót ~+5°
2. `concurrent payments?` — środek-prawo, ~−4°
3. `invoice already paid?` — niżej, bardziej w prawo, ~+3°
4. `no event emitted` — jeszcze niżej, prawo, ~−5°
5. `what if it fails?` — dół, lewa strona terminala, ~+4°

**Linia pod spodem (lead):** **`Kod jest sensowny.`** `Problem w tym, że nikt nie wie, czy jest` `poprawny` (różowy marker) `.`

## Układ
- Slajd „top”: tag, nagłówek, rząd (karta + terminal), lead na dole.
- Rząd: odstęp ok. 60 px, wyrównanie do góry. Żółta karta stałej szerokości ok. 520 px, terminal zajmuje resztę szerokości.
- Pieczątki to warstwa absolutna nad terminalem (kontener `position: relative` wokół terminala). Rozłożone schodkowo z góry na dół, żeby nie zasłaniały się nawzajem i nie zasłaniały całkowicie kodu. Muszą zmieścić się w slajdzie.
- Terminal może mieć efekt pisania (typewriter), ale w stanie końcowym cały kod jest widoczny.

## Komponenty
- `section.top`, `span.tag.blue`, `h2` z `code`
- `.row`, `.card.yellow` z `span.label`, `p.small`
- `.term` (ciemny terminal) z `span.title`; kolorowanie: `.c` (komentarz), `.k` (keyword), `.f` (funkcja), `.s` (string), `.n` (liczba/identyfikator). Opcjonalnie `.type` z `data-speed`.
- `.stamp-layer` z kilkoma `.stamp` (obrót przez `--rot`)
- `p.lead` + `span.mark.pink`

## Kryteria akceptacji
- [ ] Ticket i kod są obok siebie; kod czytelny, z podświetlaniem składni.
- [ ] Wszystkie 5 pieczątek widoczne, obrócone, nie wychodzą poza 1920×1080.
- [ ] „poprawny” na różowym markerze.
- [ ] Mieści się w 1920×1080, brak overflow.
- [ ] Notatki prelegenta obecne.

## Notatki prelegenta
**[7:30–9:00]** To jest nasz przykład na resztę prezentacji: PAY-123.
Typowy ticket — jedno zdanie, estymata 1 SP. Agent generuje endpoint i melduje „Done ✅”. Kod wygląda sensownie.
Stemple wpadają same, po kolei. Skomentuj każdy:
• no idempotency key — klient zrobi retry i zapłaci dwa razy. • concurrent payments — dwie płatności naraz na tę samą fakturę. • invoice already paid — nic nie blokuje płacenia opłaconej faktury. • no event emitted — reszta systemu nie wie, że była płatność. • what if it fails — co retryować, co zwrócić klientowi?
Agent nie zgadł, bo NIKT mu tego nie powiedział. To nie jest problem modelu — to problem wejścia.
