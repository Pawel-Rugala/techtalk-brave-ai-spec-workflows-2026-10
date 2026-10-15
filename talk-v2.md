# Koniec klepania kodu? — notatki prelegenta (v2)

> Tekst do mówienia, nie do czytania z kartki. Pogrubienia = akcent głosem. `[w nawiasach]` = wskazówki sceniczne.

---

## Slajd 1 — Otwarcie i o mnie

Cześć, nazywam się Paweł. Przez ostatni rok **nie napisałem ani jednej linijki kodu**. Cały kod pisali agenci.

AI zmienia to, jak pracujemy. Zmienia też dynamikę zespołów. I o tym dziś porozmawiamy: jak przeprowadzić taką zmianę we własnym zespole.

Kilka słów o mnie. W branży jestem od 2012 roku. Pracowałem w małych firmach produktowych, w software house'ach i w korporacjach zatrudniających około 100 tysięcy osób. Byłem frontendowcem, backendowcem, solution architectem, tech leadem, a nawet EMEA BI Directorem. Niekoniecznie w tej kolejności.

---

## Slajd 2 — Bun w 11 dni

W lipcu tego roku Jarred Sumner, twórca Buna, który dziś pracuje w Anthropic, ogłosił, że przepisał całego Buna na Rusta. **Sam. W 11 dni.**

Wewnętrzny szacunek w Anthropic mówił, że takie zadanie to praca dla trzech senior engineerów na rok.

`[wskaż paski]` Górny pasek to trzy osobolata, czyli około 750 osobodni roboczych. Dolny to 11 osobodni. Prawie go nie widać. To mniej więcej **70 razy szybciej**.

Możemy to zignorować. Możemy szukać dziury w całym. Ale najlepsze zespoły na świecie pokazują, że to, co zajmowało trzy osobolata, dziś jedna osoba robi w 11 dni. A ignorowanie tego wygląda tak: **bawimy się AI, zamiast na serio o nie walczyć.**

---

## Slajd 3 — Analogia: żniwa

Spokojnie, to nie jest kolejna rada z amerykańskiego poradnika o produktywności. Szukałem analogii, dzięki której wszyscy będziemy mówić o tym samym. Padło na **żniwa**.

- **Poziom 1:** każde źdźbło przechodzi przez ręce rolnika. Tak jak kiedyś my pisaliśmy każdą linijkę kodu.
- **Poziom 2:** maszyna robi najcięższą robotę, ale człowiek prowadzi każdy krok. Wydajność rośnie o rząd wielkości. To jest **AI assistant** i tu dziś jest większość zespołów.
- **Poziom 3:** jedna maszyna kosi, młóci i czyści. Człowiek steruje, ale już nie wykonuje. Kolejny rząd wielkości. To jest **AI agent**.
- **Poziom 4:** jeden operator nadzoruje kilka maszyn naraz, a one same jeżdżą po zaplanowanych trasach. To jest **AI factory** i właśnie tam zmierzamy.

Żaden z tych skoków nie polegał na tym, że rolnik szybciej machał kosą. Za każdym razem zmieniał się **sposób pracy** i za każdym razem trzeba było się czegoś nauczyć. Kosą zetnie każdy, ale flotą kombajnów trzeba umieć zarządzać. Z AI jest tak samo: **asystenta używa każdy, fabrykę trzeba zaprojektować.**

I jeszcze jedno: rolnicy, którzy się dostosowali, nie stracili pracy. Człowiek dalej jest tam potrzebny, tylko robi coś innego. Chyba jedyny zawód, który zniknął kompletnie, to operator windy.

---

## Slajd 4 — Gdzie idzie nasz wysiłek

To gdzie dziś idzie cały nasz wysiłek?

Każdy pasek to cała praca zespołu nad jednym featurem. Proporcje są poglądowe. Chodzi o kierunek, nie o procenty.

**Przed AI** największym kawałkiem było kodowanie. Tam szedł czas i tam się pociliśmy.

**W erze AI** wszystko rozbija się o to, **co** chcemy zbudować: jakie są wymagania, co ma się dziać, a czego nie wolno. Pisanie kodu jest tanie i robi je agent. Druga duża część pracy to **weryfikacja**: czy agent zbudował dokładnie to, czego oczekiwaliśmy.

