Slide 1:

Cześć. Nazywam sie Paweł, i przez ostatni rok nie pisalem zadnego kodu. Wszystko robili agenci.

AI zmienia jak pracujemy. AI zmienia dynamike zespolu.
I o tym bedzie dzisiejsza prezentacje. Jak my mozemy taka transformacje zrobic w swoich zespolach.

O mnie:

Od 2012 roku na rynku, w roznych firmach od malych produktowych, software housy po duze korporacje majacych ok 100k ludzi na pokladzie, przez rozne role od frontu, backendu, solution architect, tech lead po nawet EMEA BI Director... oczywiscie nie koniecznie w tej kolejnosci.

Slide 2:

„W lipicu tego roku, Jarred Sumner, twórca Bun — dziś pracuje w Anthropic — ogłosił, że przepisał cały Bun na Rusta. Sam. W 11 dni.”

„Wewnętrzny szacunek w Anthropic: zespół trzech senior engineerów, jeden rok.” Pokaż paski: górny to trzy osobolata, czyli ok. 750 os/dni roboczych, dolny — 11 os/dni. Ten dolny prawie nie istnieje: to ok. 70× szybciej.

„Możemy to ignorować, możemy szukać dziury w całym. Ale najlepsze zespoły na świecie mówią: to, co zajmowało trzy osobolata, dziś zajmuje jednej osobie 11 dni. Ignorowanie wygląda tak: bawimy się AI, zamiast o to walczyć.”

Slide 3:

Spokojnie ten slajd to nie kolejna rada z amerykanskiego poradnika o produktywnosci.

Szukalem tutaj naprawde jakies analogi bysmy wszyscy byli na tej samej stronie.

zniwa.

Level 1: Każde źdźbło przechodzi przez ręce rolnika. Tak jak my kiedys pisalismy kazda linijke kodu
Level 2: Maszyna robi najcięższą część, ale człowiek prowadzi każdy krok. Produktywnosc o rzad wielkości więcej. To jest AI assistant — i tu jest dziś większość zespołów.
Level 3: jedna maszyna kosi, młóci i czyści. Człowiek steruje, nie wykonuje. Kolejny rząd wielkości. To AI agent.
Level 4: jeden operator nadzoruje kilka maszyn naraz, które same jadą po zaplanowanych ścieżkach. To jest AI factory — i tam zmierzamy.

żaden z tych skoków nie polegał na tym, że rolnik szybciej machał kosą. Za każdym razem zmieniał się sposób pracy — i trzeba bylo sie czegos nauczyć. Kosą zetnie każdy, flotą kombajnów trzeba umieć zarządzać. Z AI jest tak samo: assistanta używa każdy, fabrykę trzeba zaprojektować.

Co wiecej, rolnicy ktorzy sie dostosowali nie stracili pracy, ta osoba dalej jest tam potrzebna. Chyba jedna praca ktora znikla kompletnie to operator wind

Slide 4:

Ok to gdzie idzie caly nasz wysilek teraz

Każdy pasek to cały wysiłek zespołu przy jednym feature. Proporcje są ilustracyjne — chodzi o kierunek, nie o procenty.

Przed AI: największy kawałek to kodowanie. Tam szedł czas i tam sie pocislismy.

W dobie AI: Wszystko rozbija sie co chcemy zbudowac, jakie sa wymagania, co powinno sie dziac a co nie. Pisanie kodu jest tanie, i robi to agent wiec druga czesc to jak weryfikujemy czy agent wdrozyl to czego oczekiwalismy

Slide 5:

Pisanie kodu jest tanie i szybkie ale zle wymagania, , zle decyzje nie sa latwiejsze. AI jest w stanie wygenerowac 10x wiecej beznajdziejnego kodu.

Chodzi mi o to ze AI nie zwolnilo nas z myslenia. Nadal czlowiek jest u steru tylko w innym miejscu

Slide 6:

Nadal wiele zespolow korzysta z AI "promptujac" rozmawiajac z AI typu. Wdroz specification pattern, a teraz zrob to i tamto.

Zamiast definiowac workflow, agent sam wdraza, testuje, naprawia w petli

Czlowiek nie jest operatorem agenta i jedynie co dostaje to szybsze pisanie.

Slide 7:

