---
id: "19"
order: 19
title: "Podsumowanie: AI → Spec → Agenci → Weryfikacja"
section: "Podsumowanie"
tag: "default"
must_include:
  - "zwiększa tempo"
  - "kończy zgadywanie"
  - "przejmują wykonanie"
  - "Weryfikacja"
  - "daje nam zaufanie"
  - "Nie optymalizuj"
  - "szybkości pisania."
---

# 19 · Podsumowanie — łuk całej prezentacji

## Cel
Cała prezentacja w jednym zdaniu, czytanym od lewej do prawej: AI zwiększa tempo → spec kończy zgadywanie → agenci przejmują wykonanie → weryfikacja daje zaufanie. Wniosek: nie optymalizuj szybkości pisania (przekreślone).

## Treść
**Tag:** `Podsumowanie` (domyślny kolor taga)

**Rząd czterech kart ze strzałkami `→` między nimi.** Każda karta: mały numer (pixel font), tytuł h3, podpis:

1. `01` · **AI** · zwiększa tempo — karta domyślna
2. `02` · **Spec** · kończy zgadywanie — karta żółta
3. `03` · **Agenci** · przejmują wykonanie — karta niebieska
4. `04` · **Weryfikacja** · daje nam zaufanie — karta zielona

**Pod spodem wielkie hasło (~120px, font nagłówkowy):**
„Nie optymalizuj⏎~~szybkości pisania.~~” — „szybkości pisania.” przekreślone grubą linią (efekt strike-line).

## Układ
- Sekcja BEZ `top` (domyślnie wyśrodkowana pionowo).
- Karty w jednym rzędzie na całą szerokość, równej szerokości, strzałki w foncie nagłówkowym między nimi.
- Karty mogą wchodzić po kolei (klasa `enter` z rosnącym `--i`: 0, 2, 4, 6 dla kart, 1, 3, 5 dla strzałek).
- Hasło pod rzędem z wyraźnym odstępem (~40px).

## Komponenty
- `section`, `.tag`
- `.arc` > `.card` / `.card.yellow` / `.card.blue` / `.card.green` (w każdej `span.k2`, `h3`, `p`) przeplatane `span.arr` (`→`), opcjonalnie z `.enter` i `style="--i: n"`
- `p.huge` + `span.strike-line` na „szybkości pisania.”

## Kryteria akceptacji
- [ ] Mieści się w 1920×1080 bez przewijania i bez ucinania tekstu.
- [ ] Cztery karty w kolejności i kolorach: domyślna, żółta, niebieska, zielona; strzałki między nimi.
- [ ] „szybkości pisania.” jest wizualnie przekreślone w stanie końcowym slajdu.
- [ ] Notatki prelegenta w `<aside class="notes">`.

## Notatki prelegenta
**[22:15–23:00]** Cała prezentacja w jednym zdaniu — przeczytaj karty od lewej:
AI zwiększa tempo → spec kończy zgadywanie → agenci przejmują wykonanie → weryfikacja daje nam zaufanie.
Wniosek: nie optymalizuj szybkości pisania. To już nie jest wąskie gardło.
→ Przejście: „To co w takim razie optymalizować?”
