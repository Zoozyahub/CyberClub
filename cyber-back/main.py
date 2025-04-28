from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
from fastapi.responses import JSONResponse



app = FastAPI()

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешить запросы с любых адресов
    allow_credentials=True,
    allow_methods=["*"],  # Разрешить все методы
    allow_headers=["*"],  # Разрешить все заголовки
)

# Подключение к MongoDB
MONGO_URI = "mongodb://localhost:27017"
client = MongoClient(MONGO_URI)
db = client.cyber  # Создаём базу данных "cyber"
news_collection = db.news  # Коллекция для новостей
users_collection = db.users
practice_collection = db.practice 
tournaments_collection = db.tournaments
teams_collection = db.teams

# Эндпоинт для получения 6 последних новостей
@app.get("/get-six-news")
def get_six_news():
    news = list(news_collection.find().sort("date", -1).limit(6))
    for item in news:
        item["_id"] = str(item["_id"])  # Преобразуем ObjectId в строку
    return news

@app.post("/get-news-by-id")
def get_news_by_id(payload: dict):
    news_id = payload.get("id")
    if not news_id:
        raise HTTPException(status_code=400, detail="ID не предоставлен")

    news_item = news_collection.find_one({"id": news_id})
    if not news_item:
        raise HTTPException(status_code=404, detail="Новость не найдена")

    news_item["_id"] = str(news_item["_id"])  # Преобразуем ObjectId в строку
    return news_item

