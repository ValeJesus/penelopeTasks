from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    descricao = Column(String)
    status = Column(String, default="PENDENTE")
    prioridade = Column(String, default="MEDIA")
    categoria = Column(String, nullable=True)

    usuario_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    usuario = relationship("User", back_populates="tasks")
