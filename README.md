# JWT Auth App
Полнофункциональное приложение для аутентификации пользователей с использованием JSON Web Tokens (JWT). Проект состоит из серверной части (backend) на Node.js с Express и клиентской части (frontend) на React + MobX, демонстрируя регистрацию, логин, защищенные маршруты и управление токенами.
# Технологический стэк проекта

## Backend:
* [Node.js](https://nodejs.org/docs/latest/api/)
* [Express.js](https://expressjs.com/)
* [MongoDB (с Mongoose)](https://www.mongodb.com/docs/drivers/node/current/integrations/mongoose/mongoose-get-started/)
* [JSON Web Tokens (JWT)](https://en.wikipedia.org/wiki/JSON_Web_Token)
* [nodemailer (для отправки писем с активацией)](https://nodemailer.com/)
* [bcrypt (для хэширования паролей)](https://www.npmjs.com/package/bcrypt)
* [cookie-parser](https://www.npmjs.com/package/cookie-parser)
* [cors](https://www.npmjs.com/package/cors)

## Frontend:
* [React](https://react.dev/)
* [MobX](https://mobx.js.org/)
* [axios (для работы с HTTP-запросами)](https://axios-http.com/docs/intro)
* [i18n (Интернационализация)](https://www.i18next.com/)



# Структура проекта

```javascript
jwt-auth-app/               # Корневая папка проекта
├── client/                    # Клиентская часть (Frontend)
│   ├── public/                # Cтатические файлы
│   │   ├── index.html         # Основной HTML-файл
│   │   └── index.css          # Глобальные стили
│   ├── src/                   # Исходный код frontend
│   │   ├── components/        # Переиспользуемые компоненты
│   │   ├── http/              # Настройка axios и работа с interceptors
│   │   ├── locales/           # Файлы с переводами
│   │   ├── models/            # Модели данных (пользователя, http-запроса)
│   │   ├── services/          # Функции работы с сервером (backend)
│   │   ├── store/             # Взаимодейтсвие с глобальным хранилищем (MobX)
│   │   ├── App.tsx            # Главный App-компонент (или App.js)
│   │   ├── index.tsx          # Точка входа (для TypeScript/React)
│   │   └── i18n.tsx           # Настройка интернационализации (i18n)       
│   │  
│   ├── package.json           # Зависимости и скрипты (npm start, build)
│   ├── tsconfig.json          # Конфигурация TypeScript
│   └── 
│
├── server/                    # Серверная часть (Backend)
│   ├── controllers/           # Обработчики запросов (authController с register, login, refresh и т.д.)
│   ├── dtos/                  # DTOs для передачи данных между частями приложения
│   ├── middlewares/           # Middleware (auth middleware для защищенных роутов, errorHandler)
│   ├── models/                # Модели Mongoose (User, Token)
│   ├── router/                # Роутинг запросов (authRoutes, protected routes)
│   ├── service/               # Логика обработки запросов
│   ├── .env                   # Переменные окружения сервера (DB_URL и т.д.)
│   ├── index.js               # Точка входа сервера
│   ├── package.json           # Зависимости (express, mongoose, jwt, bcrypt и т.д.)
│   └── ...                   
│
├── .gitignore                 # Игнорируемые файлы (node_modules, .env, builds и т.д.)
└── README.md                  
```
# Установка и запуск
*Предварительные требования*

* Node.js (v16 или выше)
* MongoDB (локально или облако, например MongoDB Atlas)
* npm или yarn

## Шаги

1. Клонируйте репозиторий: 

``` bash
git clone https://github.com/gmtdn67/jwt-auth-app.git 
cd jwt-auth-app 
```
2. Установите зависимости для сервера и клиента:
_Для сервера_
```bash
cd server
npm install
```

_Для клиента_
```bash
cd ../client
npm install
```
3. Создайте файл .env в папке server с следующими переменными:
```javascript
**PORT**=<порт_сервера>
DB_URL=<URL-адрес_БД_MongoDB>
JWT_ACCESS_SECRET=<jwt_секретный_ключ_токена_доступа>
JWT_REFRESH_SECRET=<jwt_секретный_ключ_токена_обновления>
SMTP_HOST=<DNS-имя SMTP-службы --для отправки письма-подтверждения, в проекте используется smtp.yandex.com
SMTP_PORT=<порт_smtp-службы> -- в проекте - 465
SMTP_USER=<адрес_электронной_почты>
SMTP_PASSWORD=<пароль_от_электронной_почты>
API_URL=http://localhost:5000 --адрес сервера (backend)
CLIENT_URL=http://localhost:3000 --адрес клиентской части (frontend)
```
4. Запустите сервер и клиент:

_Сервер:_
```bash
npm run dev
``` 
_Клиент (в отдельном терминале)_:
```bash
cd ../client
npm start
```


5. Приложение будет доступно по адресу `http://localhost:3000` (frontend) и API на `http://localhost:5000` (backend).

# Основные функции

1. ***Регистрация пользователя с активацией учетной записи по электронной почте***
2. ***Аутентификация пользователей с выдачей JWT-токенов (access, refresh tokens)***
3. ***Защищенный API-endpoint /users со списком учетных записей, доступный только авторизованным пользователям (требуют валидный токен)***
4. ***Logout (опционально, очистка токена на клиенте)***
5. ***Refresh token (обновление токена доступа (access token), без которого невозможно получение данных с сервера)***

# API Endpoints
Все маршруты доступны по базовому URL: `http://localhost:5000` (по умолчанию) или ваш продакшн-домен.

| Метод | Эндпоинт                  | Описание                                   | Защита     | Тело запроса (пример)                                      |
|-------|---------------------------|--------------------------------------------|------------|------------------------------------------------------------|
| POST  | `/api/registration`      | Регистрация нового пользователя            | Нет        | `{ "email": "john@example.com", "password": "123456" }` |
| POST  | `/api/login`         | Авторизация, выдача access и refresh токенов | Нет        | `{ "email": "john@example.com", "password": "123456" }`   |
| POST  | `/api/refresh` | Обновление access-токена по refresh-токену  | Нет*       | `{ "refreshToken": "eyJhbGciOi..." }` или в cookie        |
| GET  | `/api/activate/:link` | Обновление access-токена по refresh-токену  | Нет*       | `{ "refreshToken": "eyJhbGciOi..." }` или в cookie        |                                                   |
| POST  | `/api/logout`        | Логаут (опционально: инвалидация токена)   | Да/Нет     | Нет                                                        |
| GET   | `/api/users`  | Пример защищённого маршрута (список пользователей)                | Да (JWT)   | Нет                                                        |

> *Для `/refresh-token` защита не требуется, но проверяется валидность refresh-токена.

### Заголовки для защищённых маршрутов
```http
Authorization: Bearer <your_access_token>
Content-Type: application/json