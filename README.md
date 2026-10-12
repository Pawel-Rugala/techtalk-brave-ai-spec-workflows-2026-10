# Koniec klepania kodu?

Prezentacja na Brave AI Szczecin (październik 2026) — ok. 25 minut, 22 slajdy, po polsku.
Zbudowana na reveal.js + Vite.

## O czym

- **00 · Punkt wyjścia** — Bun przepisany na Rusta w 11 dni zamiast 3 osobolat; od sierpa do floty kombajnów; gdzie dziś idzie wysiłek zespołu i czego AI nie potaniło.
- **01 · Mindset** — AI to nie autocomplete; od pisania kodu do projektowania intencji.
- **02 · Spec-driven development** — przykład PAY-123 (`POST /payments`), czym jest spec, spec vs prompt, spec jako kontrakt, workflow z bramkami człowieka i kiedy SDD boli.
- **03 · AI Factory** — od asystenta do fabryki, co się zmienia przy skali, przykłady fabryk (GitHub Actions na issues/labelach/PR-ach, plugin zespołowy, chat-ops, agenci cykliczni, pętla z produkcji, własny orkiestrator), piramida zaufania.
- **Podsumowanie** — co optymalizować zamiast szybkości pisania.

## Uruchomienie

```bash
npm install
npm run dev         # http://localhost:5173 z hot reload
npm run build       # statyczna wersja w dist/
npm run preview     # podgląd builda (http://localhost:4173)
npm run export:pdf  # build + PDF do export/ (1 strona = 1 slajd)
```

Wszystko (reveal.js, fonty) jest lokalnie — nie potrzeba internetu na scenie.

Build trzeba serwować (`npm run preview` albo dowolny serwer statyczny) — otwarcie `dist/index.html` bezpośrednio z dysku nie zadziała, bo Chrome blokuje moduły JS z `file://`.

Eksport PDF używa lokalnego Chrome (inna ścieżka: `CHROME_PATH=... npm run export:pdf`). Ręcznie: otwórz `…/index.html?print-pdf` w Chrome → Drukuj → Zapisz jako PDF (marginesy: brak, grafika tła: włączona).

## Prezentowanie

1. `npm run dev` i otwórz http://localhost:5173 w Chrome.
2. Projektor ustaw jako rozszerzony ekran (nie lustro).
3. `S` — speaker view z notatkami, timerem i następnym slajdem; zostaw go na laptopie.
4. Okno prezentacji przeciągnij na projektor i naciśnij `F`.

Każdy slajd pokazuje się od razu w całości (fragmenty są wyłączone) — strzałka zawsze przechodzi do następnego slajdu.

| Klawisz | Akcja |
|---|---|
| `→` / `Space` | następny slajd |
| `←` | poprzedni slajd |
| `S` | speaker view (notatki + timer) |
| `F` | fullscreen |
| `O` / `Esc` | przegląd wszystkich slajdów |
| `B` / `.` | wygaszenie ekranu |

## Struktura

- `index.html` — wszystkie slajdy + notatki prelegenta (`<aside class="notes">`, z czasami do 25:00)
- `src/main.js` — konfiguracja reveal.js (1920×1080, bez fragmentów) i dekoracyjne kształty w tle
- `src/theme.css` — neobrutalny motyw i komponenty slajdów
- `src/factory.js` / `src/factory.css` — pixel-art AI Factory (tryb sterowany fragmentami albo `data-autoplay`); obecnie nieużywana w prezentacji
- `src/typewriter.js` — efekt pisania kodu dla elementów `.type`; obecnie niepodpięty
- `scripts/export-pdf.mjs` — eksport PDF (puppeteer-core + lokalny Chrome)
