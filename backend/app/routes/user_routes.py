from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.user import User
from app.schemas.user_schema import UserCreate

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.post("/")
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    usuario_existente = db.query(User).filter(
        User.email == user.email
    ).first()

    if usuario_existente:
        raise HTTPException(
            status_code=400,
            detail="E-mail já cadastrado"
        )

    novo_usuario = User(
        nome=user.nome,
        email=user.email,
        senha=user.senha
    )

    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)

    return novo_usuario


@router.get("/")
def list_users(
    db: Session = Depends(get_db)
):
    return db.query(User).all()