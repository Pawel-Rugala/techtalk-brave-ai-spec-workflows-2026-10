---
id: "17"
order: 17
title: "10× więcej kodu = 10× więcej bugów?"
section: "03 · AI Factory"
tag: "green"
must_include:
  - "10× więcej kodu ="
  - "Types · lint · schema"
  - "Contract tests"
  - "AI review vs spec"
  - "Człowiek"
  - "Nie ufamy agentowi."
  - "Ufamy systemowi weryfikacji wokół agenta."
---

# 17 · Piramida zaufania

## Cel
Fabryka skaluje kod — i bugi. Pokazać, że odpowiedzią jest warstwowy system weryfikacji: od tanich, deterministycznych sprawdzeń na dole po człowieka na samej górze. Każda warstwa ma konkretny przykład z PAY-123. Kulminacja: najważniejsze zdanie prezentacji.

## Treść
**Tag:** `03 · AI Factory`

**Nagłówek (h2, ok. 74px):** 10× więcej kodu = **10× więcej bugów?** — druga część w różowym markerze.

**Piramida** — sześć warstw od dołu (najszersza) do góry (najwęższa). Każda warstwa: nazwa po lewej + przykład z PAY-123 (mniejszym, lżejszym tekstem):

| warstwa (od dołu) | przykład | kolor tła | szerokość |
|---|---|---|---|
| Types · lint · schema | amount to liczba, nie string | paper | 1560px |
| Unit tests | amount ≤ remainingAmount | green | 1360px |
| Contract tests | 409 ALREADY_PAID | green | 1160px |
| Integration | 2 równoległe płatności | blue, biały tekst | 960px |
| AI review vs spec | jest PaymentCreated? | pink | 760px |
| Człowiek | czy to ma sens? | yellow | 560px |

**Czarna karta, wyśrodkowana, tekst wyśrodkowany, font nagłówkowy ~48px:**
„Nie ufamy agentowi.⏎**Ufamy systemowi weryfikacji wokół agenta.**” — drugie zdanie żółte.

## Układ
- Sekcja `top`: tag → nagłówek → piramida → karta.
- Piramida wyśrodkowana poziomo; w kodzie HTML warstwy można zapisać od góry do dołu, byle wizualnie najwęższa (Człowiek) była na górze, a najszersza (Types) na dole — zachowaj kolejność wizualną z tabeli.
- Warstwy jako szerokie, grube, obramowane paski (neobrutalizm) o malejącej szerokości, wyśrodkowane.
- Karta ink pod piramidą, wyśrodkowana.

## Komponenty
- `section.top`, `.tag.green`, `h2` z `.mark.pink`
- `.pyramid` > `.layer` (szerokość i tło inline), w każdej warstwie `span.ex` z przykładem
- `.card.ink` z `p` w `var(--font-head)`, akcent `color: var(--yellow)`

## Kryteria akceptacji
- [ ] Mieści się w 1920×1080 bez przewijania i bez ucinania tekstu.
- [ ] Sześć warstw z podanymi nazwami, przykładami i kolorami; człowiek na szczycie.
- [ ] Zdanie „Nie ufamy agentowi. Ufamy systemowi weryfikacji wokół agenta.” w czarnej karcie, druga część żółta.
- [ ] Notatki prelegenta w `<aside class="notes">`.

## Notatki prelegenta
**[20:00–21:30]**
Fabryka skaluje kod — i skaluje bugi. Dlatego obok fabryki kodu potrzebujesz fabryki weryfikacji.
Piramidę budujemy od dołu: najpierw rzeczy deterministyczne i tanie — typy, lint, schematy. Potem testy jednostkowe, kontraktowe i integracyjne. Dopiero na górze AI review względem specu i człowiek.
W każdej warstwie jest przykład z PAY-123 — pokaż dwa, trzy: unit test łapie kwotę większą niż do zapłaty, contract test — 409 dla opłaconej faktury, integracyjny — dwie płatności naraz.
Człowiek jest na samej górze i ma najmniej roboty: sprawdza, czy to ma sens, a nie średniki.
Najważniejsze zdanie prezentacji, powiedz powoli: nie ufamy agentowi. Ufamy systemowi weryfikacji wokół agenta.