---

## Slajd 5 — AI nie zwalnia z myślenia

Pisanie kodu jest tanie i szybkie. Ale złe wymagania i złe decyzje wcale nie stały się tańsze. AI potrafi wygenerować **dziesięć razy więcej beznadziejnego kodu**, i to bardzo szybko.

AI nie zwolniło nas z myślenia. Człowiek nadal jest u steru, tylko stoi w innym miejscu.

---

## Slajd 6 — Promptowanie to nie workflow

Wiele zespołów wciąż używa AI na zasadzie rozmowy: „wdróż specification pattern”, „a teraz zrób to”, „a teraz popraw tamto”.

W takim układzie człowiek jest **operatorem agenta**, a jedyny zysk to szybsze pisanie.

Zamiast tego warto zdefiniować **workflow**, w którym agent sam implementuje, testuje i poprawia w pętli, a człowiek wchodzi tylko tam, gdzie naprawdę jest potrzebny.

---

## Slajd 7 — Nowa jednostka pracy

Developer nie musi już łamać sobie głowy, jak coś zakodować i czy kod spełnia wszystkie zasady SOLID.

Powinien się skupić na tym, **co** chce osiągnąć i **jakie reguły** muszą być spełnione.

Jednostką pracy przestaje być kod. **Staje się nią specyfikacja.**

---

## Slajd 8 — Przykład: endpoint płatności

Porozmawiajmy o spec-driven development. Przez chwilę będzie nam towarzyszył jeden przykład.

To zmyślony, ale typowy ticket: „Dodaj endpoint do wykonywania płatności”.

Agent go zaimplementował i wystawił PR-a. I co teraz?

Jest dobrze czy źle? Kto to oceni? Musisz zagłębić się w kod i zrobić pełne code review, żeby sprawdzić, czy to, co zrobił agent, w ogóle działa.

**To nie jest wina agenta. Problemem jest to, co dostał na wejściu.**

---

## Slajd 9 — Czym jest spec

Spec to **nie** 40-stronicowy dokument w Wordzie. To krótki plik markdown w repo, obok kodu, który przechodzi review tak samo jak kod.

Musi być na tyle konkretny, żeby inny developer albo agent mógł go zrealizować **bez zadawania dwudziestu pytań**.

`[wskaż prawą stronę]` Po prawej przykład wygenerowany przez agenta. Nie twierdzę, że jest idealny, ale i tak jest dużo bardziej konkretny niż „dodaj nowy endpoint”.

---

## Slajd 10 — Mniej zgadywania

Po lewej to, co dziś zwykle wrzucamy agentowi: „Add payment endpoint”. Resztę agent musi zgadnąć.

Po prawej ten sam ticket, ale bez niedomówień. Każdy wiersz zamyka jedną konkretną lukę:

- **Preconditions** (status OPEN) → nie zapłacimy faktury, która jest już opłacona.
- **Idempotency** (clientRequestId) → nie będzie podwójnej płatności.
- **Concurrency** (optimistic lock) → równoległe płatności się nie nadpiszą.
- **Side effects** (PaymentCreated) → event na pewno zostanie wysłany.
- **Failure modes** → wiemy, co ma się stać, gdy coś się wywali.

`[żółta karta]` AI nie potrzebuje bardziej kreatywnych promptów. **Potrzebuje mniej zgadywania.** Każda luka w specu to miejsce, w którym agent zgaduje. I robi to z pełną pewnością siebie.

---

## Slajd 11 — Jeden spec, wiele zastosowań

To jest ciekawsze niż „piszmy lepsze prompty”. Jeden plik `spec.md` jest źródłem dla wszystkiego dookoła: implementacji, code review, testów, QA i dokumentacji. Product, developer, AI, testy i QA patrzą na ten sam plik.

`[stempel w rogu]` To **nie** jest „więcej dokumentacji”. Kiedyś dokumentacja była efektem ubocznym, którego nikt nie czytał. Dziś spec jest **wejściem do maszyny, która produkuje software**. Jak źle go napiszesz, maszyna wyprodukuje coś złego.

