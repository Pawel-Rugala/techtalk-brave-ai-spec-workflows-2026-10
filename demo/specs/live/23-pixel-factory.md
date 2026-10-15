---
id: "23"
order: 23
title: "Ta prezentacja z fabryki"
section: "03 · AI Factory"
tag: "green"
must_include:
  - "z fabryki"
  - "HANDOVER"
  - "DISCOVER"
  - "IMPLEMENT"
  - "VERIFY"
  - "REPORT"
  - "MODEL: OPUS 5.5"
  - "Człowiek napisał specy. Fabryka zbudowała slajdy."
must_animate: true
---

# 23 · Ta prezentacja z fabryki (LIVE)

## Cel
Slajd budowany na żywo, ręcznie odpalony przez prelegenta na końcu prezentacji. Pokazuje w pixel-arcie dokładnie ten pipeline, który przed chwilą zbudował resztę slajdów: spec wjeżdża taśmą do fabryki, przechodzi przez pięć stacji-robotów i wypada jako gotowy slajd na stos. Widz ma zrozumieć: to nie jest magia, to linia produkcyjna — a człowiek pisał specy.

## Treść
**Tag:** `03 · AI Factory`

**Nagłówek (h2):** Ta prezentacja **z fabryki** — „z fabryki” w zielonym markerze.

**HUD nad sceną** (pixel font, mały, ~22–26px, jedna linia, ramka jak wyświetlacz):
`MODEL: OPUS 5.5 · 1 SPEC → 1 SLAJD`

**Scena pixel-art** — taśma produkcyjna od lewej do prawej, pięć stacji. Pod każdą stacją etykieta (pixel font, wielkie litery) i jednolinijkowy podpis po polsku (mały tekst):

| stacja | etykieta | podpis | kolor robota |
|---|---|---|---|
| 1 | HANDOVER | spec trafia do sesji | yellow |
| 2 | DISCOVER | czyta design system i repo | blue |
| 3 | IMPLEMENT | pisze slajd | pink |
| 4 | VERIFY | Playwright · 1920×1080 | green |
| 5 | REPORT | tokeny · czas · model | yellow |

- Na początku taśmy karta specyfikacji z napisem `spec.md` (opcjonalnie ikona dokumentu narysowana pikselami — nie emoji).
- Na końcu taśmy stos ukończonych slajdów (3–4 przesunięte prostokąty z grubą ramką), na który spada gotowy slajd.

**Linia zamykająca pod sceną** (font nagłówkowy, ~40px, karta ink, druga część żółta):
„Człowiek napisał specy. Fabryka zbudowała slajdy.”
(możesz rozbić na dwa spany: pierwszy kremowy, drugi — „Fabryka zbudowała slajdy.” — żółty; cały tekst musi wystąpić dosłownie)

## Animacja (sedno slajdu)
Jedna pętla ok. 8–10 s, w nieskończoność (`animation-iteration-count: infinite`):
1. Karta `spec.md` jedzie taśmą od lewej, zatrzymując się krótko pod każdą stacją.
2. Gdy karta stoi pod stacją, robot tej stacji „pracuje”: miga mu ekran/oczy, podskakuje o 1 piksel, albo nad nim pojawia się iskra/dymek. Stacja aktywna dostaje podświetloną etykietę.
3. Na stacji IMPLEMENT karta zmienia wygląd z dokumentu w slajd (inny kolor/ramka) — np. przez dwa nakładające się elementy z przełączaną widocznością.
4. Na stacji VERIFY krótko pojawia się zielony znaczek ✓ (narysowany pikselami lub w pixel foncie).
5. Po REPORT gotowy slajd spada na stos po prawej i pętla zaczyna się od nowa.
- Taśma (pasy/rolki) przesuwa się ciągle — wzór pasków animowany `background-position` lub przesunięciem prostokątów SVG.
- Wszystkie ruchy z `steps(n)` — skokowe, „8-bitowe”, nie płynne.
- Animacja ma działać **zawsze**, także przy `prefers-reduced-motion: reduce` — prezentujemy z laptopa, który ma włączone „Reduce Motion”, a ruch to sedno slajdu. **Nie dodawaj** żadnego bloku `@media (prefers-reduced-motion …)` wyłączającego animację. Sekcja musi mieć atrybut `data-motion="always"` — bez niego motyw (`src/theme.css`) przy reduced motion zatrzymuje wszystkie animacje.

