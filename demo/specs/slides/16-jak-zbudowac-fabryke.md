---
id: "16"
order: 16
title: "Jak zbudować fabrykę? Przykłady"
section: "03 · AI Factory"
tag: "green"
must_include:
  - "Jak zbudować fabrykę?"
  - "GitHub = źródło prawdy"
  - "Issue = spec"
  - "label: spec-ready"
  - "Plugin zespołowy"
  - "Pętla z produkcji"
  - "zdarzenie → agent → bramka"
---

# 16 · Jak zbudować fabrykę? Przykłady

## Cel
Uziemić ideę fabryki: najprostszą wersję można postawić jutro na GitHubie i GitHub Actions. Górny pasek pokazuje jeden kompletny przepływ zdarzenie → agent → bramka, dolna siatka — sześć innych wariantów tego samego wzorca.

## Treść
**Tag:** `03 · AI Factory`

**Nagłówek (h2, nieco mniejszy niż standard, ok. 76px):** Jak zbudować fabrykę? **Przykłady** — „Przykłady” w zielonym markerze.

**Pasek przepływu GitHub** — etykieta nad paskiem: „GitHub = źródło prawdy · Actions reagują na zdarzenia”. Pięć kroków połączonych strzałkami `→`. Każdy krok ma trzy linie: zdarzenie (mono, małe), tytuł (pogrubiony), opis (mały):

| zdarzenie | tytuł | opis | rodzaj |
|---|---|---|---|
| `issue` | Issue = spec | PO + dev dopracowują | spec |
| `label: spec-ready` | 🤖 Implementer | kod + testy → PR | agent |
| `pull_request: opened` | 🤖 Reviewer | review vs spec z issue | agent |
| `label: ready-for-qa` | 🤖 QA agent | e2e, screenshoty, raport | agent |
| `review: approved` | ✋ Merge | człowiek decyduje | człowiek |

**Siatka 6 kart** (tytuł h3, linia kodu, jedno zdanie):

1. **Plugin zespołowy** · `/implement PAY-123` · „Dev wywołuje, konwencje wspólne dla zespołu. Najbezpieczniejszy start.”
2. **Chat-ops (Slack)** · `PO pisze → issue → 👍` · „PO i QA w pętli bez wchodzenia do GitHuba. Emoji = akceptacja.”
3. **Agenci cykliczni** · `cron · co noc` · „Zależności, flaky testy, drift dokumentacji, nocne QA.”
4. **Pętla z produkcji** · `Sentry alert → issue → PR` · „Agent reaguje na sygnał z produkcji, nie tylko na ticket.”
5. **Własny orkiestrator** · `kolejka → agenci` · „Agenci łączą się, nasłuchują i biorą zadania z kolejki.”
6. **…i dalej?** · `zdarzenie → agent → bramka` · „Limit to wyobraźnia. Wzorzec jest zawsze ten sam.” — ta karta czarna (ink).

## Układ
- Sekcja `top`: tag → nagłówek → pasek GitHub (pełna szerokość) → siatka kart (pełna szerokość) pod spodem.
- Pasek: pięć kroków w jednym rzędzie o równej szerokości, strzałki między nimi. Krok „spec” wyróżniony żółto, kroki agentów niebiesko/neutralnie, krok człowieka zielono (spójnie z kolorystyką ról w prezentacji: spec = żółty, człowiek = zielony).
- Siatka: 3 kolumny × 2 rzędy, karty kompaktowe (mała typografia, ok. 22–26px tekstu), ostatnia karta `ink`.
- Całość gęsta — pilnować, żeby zmieściła się w 1080px wysokości.

## Komponenty
- `section.top`, `.tag.green`, `h2` z `.mark.green`
- `.gh` > `span.label` + `.gh-flow` > `.gh-step.spec | .gh-step.agent | .gh-step.human` (wewnątrz `span.ev`, `b`, `small`) przeplatane `i.gh-arr`
- `.models` z sześcioma `.card` (ostatnia `.card.ink`), w karcie `h3`, `code`, `p`

## Kryteria akceptacji
- [ ] Mieści się w 1920×1080 bez przewijania i bez ucinania tekstu (szczególnie dolny rząd kart).
- [ ] Pięć kroków przepływu w podanej kolejności, ze strzałkami między nimi.
- [ ] Sześć kart w siatce 3×2, ostatnia czarna.
- [ ] Teksty zdarzeń w foncie monospace.
- [ ] Notatki prelegenta w `<aside class="notes">`.

## Notatki prelegenta
**[18:00–20:00]** Jak to wygląda w praktyce? Najprostsza fabryka, którą można postawić jutro: GitHub jako źródło prawdy, a GitHub Actions reagują na zdarzenia.
Przejdź po górnym pasku: issue to spec — PO i dev dopracowują go w issue. Label spec-ready to bramka: człowiek mówi „spec gotowy” i Action odpala implementera, który pisze kod z testami i otwiera PR. Otwarcie PR to kolejne zdarzenie — startuje reviewer i sprawdza kod względem specu z issue. Label ready-for-qa — agent QA puszcza testy e2e, robi screenshoty i wrzuca raport. Merge zawsze robi człowiek.
Nie ma tu żadnej magii: zdarzenia, labele i joby, które wszyscy znacie.
Dolne karty, krótko, po jednym zdaniu: • Plugin zespołowy — dev sam wywołuje /implement; najbezpieczniejszy pierwszy krok. • Chat-ops — PO pisze w Slacku, agent zakłada issue, emoji to akceptacja. • Agenci cykliczni — cron do utrzymania: zależności, flaky testy, nocne QA. • Pętla z produkcji — alert z Sentry tworzy issue i PR z poprawką. • Własny orkiestrator — agenci biorą zadania z kolejki.
Ostatnia karta: granica to wyobraźnia, ale wzorzec jest zawsze ten sam — zdarzenie, agent, bramka.
