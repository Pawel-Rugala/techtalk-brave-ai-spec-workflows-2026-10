---
id: "20"
order: 20
title: "Zamiast tego optymalizuj:"
section: "Podsumowanie"
tag: "default"
must_include:
  - "Zamiast tego"
  - "Intencję"
  - "Ograniczenia"
  - "Pętle feedbacku"
  - "Weryfikację"
  - "Pisanie kodu jest już prawie darmowe."
  - "Tu jest twoja wartość."
---

# 20 · Zamiast tego optymalizuj

## Cel
Odpowiedź na „to co optymalizować?”: cztery rzeczy, każda jako pytanie i konkretny przykład z PAY-123. Puenta: kod jest prawie darmowy, wartość developera jest w tych czterech obszarach.

## Treść
**Tag:** `Podsumowanie`

**Nagłówek (h2):** Zamiast tego **optymalizuj:** — „optymalizuj:” w żółtym markerze.

**Cztery karty** (ikona w pixel foncie, tytuł h3, pytanie, przykład):

| ikona | tytuł | pytanie | przykład | kolor |
|---|---|---|---|---|
| `>_` | Intencję | Co i po co budujemy? | „Add payment endpoint” → spec PAY-123 z celem, regułami i AC | yellow |
| `[#]` | Ograniczenia | Czego nie wolno złamać? | amount ≤ remainingAmount · idempotencja · jedna płatność naraz | pink |
| `↻` | Pętle feedbacku | Jak szybko agent wie, że się myli? | testy i typy w minutach, nie komentarz w review po dwóch dniach | blue |
| `✓` | Weryfikację | Skąd wiemy, że działa? | typy → testy → AI review vs spec → człowiek | green |

**Czarna karta (wyrównana do lewej, font nagłówkowy ~44px):**
„Pisanie kodu jest już prawie darmowe.⏎**Te cztery rzeczy — nie. Tu jest twoja wartość.**” — druga linia żółta.

## Układ
- Sekcja `top`: tag → nagłówek → rząd kart → karta ink.
- Cztery karty w jednym rzędzie, równej szerokości (grid 4 kolumny), wyśrodkowany tekst w kartach.
- W karcie: ikona duża (~60px, pixel font) na górze, potem tytuł, potem pytanie (wyraźniejsze), potem przykład (mniejszy, mono lub stonowany).
- Karta ink pod rzędem, wyrównana do lewej (`align-self: flex-start`), ciasny padding (~22px 34px).

## Komponenty
- `section.top`, `.tag`, `h2` z `.mark`
- `.optimize.v2` > `.card.yellow` / `.card.pink` / `.card.blue` / `.card.green`, w każdej `span.ico`, `h3`, `p.q`, `p.ex`
- `.card.ink` z `p` w `var(--font-head)`, akcent `color: var(--yellow)`

## Kryteria akceptacji
- [ ] Mieści się w 1920×1080 bez przewijania i bez ucinania tekstu (przykłady w kartach mogą się zawijać, ale nie wychodzić poza kartę).
- [ ] Cztery karty w podanej kolejności i kolorach, każda z ikoną, pytaniem i przykładem.
- [ ] Notatki prelegenta w `<aside class="notes">`.

## Notatki prelegenta
**[23:00–24:30]** Cztery rzeczy zamiast szybkości pisania — każda z pytaniem i przykładem z PAY-123.
Intencja — co i po co budujemy? Różnica między „add payment endpoint” a specem PAY-123.
Ograniczenia — czego nie wolno złamać? Kwota nie większa niż do zapłaty, idempotencja, jedna płatność naraz.
Pętle feedbacku — jak szybko agent wie, że się myli? Test, który pada po minucie, jest wart więcej niż komentarz w review po dwóch dniach.
Weryfikacja — skąd wiemy, że działa? Od typów, przez testy, po AI review względem specu i człowieka na końcu.
Puenta: pisanie kodu jest już prawie darmowe. Te cztery rzeczy — nie. Tu jest wasza wartość.
