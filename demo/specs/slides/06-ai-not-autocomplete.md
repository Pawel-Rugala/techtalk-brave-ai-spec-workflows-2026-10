---
id: "06"
order: 6
title: "AI ≠ autocomplete"
section: "01 · Mindset"
tag: "yellow"
must_include:
  - "AI ≠ autocomplete"
  - "write this function"
  - "= faster typing"
  - "defines intent"
  - "AI agent"
  - "operatorem klawiatury"
  - "system orchestrator"
---

# 06 · AI ≠ autocomplete

## Cel
Pokazać różnicę między używaniem AI jako „szybszego pisania” (autocomplete) a delegowaniem intencji agentowi, który sam pracuje w pętli. Widz ma poczuć, że rola developera się zmienia: z operatora klawiatury na projektanta i nadzorcę.

## Treść
**Tag:** `01 · Mindset` (żółty wariant)

**Nagłówek (h2):** `AI ≠ autocomplete`

**Lewa kolumna — stary sposób (pionowy flow, z góry na dół, strzałki między węzłami):**
1. `Developer`
2. `"write this function"` — węzeł „ghost” (przerywana ramka, przygaszony)
3. `AI`
4. `code`

Pod flow pieczątka (stamp, czarny wariant, obrócona ok. −4°): `= faster typing`

**Prawa kolumna — nowy sposób (pionowy flow, wyrównany do lewej):**
1. `Developer`
2. `defines intent` — węzeł żółty
3. `AI agent` — węzeł niebieski
(po każdym węźle strzałka w dół, ostatnia strzałka prowadzi do chipów)

Pod flow rząd chipów: `plans` · `implements` · `tests` · `reviews` · `fixes` · `↻ loop` (ostatni chip różowy)

**Karta na dole (żółta, cała szerokość treści):**
`Developer przestaje być` **operatorem klawiatury**`. Zaczyna być:` **architect · product engineer · reviewer · constraint designer · system orchestrator**
(pogrubione: „operatorem klawiatury” oraz cała lista ról)

## Układ
- Slajd typu „top” (treść od góry): tag, nagłówek, potem rząd dwóch kolumn, na dole żółta karta.
- Dwie kolumny obok siebie, odstęp ok. 90 px, wyrównane do góry, lekki margines nad rzędem (~10 px).
- Lewa kolumna: stała szerokość ok. 560 px, elementy wyśrodkowane; pieczątka ~20 px pod flow.
- Prawa kolumna: zajmuje resztę szerokości; strzałki w prawej kolumnie przesunięte w prawo (~90 px od lewej krawędzi), żeby wypadały pod środkiem węzłów wyrównanych do lewej.
- Kontrast: lewa strona celowo „uboga” (ghost node, czarny stempel), prawa kolorowa (żółty, niebieski, różowy loop).
- Żółta karta: padding ok. 22×32 px, tekst ok. 34 px.

## Komponenty
- `section.top`, `span.tag.yellow`, `h2`
- `.row` (dwie kolumny), `.col`, `.col.center` dla lewej kolumny
- `.flow` z `.node` (warianty `.ghost`, `.yellow`, `.blue`) i `.arrow` między węzłami
- `.stamp.ink` z obrotem (`--rot: -4deg`)
- `.chips` + `.chip` (ostatni `.chip.pink`)
- `.card.yellow` na dole

## Kryteria akceptacji
- [ ] Lewa i prawa kolumna czytelnie kontrastują: „faster typing” vs agent w pętli.
- [ ] Węzeł `"write this function"` wygląda jak ghost (przygaszony / przerywana ramka).
- [ ] Chip `↻ loop` jest różowy i jest ostatni w rzędzie.
- [ ] Cała lista ról w żółtej karcie jest pogrubiona i mieści się bez ucinania.
- [ ] Mieści się w 1920×1080, brak overflow.
- [ ] Notatki prelegenta obecne.

## Notatki prelegenta
**[5:00–6:15]**
Lewa strona: tak wiele zespołów nadal używa AI — „napisz tę funkcję”. To jest autocomplete. Po prostu szybsze pisanie.
Prawa strona: developer definiuje intencję, a agent sam planuje, implementuje, testuje, reviewuje i poprawia — w pętli.
Żółta karta: developer przestaje być operatorem klawiatury. Nie czytaj całej listy ról — wybierz dwie, które są sednem: bliżej biznesu (product engineer) i bliżej weryfikacji (reviewer, constraint designer).
