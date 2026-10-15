---
id: "18"
order: 18
title: "Agent jest wymienny. Spec jest trwały."
section: "03 · AI Factory"
tag: "green"
must_include:
  - "Agent jest"
  - "wymienny."
  - "Spec jest"
  - "trwały."
  - "Dzisiaj implementuje"
  - "decyzje architektoniczne"
  - "kryteria akceptacji"
---

# 18 · Agent jest wymienny / Spec jest trwały

## Cel
Zamknięcie części o fabrykach jednym kontrastem: model/agent to element wymienny, a prawdziwym majątkiem zespołu są artefakty, które zostają — spec, decyzje, testy, ograniczenia, kryteria akceptacji.

## Treść
**Tag:** `03 · AI Factory`

Brak h2 — dwie wielkie kolumny-hasła.

**Lewa kolumna:**
- Hasło (bardzo duże, ~110px, font nagłówkowy): „Agent jest⏎**wymienny.**” — „wymienny.” w różowym markerze.
- Pod spodem (40px, pogrubione): „Dzisiaj implementuje [slot]” — gdzie slot to animowany „bęben”, który w pętli przewija nazwy: `Claude` → `Codex` → `Gemini` → `???`.

**Prawa kolumna:**
- Hasło (~110px): „Spec jest⏎**trwały.**” — „trwały.” w zielonym markerze.
- Pod spodem stos chipów (większe chipy, ~34px): `spec` (żółty), `decyzje architektoniczne`, `testy` (zielony), `ograniczenia`, `kryteria akceptacji` (niebieski).
- Na końcu (lead): „…zostają.”

## Układ
- Sekcja BEZ klasy `top` (zawartość wyśrodkowana pionowo, domyślny układ).
- Dwie kolumny równej szerokości obok siebie, duży odstęp (~80px), wyrównane do góry.
- Lewa kolumna: hasło, a pod nim linia ze slotem. Prawa: hasło, pod nim zawijający się rząd chipów, pod nim „…zostają.”
- Kontrast kolorystyczny: różowy (wymienny, ulotny) vs zielony (trwały).

## Komponenty
- `section` (bez `top`), `.tag.green`
- `.row` > dwie `.col.grow`
- `p.huge` z `.mark.pink` / `.mark.green`
- `.slot` > cztery `span` (gotowa animacja w theme.css przewijająca kolejne nazwy)
- `.chips.durable-stack` > `.chip.yellow`, `.chip`, `.chip.green`, `.chip`, `.chip.blue`
- `p.lead`

## Kryteria akceptacji
- [ ] Mieści się w 1920×1080 bez przewijania i bez ucinania tekstu.
- [ ] Slot pokazuje kolejno Claude, Codex, Gemini, ??? (animacja CSS z theme.css, bez JS).
- [ ] Pięć chipów w podanej kolejności i kolorach.
- [ ] Notatki prelegenta w `<aside class="notes">`.

## Notatki prelegenta
**[21:30–22:15]** Zamknięcie części o fabrykach.
Agent jest wymienny: dziś implementuje Claude, jutro Codex, pojutrze coś, czego jeszcze nie ma.
Spec jest trwały: spec, decyzje architektoniczne, testy, ograniczenia i kryteria akceptacji zostają, niezależnie od modelu. To jest prawdziwy majątek zespołu. Inwestuj w to, co trwałe.
