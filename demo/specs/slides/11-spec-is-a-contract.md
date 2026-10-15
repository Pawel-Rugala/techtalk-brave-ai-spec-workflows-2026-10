---
id: "11"
order: 11
title: "Spec to kontrakt"
section: "02 · Spec-driven development"
tag: "blue"
must_include:
  - "Spec to"
  - "kontrakt"
  - "jedno źródło dla wszystkiego:"
  - "spec.md"
  - "implementacja"
  - "code review"
  - "dokumentacja"
  - "Spec = input do maszyny."
---

# 11 · Spec to kontrakt

## Cel
Pokazać spec jako hub: jeden plik spec.md jest wspólnym źródłem dla implementacji, code review, testów, QA i dokumentacji — i dla wszystkich ról (Product, Developer, AI, Tests, QA). To nie „więcej dokumentacji”, tylko input do maszyny produkującej software.

## Treść
**Tag:** `02 · Spec-driven development` (niebieski wariant)

**Nagłówek (h2):** `Spec to` + `kontrakt` (żółty marker)

**Lead (pod nagłówkiem, bez ograniczenia szerokości):** `Product ↔ Developer ↔ AI ↔ Tests ↔ QA —` **jedno źródło dla wszystkiego:**

**Diagram radialny (hub & spokes):**
- Środek: żółta karta `spec.md`
- Satelity (chipy) połączone liniami ze środkiem:
  - lewy górny: `implementacja`
  - prawy górny: `code review`
  - lewy dolny: `testy` (zielony)
  - prawy dolny: `QA` (zielony)
  - dół, pod środkiem: `dokumentacja` (niebieski)

**Pieczątka (czarna, w prawym dolnym rogu slajdu, lekko obrócona ok. −3°, ok. 30 px):**
`Nie „więcej dokumentacji”. Spec = input do maszyny.`

## Układ
- Slajd „top”: tag, nagłówek, lead (lekko podciągnięty pod nagłówek), diagram wyśrodkowany poziomo.
- Diagram ok. 1660×520 px: linie (grube, czarne, ~5 px) rozchodzą się z centrum (hub) do pięciu satelitów; linie mogą się „rysować” animacją. Satelity rozmieszczone symetrycznie: dwa wysoko po bokach, dwa nisko po bokach (szerzej), jeden pionowo pod hubem.
- Hub na środku, satelity jako chipy wycentrowane na końcach linii.
- Pieczątka pozycjonowana absolutnie: ok. 130 px od prawej, 80 px od dołu slajdu.

## Komponenty
- `section.top`, `span.tag.blue`, `h2` + `span.mark`
- `p.lead` ze `strong`
- `.radial` z SVG linii (klasa `.draw`, linie z `--i` i `--len` do animacji rysowania), `.hub.card.yellow`, satelity `.sat.chip` (warianty `.green`, `.blue`), opcjonalnie `.enter` z `--i`
- `.stamp.ink`

## Kryteria akceptacji
- [ ] spec.md jest wizualnie w centrum, 5 linii łączy go z 5 satelitami.
- [ ] Kolory satelitów: testy i QA zielone, dokumentacja niebieska, pozostałe domyślne.
- [ ] Pieczątka nie nachodzi na diagram i nie wychodzi poza slajd.
- [ ] Mieści się w 1920×1080, brak overflow.
- [ ] Notatki prelegenta obecne.

## Notatki prelegenta
**[11:15–12:15]**
To jest ciekawsze niż „piszmy lepsze prompty”. Jeden spec.md jest źródłem dla wszystkiego wokół: implementacji, code review, testów, QA i dokumentacji. Product, developer, AI, testy i QA patrzą na ten sam plik.
Stempel w rogu: to NIE jest „więcej dokumentacji”. Wcześniej dokumentacja była efektem ubocznym, którego nikt nie czytał. Teraz spec jest inputem do maszyny, która produkuje software — jak źle go napiszesz, maszyna wyprodukuje źle.
