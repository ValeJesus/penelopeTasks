import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarTarefas, excluirTarefa } from "../services/taskService";
import TarefaCartao from "../components/TarefaCartao";

const FILTROS = [
  { valor: null, rotulo: "Todas" },
  { valor: "PENDENTE", rotulo: "Pendentes" },
  { valor: "EM_ANDAMENTO", rotulo: "Em andamento" },
  { valor: "CONCLUIDA", rotulo: "Concluídas" },
];

export default function Dashboard() {
  const [tarefas, setTarefas] = useState([]);
  const [filtroAtivo, setFiltroAtivo] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarTarefas(filtroAtivo);
  }, [filtroAtivo]);

  async function carregarTarefas(filtro) {
    setCarregando(true);
    setErro("");
    try {
      const dados = await listarTarefas(filtro);
      setTarefas(dados);
    } catch {
      setErro("Não foi possível carregar suas tarefas. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  async function handleExcluir(id) {
    const confirmou = window.confirm("Excluir esta tarefa?");
    if (!confirmou) return;

    const tarefasAnteriores = tarefas;
    setTarefas(tarefas.filter((t) => t.id !== id));

    try {
      await excluirTarefa(id);
    } catch {
      setTarefas(tarefasAnteriores);
      setErro("Não foi possível excluir a tarefa. Tente novamente.");
    }
  }

  return (
    <div>
      <div className="cabecalho-pagina">
        <div>
          <h1>Tarefas aquiii</h1>
          <p>Suas tarefas aqui.</p>
        </div>
        <Link to="/tarefas/nova" className="botao botao--primario" style={{ width: "auto" }}>
          + Nova tarefa
        </Link>
      </div>

      <div className="filtros">
        {FILTROS.map((filtro) => (
          <button
            key={filtro.rotulo}
            className={`filtro-chip ${filtroAtivo === filtro.valor ? "ativo" : ""}`}
            onClick={() => setFiltroAtivo(filtro.valor)}
          >
            {filtro.rotulo}
          </button>
        ))}
      </div>

      {erro && <div className="erro-formulario">{erro}</div>}

      {carregando ? (
        <div className="estado-vazio">
          <p>Carregando tarefas...</p>
        </div>
      ) : tarefas.length === 0 ? (
        <div className="estado-vazio">
          <div className="estado-vazio__simbolo">—</div>
          <h2>Nenhuma tarefa por enquanto</h2>
          <p>Crie a primeira
          </p>
          <Link to="/tarefas/nova" className="botao botao--primario" style={{ width: "auto" }}>
            + Nova tarefa
          </Link>
        </div>
      ) : (
        <div className="lista-tarefas">
          {tarefas.map((tarefa) => (
            <TarefaCartao key={tarefa.id} tarefa={tarefa} onExcluir={handleExcluir} />
          ))}
        </div>
      )}
    </div>
  );
}
