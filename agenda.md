Propozycja struktury prezentacji

1. „Koniec klepania kodu?”
   Pierwszy slajd praktycznie pusty.
   Duży tekst:
   Czy za 2–3 lata nadal będziemy płacić senior developerom za pisanie kodu?

Potem możesz powiedzieć:
„Nie twierdzę, że kod zniknie. Twierdzę, że ręczne pisanie większości kodu przestaje być najbardziej wartościową częścią naszej pracy.”
To ustawia dyskusję. 2. Software development zmienił bottleneck
Slajd:
Before AI

Idea
↓
Design
↓
████████████████ Coding
↓
Review
↓
QA

versus
With AI

████ Specification
████ Architecture
Implementation
████ Verification
████ QA

Point:
AI dramatically reduced the cost of implementation.
Ale nie zmniejszył kosztu:

- złych wymagań,
- złej architektury,
- złych decyzji,
- źle zdefiniowanych edge case'ów,
- braku testów.
  Wręcz przeciwnie — AI pozwala produkować błędny kod szybciej niż kiedykolwiek wcześniej.
  Sekcja 1 — Mindset

1. „AI nie jest autocomplete”
   To moim zdaniem ważny slajd.
   Wiele zespołów nadal używa AI jak:
   Developer
   ↓
   "write this function"
   ↓
   AI
   ↓
   code

To jest po prostu:
faster typing

A prawdziwa zmiana zaczyna się tutaj:
Developer
↓
defines intent
↓
AI agent
↓
plans
implements
tests
reviews
fixes

Developer przestaje być operatorem klawiatury.
Zaczyna być bardziej:

- architect,
- product engineer,
- reviewer,
- constraint designer,
- system orchestrator.

1. „From writing code to designing intent”
   Dobry kontrast na slajdzie:
   Stary mindset Nowy mindset
   Jak to zakodować? Co dokładnie chcemy osiągnąć?
   Jak napisać tę klasę? Jaki powinien być kontrakt?
   Jak zrobić endpoint? Jakie invariants musi spełniać?
   Czy kod wygląda dobrze? Czy rozwiązanie spełnia spec?
   Ile kodu napisałem? Jak szybko dostarczyliśmy poprawny system?

Kluczowe zdanie:
The unit of work is moving from code to specification.

Sekcja 2 — Spec-driven development
Tutaj jest serce prezentacji. 5. Co to właściwie jest „spec”?
Od razu zaznaczyłbym:
Spec ≠ 40-stronicowy dokument Word.

Spec powinien być wystarczająco konkretny, żeby inny developer albo agent mógł zaimplementować feature bez zadawania 20 pytań.
Może zawierać:

# Create Payment

## Goal

User can create a payment for an existing invoice.

## API

POST /payments

Request:
...

Response:
...

## Business rules

- invoice must exist
- invoice cannot already be paid
- amount must equal outstanding balance
- operation must be idempotent

## Events

PaymentCreated
PaymentFailed

## Error cases

404 INVOICE_NOT_FOUND
409 PAYMENT_ALREADY_EXISTS

## Acceptance criteria

...

To będzie bardzo czytelne dla publiczności. 6. „Spec is a contract”
Tu możesz pokazać, że spec jest kontraktem pomiędzy:
Product
↕
Developer
↕
AI
↕
Tests
↕
QA

I bardzo ważna idea:
Ten sam spec powinien być źródłem dla:

- implementacji,
- code review,
- testów,
- QA,
- dokumentacji.
  To jest dużo ciekawsze niż „piszmy lepsze prompty”.

1. Dobry spec vs zły prompt
   Świetny slajd porównawczy.
   Prompt:
   Add payment endpoint.

vs.
Spec:
POST /payments

Preconditions:

- invoice exists
- status = OPEN

Invariant:
payment.amount <= invoice.remainingAmount

Idempotency:
clientRequestId

Side effects:
PaymentCreated event

Failure modes:
...

Point:
AI nie potrzebuje bardziej kreatywnych promptów.
AI potrzebuje mniej ambiguity.

1. Spec-driven workflow
   Tutaj pokazałbym rzeczywisty workflow bardzo podobny do tego, którego sam używasz:
   Problem / Jira / Idea
   │
   ▼
   SPECIFICATION
   │
   ▼
   Architecture
   │
   ▼
   Implementation plan
   │
   ┌────┴────┐
   ▼ ▼
   Agent A Agent B
   Backend Frontend
   │ │
   └────┬────┘
   ▼
   Tests
   │
   ▼
   Review Agent
   │
   ▼
   PR
   │
   ▼
   Human Review

I tutaj można powiedzieć:
Developer nie musi być już osobą wykonującą każdy krok.
Developer kontroluje pipeline.

To prowadzi idealnie do AI Factory.
Sekcja 3 — Od AI assistant do AI Factory 9. Pierwszy poziom: AI assistant
Developer → AI → Developer

ChatGPT / Claude / Copilot.
Developer cały czas prowadzi proces. 10. Drugi poziom: AI agent
Task
↓
Agent
├─ reads repository
├─ changes code
├─ runs tests
├─ fixes errors
└─ creates PR

Developer deleguje całe zadanie. 11. Trzeci poziom: AI Factory
Tutaj zrobiłbym najbardziej efektowny slajd.
┌───────────────┐
Jira ─────────────▶│ Spec Agent │
└───────┬───────┘
│
▼
┌───────────────┐
│ Architect │
│ Agent │
└───────┬───────┘
│
┌────────────┴────────────┐
▼ ▼
Backend Agent Frontend Agent
│ │
└────────────┬────────────┘
▼
Testing Agent
│
▼
Review Agent
│
▼
PR
│
▼
Human approval

I wtedy:
AI Factory = workflow, nie model.