## Układ
- Sekcja `top`: tag → nagłówek → HUD → scena → karta zamykająca.
- Scena na całą szerokość treści (~1660px), wysokość ok. 480–560px. Narysuj ją jako jeden inline `<svg>` z `viewBox` w małej siatce pikseli (np. `0 0 420 140`) skalowany w górę, z `shape-rendering="crispEdges"` — piksele mają być ostre.
- Roboty: sprite 16×16 „pikseli” zbudowany z `<rect>` (głowa z antenką, oczy, korpus w kolorze stacji, czarne obrysy `#111`). Możesz zdefiniować go raz w `<symbol>` i użyć 5× przez `<use>` z różnym `color`/`fill`.
- Etykiety stacji mogą być tekstem HTML pod SVG (pixel font) albo `<text>` w SVG — ważne, żeby były czytelne (min. ~20px po przeskalowaniu) i zawierały dokładne napisy z tabeli.
- Paleta wyłącznie z tokenów motywu: `--ink`, `--paper`/`--cream`, `--yellow`, `--pink`, `--green`, `--blue` (w SVG wolno podać odpowiadające im wartości hex, sprawdź je w `src/theme.css`).

## Komponenty
- `<section class="top s-23" data-motion="always">`, `.tag.green`, `h2` z `.mark.green`
- HUD: element w `var(--font-pixel)` z obramowaniem `var(--border)` (wygląd wyświetlacza)
- Scena: inline `<svg shape-rendering="crispEdges">` + własne klasy z prefiksem `.s-23`
- Karta zamykająca: `.card.ink`, `p` w `var(--font-head)`, akcent `color: var(--yellow)`
- Inspiracja sprite'ami: `src/factory.js` (pixel-art fabryka z wcześniejszej wersji prezentacji) — wolno podejrzeć, jak zbudowane są roboty z `<rect>`, ale NIE importuj tego pliku i nie wymagaj JS.

## Ograniczenia techniczne
- **Bez `<script>`** — slajd jest wstrzykiwany przez `innerHTML`, skrypty się nie wykonają. Tylko HTML + CSS + inline SVG.
- Wszystkie style w jednym `<style>` wewnątrz sekcji; każdy selektor zaczyna się od `.s-23` (żadnych globalnych selektorów, żadnych zmian w theme.css).
- Nazwy `@keyframes` z prefiksem `s23-` (żeby nie kolidowały z innymi slajdami).
- Żadnych zewnętrznych zasobów (obrazów, fontów, URL-i) — prezentacja działa offline.

## Kryteria akceptacji
- [ ] Mieści się w 1920×1080 bez przewijania i bez ucinania tekstu.
- [ ] Pięć stacji w kolejności HANDOVER → DISCOVER → IMPLEMENT → VERIFY → REPORT, każda z robotem i etykietą.
- [ ] Animacja działa w pętli w czystym CSS (`steps()`), karta przejeżdża przez wszystkie stacje i trafia na stos. Pętla działa również przy `prefers-reduced-motion: reduce` (gate renderuje slajd z tym ustawieniem i sprawdza, że animacje w pętli są uruchomione).
- [ ] Piksele ostre (`crispEdges`), font pikselowy w HUD i etykietach.
- [ ] Brak `<script>`, wszystkie selektory z prefiksem `.s-23`, keyframes z prefiksem `s23-`.
- [ ] HUD zawiera „MODEL: OPUS 5.5”, karta zamykająca zawiera „Człowiek napisał specy. Fabryka zbudowała slajdy.”
- [ ] Notatki prelegenta w `<aside class="notes">`.

## Notatki prelegenta
**[LIVE]** Ten slajd nie istniał, kiedy zaczynałem mówić. Odpaliłem go przed chwilą z dashboardu — jeden spec, jedna sesja Claude, Opus 5.5.
Przejdź po stacjach: HANDOVER — spec trafia do sesji; DISCOVER — agent czyta design system i repo; IMPLEMENT — pisze slajd; VERIFY — Playwright renderuje go w 1920×1080 i sprawdza, czy nic nie wystaje; REPORT — tokeny, czas i model lądują na dashboardzie.
Puenta: ja napisałem specy. Fabryka zbudowała slajdy. Dokładnie o tym była ta prezentacja.
