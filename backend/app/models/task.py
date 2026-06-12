from sqlalchemy import Column, Integer, String, ForeignKey
from backend.app import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    descricao = Column(String)
    status = Column(String, default="PENDENTE")

    usuario_id = Column(Integer, ForeignKey("users.id"))