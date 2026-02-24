# SPA → Next.js (Pages Router) Migration

Проект мигрирован с React SPA (папка `spa/`) на Next.js Pages Router + TypeScript.

## Стек

- Next.js 16 (Pages Router)
- TypeScript
- ESLint
- Prettier
- Husky + lint-staged
- `clsx` `^2.1.1`
- `next/image` для оптимизации изображений

## Архитектура (FSD)

Проект переведен на Feature-Sliced Design:

- `src/app` - глобальные стили и app-level setup
- `src/pages` - только Next.js route adapters
- `src/views` - page/view композиция
- `src/widgets` - крупные UI-блоки (layout/home/product)
- `src/entities` - доменная модель (`car`)
- `src/shared` - переиспользуемые lib/ui

## Быстрый старт

1. Установить зависимости:

```bash
npm install
```

2. Запуск dev-сервера:

```bash
npm run dev
```

Приложение доступно на `http://localhost:3001`.

3. Проверки качества:

```bash
npm run lint
npm run typecheck
```

4. Production build:

```bash
npm run build
npm run start
```

## Скрипты

- `npm run dev` - запуск проекта в режиме разработки (порт `3001`)
- `npm run build` - production сборка
- `npm run start` - запуск production-сервера
- `npm run lint` - ESLint проверка
- `npm run lint:fix` - ESLint автоисправления
- `npm run typecheck` - TypeScript проверка
- `npm run format` - форматирование через Prettier
- `npm run format:check` - проверка форматирования

## SSR/SSG/ISR стратегии

### 1) Главная страница `/`

- Было: SSR (после шага миграции) / в SPA данные приходили через `useEffect`
- Стало: ISR (`getStaticProps` + `revalidate: 180`)
- Почему: каталог обновляется периодически, не на каждый запрос

### 2) Страница `/privacy`

- Было: SSR (на этапе миграции)
- Стало: SSG (`getStaticProps`)
- Почему: статический контент без динамических данных

### 3) Страница `/product/[id]`

- Было: клиентский fetch в `useEffect` в SPA
- Стало: SSR (`getServerSideProps`)
- Почему: карточка товара должна отдаваться с актуальными данными на каждый запрос

## Проверка SSR данных

Для SSR-страниц (`/product/[id]`) можно проверить, что данные пришли на сервере:

1. На странице нет клиентских плейсхолдеров загрузки.
2. В Network нет запроса на основной список/товар после первого рендера.
3. В консоли браузера:

```js
JSON.parse(document.getElementById('__NEXT_DATA__').textContent);
```

## Обработка ошибок API

- Для списка машин используется fallback-кэш + fallback UI
- Для `/product/[id]` при недоступном API и отсутствии fallback-данных - редирект на `/service-unavailable`
- Для несуществующего товара - `404`

## Рефакторинг

- Год в футере вынесен в переменную (`UTC year`) без гидрационных предупреждений
- Скролл к каталогу исправлен через `scrollToSection()` в `src/shared/lib/scroll.ts`
- Cookie banner переписан с `localStorage` на cookie (`document.cookie`)
- Во всех местах объединения классов используется библиотечный `clsx`
- Структура компонентов и ассетов реорганизована под FSD

## Git hooks

- pre-commit hook: `.husky/pre-commit`
- в hook запускается `npm run lint-staged`

## Результат `next build`

После сборки стратегии генерации отображаются корректно:

- `/` -> `●` (ISR)
- `/privacy` -> `●` (SSG)
- `/product/[id]` -> `ƒ` (SSR)
- `/404` -> `○` (Static)
- `/service-unavailable` -> `○` (Static)
