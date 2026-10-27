# Koniec klepania kodu?

**Spec-driven development w nowoczesnych zespołach** — prezentacja z Brave AI Szczecin (październik 2026), ok. 25 minut, po polsku. Autor: Paul Rugała · [LinkedIn](https://www.linkedin.com/in/paul-rugala).

> **Język:** Polski (ta gałąź, `main`) · [English — "The End of Hand-Coding?"](https://github.com/Pawel-Rugala/techtalk-brave-ai-spec-workflows-2026-10/tree/feat/eng-version) (`feat/eng-version`)

Jeśli byłeś na prezentacji: to jest całe repo, łącznie z **fabryką AI**, która w trakcie wystąpienia budowała slajdy na żywo ze specyfikacji. Możesz ją uruchomić u siebie.

## Co tu jest

W repo są **dwie wersje tej samej prezentacji**:

| | Pełna talia (backup) | Talia demo (fabryka AI) |
|---|---|---|
| Gdzie | `index.html` w głównym katalogu | `demo/deck/` |
| Kto zrobił slajdy | wszystkie 22 slajdy ręcznie | slajdy 01–05 ręcznie, 06–22 **budują agenci AI na żywo** ze specyfikacji w `demo/specs/slides/` |
| Do czego | stabilna wersja do prezentowania i eksportu do PDF | pokaz tezy prezentacji: człowiek pisze spec, fabryka dostarcza |
| Start | `npm run dev` → http://localhost:5173 | `npm run demo` → http://localhost:5180/demo/dashboard/ |
| Wymaga | tylko Node | Node, Claude Code, Chrome / Playwright |

Pełna talia jest też siatką bezpieczeństwa dla demo. Jeśli agent nie zbuduje slajdu, fabryka podstawia ręcznie zrobiony slajd z backupu i otwarcie to pokazuje.

Dodatkowo:
- `talk.md` — moje surowe notatki do wystąpienia,
- `talk-v2.md` — dopracowany tekst prelegenta; ten sam tekst jest w notatkach slajdów (`S` w prezentacji).

## O czym jest prezentacja

- **00 · Punkt wyjścia** — Bun przepisany na Rusta w 11 dni zamiast 3 osobolat; od sierpa do floty kombajnów; gdzie dziś idzie wysiłek zespołu i czego AI nie potaniło.
- **01 · Mindset** — AI to nie autocomplete; od pisania kodu do projektowania intencji.
- **02 · Spec-driven development** — przykład PAY-123 (`POST /payments`), czym jest spec, spec vs prompt, spec jako kontrakt, workflow z bramkami człowieka i kiedy SDD boli.
- **03 · AI Factory** — od asystenta do fabryki, co się zmienia przy skali, przykłady fabryk (GitHub Actions, plugin zespołowy, chat-ops, agenci cykliczni, pętla z produkcji, własny orkiestrator), piramida zaufania.
- **Podsumowanie** — co optymalizować zamiast szybkości pisania.

## Szybki start

Wymagania: **Node 20.19+** (albo 22.12+).

```bash
git clone https://github.com/Pawel-Rugala/techtalk-brave-ai-spec-workflows-2026-10.git
cd techtalk-brave-ai-spec-workflows-2026-10
npm install
```

Wersja angielska: `git clone -b feat/eng-version https://github.com/Pawel-Rugala/techtalk-brave-ai-spec-workflows-2026-10.git` (albo `git switch feat/eng-version` w już sklonowanym repo).

### 1. Pełna talia (ręcznie zrobiona)

```bash
npm run dev         # http://localhost:5173 z hot reload
npm run build       # statyczna wersja w dist/
npm run preview     # podgląd builda (http://localhost:4173)
npm run export:pdf  # build + PDF do export/ (1 strona = 1 slajd)
```

Wszystko (reveal.js, fonty) jest lokalnie, więc internet nie jest potrzebny.

Build trzeba serwować (`npm run preview` albo dowolny serwer statyczny). Otwarcie `dist/index.html` prosto z dysku nie zadziała, bo Chrome blokuje moduły JS z `file://`.

Eksport PDF używa lokalnego Chrome (inna ścieżka: `CHROME_PATH=... npm run export:pdf`). Ręcznie: otwórz `…/index.html?print-pdf` w Chrome → Drukuj → Zapisz jako PDF (marginesy: brak, grafika tła: włączona).

### 2. Fabryka AI i talia demo

Dodatkowe wymagania:
- **[Claude Code](https://docs.claude.com/en/docs/claude-code)** zainstalowany (`claude` w `PATH`) i zalogowany. Fabryka uruchamia prawdziwe sesje agentów, więc **zużywa tokeny z Twojego konta**.
- **Chrome** albo przeglądarka Playwrighta: `npx playwright install chromium`.

```bash
npm run demo
```

Jeden proces uruchamia serwer Vite i API fabryki:

| Adres | Co to jest |
|---|---|
| http://localhost:5180/demo/dashboard/ | dashboard fabryki: start, status, koszty, logi |
| http://localhost:5180/demo/deck/ | talia demo, która wypełnia się na żywo |
| http://localhost:5180/ | pełna talia (backup) |

1. Otwórz dashboard i kliknij **▶ Start fabryki**.
2. Otwórz talię demo w drugiej karcie. Slajdy, które jeszcze się budują, mają placeholder „w produkcji”. Gotowe podmieniają się same, bez przeładowania strony.
3. Na dashboardzie dla każdego slajdu widać spec, model, tokeny, koszt, czas, screenshot z bramki jakości, log aktywności i raport agenta.
4. Wiersz **23** to przykład na żywo: **▶ uruchom** buduje dodatkowy slajd z `demo/specs/live/23-pixel-factory.md`.
5. **Reset** zatrzymuje wszystko i usuwa wygenerowane slajdy.

Szczegóły (endpointy API, zmienne środowiskowe, dokładne reguły bramki) są w [`demo/README.md`](demo/README.md).

## Jak działa fabryka

To jest dokładnie wzorzec z prezentacji: **spec → agent → bramka → człowiek**.

```
 specs/slides/NN.md ──► kolejka ──► agent (claude -p) ──► slides/NN.html ──► bramka (Playwright) ──► talia demo
        ▲                              │      ▲                                   │
   człowiek pisze spec                 └──────┘ verify_slide w pętli          nie przeszło 2× → fallback
                                                                              na ręczny slajd z backupu
```

**Wejście: spec, nie prompt.** Każdy slajd ma plik w `demo/specs/slides/` z sekcjami: Cel · Treść · Układ · Komponenty · Kryteria · Notatki. Do tego frontmatter z regułami do sprawdzenia maszynowo, np. `must_include` (frazy, które muszą być widoczne) i `must_animate`. Wszyscy agenci dostają też wspólny design system: `demo/specs/design-system.md`.

**Pipeline dla każdego speca** (`demo/factory/worker.mjs`, domyślnie 6 równolegle):
1. **HANDOVER** — świeża, bezgłowa sesja Claude Code (`claude -p`, domyślnie Opus 5.5) dostaje spec i ścieżkę wyjściową.
2. **DISCOVER** — agent czyta design system, motyw i ręcznie zrobione slajdy.
3. **IMPLEMENT** — agent pisze `demo/deck/slides/NN.html`.
4. **VERIFY** — agent sam wywołuje narzędzie MCP `verify_slide`, ogląda screenshot i poprawia, aż przejdzie.
5. **REPORT** — agent podsumowuje, co zrobił.

**Nie ufamy agentowi, ufamy bramce.** Po raporcie worker sam jeszcze raz uruchamia bramkę (`demo/factory/verify.mjs`, Playwright). Sprawdza ona między innymi:
- jeden root `<section class="s-NN">` i obecność notatek prelegenta,
- brak `<script>` i zewnętrznych URL-i, CSS ograniczony do `.s-NN`,
- brak błędów w konsoli i HTTP,
- nic nie wystaje poza 1920×1080, żaden tekst nie jest ucięty,
- wszystkie frazy `must_include` są widoczne.

Jeśli bramka odrzuci slajd, agent dostaje jedną rundę poprawek w tej samej sesji. Za drugim razem slajd dostaje status `fallback` i talia pokazuje ręczny slajd z backupu.

**Ograniczone uprawnienia.** Agenci mają tylko `Read`/`Glob`/`Grep` i narzędzie `verify_slide`, a pisać mogą wyłącznie do swojego pliku slajdu. Nie mają shella, internetu ani subagentów. Nie mogą też podejrzeć gotowej odpowiedzi, czyli `index.html` z pełnej talii.

**Obserwowalność.** Każdy run zapisuje zdarzenia, stan i raporty w `demo/runs/<run>/`, a screenshoty w `demo/shots/` (oba katalogi są w `.gitignore`). Dashboard czyta je na żywo przez SSE.

## Prezentowanie

1. Uruchom `npm run dev` (albo `npm run demo` dla wersji z fabryką) i otwórz talię w Chrome.
2. Projektor ustaw jako rozszerzony ekran (nie lustro).
3. `S` otwiera speaker view z notatkami, timerem i następnym slajdem. Zostaw go na laptopie.
4. Okno prezentacji przeciągnij na projektor i naciśnij `F`.

| Klawisz | Akcja |
|---|---|
| `→` / `Space` | następny slajd |
| `←` | poprzedni slajd |
| `S` | speaker view (notatki + timer) |
| `F` | fullscreen |
| `O` / `Esc` | przegląd wszystkich slajdów |
| `B` / `.` | wygaszenie ekranu |

## Struktura repo

```
index.html                 pełna talia: 22 slajdy + notatki prelegenta (<aside class="notes">)
src/main.js                konfiguracja reveal.js (1920×1080, bez fragmentów) i dekoracje w tle
src/theme.css              neobrutalny motyw i komponenty slajdów
src/factory.js|.css        pixel-art AI Factory (obecnie nieużywana w pełnej talii)
src/typewriter.js          efekt pisania kodu (obecnie niepodpięty)
scripts/export-pdf.mjs     eksport PDF (puppeteer-core + lokalny Chrome)
talk.md, talk-v2.md        notatki prelegenta: szkic i wersja finalna

demo/
  specs/design-system.md   design system dla wszystkich agentów
  specs/slides/NN-*.md     jeden spec na slajd (06–22)
  specs/live/23-*.md       przykład na żywo, uruchamiany ręcznie
  deck/                    talia demo: 5 ręcznych slajdów + miejsce na slajd z każdego speca
  deck/slides/NN.html      tu (i tylko tu) piszą agenci
  dashboard/               dashboard obserwowalności
  factory/server.mjs       jeden proces: Vite + API fabryki (SSE)
  factory/worker.mjs       kolejka → claude -p dla każdego speca, fazy, bramka, metryki
  factory/verify.mjs       bramka jakości (Playwright)
  factory/mcp.mjs          serwer MCP z narzędziem verify_slide dla agentów
```

## Zdjęcia

Slajd „Od sierpa do floty kombajnów” (`src/assets/harvest/`), wszystkie z Wikimedia Commons:

- `sickle.jpg` — [Traditional fonio harvest with a sickle, Natitingou](https://commons.wikimedia.org/wiki/File:Traditional_fonio_harvest_with_a_sickle,_Natitingou,_northern_Benin.jpg) · Crop Trust · CC BY-SA 4.0
- `reaper.jpg` — [Drie paarden trekken een maaimachine (zelfbinder)](https://commons.wikimedia.org/wiki/File:Drie_paarden_trekken_een_maaimachine_die_tevens_schoven_bindt_(zelfbinder),_Bestanddeelnr_190-1099.jpg) · Willem van de Poll / Nationaal Archief · CC0
- `combine.jpg` — [Combine in wheat field](https://commons.wikimedia.org/wiki/File:Combine_in_wheat_field.jpg) · Dan Kollmann · CC BY-SA 3.0
- `fleet.jpg` — [Комбайны в Ставропольском крае](https://commons.wikimedia.org/wiki/File:%D0%9A%D0%BE%D0%BC%D0%B1%D0%B0%D0%B9%D0%BD%D1%8B_%D0%B2_%D0%A1%D1%82%D0%B0%D0%B2%D1%80%D0%BE%D0%BF%D0%BE%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%BC_%D0%BA%D1%80%D0%B0%D0%B5.jpg) · Press service of the Presidential Envoy to the North Caucasian Federal District · CC BY 4.0
