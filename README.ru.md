<p align="center">
  <a href="https://forg.to/products/pudo" target="_blank" rel="noopener">
    <img src="https://forg.to/api/badges/upvote/pudo?theme=light&shape=square" alt="Pudo - Upvote on Forg on forg." height="48" />
  </a>
  <a href="https://forg.to/products/pudo" target="_blank" rel="noopener"><img src="https://forg.to/api/badges/launch-winner/pudo" alt="Pudo - 1st Place on Forg" width="200" />
  </a>
  <a href="https://unikorn.vn/p/pudo?ref=embed-pudo" target="_blank">
    <img src="https://unikorn.vn/api/widgets/badge/pudo?theme=light" alt="Pudo trên Unikorn.vn" height="48" />
  </a>
  <a href="https://unikorn.vn/p/pudo?ref=embed-pudo" target="_blank">
    <img src="https://unikorn.vn/api/widgets/badge/pudo/rank?theme=light&type=weekly" alt="Pudo - Hàng tuần" height="48" />
  </a>
</p>

<p align="center">
  <img src="assets/Pudo_banner.png" alt="Система PUDO" width="100%" />
</p>

<h3 align="center">Структурированная 4-этапная методология программирования с ИИ-ассистентами.</h3>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Лицензия: MIT" /></a>
  <img src="https://img.shields.io/badge/version-1.3.1-brightgreen.svg" alt="Версия 1.3.1" />
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-orange.svg" alt="Добро пожаловать в PR" /></a>
  <img src="https://img.shields.io/badge/AI-agnostic-purple.svg" alt="Не зависит от ИИ" />
</p>

<p align="center">
  <b>🌍 Языки:</b>
  <a href="README.md">English</a> |
  <a href="README.vi.md">Tiếng Việt</a> |
  <a href="README.pt.md">Português</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.ru.md">Русский</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=yjRRjrx6Ews" target="_blank">
    <img src="https://img.youtube.com/vi/yjRRjrx6Ews/maxresdefault.jpg" alt="Watch the PUDO Code System overview video" width="80%" />
    <br />
    <strong>🎥 Watch the PUDO Code System overview video</strong>
  </a>
</p>

---

## Проблема

Вы открываете свой редактор. Печатаете расплывчатый запрос своему ИИ-ассистенту. Он что-то генерирует. Вы вставляете это. Работает наполовину. Вы просите исправить. Это ломает что-то другое. И так повторяется 3 часа.

**Это программирование в хаосе.** Кажется, что вы продуктивны, но это не так.

Проблема не в ИИ — проблема в **отсутствии структуры**. Без четкой методологии разработка с помощью ИИ превращается в случайное блуждание по вашей кодовой базе.

## Решение: PUDO

**PUDO** дает вам повторяемый 4-этапный цикл, который превращает ИИ из игрового автомата в высокоточный инструмент.

| Этап | Цель | Что делаете вы | Что делает ИИ |
|:---:|---|---|---|
| **(P) Plan (План)** | Определить *что* и *зачем* | Задать объем, ограничения, критерии успеха | Составить черновик плана реализации, выявить риски |
| **(U) Understand (Понимание)** | Знать *где* и *как* | Указать на соответствующий код, объяснить контекст | Анализировать кодовую базу, картировать зависимости, находить шаблоны |
| **(D) Develop (Разработка)** | Построить *это* | Рассмотреть, одобрить, протестировать | Писать код, запускать тесты, отслеживать прогресс |
| **(O) Optimize (Оптимизация)** | Сделать *лучше* | Проверить улучшения, слить (merge) | Рефакторинг, бенчмаркинг, документирование изменений |

> **Ключевая мысль:** PUDO — это **цикл**, а не конвейер. Вы возвращаетесь к этапам по мере того, как узнаете больше. Открытие на этапе Разработки может вернуть вас к Плану. Это ожидаемо.

## Ворота Качества

Каждый этап заканчивается контрольными воротами. Не переходите дальше, пока эти ворота не пройдены, либо пока риск явно не принят.

| Ворота | Выполняются перед | Должны подтвердить |
|---|---|---|
| **Plan Gate** | Understand | Объем, критерии успеха, ограничения и то, что вне области работ, определены ясно |
| **Understand Gate** | Develop | Релевантные файлы, архитектура, API и паттерны были проверены |
| **Develop Gate** | Optimize | Реализация остается в рамках задачи, имеет тесты и покрывает ключевые edge cases |
| **Optimize Gate** | Release | Рефакторинг не меняет поведение; производительность, безопасность, документация и риски были проверены |
| **Release Gate** | Merge/deploy | Changelog, миграция, rollback, мониторинг и одобрение owner были учтены |