Developer nie mus sie juz zmuzdzac jak co zakodowac, czy spenia wszystkie zasady SOLID itd.

Developer powinien sie skupiac na tym co chce osiagnac, jakie reguly musza byc spenione. Jednostka pracy nie jest KOD -> staje sie nia specyfikacja

Slide 8:

Bedziemy mowic o spec-driven development i na szybko przyklad ktory bedzie nam przez chwile towarzyczyc.

Moj zmyslony przyklad. Typowy ticket, dodaj endpoint to wykonywania platnosci

Agent wdrozyl. Wystawil PRke no i co...
jest to dobrze zrobione? zle? Kto jest to wstanie stwierdzic. Musisz teraz zaglebic sie w kod i przeprowadzic caly kod review czy to co agent zrobil dziala czy nie dziala.

To nie jest wina agenta. To jest problem co dostal na wejscu

Slide 9:

spec to NIE 40-stronicowy dokument w Wordzie. To krótki markdown w repo, obok kodu, z review jak kod.

Jest wystarczajacy konkretny ze inny developer albo agent zrobi to bez zadawania 20 pytań.

Po prawej agent wygenerowal przyklad (nie mowie ze jest najlepszy) ale chocby nawet jest bardziej konkretny niz dodaj nowy endpoint

Slide 10:

Lewa strona: to, co dziś zwykle wrzucamy agentowi — „Add payment endpoint.” I agent zgaduje resztę.

Prawa strona: to samo, ale bez niedomówień. Każdy wiersz zamyka jeden stempel z przykładu:

• Preconditions (status OPEN) → opłacona faktura.
• Idempotency (clientRequestId) → podwójna płatność.
• Concurrency (optimistic lock) → równoległe płatności.
• Side effects (PaymentCreated) → brak eventu.
• Failure modes → co gdy się wywali.

Puenta z żółtej karty: AI nie potrzebuje bardziej kreatywnych promptów. Potrzebuje mniej zgadywania. Każda luka w specu to miejsce, w którym agent zgaduje — i zgaduje pewnie siebie.

Slide 11:

To jest ciekawsze niż „piszmy lepsze prompty”. Jeden spec.md jest źródłem dla wszystkiego wokół: implementacji, code review, testów, QA i dokumentacji. Product, developer, AI, testy i QA patrzą na ten sam plik.

Stempel w rogu: to NIE jest „więcej dokumentacji”. Wcześniej dokumentacja była efektem ubocznym, którego nikt nie czytał. Teraz spec jest inputem do maszyny, która produkuje software — jak źle go napiszesz, maszyna wyprodukuje źle.

Dla mnie personalnie specs sa jak migracje do bazy danych. Albo git history log

Slide 12:

Caly Spec driven development mozemy przedstawic w bardzo prosty sposob.

Jest jakas intencja, czlowiek z AI tworzy specyfikacje. Jak specyfikacja jest juz ok czlowiek zatwierdza. To triggeruje agenta ktore w petli wdraza, testuje, sprawdza, naprawia i wystawia pull request. Czlowiek decyduje czy merguje

Slide 13:

Najczestsze zarzuty jakie slysze jesli chodzi o spec-driven devepment:

„to waterfall od nowa”. Tak — jeśli przez tydzień piszesz spec, zanim ktoś zobaczy działający kod.
Ponownie agenci pisza kod 10x lub wiecej szybciej, latwiej jest wdrazac mocki, prototypu, PoC itp bo again pisanie kodu jest tanie i szybkie. Czesciej spec i czesciej wdrazaj kod

Spec drift: „spec się rozjedzie z kodem”. Tak — jeśli żyje poza PR-em. Spec zmieniamy w tym samym PR co kod, a review sprawdza oba.

Spec na wszystko: literówka w labelu nie potrzebuje specu. Płatności — tak. Spec tam, gdzie są reguły biznesowe albo ryzyko.

Slide 14:

LVL 1, asystent: ChatGPT, Claude, Copilot w IDE. Ty prowadzisz cały proces, AI podpowiada.

LVL 2, agent: dajesz mu całe zadanie. Sam czyta repo, zmienia kod, puszcza testy, poprawia błędy i otwiera PR. Tu jest dziś większość zespołów, które na serio używają AI.

