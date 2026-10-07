# Prezentacja: Koniec klepania kodu? Spec-driven development w nowoczesnych zespołach

Topics:

- Mindset w dobie AI
- Spec-driven development w praktyce: jak przestać pisać kod, a zacząć projektować kontrakty.
- Skalowanie do "AI Factories" – jak zautomatyzować workflow całego zespolu.

## Uruchomienie

```bash
npm install
npm run dev       # http://localhost:5173 z hot reload
npm run build     # statyczna wersja w dist/ (działa offline)
npm run preview   # podgląd builda
npm run export:pdf  # build + PDF obu wersji do export/ (1 strona = 1 slajd, wszystkie fragmenty widoczne)
```

Wersje językowe: `index.html` (PL, `/`) i `en.html` (EN, `/en.html`) — ten sam motyw i animacje.
Eksport PDF używa lokalnego Chrome (inna ścieżka: `CHROME_PATH=... npm run export:pdf`).
PDF można też zrobić ręcznie: otwórz `…/en.html?print-pdf` w Chrome → Drukuj → Zapisz jako PDF (marginesy: brak, grafika tła: włączona).

Wszystko (reveal.js, fonty) jest lokalnie — nie potrzeba internetu na scenie.

## Sterowanie

| Klawisz | Akcja |
|---|---|
| `→` / `Space` | następny krok / slajd |
| `S` | speaker view (notatki + timer) |
| `F` | fullscreen |
| `O` / `Esc` | overview |
| `B` / `.` | wygaszenie ekranu |

## Struktura

- `en.html` — angielska wersja slajdów i notatek
- `scripts/export-pdf.mjs` — eksport PDF (puppeteer-core + lokalny Chrome)
- `index.html` — wszystkie slajdy + notatki prelegenta (`<aside class="notes">`, z czasami)
- `src/theme.css` — neobrutalny motyw, komponenty, animacje fragmentów (`stamp-in`, `slam`, `pop`, `rise`, `glitch`)
- `src/factory.js` / `src/factory.css` — pixel-art AI Factory (slajd 13), sterowana fragmentami
- `src/typewriter.js` — efekt pisania kodu dla elementów `.type`
- `agenda.md` — pierwotny szkic treści
