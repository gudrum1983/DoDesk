# Тестовое задание

## Фронтенд работает в двух режимах:

- **dev**: [http://localhost:5173/](http://localhost:5173/)
- **preview**: [http://localhost:4173/](http://localhost:4173/)

## Бекенд может запускаться на локальном или опубликованном сервере:

#### Локальный JSON-server ([http://localhost:3001/](http://localhost:3001/))

- **Команды:**
    - Разработка:
  ```bash
  yarn dev:local
  ```
    - Предпросмотр:
  ```bash
  yarn preview:local
  ```

### Опубликованный сервер ([https://render-json-db-toso.onrender.com](https://render-json-db-toso.onrender.com))

Для работы с опубликованным сервером перейдите по указанному адресу, чтобы убедиться, что `JSON-server` активен.
Поскольку сервер бесплатный, первичная загрузка может занять некоторое время.

- **Команды:**
    - Разработка:
  ```bash
  yarn dev:web
  ```
    - Предпросмотр:
  ```bash
  yarn preview:web
  ```

# Порядок команд для запуска проекта

1. **Клонируйте репозиторий:**
   ```bash
   git clone https://github.com/gudrum1983/DoDesk.git
   ```

2. **Перейдите в каталог проекта:**
   ```bash
   cd DoDesk
   ```

3. **Установите зависимости:**
   ```bash
   yarn
   ```

4. **Запустите проект для разработки (локально или веб-сервер):**

   4.1. **Запуск проекта локально:**
   ```bash
   yarn dev:local
   ```

   4.2 **Запуск в режиме веб-сервера:**
   ```bash
   yarn dev:web
   ```

5**Запустите проект в режиме предпосмотра (локально или веб-сервер):** 

   5.1 **Запуск проекта локально (билд в комплекте):**
   ```bash
   yarn preview:local
   ```
   5.2 **Запуск в режиме веб-сервера (билд в комплекте):**
    ```bash
    yarn preview:web
    ```
# Описание проекта

## Задание

Создать простое приложение, используя следующие технологии:

- **React**
- **RTK Query**
- **React Router DOM 6**
- **SASS**
- **TypeScript**
- **FSD (feature-sliced design) архитектура**

### Требования к функционалу

- **Главная страница**: список задач с поддержкой бесконечного скролла и виртуализации.
- **Отображение задачи**: каждая задача представлена в виде строки с номером, заголовком и обрезанным описанием (если
  оно не помещается), а также кнопкой "просмотр".
- **Просмотр задачи**: кнопка "просмотр" должна перенаправлять на отдельный маршрут с полной информацией о задаче и
  кнопкой "назад".

## Реализованный функционал

1. **Главная страница**:
    - Отображается список задач с виртуализацией и бесконечным скроллом.
    - Для каждой задачи отображаются:
        - Номер
        - Заголовок
        - Обрезанное описание с `...`, если текст не помещается
        - Новые и важные задачи помечены иконками
        - Кнопка "просмотр", которая ведет на отдельную страницу с полной информацией о задаче
    - Добавлена кнопка "Создать новую задачу", ведущая на страницу создания задачи.

2. **Страница создания задачи**:
    - Содержит форму с полями:
        - Заголовок
        - Описание
        - Признак важности задачи
    - Кнопка "Создать" для добавления новой задачи. После нажатия:
        - Задача создается с автоматически установленным признаком "новая".
        - Пользователь перенаправляется на главную страницу, в начало списка, а новая задача отображается в самом низу
          списка (в планах — возврат к предыдущей позиции или переход в конец списка для фокуса на новой задаче).
    - Кнопка "Назад" для возврата на главную страницу в начало списка.

3. **Страница просмотра задачи**:
    - Полная информация о задаче.
    - Возможность редактирования и удаления задачи.
    - При просмотре новой задачи признак "новая" снимается.

# Планируемые улучшения

- **Фокусировка при создании задачи**: при создании новой задачи планируется возвращать пользователя к предыдущей
  позиции в списке или перемещать фокус на конец списка.
- **UI-библиотека и обновление дизайна**: подключение UI-библиотеки для улучшения дизайна и стилизации приложения,
  добавить лоадеры.
- **Пагинация**: добавление загрузки данных с сервера частями для улучшения производительности.
- **Добавление форм с использованием хука useForm**: планируется добавить формы для создания и редактирования задач с
  использованием тега `<form>` и хука `useForm`.
- **Роуты создания и просмотра в попапах**: планируется реализовать модальные окна для создания и просмотра задач.
