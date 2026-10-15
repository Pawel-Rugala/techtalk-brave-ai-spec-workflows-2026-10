---
id: "13"
order: 13
title: "Kiedy SDD boli"
section: "02 · Spec-driven development"
tag: "blue"
must_include:
  - "Kiedy SDD"
  - "boli"
  - "Spec-waterfall"
  - "Spec drift"
  - "Spec na wszystko"
  - "Po miesiącu spec kłamie."
  - "Tyle specu, ile ryzyka."
---

# 13 · Kiedy SDD boli

## Cel
Uczciwie pokazać trzy pułapki SDD (żeby nie zabrzmiało jak religia) — każda z objawem i lekarstwem. Zasada końcowa: tyle specu, ile ryzyka.

## Treść
**Tag:** `02 · Spec-driven development` (niebieski wariant)

**Nagłówek (h2):** `Kiedy SDD` + `boli` (różowy marker)

**Trzy karty obok siebie — każda: tytuł (h3), objaw (zły), lekarstwo (dobre):**

1. **`Spec-waterfall`**
   - objaw: `Tydzień pisania specu, zanim ktokolwiek zobaczy działający kod.`
   - lekarstwo: `Mały spec per feature, iteracyjnie. Prototyp też może być inputem.`

2. **`Spec drift`**
   - objaw: `Kod się zmienia, spec nie. Po miesiącu spec kłamie.`
   - lekarstwo: `Zmiana specu w tym samym PR co kod. Review sprawdza oba.`

3. **`Spec na wszystko`**
   - objaw: `Spec dla literówki w labelu. Ceremonia zamiast wartości.`
   - lekarstwo: `Spec tam, gdzie są reguły biznesowe albo ryzyko.`

**Karta na dole (żółta, font nagłówkowy, ok. 46 px):** `Tyle specu, ile ryzyka.`

## Układ
- Slajd „top”: tag, nagłówek, rząd trzech równych kart, żółta karta na dole wyrównana do lewej (padding ok. 22×34 px).
- Trzy karty o równej szerokości w jednym rzędzie, równej wysokości.
- W każdej karcie objaw i lekarstwo wizualnie rozróżnione (objaw = „zły” — np. różowy/czerwony akcent albo znak ✗; lekarstwo = „dobry” — zielony akcent albo ✓), zgodnie ze stylem komponentu w motywie.

## Komponenty
- `section.top`, `span.tag.blue`, `h2` + `span.mark.pink`
- `.pitfalls` z trzema `.card`; w każdej `h3`, `p.bad`, `p.good`
- `.card.yellow` na dole

## Kryteria akceptacji
- [ ] Trzy karty w kolejności: Spec-waterfall, Spec drift, Spec na wszystko.
- [ ] Objaw i lekarstwo w każdej karcie są wizualnie odróżnione (zły vs dobry).
- [ ] „boli” na różowym markerze.
- [ ] Mieści się w 1920×1080, brak overflow.
- [ ] Notatki prelegenta obecne.

## Notatki prelegenta
**[13:45–15:00]** Żeby to nie zabrzmiało jak religia — trzy zarzuty, które słyszę, i wszystkie są zasadne.
Spec-waterfall: „to waterfall od nowa”. Tak — jeśli przez tydzień piszesz spec, zanim ktoś zobaczy działający kod. Rozwiązanie: mały spec per feature, iteracyjnie. Prototyp też może być inputem.
Spec drift: „spec się rozjedzie z kodem”. Tak — jeśli żyje poza PR-em. Spec zmieniamy w tym samym PR co kod, a review sprawdza oba.
Spec na wszystko: literówka w labelu nie potrzebuje specu. Płatności — tak. Spec tam, gdzie są reguły biznesowe albo ryzyko.
Zasada: tyle specu, ile ryzyka.
→ Przejście: „To była jedna funkcja. A co, jeśli takich PAY-123 mamy pięćdziesiąt naraz?”