LVL 3, fabryka: ticket przechodzi przez wyspecjalizowanych agentów — spec, architekt, backend i frontend równolegle, testy, review — a na końcu człowiek zatwierdza. Developer nie pisze już kodu, tylko projektuje system, który go dostarcza.

Pomowmy teraz o AI Factories

Slide 15:

wąskim gardłem jest człowiek. => ...

separacja ról => ...

fabryka to też kod. => ...

mierzysz linię produkcyjną =>

Opowiem tutaj o przykladach z innych projektow ....

Slide 16:

Jak to wygląda w praktyce? Najprostsza fabryka, którą można postawić jutro: GitHub jako źródło prawdy, a GitHub Actions reagują na zdarzenia.

Przejdź po górnym pasku: issue to spec — PO i dev dopracowują go w issue. Label spec-ready to bramka: człowiek mówi „spec gotowy” i Action odpala implementera, który pisze kod z testami i otwiera PR. Otwarcie PR to kolejne zdarzenie — startuje reviewer i sprawdza kod względem specu z issue. Label ready-for-qa — agent QA puszcza testy e2e, robi screenshoty i wrzuca raport. Merge zawsze robi człowiek.

Nie ma tu żadnej magii: zdarzenia, labele i joby, które wszyscy znacie.

Inne przyklady:
• Plugin zespołowy — dev sam wywołuje /implement; najbezpieczniejszy pierwszy krok.
• Chat-ops — PO pisze w Slacku, agent zakłada issue, emoji to akceptacja.
• Agenci cykliczni — cron do utrzymania: zależności, flaky testy, nocne QA.
• Pętla z produkcji — alert z Sentry tworzy issue i PR z poprawką.
• Własny orkiestrator — agenci biorą zadania z kolejki.

granica to wyobraźnia, ale wzorzec jest zawsze ten sam — zdarzenie, agent, bramka.

Slide 17:

Fabryka skaluje kod — i skaluje bugi. Dlatego obok fabryki kodu potrzebujesz fabryki weryfikacji.

Piramidę budujemy od dołu: najpierw rzeczy deterministyczne i tanie — typy, lint, schematy. Potem testy jednostkowe, kontraktowe i integracyjne. Dopiero na górze AI review względem specu i człowiek.

pokaze to wam na moim demo na koniec..

Czlowiek sprawdza tylko czy te zbudowane weryfikacje maja sens

nie ufamy agentowi. Ufamy systemowi weryfikacji wokół agenta.

Slide 18:

Agent jest wymienny: dziś implementuje Claude, jutro Codex, pojutrze coś, czego jeszcze nie ma.

Spec jest trwały: spec, decyzje architektoniczne, testy, ograniczenia i kryteria akceptacji zostają, niezależnie od modelu. To jest prawdziwe clue zespolu. Inwestuj w to, co trwałe

Slide 19:

AI zwiększa tempo → spec kończy zgadywanie → agenci przejmują wykonanie → weryfikacja daje nam zaufanie.

Wniosek: nie optymalizuj szybkości pisania. To już nie jest wąskie gardło.

Slide 20:

Intencja — co i po co budujemy? Różnica między „add payment endpoint” a specem PAY-123.

Ograniczenia — czego nie wolno złamać? Kwota nie większa niż do zapłaty, idempotencja, jedna płatność naraz.

Pętle feedbacku — jak szybko agent wie, że się myli? Test, który pada po minucie, jest wart więcej niż komentarz w review po dwóch dniach.

Weryfikacja — skąd wiemy, że działa? Od typów, przez testy, po AI review względem specu i człowieka na końcu.

Puenta: pisanie kodu jest już prawie darmowe. Te cztery rzeczy — nie. Tu jest wasza wartość.

Slide 21:

Moim zdaniem...

„Przyszłość software developmentu to nie AI piszące kod. To ludzie projektujący systemy, które niezawodnie produkują software.”

Slide 22:

Ok i teraz by pokazac ze to mozliwe, na poczatku prezentacji uruchomilem swoja fabryke AI.

Moja fabryka ai dostawala specyfikacje i agent budowal nastepne slajdy w locie. Oczywiscie mialem backup przygotowany w razie wpadki. Zbudowalem maly dashboard by kazdy widzial. i na koniec by nie bylo ze klamie, zrobimy jeden slajd wspolnie.