Ja osobiście myślę o specach jak o migracjach bazy danych albo o historii w gicie: to zapis tego, **jak i dlaczego** system doszedł do obecnego stanu.

---

## Slajd 12 — Spec-driven development w pigułce

Cały spec-driven development da się pokazać bardzo prosto.

Na początku jest **intencja**. Człowiek razem z AI zamienia ją w **specyfikację**. Kiedy spec jest gotowy, człowiek go **zatwierdza**. To uruchamia agenta, który w pętli implementuje, testuje, sprawdza, poprawia i na końcu wystawia pull request. **O merge'u decyduje człowiek.**

---

## Slajd 13 — Najczęstsze zarzuty

Trzy zarzuty, które słyszę najczęściej:

**„To waterfall od nowa”.** Tak, jeśli przez tydzień piszesz spec, zanim ktokolwiek zobaczy działający kod. Ale agenci piszą kod dziesięć razy szybciej albo jeszcze szybciej, więc mocki, prototypy i PoC są dziś bardzo tanie. Odpowiedź jest prosta: **małe specy, często, i często wdrażaj kod.**

**„Spec rozjedzie się z kodem”.** Tak, jeśli żyje poza PR-em. Spec zmieniamy w tym samym PR co kod, a review sprawdza jedno i drugie.

**„Spec na wszystko?”** Nie. Literówka w labelu nie potrzebuje specu. Płatności tak. Spec piszemy tam, gdzie są reguły biznesowe albo ryzyko.

---

## Slajd 14 — Trzy poziomy pracy z AI

Wróćmy do poziomów, tym razem w języku narzędzi.

**Poziom 1, asystent:** ChatGPT, Claude, Copilot w IDE. Ty prowadzisz cały proces, AI podpowiada.

**Poziom 2, agent:** dajesz mu całe zadanie. Sam czyta repo, zmienia kod, puszcza testy, poprawia błędy i otwiera PR. Tu jest dziś większość zespołów, które na serio używają AI.

**Poziom 3, fabryka:** ticket przechodzi przez wyspecjalizowanych agentów: od specu, przez architekta, backend i frontend równolegle, testy i review, aż po zatwierdzenie przez człowieka na końcu. Developer nie pisze już kodu. **Projektuje system, który ten kod dostarcza.**

To porozmawiajmy o fabrykach AI.

---

## Slajd 15 — Co się zmienia przy skali

Kiedy przechodzimy na fabrykę, zmieniają się cztery rzeczy.

**01. Wąskim gardłem jest człowiek.** Agenci produkują więcej PR-ów, niż zespół jest w stanie przeczytać. Limitem są spec i review, nie kod. Dlatego bramek ma być niewiele, ale mają być mocne.

**02. Separacja ról.** Agent, który sam pisze kod i sam go reviewuje, zawsze powie „looks good”. Reviewer to osobny agent, z osobnym kontekstem, który sprawdza kod względem specu, a nie własnych założeń.

**03. Fabryka to też kod.** Prompty, skille, CLAUDE.md, checklisty: wszystko w repo, wersjonowane, z review. Kiedy agent trzeci raz popełnia ten sam błąd, nie poprawiasz PR-a. **Poprawiasz fabrykę.**

**04. Mierzysz linię produkcyjną.** Ile PR-ów przechodzi bez poprawek, ile jest reworku, ile bugów trafia na produkcję, ile trwa droga od ticketu do merge'a i ile kosztuje feature. Jeśli tego nie wiesz, to nie wiesz, czy twoja fabryka działa.

`[TODO: 1–2 krótkie historie z innych projektów. Najlepiej konkretna liczba albo wpadka, która ilustruje któryś z punktów.]`

---

## Slajd 16 — Najprostsza fabryka: GitHub + Actions

Jak to wygląda w praktyce? Oto najprostsza fabryka, którą możecie postawić jutro: GitHub jako źródło prawdy i GitHub Actions, które reagują na zdarzenia.