Начинайте с [Quality Gates](quality/quality-gates.md), используйте [QC checklists](quality/qc-checklists.md), проверяйте изменения, созданные ИИ, через [AI Output Review](quality/ai-output-review.md), и берите failure modes из [general edge case catalogue](quality/edge-cases/general.md).

## Ожидаемый Эффект

Эти числа являются практическими ориентировочными оценками, а не гарантиями. Эффект зависит от размера задачи, качества репозитория и того, насколько последовательно команда действительно следует PUDO.

| Тип задачи | Снижение лишних токенов | Сокращение времени разработки |
|---|---:|---:|
| Однострочное исправление / небольшой скрипт | 0-8% | -5% до +5% |
| Небольшая или средняя feature | 25-38% | 12-20% |
| Сложный баг / production-инцидент | 22-35% | 10-18% |
| Feature с несколькими файлами / тестами / командным handoff | 35-48% | 18-28% |
| Практический средний claim | **34%** | **18%** |

## Быстрый старт

### 1. Начните с Плана (Plan)

Перед написанием любого кода определите, что вы строите:

```
Мне нужно создать [ФУНКЦИЮ]. 
Критерии успеха — [КРИТЕРИИ].
Ограничения — [ОГРАНИЧЕНИЯ].
Создай план реализации перед написанием кода.
```

### 2. Переходите к Пониманию (Understand)

Исследуйте, прежде чем строить:

```
Перед реализацией проанализируй существующую кодовую базу:
- Какие паттерны уже установлены?
- Какие зависимости здесь задействованы?
- Что может сломаться?
```

### 3. Выполняйте в Разработке (Develop)

Стройте структурированно:

```
Реализуй план. Отслеживай прогресс по списку задач.
Пиши тесты параллельно с реализацией.
Сообщай о любых отклонениях от плана.
```

### 4. Завершите Оптимизацией (Optimize)

Не выпускайте первый черновик:

```
Проверь реализацию:
- Есть ли улучшения производительности?
- Соответствует ли код существующим паттернам?
- Напиши краткое описание (walkthrough), что изменилось и почему.
```

### 5. Повторяйте

Для каждой задачи, каждой функции, каждого исправления бага. **Plan → Understand → Develop → Optimize.**

## Библиотека Промптов

PUDO поставляется с [готовой к использованию библиотекой промптов](prompts/) — **21 промпт** по 4 этапам и доменным навыкам, которые вы можете скопировать и вставить в любого ИИ-ассистента. В каждом каталоге этапа есть подробный `README.md`, объясняющий, как изменять и расширять промпты под нужды вашей команды.

| Этап | Промпты |
|---|---|
| **(P)** Plan | [Определение Области](prompts/plan/scope-definition.md) · [Черновик Архитектуры](prompts/plan/architecture-draft.md) · [Оценка Рисков](prompts/plan/risk-assessment.md) · [Схема Базы Данных](prompts/plan/database-schema-design.md) · [Контракт API](prompts/plan/api-contract-design.md) · [Модель Угроз Безопасности](prompts/plan/security-threat-model.md) |
| **(U)** Understand | [Анализ Кодовой Базы](prompts/understand/codebase-analysis.md) · [Аудит Зависимостей](prompts/understand/dependency-audit.md) · [Распознавание Паттернов](prompts/understand/pattern-recognition.md) · [Анализ Журналов Сбоев](prompts/understand/crash-log-analysis.md) |
| **(D)** Develop | [Реализация Функции](prompts/develop/feature-implementation.md) · [Разработка через тестирование (TDD)](prompts/develop/test-driven-dev.md) · [Скаффолдинг Компонентов](prompts/develop/component-scaffold.md) · [Набор Интеграционных Тестов](prompts/develop/integration-test-suite.md) · [Набор E2E Тестов](prompts/develop/e2e-test-suite.md) |
| **(O)** Optimize | [Обзор Производительности](prompts/optimize/performance-review.md) · [Чек-лист для Код-Ревью](prompts/optimize/code-review-checklist.md) · [Возможности для Рефакторинга](prompts/optimize/refactor-opportunities.md) · [Профилирование Памяти](prompts/optimize/memory-profiling.md) · [Анализ Сетевых Проблем](prompts/optimize/network-troubleshooting.md) |
| **Skills** | [Архитектура и Планирование](skills/plan/SKILL.md) · [Программная Инженерия](skills/code/SKILL.md) · [Устранение неполадок и Отладка](skills/debug/SKILL.md) · [DevOps Инженерия](skills/devops/SKILL.md) · [Тестирование (Test Engineering)](skills/test/SKILL.md) |
| **DevOps Инструменты** | [GitHub Actions](skills/devops/github-actions/SKILL.md) · [GitLab CI](skills/devops/gitlab-ci/SKILL.md) · [Argo CD](skills/devops/argo-cd/SKILL.md) · [Jenkins](skills/devops/jenkins/SKILL.md) · [Terraform](skills/devops/terraform/SKILL.md) · [Docker](skills/devops/docker/SKILL.md) · [Kubernetes](skills/devops/kubernetes/SKILL.md) |

