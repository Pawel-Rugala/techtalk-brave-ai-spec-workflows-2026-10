---
id: "14"
order: 14
title: "Od assistant do factory"
section: "03 · AI Factory"
tag: "green"
must_include:
  - "Od assistant do"
  - "factory"
  - "AI Assistant"
  - "AI Agent"
  - "AI Factory"
  - "Developer prowadzi cały proces."
  - "Developer deleguje całe zadanie."
  - "Developer projektuje system, który dostarcza."
---

# 14 · Od assistant do factory

## Cel
Pokazać trzy poziomy pracy z AI jak poziomy w grze: asystent (LVL 1), agent (LVL 2), fabryka (LVL 3). Na każdym poziomie inna rola developera — od prowadzenia procesu, przez delegowanie zadania, po projektowanie systemu, który dostarcza.

## Treść
**Tag:** `03 · AI Factory` (zielony wariant)

**Nagłówek (h2):** `Od assistant do` + `factory` (zielony marker)

**Trzy karty-poziomy obok siebie:**

1. **Karta LVL 1** (biała)
   - pasek poziomu: `LVL 1` + wskaźnik HP 1/3 (jeden pełny segment, dwa wyłączone)
   - h3: `AI Assistant`
   - blok monospace: `Developer → AI → Developer`
   - mały przygaszony tekst: `ChatGPT · Claude · Copilot`
   - rola: `Developer prowadzi cały proces.`

2. **Karta LVL 2** (biała)
   - `LVL 2` + HP 2/3
   - h3: `AI Agent`
   - blok monospace (drzewko, zachować wcięcia i znaki):
```
Task → Agent
  ├─ reads repository
  ├─ changes code
  ├─ runs tests
  ├─ fixes errors
  └─ creates PR
```
   - rola: `Developer deleguje całe zadanie.`

3. **Karta LVL 3** (żółta — najważniejsza)
   - `LVL 3` + HP 3/3 (wszystkie pełne)
   - h3: `AI Factory`
   - blok monospace (zachować wcięcia):
```
Jira → Spec Agent
     → Architect Agent
     → BE ∥ FE Agents
     → Testing Agent
     → Review Agent
     → Human approval
```
   - rola: `Developer projektuje system, który dostarcza.`

## Układ
- Slajd „top”: tag, nagłówek, rząd trzech kart (~20 px pod nagłówkiem).
- Trzy karty równej szerokości, wyrównane do góry; rosnąca „moc” od lewej do prawej (HP bar, żółte wyróżnienie LVL 3).
- Pasek LVL w stylu gry (pixel font), segmenty HP jako małe kwadraty; wyłączone segmenty przygaszone.
- Bloki monospace z zachowaniem białych znaków (pre-wrap), żeby drzewka się nie rozjechały.
- Linia roli na dole każdej karty, wyróżniona (np. pogrubiona), najlepiej wyrównana na tej samej wysokości we wszystkich kartach.

## Komponenty
- `section.top`, `span.tag.green`, `h2` + `span.mark.green`
- `.levels` z trzema `.card.level` (trzecia `.card.level.yellow`)
- `.lvl` z `span.hp` zawierającym `b` (pełny) i `b.off` (wyłączony)
- `h3`, `div.mono`, `p.small.muted`, `p.who`

## Kryteria akceptacji
- [ ] Trzy poziomy w kolejności LVL 1 → LVL 2 → LVL 3, HP odpowiednio 1/3, 2/3, 3/3.
- [ ] Karta LVL 3 jest żółta.
- [ ] Drzewka w blokach monospace zachowują wcięcia i znaki `├─`, `└─`, `∥`.
- [ ] Mieści się w 1920×1080, brak overflow.
- [ ] Notatki prelegenta obecne.

## Notatki prelegenta
**[15:00–16:15]** Trzy poziomy pracy z AI.
LVL 1, asystent: ChatGPT, Claude, Copilot w IDE. Ty prowadzisz cały proces, AI podpowiada.
LVL 2, agent: dajesz mu całe zadanie. Sam czyta repo, zmienia kod, puszcza testy, poprawia błędy i otwiera PR. Tu jest dziś większość zespołów, które na serio używają AI.
LVL 3, fabryka: ticket przechodzi przez wyspecjalizowanych agentów — spec, architekt, backend i frontend równolegle, testy, review — a na końcu człowiek zatwierdza. Developer nie pisze już kodu, tylko projektuje system, który go dostarcza.
Ważne: AI Factory to workflow, nie model. Modele będą się zmieniać, workflow zostaje.
