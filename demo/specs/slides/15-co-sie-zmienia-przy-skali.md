---
id: "15"
order: 15
title: "Co się zmienia przy skali?"
section: "03 · AI Factory"
tag: "green"
must_include:
  - "Co się zmienia przy"
  - "Wąskim gardłem jest człowiek"
  - "Separacja ról"
  - "Fabryka to też kod"
  - "Mierzysz linię produkcyjną"
  - "Naprawiasz fabrykę, nie każdy PR."
---

# 15 · Co się zmienia przy skali?

## Cel
Pokazać cztery rzeczy, których nie widać przy pracy z jednym agentem, a które stają się kluczowe, gdy agentów jest wielu. Widz ma wyjść z myślą: przy skali problemem nie jest kod, tylko człowiek, role, sama fabryka i pomiar.

## Treść
**Tag:** `03 · AI Factory`

**Nagłówek (h2):** Co się zmienia przy **skali?** — słowo „skali?” w zielonym markerze.

**Siatka 4 kart** (każda: numer, tytuł h3, akapit):

1. `01` · **Wąskim gardłem jest człowiek** — „Agenci produkują więcej PR-ów, niż zespół jest w stanie przeczytać. Limitem są spec i review — **nie kod.**”
2. `02` · **Separacja ról** — „Kto implementuje, ten nie reviewuje. Osobny agent, osobny kontekst — review **względem specu**, nie własnych założeń.”
3. `03` · **Fabryka to też kod** — „Prompty, skille, CLAUDE.md, checklisty — w repo, wersjonowane, z review. **Naprawiasz fabrykę, nie każdy PR.**”
4. `04` · **Mierzysz linię produkcyjną** — „% PR-ów bez poprawek · rework · bugi na produkcji · czas ticket → merge · **koszt feature'a**.”

Pogrubienia (**…**) = `<strong>`.

## Układ
- Slajd wyrównany do góry (sekcja z klasą `top`): tag, pod nim nagłówek, pod nim siatka.
- Siatka 2 × 2, kolumny równej szerokości, wyraźne odstępy (ok. 40px pionowo, 50px poziomo), wypełnia szerokość treści.
- Kolory kart: 01 żółta, 02 i 03 domyślne (papier), 04 zielona — żółty otwiera problem, zielony zamyka pomiarem.
- Numer karty mały, w foncie pikselowym, nad tytułem.

## Komponenty
- `section.top`, `.tag.green`, `h2` z `.mark.green`
- `.scale` (gotowy grid 2×2 w theme.css) z czterema `.card` (`.card.yellow`, `.card`, `.card`, `.card.green`)
- W karcie: `span.num`, `h3`, `p` ze `strong`

## Kryteria akceptacji
- [ ] Mieści się w 1920×1080 bez przewijania i bez ucinania tekstu.
- [ ] Cztery karty w siatce 2×2 w kolejności 01–04, kolory: żółta, domyślna, domyślna, zielona.
- [ ] Cały tekst po polsku, dosłownie jak w sekcji Treść.
- [ ] Notatki prelegenta w `<aside class="notes">`.

## Notatki prelegenta
**[16:15–18:00]** Cztery rzeczy, których nie widać, dopóki pracujesz z jednym agentem.
01 — wąskim gardłem jest człowiek. Agenci produkują więcej PR-ów, niż zespół jest w stanie przeczytać. Limitem są spec i review, nie kod. Dlatego bramki mają być nieliczne, ale mocne.
02 — separacja ról. Agent, który pisze kod i sam go reviewuje, zawsze powie „looks good”. Reviewer to osobny agent z osobnym kontekstem i sprawdza względem specu.
03 — fabryka to też kod. Prompty, skille, CLAUDE.md, checklisty — w repo, wersjonowane, z review. Kiedy agent trzeci raz robi ten sam błąd, nie poprawiasz PR-a, tylko fabrykę.
04 — mierzysz linię produkcyjną: ile PR-ów przechodzi bez poprawek, ile jest reworku, ile bugów na produkcji, ile trwa droga od ticketu do merge'a i ile kosztuje feature. Jeśli tego nie wiesz, nie wiesz, czy fabryka działa.
[Jeśli masz — tu wstaw własny przykład albo liczby z projektu.]
