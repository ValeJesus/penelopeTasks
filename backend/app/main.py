from fastapi import FastAPI

from app.database.database import Base, engine
from app.routes.user_routes import router as user_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Penelope Task Manager"
)

app.include_router(user_router)


@app.get("/")
def home():
    return {
        "mensagem": "API funcionando!"
    }