`[przejdź po górnym pasku]`
1. **Issue to spec.** PO i developer dopracowują go w issue.
2. **Label `spec-ready` to bramka.** Człowiek mówi „spec gotowy”, a Action odpala agenta-implementera, który pisze kod z testami i otwiera PR.
3. **Otwarcie PR-a** to kolejne zdarzenie. Startuje agent-reviewer i sprawdza kod względem specu z issue.
4. **Label `ready-for-qa`.** Agent QA puszcza testy e2e, robi screenshoty i wrzuca raport.
5. **Merge zawsze robi człowiek.**

Nie ma tu żadnej magii: zdarzenia, labele i joby, które wszyscy znacie.

Inne warianty:
- **Plugin zespołowy:** developer sam wywołuje `/implement`. To najbezpieczniejszy pierwszy krok.
- **Chat-ops:** PO pisze na Slacku, agent zakłada issue, a emoji oznacza akceptację.
- **Agenci cykliczni:** cron do prac utrzymaniowych, takich jak zależności, flaky testy czy nocne QA.
- **Pętla z produkcji:** alert z Sentry tworzy issue i PR z poprawką.
- **Własny orkiestrator:** agenci biorą zadania z kolejki.

Granicą jest wyobraźnia, ale wzorzec jest zawsze ten sam: **zdarzenie → agent → bramka.**

---

## Slajd 17 — Fabryka weryfikacji

Fabryka skaluje kod, ale skaluje też bugi. Dlatego obok fabryki kodu potrzebujecie **fabryki weryfikacji**.

Piramidę budujemy od dołu. Najpierw rzeczy deterministyczne i tanie: typy, linter, schematy. Wyżej testy jednostkowe, kontraktowe i integracyjne. Dopiero na samej górze AI review względem specu i człowiek.

Rola człowieka się zmienia: nie sprawdza każdej linijki, tylko to, **czy te zabezpieczenia mają sens**.

**Nie ufamy agentowi. Ufamy systemowi weryfikacji wokół agenta.**

Pokażę wam to na demo na koniec.

---

## Slajd 18 — Inwestuj w to, co trwałe

Agent jest wymienny. Dziś implementuje Claude, jutro Codex, pojutrze coś, czego jeszcze nie ma.

Trwałe jest coś innego: spec, decyzje architektoniczne, testy, ograniczenia i kryteria akceptacji. Zostają niezależnie od modelu. **To jest prawdziwy kapitał zespołu.** Inwestujcie w to, co trwałe.

---

## Slajd 19 — Podsumowanie

AI zwiększa tempo → spec kończy zgadywanie → agenci przejmują wykonanie → weryfikacja daje zaufanie.

Wniosek: **nie optymalizujcie szybkości pisania kodu.** To już nie jest wąskie gardło.

---

## Slajd 20 — Cztery rzeczy, które mają wartość

**Intencja:** co budujemy i po co? To różnica między „add payment endpoint” a specem PAY-123.

**Ograniczenia:** czego nie wolno złamać? Kwota nie większa niż kwota do zapłaty, idempotencja, jedna płatność naraz.

**Pętle feedbacku:** jak szybko agent dowie się, że się myli? Test, który pada po minucie, jest wart więcej niż komentarz w review po dwóch dniach.

**Weryfikacja:** skąd wiemy, że to działa? Od typów, przez testy, po AI review względem specu i człowieka na końcu.

Pisanie kodu jest dziś prawie darmowe. **Te cztery rzeczy nie są.** I tu jest wasza wartość.

---

## Slajd 21 — Moim zdaniem

`[pauza]`

„Przyszłość software developmentu to nie AI piszące kod. To ludzie projektujący systemy, które niezawodnie produkują software.”

---

## Slajd 22 — Demo: fabryka na żywo

A teraz dowód, że to naprawdę działa. Na początku prezentacji uruchomiłem swoją fabrykę AI.

Przez cały ten czas fabryka dostawała specyfikacje, a agenci budowali kolejne slajdy na żywo. Oczywiście miałem backup na wypadek wpadki. Zbudowałem też mały dashboard, żebyście wszyscy widzieli, co się dzieje.

I na koniec, żeby nie było, że kłamię: **zrobimy jeden slajd razem.**
