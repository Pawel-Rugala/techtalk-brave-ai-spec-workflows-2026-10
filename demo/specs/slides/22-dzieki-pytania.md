---
id: "22"
order: 22
title: "Dzięki! Pytania?"
section: "Q&A"
tag: "none"
must_include:
  - "Dzięki!"
  - "Pytania?"
  - "Paul Rugała"
  - "Cała prezentacja:"
  - "github.com/Pawel-Rugala/techtalk-brave-ai-spec-workflows-2026-10"
  - "LinkedIn · /in/paul-rugala"
---

# 22 · Dzięki! Pytania?

## Cel
Slajd końcowy na Q&A: podziękowanie, nazwisko prelegenta, link do całej prezentacji w repo i kod QR do LinkedIna, żeby widzowie mogli się połączyć.

## Treść
**Brak taga.**

- **Tytuł (h1, wielki):** „Dzięki!⏎**Pytania?**” — „Pytania?” w różowym markerze.
- **Prelegent:** awatar (kwadrat-placeholder) + „Paul Rugała”.
- **Link do repo:** etykieta „Cała prezentacja:” + kod w żółtym boksie: `github.com/Pawel-Rugala/techtalk-brave-ai-spec-workflows-2026-10`
- **Karta QR (prawy górny róg):** obraz `/src/assets/linkedin-qr.svg` (alt: „QR code: linkedin.com/in/paul-rugala”) + podpis „LinkedIn · /in/paul-rugala”.

## Układ
- Układ slajdu tytułowego: sekcja z klasami `title-slide thanks-slide` i `data-state="title"` (to samo tło/układ co slajd otwierający).
- Tytuł po lewej, duży; pod nim prelegent, pod nim link do repo.
- Karta QR absolutnie pozycjonowana w prawym górnym rogu (ok. 380px szerokości), biała karta z grubą ramką i cieniem, podpis pod kodem.
- Elementy wchodzą po kolei (`enter` z `--i`: prelegent 4, link 5, karta QR 6; tytuł z efektem `slam-e`).
- Bez dodatkowych dekoracji (nie dodawaj bloku `.deco`).

## Komponenty
- `section.title-slide.thanks-slide[data-state="title"]`
- `h1.enter.slam-e` z `span.mark.pink`
- `.speaker.enter` > `span.avatar` + nazwisko
- `.repo-link.enter` > `span.repo-label` + `code`
- `.qr-card.card.enter` > `img` + `.qr-caption`
(wszystkie style `.thanks-slide …` już są w theme.css)

## Kryteria akceptacji
- [ ] Mieści się w 1920×1080 bez przewijania i bez ucinania tekstu; pełny URL repo widoczny w jednej linii, nieucięty.
- [ ] Kod QR wczytany z `/src/assets/linkedin-qr.svg` (lokalnie, bez zewnętrznych URL-i), czytelny, nie zniekształcony.
- [ ] Notatki prelegenta (Q&A) w `<aside class="notes">`.

## Notatki prelegenta
**Q&A** — możliwe pytania i krótkie odpowiedzi:
• „Jakie narzędzia?” — Claude Code, Codex, Cursor; do specu: Spec Kit, Kiro, BMAD albo własne komendy. Narzędzie jest wtórne, nawyk pisania specu jest kluczowy.
• „A juniorzy? Jak mają się uczyć?” — Czytając i weryfikując kod agenta, pisząc specy i testy. To otwarty problem — warto o nim rozmawiać w zespole.
• „Ile to kosztuje?” — Tokeny są tanie w porównaniu z godziną developera. Drogie są rework i bugi na produkcji, dlatego mierzymy linię.
• „Czy to nie waterfall?” — Nie, jeśli spec jest mały i iteracyjny. Tyle specu, ile ryzyka.
• „Bezpieczeństwo?” — Agent ma uprawnienia jak junior: brak dostępu do produkcji, sekrety poza repo, merge zawsze robi człowiek.
