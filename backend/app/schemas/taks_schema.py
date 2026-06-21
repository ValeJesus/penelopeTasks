from typing import Optional

from pydantic import BaseModel, field_validator

STATUS_VALIDOS = {"PENDENTE", "EM_ANDAMENTO", "CONCLUIDA"}
PRIORIDADES_VALIDAS = {"BAIXA", "MEDIA", "ALTA"}


class TaskCreate(BaseModel):
    titulo: str
    descricao: Optional[str] = None
    status: str = "PENDENTE"
    prioridade: str = "MEDIA"
    categoria: Optional[str] = None

    @field_validator("status")
    @classmethod
    def validar_status(cls, v: str) -> str:
        if v not in STATUS_VALIDOS:
            raise ValueError(f"status deve ser um de: {', '.join(STATUS_VALIDOS)}")
        return v

    @field_validator("prioridade")
    @classmethod
    def validar_prioridade(cls, v: str) -> str:
        if v not in PRIORIDADES_VALIDAS:
            raise ValueError(f"prioridade deve ser uma de: {', '.join(PRIORIDADES_VALIDAS)}")
        return v


class TaskUpdate(BaseModel):
    titulo: Optional[str] = None
    descricao: Optional[str] = None
    status: Optional[str] = None
    prioridade: Optional[str] = None
    categoria: Optional[str] = None

    @field_validator("status")
    @classmethod
    def validar_status(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and v not in STATUS_VALIDOS:
            raise ValueError(f"status deve ser um de: {', '.join(STATUS_VALIDOS)}")
        return v

    @field_validator("prioridade")
    @classmethod
    def validar_prioridade(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and v not in PRIORIDADES_VALIDAS:
            raise ValueError(f"prioridade deve ser uma de: {', '.join(PRIORIDADES_VALIDAS)}")
        return v


class TaskResponse(BaseModel):
    id: int
    titulo: str
    descricao: Optional[str] = None
    status: str
    prioridade: str
    categoria: Optional[str] = None
    usuario_id: int

    class Config:
        from_attributes = True
