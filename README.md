# Сервис бронирования билетов в кинотеатр

## Задача

Реализация frontend-части информационной системы для предварительного онлайн-бронирования билетов в кинотеатр: 
- разработка API для взаимодействия с backend;
- программирование гостевой части сервиса, представляющей собой возможность просмотра расписания и информации о фильмах, а также возможность выбора места в кинозале и бронирования билета.

## Используемые технологии

HTML, CSS, JavaScript

## Описание файлов

### createRequest

Файл содержит функцию, посредством которой осуществляется POST-запрос на указанный URL-адрес. В функцию передается тело запроса (body), которое варьируется в зависимости от назначения запроса. Функция вызывается асинхронно из файлов index.js, hall.js и payment.js и ожидает ответ от сервера в формате JSON.

### Сущности (классы)

- Класс `Film` отрисовывает карточки с фильмами на основании ответа, приходящего от сервера (метод `fillInfo`).
- Класс `Hall` позволяет получить (отфильтровать) все открытые залы (статический метод `getHall`).
- Класс `Seance` предназначен для отображения сеансов на доступные фильмы в открытых для бронирования залах. Для работы с офильтрованным с помощью класса `Hall` массивом залов используются геттер и сеттер `openHalls`, геттер `movies` позволяет получить все идущие в данный момент фильмы, размещенные на главной странице сервиса. Метод `showSeances` отображает все существующие сеансы для каждого фильма и для каждого кинозала. 
- Конструктор класса `Schedule` в качестве параметра по умолчанию принимает объект даты текущего дня. Данный класс содержит гет-методы `navigation` и `section`, которые возвращают панель расписания и дни недели в расписании соответственно. Класс отвечает за отрисовку ленты расписания с актуальными датами и днями недели (метод `getSchedule`), а также за возможность выбора непрошедшего сеанса в определеенный день недели (метод `setSeancesSchedule`). 

### index

В файл (модуль) импортируется 4 сущности (класса): Film, Hall, Seances, Schedule. Создается экземпляр класса `Schedule`, у которого вызывается метод `getSchedule`. Также в данном файле происходит вызов функции `start`, в которой происходит получение ответа от сервера. Результат запроса - объект с тремя полями:

1. halls - содержит список всез кинозалов (массив с объектами).
2. films - содержит список всех фильмов (массив с объектами).
3. seances - содержит список всех сеансов (массив с объектами).

Внутри функции создаются экземпляры классов `Film` и `Seance`. Вызываются методы `fillInfo`, `getHall`, `setSeancesSchedule`.

### hall

В файле происходит вызов функции `config`, пармаетрами которой являются начало выбранного сеанса с учетом даты, ID зала и ID сеанса. Параметры используются для формирования тела запроса на сервер. Результатом запроса является получение актуальной схемы посадочных мест на выбранный сеанс с учетом уже купленных билетов. 

Также реализован функционал выбора мест, подсчет стоимости билетов и возможность забронировать выбранные места. 

### payment

Внутри файла вызывается функция `booking`, имеющая следующие параметры для формирования тела запроса: начало сеанса с учетом даты, ID зала, ID сеанса, конфигурация зала (html-разметка). Результат запроса - добавление информации о забронированных билетах в базу данных.

### ticket

Данный файл отвечает за формирование билета на сеанс. Билет представляет собой QR-код c уникальным кодом бронирования, в котором указано, на какую дату действителен билет, указано название фильма, время начала сеанса, а также место и ряд в зрительном зале. 