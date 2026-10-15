---
id: "07"
order: 7
title: "Od pisania kodu → do projektowania intencji"
section: "01 · Mindset"
tag: "yellow"
must_include:
  - "projektowania intencji"
  - "STARY MINDSET"
  - "NOWY MINDSET"
  - "Jak to zakodować?"
  - "Jakich reguł nie wolno złamać?"
  - "Jak szybko dostarczyliśmy poprawny system?"
  - "Jednostka pracy:"
  - "specyfikacja"
---

# 07 · Od pisania kodu → do projektowania intencji

## Cel
Zestawić pytania, które developer zadawał sobie „po staremu”, z pytaniami, które zadaje dziś. Wniosek: jednostką pracy przestaje być kod, staje się nią specyfikacja.

## Treść
**Tag:** `01 · Mindset` (żółty wariant)

**Nagłówek (h2, nieco mniejszy, ok. 68 px):** `Od pisania kodu → do` + `projektowania intencji` (to wyróżnione markerem — żółty highlight)

**Tabela „vs” — nagłówek kolumn:**
- lewa: `STARY MINDSET` (przygaszony)
- środek: pusto
- prawa: `NOWY MINDSET`

**Wiersze (lewa → prawa, w środku strzałka `→`):**
1. `Jak to zakodować?` → `Co dokładnie chcemy osiągnąć?`
2. `Jak napisać tę klasę?` → `Jaki powinien być kontrakt?`
3. `Jak zrobić endpoint?` → `Jakich reguł nie wolno złamać?`
4. `Czy kod wygląda dobrze?` → `Czy rozwiązanie spełnia spec?`
5. `Ile kodu napisałem?` → `Jak szybko dostarczyliśmy poprawny system?`

**Puenta pod tabelą (font nagłówkowy, ok. 50 px):**
`Jednostka pracy:` `kod` (przekreślony) `→` `specyfikacja` (marker różowy)

## Układ
- Slajd „top”: tag, nagłówek, tabela vs (~10 px pod nagłówkiem), puenta (~10 px pod tabelą).
- Tabela w trzech kolumnach: stara (lewa), wąska kolumna ze strzałką (środek), nowa (prawa). Lewa kolumna wizualnie słabsza (stary sposób), prawa mocniejsza.
- Każdy wiersz to osobny element (w deku pojawiał się kolejno), ale na slajdzie wszystkie wiersze są widoczne.
- Puenta wyrównana do lewej, duża, w foncie nagłówkowym.

## Komponenty
- `section.top`, `span.tag.yellow`, `h2` z `span.mark`
- `.vs` z wierszami `.vsrow`; w wierszu nagłówkowym `.head` (lewa `.head.muted`), w wierszach treści `.old`, `.to` (strzałka), `.new`
- Puenta: akapit w `var(--font-head)`, `span.strike-line` dla „kod”, `span.mark.pink` dla „specyfikacja”

## Kryteria akceptacji
- [ ] Pięć wierszy w podanej kolejności, każdy ze strzałką `→` między kolumnami.
- [ ] „STARY MINDSET” przygaszony, „NOWY MINDSET” wyraźny.
- [ ] „kod” przekreślony, „specyfikacja” na różowym markerze.
- [ ] Mieści się w 1920×1080, brak overflow.
- [ ] Notatki prelegenta obecne.

## Notatki prelegenta
**[6:15–7:30]**
Przejdź przez wiersze — lewa kolumna to pytania, które zadawaliśmy sobie do tej pory, prawa to pytania, które zadajemy dziś.
Przy „Jakich reguł nie wolno złamać?” daj przykład: płatność nigdy nie może przekroczyć kwoty, która została do zapłaty na fakturze.
Kluczowe zdanie na koniec: „Jednostką pracy przestaje być kod. Staje się nią specyfikacja.”
→ Przejście: „Pokażę to na przykładzie, który będzie nam towarzyszył do końca.”
