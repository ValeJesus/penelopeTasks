from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth import gerar_hash_senha
from app.database.database import get_db
from app.models.user import User
from app.schemas.user_schema import UserCreate, UserResponse

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/", response_model=UserResponse)
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
        senha=gerar_hash_senha(user.senha)
    )

    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)

    return novo_usuario


@router.get("/", response_model=list[UserResponse])
def list_users(
    db: Session = Depends(get_db)
):
    return db.query(User).all()