## Интеграции ИИ

PUDO задуман как операционная система по умолчанию для ИИ-агентов, пишущих код. Предпочтительно использовать актуальный формат конфигурации для каждого инструмента, сохраняя legacy-файлы там, где они еще полезны для старых workspace.

| Инструмент | Текущие файлы | Рекомендуемая конфигурация | Статус |
|---|---|---|---|
| **Codex** | [AGENTS.md](AGENTS.md), [codex/AGENTS.md](codex/AGENTS.md) | Держите `AGENTS.md` в корне; копируйте `codex/AGENTS.md` в целевой репозиторий, если нужен более полный шаблон Codex | OK |
| **Claude Code / Projects** | [CLAUDE.md](CLAUDE.md), [claude/CLAUDE.md](claude/CLAUDE.md), [.claude/settings.json](.claude/settings.json) | Используйте корневой `CLAUDE.md` как bridge-файл; подробный workflow Claude оставляйте в `claude/CLAUDE.md` | Обновлено |
| **Cursor** | [Project Rules](cursor/.cursor/rules/pudo-core.mdc), [legacy .cursorrules](cursor/.cursorrules) | Предпочитайте `.cursor/rules/*.mdc`; сохраняйте `.cursorrules` для старых версий Cursor | Мигрировано |
| **GitHub Copilot** | [.github/copilot-instructions.md](.github/copilot-instructions.md), [.github/instructions/](.github/instructions/) | Используйте repo-wide instructions вместе с `.instructions.md` файлами по путям | Добавлено |
| **OpenCode** | [opencode/opencode.md](opencode/opencode.md) | Добавьте в system prompts или workspace instructions OpenCode | OK |
| **Antigravity / Gemini-style** | [antigravity/instructions.xml](antigravity/instructions.xml) | Скопируйте в `.gemini/antigravity/instructions.xml` в целевой workspace | OK |
| **Kiro** | [kiro/system-prompt.md](kiro/system-prompt.md) | Используйте как system prompt для Kiro | OK |

## Философия

PUDO — это не просто чек-лист, это образ мышления. Прочтите [полную философию](docs/philosophy.md), чтобы понять принципы этого метода.

**Кратко (TL;DR):**
- **Против хаоса** — Структура побеждает импровизацию в масштабе
- **Итеративность** — Это цикл, а не водопад (waterfall)
- **ИИ-ориентированность** — Разработано для парного программирования "человек + ИИ"
- **Целостность этапов** — На каждом этапе есть четкие критерии входа и выхода

## Когда Не Стоит Использовать PUDO

PUDO может быть избыточным для однострочных исправлений, одноразовых прототипов, чистого исследования или некритичных скриптов. Используйте полный цикл, когда важны корректность, поддерживаемость, безопасность или командный handoff.

## Текущие Ограничения

- PUDO не гарантирует, что результат ИИ будет корректным.
- Проверка человеком по-прежнему обязательна.
- Изменения, чувствительные к безопасности, по-прежнему требуют отдельного security review.
- Примеры носят иллюстративный, а не универсальный характер.
- Метод требует дисциплины; если пропускать quality gates, процесс снова превращается в ad hoc prompting.

## Для кого это?

- **Разработчики, использующие ИИ** (ChatGPT, Claude, Gemini, Copilot и т.д.), которые хотят лучших результатов
- **Руководители команд (Team leads)**, ищущие единую методологию для ИИ-разработки
- **Студенты**, которые с первого дня учатся программировать с ИИ правильно

## Участие

PUDO растет вместе с сообществом. Посмотрите [CONTRIBUTING.md](CONTRIBUTING.md), чтобы узнать, как:

- Добавлять новые промпты в библиотеку
- Отправлять практические примеры (walkthroughs) из реального мира
- Улучшать документацию

## Поддержка и Финансирование

Если вы находите PUDO полезным, рассмотрите возможность поддержки проекта:

<iframe src="https://github.com/sponsors/DongDuong2001/button" title="Sponsor DongDuong2001" height="32" width="114" style="border: 0; border-radius: 6px;"></iframe>

- [GitHub Sponsors](https://github.com/sponsors/DongDuong2001)
- [Patreon](https://patreon.com/DongDuong2001)
- [Ko-fi](https://ko-fi.com/dongphuduong)
- [Buy Me a Coffee](https://buymeacoffee.com/lab68dev)
- **PayPal:** dongduong840@gmail.com

## Лицензия

[MIT](LICENSE) — Используйте, форкайте, делайте это своим.

---

<p align="center">
  <strong>Перестаньте импровизировать. Начните использовать PUDO.</strong>
  <br /><br />
  <em>Plan → Understand → Develop → Optimize</em>
</p>
