from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth import get_usuario_atual
from app.database.database import get_db
from app.models.task import Task
from app.models.user import User
from app.schemas.taks_schema import TaskCreate, TaskResponse, TaskUpdate

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)


def _buscar_tarefa_do_usuario(task_id: int, usuario: User, db: Session) -> Task:
    tarefa = db.query(Task).filter(Task.id == task_id).first()

    if not tarefa:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tarefa não encontrada",
        )

    if tarefa.usuario_id != usuario.id:
        # 404 em vez de 403 para não revelar que a tarefa existe e é de outro usuário
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tarefa não encontrada",
        )

    return tarefa


@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(
    task: TaskCreate,
    usuario_atual: User = Depends(get_usuario_atual),
    db: Session = Depends(get_db),
):
    nova_tarefa = Task(
        titulo=task.titulo,
        descricao=task.descricao,
        status=task.status,
        prioridade=task.prioridade,
        categoria=task.categoria,
        usuario_id=usuario_atual.id,
    )

    db.add(nova_tarefa)
    db.commit()
    db.refresh(nova_tarefa)

    return nova_tarefa


@router.get("/", response_model=list[TaskResponse])
def list_tasks(
    status_filtro: str | None = None,
    usuario_atual: User = Depends(get_usuario_atual),
    db: Session = Depends(get_db),
):
    query = db.query(Task).filter(Task.usuario_id == usuario_atual.id)

    if status_filtro:
        query = query.filter(Task.status == status_filtro)

    return query.all()


@router.get("/{task_id}", response_model=TaskResponse)
def get_task(
    task_id: int,
    usuario_atual: User = Depends(get_usuario_atual),
    db: Session = Depends(get_db),
):
    return _buscar_tarefa_do_usuario(task_id, usuario_atual, db)


@router.put("/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: int,
    task_update: TaskUpdate,
    usuario_atual: User = Depends(get_usuario_atual),
    db: Session = Depends(get_db),
):
    tarefa = _buscar_tarefa_do_usuario(task_id, usuario_atual, db)

    dados_atualizados = task_update.model_dump(exclude_unset=True)
    for campo, valor in dados_atualizados.items():
        setattr(tarefa, campo, valor)

    db.commit()
    db.refresh(tarefa)

    return tarefa


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    task_id: int,
    usuario_atual: User = Depends(get_usuario_atual),
    db: Session = Depends(get_db),
):
    tarefa = _buscar_tarefa_do_usuario(task_id, usuario_atual, db)

    db.delete(tarefa)
    db.commit()

    return None
