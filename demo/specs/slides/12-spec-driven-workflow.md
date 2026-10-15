---
id: "12"
order: 12
title: "Spec-driven workflow"
section: "02 · Spec-driven development"
tag: "blue"
must_include:
  - "Spec-driven workflow"
  - "Problem"
  - "Build loop · agent"
  - "powtarza, aż spec jest spełniony"
  - "SPEC = źródło prawdy dla każdego kroku"
  - "Człowiek nie wykonuje każdego kroku."
  - "Człowiek pilnuje bramek."
---

# 12 · Spec-driven workflow

## Cel
Pokazać cały przepływ SDD: Problem → SPEC → build loop agenta → PR, z dwiema ludzkimi bramkami (zatwierdzenie specu i decyzja o PR) oraz specem jako szyną/źródłem prawdy dla każdego kroku. Człowiek nie wykonuje kroków — pilnuje bramek.

## Treść
**Tag:** `02 · Spec-driven development` (niebieski wariant)

**Nagłówek (h2):** `Spec-driven workflow`

**Diagram — 4 kolumny połączone strzałkami (→) w poziomie:**
1. Węzeł `Problem` z podpisem (mały tekst) `ticket / pomysł`. Pod spodem nic.
2. Węzeł `SPEC` (wyróżniony, wariant „spec”). Pod nim bramka: `✋ człowiek` ⏎ `zatwierdza`
3. Build loop (największy element): etykieta `↻ Build loop · agent` (symbol ↻ się obraca), w środku rząd chipów: `plan` → `kod` → `testy` → `review` → `poprawki`, pod chipami strzałka powrotu z tekstem `powtarza, aż spec jest spełniony`. Pod całym loopem łącznik `vs spec`.
4. Węzeł `PR`. Pod nim bramka: `✋ człowiek` ⏎ `decyduje`

**Szyna pod diagramem (żółta, na całą szerokość):** `SPEC = źródło prawdy dla każdego kroku`

**Karta na dole (czarna, font nagłówkowy, ok. 42 px):**
`Człowiek nie wykonuje każdego kroku.` ⏎ `Człowiek pilnuje bramek.` (druga linia żółta)

## Układ
- Slajd „top”: tag, nagłówek, diagram (cała szerokość), żółta szyna, czarna karta wyrównana do lewej.
- Diagram: górny rząd to węzły/loop, dolny rząd to elementy „pod spodem” (bramki i łącznik „vs spec”), które sięgają w dół do żółtej szyny — wizualnie każdy krok jest „przyklejony” do szyny specu. Bramki (✋) wyglądają inaczej niż zwykły łącznik (wyróżnione jako punkty kontroli człowieka).
- Kolumna build loop jest najszersza; strzałki między kolumnami w pionie wyrównane do środka węzłów.
- Element pod kolumną ma różne wysokości wysięgu (parametr `--up`: ok. 56 px pod SPEC, 24 px pod loopem, 64 px pod PR).

## Komponenty
- `section.top`, `span.tag.blue`, `h2`
- `.sdd` z kolumnami `.sdd-col`, każda z `.sdd-top` i `.sdd-bot` (warianty `.gate` i `.link`, parametr `--up`); między kolumnami `.sdd-arrow` z `i.pipe-arrow`
- `.pipe-node` (wariant `.spec`) z `small` na podpis
- `.build-loop` z `span.label` (w środku `i.spin` dla ↻), `.loop-steps` (chipy `.chip` przedzielone `i` →), `.loop-back`
- `.sdd-rail` (żółta szyna)
- `.card.ink` (czarna karta), druga linia w kolorze `var(--yellow)`

## Kryteria akceptacji
- [ ] Kolejność: Problem → SPEC → Build loop → PR, ze strzałkami między.
- [ ] Dokładnie dwie bramki „✋ człowiek” (pod SPEC i pod PR).
- [ ] Build loop zawiera 5 chipów w kolejności plan, kod, testy, review, poprawki oraz tekst powrotu.
- [ ] Żółta szyna widoczna pod diagramem na całą szerokość.
- [ ] Mieści się w 1920×1080, brak overflow.
- [ ] Notatki prelegenta obecne.

## Notatki prelegenta
**[12:15–13:45]** Przejdź po diagramie od lewej.
Problem — ticket albo pomysł. Z niego powstaje SPEC i tu jest pierwsza bramka: człowiek zatwierdza, CO budujemy, zanim powstanie linijka kodu. Błąd złapany tutaj kosztuje minuty, a nie dni.
Potem build loop: agent sam planuje, koduje, pisze testy, robi review i poprawia — w pętli, aż spec jest spełniony. Nikt go nie prowadzi za rękę krok po kroku.
Na końcu PR i druga bramka: człowiek decyduje, czy to wchodzi.
Żółta szyna pod spodem: spec jest źródłem prawdy dla każdego kroku. Pętla sprawdza się względem specu, a nie względem własnego zdania.
Czarna karta: człowiek nie wykonuje każdego kroku. Człowiek pilnuje bramek.
