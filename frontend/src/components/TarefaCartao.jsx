import { Link } from "react-router-dom";

const ROTULOS_STATUS = {
  PENDENTE: { texto: "Pendente", classe: "etiqueta--pendente" },
  EM_ANDAMENTO: { texto: "Em andamento", classe: "etiqueta--andamento" },
  CONCLUIDA: { texto: "Concluída", classe: "etiqueta--concluida" },
};

const ROTULOS_PRIORIDADE = {
  ALTA: { texto: "Alta", classe: "etiqueta--prioridade-alta" },
  MEDIA: { texto: "Média", classe: "etiqueta--prioridade-media" },
  BAIXA: { texto: "Baixa", classe: "etiqueta--prioridade-baixa" },
};

export default function TarefaCartao({ tarefa, onExcluir }) {
  const status = ROTULOS_STATUS[tarefa.status] ?? ROTULOS_STATUS.PENDENTE;
  const prioridade = ROTULOS_PRIORIDADE[tarefa.prioridade] ?? ROTULOS_PRIORIDADE.MEDIA;

  return (
    <div className="cartao-tarefa">
      <div className="cartao-tarefa__principal">
        <div className="cartao-tarefa__topo">
          <h3 className="cartao-tarefa__titulo">{tarefa.titulo}</h3>
        </div>
        {tarefa.descricao && (
          <p className="cartao-tarefa__descricao">{tarefa.descricao}</p>
        )}
        <div className="cartao-tarefa__meta">
          <span className={`etiqueta ${status.classe}`}>{status.texto}</span>
          <span className={`etiqueta ${prioridade.classe}`}>{prioridade.texto}</span>
          {tarefa.categoria && (
            <span className="etiqueta etiqueta--categoria">{tarefa.categoria}</span>
          )}
        </div>
      </div>

      <div className="cartao-tarefa__acoes">
        <Link to={`/tarefas/${tarefa.id}/editar`} className="botao botao--secundario botao--pequeno">
          Editar
        </Link>
        <button
          className="botao botao--perigo botao--pequeno"
          onClick={() => onExcluir(tarefa.id)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