# Эндпоинт для удаления новости по ID
@app.post("/delete-news")
def delete_news(payload: dict):
    news_id = payload.get("id")
    if not news_id:
        raise HTTPException(status_code=400, detail="ID не предоставлен")

    result = news_collection.delete_one({"id": news_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Новость не найдена")

    return {"message": "Новость удалена"}


@app.get("/get-all-news")
def get_all_news():
    news = list(news_collection.find().sort("date", -1))  # Сортировка по дате по убыванию
    for item in news:
        item["_id"] = str(item["_id"])  # Преобразуем ObjectId в строку
    return news


@app.post("/addUser")
async def add_user(payload: dict):
    # Проверим, существует ли уже пользователь с таким телефоном
    phone = payload.get("phone")
    if not phone:
        raise HTTPException(status_code=400, detail="Телефон не предоставлен")

    existing_user = users_collection.find_one({"phone": phone})
    if existing_user:
        raise HTTPException(status_code=400, detail="Пользователь с таким телефоном уже зарегистрирован")

    # Получаем пароль (в открытом виде, без хэширования)
    password = payload.get("password")
    if not password:
        raise HTTPException(status_code=400, detail="Пароль не предоставлен")

    # Сохраняем данные пользователя
    new_user = {
        "team_id": payload.get("team_id"),
        "lastname": payload.get("lastname"),
        "firstname": payload.get("firstname"),
        "patronymic": payload.get("patronymic"),
        "nickname": payload.get("nickname"),
        "tg": payload.get("tg"),
        "vk": payload.get("vk"),
        "phone": phone,
        "password": password,  # Пароль сохраняем в открытом виде
        "is_admin": payload.get("is_admin")
    }

    # Вставляем нового пользователя в базу данных
    users_collection.insert_one(new_user)

    # Возвращаем данные пользователя без пароля
    new_user["password"] = None
    return new_user


@app.post("/auth")
def auth_user(payload: dict):
    phone = payload.get("phone")
    password = payload.get("password")

    # Проверка, что телефон и пароль переданы
    if not phone or not password:
        raise HTTPException(status_code=400, detail="Телефон и пароль обязательны")

    # Поиск пользователя по номеру телефона
    user = users_collection.find_one({"phone": phone})

    if not user:
        raise HTTPException(status_code=400, detail="Неправильный телефон или пароль")

    # Проверка пароля
    if user["password"] != password:  # Простое сравнение, без хэширования
        raise HTTPException(status_code=400, detail="Неправильный телефон или пароль")

    # Возвращаем данные пользователя (без пароля)
    user["_id"] = str(user["_id"])  # Преобразование ObjectId в строку
    del user["password"]  # Убираем пароль из ответа

    return user


@app.post("/add-news")
async def add_news(news: dict):
    # Получаем все новости и находим максимальный id
    latest_news = news_collection.find().sort("id", -1).limit(1)
    last_news = list(latest_news)

    # Если новости есть, берем максимальный id и увеличиваем его на 1
    if last_news:
        new_id = str(int(last_news[0]["id"]) + 1)
    else:
        # Если новостей нет, начинаем с id = 1
        new_id = "1"

    # Создаём новость с новым id и добавляем дату
    new_news = {
        "id": new_id,
        "title": news["title"],
        "description": news["description"],
        "image": news["image"],
        "date": datetime.now().isoformat()  # Текущая дата в ISO формате
    }

    # Вставляем новость в коллекцию
    news_collection.insert_one(new_news)

    return JSONResponse(content={"message": "Новость добавлена!"}, status_code=200)

@app.get("/get-all-tournaments")
def get_all_tournaments():
    # Получаем все турниры из базы данных
    tournaments = list(tournaments_collection.find().sort("id", 1))  # Сортируем по id
    for item in tournaments:
        item["_id"] = str(item["_id"])  # Преобразуем ObjectId в строку
    return tournaments

# Эндпоинт для получения будущих турниров (фильтрация по start_date)
@app.get("/get-upcoming-tournaments")
def get_upcoming_tournaments():
    current_date = datetime.now()
    # Получаем будущие турниры
    upcoming_tournaments = list(tournaments_collection.find({
        "start_date": {"$gt": current_date}
    }).sort("start_date", 1))

    for item in upcoming_tournaments:
        item["_id"] = str(item["_id"])  # Преобразуем ObjectId в строку
    return upcoming_tournaments


@app.post("/add-tournament")
async def add_tournament(tournament: dict):
    # Проверяем количество турниров в коллекции
    current_tournaments_count = tournaments_collection.count_documents({})

    # Если записей меньше 5, вставляем новый турнир
    if True:
        # Генерируем id для нового турнира (самый большой id + 1)
        latest_tournament = tournaments_collection.find().sort("id", -1).limit(1)
        last_tournament = list(latest_tournament)

        new_id = str(int(last_tournament[0]["id"]) + 1) if last_tournament else "1"

        # Формируем новый документ турнира
        tournament_data = {
            "id": new_id,
            "name": tournament["name"],
            "logo": tournament["logo"],
            "start_date": tournament["start_date"],
            "end_date": tournament["end_date"],
            "number_of_teams": tournament["number_of_teams"],
            "number_of_players_in_one_team": tournament["number_of_players_in_one_team"]
        }

        # Вставляем новый турнир в коллекцию
        tournaments_collection.insert_one(tournament_data)

        return JSONResponse(content={"message": "Турнир добавлен!", "tournament_id": new_id}, status_code=200)
    else:
        raise HTTPException(status_code=400, detail="Количество турниров в базе данных уже больше или равно 5")
    
def create_fake_data():
    # Удаляем все существующие записи

    # Добавляем команды
    teams = [
        {"id": 1, "name": "Team Alpha", "logo": "team_alpha_logo.png"},
        {"id": 2, "name": "Team Beta", "logo": "team_beta_logo.png"},
    ]
    teams_collection.insert_many(teams)

    # Добавляем игроков
    players = [
        {
            "team_id": 1 if i < 5 else 2,
            "lastname": f"Lastname{i + 1}",
            "firstname": f"Firstname{i + 1}",
            "patronymic": f"Patronymic{i + 1}",
            "nickname": f"Player{i + 1}",
            "tg": "",
            "vk": "",
            "phone": f"90934068{i + 30}",
            "password": "123456",
            "is_admin": None,
        }
        for i in range(10)
    ]
    users_collection.insert_many(players)

# Вызываем создание данных при запуске приложения
if teams_collection.count_documents({}) < 1:
    create_fake_data()

@app.get("/get-all-teams")
def get_all_teams():
    teams = list(teams_collection.find({}, {"_id": 0}))
    return teams

# Эндпоинт для получения всех игроков
@app.get("/get-all-players")
def get_all_players():
    players = list(users_collection.find({"team_id": {"$ne": None}}, {"_id": 0}))
    return players

# Запуск сервера, если файл вызывается напрямую
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8080, reload=True)