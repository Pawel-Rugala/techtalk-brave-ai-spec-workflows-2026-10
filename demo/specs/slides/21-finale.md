---
id: "21"
order: 21
title: "Finał: przyszłość software developmentu"
section: "Podsumowanie"
tag: "none"
must_include:
  - "Przyszłość software developmentu"
  - "to nie"
  - "AI piszące kod."
  - "To ludzie projektujący systemy, które niezawodnie produkują software."
---

# 21 · Finał

## Cel
Ostatni slajd treści — jedno zdanie-manifest na czarnym tle. Ma wybrzmieć w ciszy: pierwsza część obala oczekiwanie („AI piszące kod” przekreślone), druga daje odpowiedź w żółci.

## Treść
**Brak taga i nagłówka.**

Dwa akapity, font nagłówkowy, ~84px:

1. „Przyszłość software developmentu⏎to nie ~~AI piszące kod.~~” — kolor kremowy (`var(--cream)`), „AI piszące kod.” przekreślone grubą linią.
2. „To ludzie projektujący systemy, które niezawodnie produkują software.” — kolor żółty (`var(--yellow)`).

## Układ
- Ciemny slajd: sekcja z klasą `dark`, tło `#111111` ustawione przez `data-background-color="#111111"`, oraz `data-state="no-floaters"` (wyłącza pływające dekoracje w marginesach).
- Sekcja BEZ `top` — treść wyśrodkowana pionowo, wyrównana do lewej.
- Dwa akapity jeden pod drugim, ogromne, dużo powietrza. Nic więcej na slajdzie.

## Komponenty
- `section.dark` z atrybutami `data-background-color="#111111"` i `data-state="no-floaters"`
- `p.huge` ×2 (rozmiar inline 84px), kolory przez `color: var(--cream)` i `color: var(--yellow)`
- `span.strike-line` na „AI piszące kod.”

## Kryteria akceptacji
- [ ] Mieści się w 1920×1080 bez przewijania i bez ucinania tekstu.
- [ ] Tło czarne (#111111), brak pływających dekoracji.
- [ ] Pierwsze zdanie kremowe z przekreśleniem, drugie żółte.
- [ ] Notatki prelegenta w `<aside class="notes">`.

## Notatki prelegenta
**[24:30–25:00]** Ostatni slajd treści. Przeczytaj powoli, oba zdania naraz są na ekranie.
„Przyszłość software developmentu to nie AI piszące kod. To ludzie projektujący systemy, które niezawodnie produkują software.”
Pauza. Dziękuję.