To bardzo ważne.
Nie chodzi o to czy używasz:

- Claude,
- Codex,
- Cursor,
- Gemini,
- czegoś innego.
  Modele będą się zmieniać.
  Workflow jest twoją przewagą.

1. „Agents are disposable. Specs are durable.”
    To może być wręcz osobny slajd.
    Agents are disposable.
    Specs are durable.

Dzisiaj implementuje Claude.
Jutro Codex.
Pojutrze inny model.
Ale:
spec
architecture decisions
tests
constraints
acceptance criteria

pozostają.
To jest bardzo mocna idea.
Sekcja 4 — QA robi się ważniejsze, nie mniej ważne
To jest moim zdaniem świetny kierunek, bo wiele prezentacji o AI kompletnie pomija QA. 13. „AI scales code. It also scales bugs.”
Duży tekst:
AI can generate 10× more code.

Pod spodem:
It can also generate 10× more wrong code.

Dlatego przy AI Factory potrzebujesz verification factory. 14. QA jako część spec
Nie:
implementation → QA

tylko:
SPEC
/ | \
 / | \
code tests QA

W specification można mieć:
Acceptance criteria
Invariants
Contract tests
Failure scenarios
Performance constraints
Security constraints

I wszystkie mogą być automatycznie weryfikowane. 15. Piramida zaufania do AI
Mógłbyś zrobić:
Human review
────────────────
AI review
────────────────
Integration tests
────────────────
Contract tests
────────────────
Unit tests
────────────────
Types / lint / schema

Point:
Nie ufamy agentowi. Ufamy systemowi weryfikacji wokół agenta.

To może być jedno z najlepszych zdań prezentacji.
Ważny element: pokaż prawdziwy przykład
Ja zdecydowanie zrobiłbym jeden feature przewijający się przez całą prezentację.
Np.:
„Dodaj endpoint POST /payments.”

Najpierw pokazujesz tradycyjny ticket:
Add endpoint allowing a user to pay invoice.

Potem agent generuje coś sensownego, ale:

- brakuje idempotency,
- brak concurrent payment handling,
- nie wiadomo co z already paid invoice,
- nie wiadomo jaki event,
- nie wiadomo co retryować.
  Następnie pokazujesz spec.
  I nagle agent ma:
  Preconditions
  Postconditions
  Invariants
  Events
  Failure cases
  Concurrency
  Idempotency
  Acceptance criteria

A potem:
spec → implementation → tests → review
Publiczność zobaczy różnicę dużo lepiej niż na abstrakcyjnych diagramach.
Dodałbym też sekcję „co się może zepsuć”
Żeby prezentacja nie zabrzmiała jak AI-utopia.
Anti-patterns

1. Prompt-driven development
   "Make it work"
   "fix tests"
   "implement Jira-123"

bez kontekstu. 2. Giant autonomous agent
Jeden agent:
understand requirements
architect
implement
review
test
deploy

To brzmi fajnie, ale nie masz separacji odpowiedzialności. 3. AI reviewing its own assumptions
Agent implementuje feature według własnej interpretacji, a potem sam go reviewuje.
Oczywiście:
„Looks good.”

Dlatego review powinno być względem specification, nie względem kodu samego w sobie. 4. No deterministic validation
Jeśli jedyną kontrolą jest:
Claude says it looks good

to masz problem.
Potrzebujesz:
compiler
types
tests
schemas
contracts
linters
security checks

Jedna rzecz, którą mocno bym podkreślił
Nie sprzedawałbym Spec-Driven Development jako:
„piszemy więcej dokumentacji”.

Bo developerzy automatycznie się wyłączą. :)
Raczej:
Spec jest inputem do maszyny produkującej software.

To zmienia perspektywę.
Wcześniej dokumentacja była efektem ubocznym developmentu.
Teraz spec może być:
Specification
↓
┌────┼──────────────┐
↓ ↓ ↓
Code Tests Documentation
↓
PR

Czyli staje się executable artifact.
Możliwy finał prezentacji
Ostatnie 3 slajdy zrobiłbym bardzo proste.
Slajd
Stop optimizing typing speed.

Slajd
Optimize:

Intent
Constraints
Feedback loops
Verification

Ostatni slajd
Dużym tekstem:
The future of software development is not AI writing code.

i po kliknięciu:
It's humans designing systems that can reliably produce software.

To bardzo dobrze zamyka temat AI Factory.
Gdybym miał z tego zrobić około 15-slajdowy deck

1. Koniec klepania kodu?
2. Software development changed
3. The bottleneck moved
4. AI is not autocomplete
5. From code writer → system designer
6. The new unit of work: Specification
7. What is a spec?
8. Prompt vs Specification
9. Spec as a contract
10. Spec-driven workflow
11. AI Assistant → Agent → Factory
12. Anatomy of an AI Factory
13. Agents are disposable. Specs are durable.
14. AI scales bugs too
15. Verification / QA Factory
16. Real-world workflow
17. Anti-patterns
18. What does the developer do now?
19. Stop optimizing typing speed
20. Humans design systems that produce software
    Tak naprawdę nawet 20 slajdów nie musi być dużo, bo część powinna mieć jedno zdanie albo diagram, a nie ścianę tekstu.
    I jedna rzecz, którą bym zmienił w Twoim pierwotnym opisie: QA nie traktowałbym jako czwartej, osobnej sekcji. QA powinno przewijać się przez całą prezentację jako odpowiedź na fundamentalny problem SDD i AI Factory: „Skoro generujemy software automatycznie, skąd wiemy, że możemy mu zaufać?”.
    To daje całemu talkowi dużo mocniejszą konstrukcję:
    AI zwiększa throughput → spec usuwa ambiguity → agenci automatyzują delivery → verification daje nam trust.
