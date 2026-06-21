from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.auth import criar_access_token, get_usuario_atual, verificar_senha
from app.database.database import get_db
from app.models.user import User
from app.schemas.user_schema import UserResponse

router = APIRouter(
    tags=["Auth"]
)


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    # form_data.username recebe o e-mail digitado no login
    usuario = db.query(User).filter(User.email == form_data.username).first()

    if not usuario or not verificar_senha(form_data.password, usuario.senha):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = criar_access_token(dados={"sub": usuario.email})

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.get("/me", response_model=UserResponse)
def ler_usuario_atual(usuario_atual: User = Depends(get_usuario_atual)):
    return usuario_atual
