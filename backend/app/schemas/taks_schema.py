from pydantic import BaseModel

class TaskCreate(BaseModel):
    titulo: str
    descricao: str

class TaskResponse(TaskCreate):
    id: int
    status: str

    class Config:
        from_attributes = True

