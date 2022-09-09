# fullstack-store 

## Задача
Реализовать интернет-магазин с клиентской и серверной частью и SQL базой данных.

Функционал
+ корзина
+ административная панель с возможностью добавления товаров (доступна всем авторизованным пользователям, в будущем будет доработана)
+ страница товара
+ фильтрация товаров по типу/бренду
+ авторизация

## Стек технологий

Frontend
+ React
+ Redux Toolkit
+ Material UI
+ Axios - для отправки запросов на сервер
+ React Router - навигация на клиенте

Backend
+ Node.js
+ Express
+ CORS
+ jsonwebtoken - создает токен (для подтверждения аутентификации пользователя)
+ sequelize - ORM для PostgreSQL

## Запуск приложения

Для запуска приложения необходимо иметь установленную программу Node.js и PostgreSQL
Проверить версию установленной Node.js можно командой в терминале 
```
node -v
```
Создание базы данных и управление осуществляется через программу pgAdmin4

Запуск сервера
```
npm run dev 
```
Запуск клиента
```
npm start
```