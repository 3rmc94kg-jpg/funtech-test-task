# DiveSea - NFT Marketplace

Адаптивная вёрстка лендинга NFT-маркетплейса по макету Figma.

## Технологии

- **Next.js 16** - React фреймворк
- **TypeScript** - типизация
- **Feature-Sliced Design** - архитектура проекта
- **Redux Toolkit** - управление состоянием
- **SCSS** - стилизация
- **GSAP** - анимации
- **CoinGecko API** - данные для NFT карточек

## Функциональность

- Адаптивная вёрстка
- Header с мобильным меню
- Hero секция с GSAP анимациями
- Слайдер NFT карточек с данными из API
- Таймеры обратного отсчёта на карточках
- CTA секция с анимациями при скролле
- Footer с соцсетями

## Установка и запуск

### Локальный запуск (development-сборка)

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### Запуск через Docker (production-сборка)

```bash
# Сборка образа
docker build -t dive-sea .

# Запуск контейнера
docker run -p 3000:3000 dive-sea
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Структура проекта (FSD)

```
src/
├── app/                    # Инициализация приложения
│   ├── providers/          # StoreProvider
│   └── store/              # Redux store, hooks
├── entities/               # Бизнес-сущности
│   └── nft/
│       ├── model/          # nftSlice (Redux)
│       └── ui/             # NFTCard
├── pages/                  # Next.js страницы
├── shared/                 # Переиспользуемый код
│   ├── lib/                # Хуки (useCountdown)
│   ├── styles/             # SCSS переменные, миксины, брейкпоинты
│   ├── types/              # TypeScript типы
│   └── ui/                 # UI компоненты (Button)
└── widgets/                # Композиционные блоки
    ├── header/             # Хедер с навигацией
    ├── hero/               # Hero секция
    ├── nft-slider/         # Слайдер NFT карточек
    ├── cta/                # Call-to-action секция
    └── footer/             # Футер
```

## API

Приложение использует публичный API CoinGecko для получения списка NFT:

```
https://api.coingecko.com/api/v3/nfts/list
```

Из API используется только поле `name` для названий карточек.
Остальные данные (изображения, цены, таймеры) генерируются на клиенте.

## Макет

[Figma Design](https://www.figma.com/design/qj4RLCkXNzYKdajhCYIGrT/Frontend-test--UPD-)