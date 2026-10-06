# Hotel Rating API

Backend API для сайта поиска отелей и отзывов. Проект использует Node.js, Express и MongoDB с Mongoose; защищённые действия доступны после JWT-авторизации.

## Связанные проекты

- Frontend: [Frontend-hotel-rating-website](https://github.com/BekowDev/Frontend-hotel-rating-website)
- Live demo: [frontend-hotel-rating-website.vercel.app](https://frontend-hotel-rating-website.vercel.app)
- Backend: [API-for-hotel-rating-website](https://github.com/BekowDev/API-for-hotel-rating-website)

## Требования

- Node.js и npm
- Доступная MongoDB (локальная или MongoDB Atlas)

## Установка и запуск

```bash
npm install
```

Создайте в корне проекта файл `.env`:

```env
PORT=3000
DB_URL=mongodb://127.0.0.1:27017/hotel-rating
token_key=replace-with-a-long-random-secret
```

Укажите адрес своей MongoDB и длинный секрет для JWT. Не публикуйте `.env` и не добавляйте реальные секреты в репозиторий.

Запуск в режиме разработки:

```bash
npm run dev
```

Обычный запуск:

```bash
npm start
```

API доступно с префиксом `/api`.

## Основные маршруты

| Метод | Путь | Назначение |
| --- | --- | --- |
| `POST` | `/api/signUp` | Регистрация пользователя |
| `POST` | `/api/signIn` | Вход пользователя |
| `DELETE` | `/api/deleteUser` | Удаление текущего пользователя; требуется авторизация |
| `POST` | `/api/getHotels` | Получение списка отелей |
| `POST` | `/api/getHotel` | Получение информации об отеле |
| `POST` | `/api/getRates` | Получение оценок; требуется авторизация |
| `POST` | `/api/createRate` | Создание оценки; требуется авторизация |
| `POST` | `/api/deleteRate` | Удаление оценки; требуется авторизация |

Для защищённых маршрутов передавайте JWT, выданный при входе, в заголовке авторизации согласно реализации middleware проекта.
