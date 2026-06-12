from fastapi import FastAPI

app = FastAPI(
    title="Penelope Task Manager",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "mensagem": "API funcionando!"
    }