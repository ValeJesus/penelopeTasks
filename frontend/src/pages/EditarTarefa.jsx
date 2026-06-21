import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { buscarTarefa, atualizarTarefa } from "../services/taskService";

export default function EditarTarefa() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("PENDENTE");
  const [prioridade, setPrioridade] = useState("MEDIA");
  const [categoria, setCategoria] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        const tarefa = await buscarTarefa(id);
        setTitulo(tarefa.titulo);
        setDescricao(tarefa.descricao ?? "");
        setStatus(tarefa.status);
        setPrioridade(tarefa.prioridade);
        setCategoria(tarefa.categoria ?? "");
      } catch {
        setErro("Não foi possível carregar esta tarefa.");
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, [id]);

  async function handleSubmit(evento) {
    evento.preventDefault();
    setErro("");
    setEnviando(true);

    try {
      await atualizarTarefa(id, {
        titulo,
        descricao: descricao || null,
        status,
        prioridade,
        categoria: categoria || null,
      });
      navigate("/", { replace: true });
    } catch {
      setErro("Não foi possível salvar as alterações. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  if (carregando) {
    return (
      <div className="estado-vazio">
        <p>Carregando tarefa...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="cabecalho-pagina">
        <div>
          <h1>Editar tarefa</h1>
          <p>Atualize os detalhes ou o andamento.</p>
        </div>
      </div>

      <form className="formulario-tarefa" onSubmit={handleSubmit}>
        {erro && <div className="erro-formulario">{erro}</div>}

        <div className="campo">
          <label htmlFor="titulo">Título</label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <div className="grade-campos">
          <div className="campo">
            <label htmlFor="status">Status</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="PENDENTE">Pendente</option>
              <option value="EM_ANDAMENTO">Em andamento</option>
              <option value="CONCLUIDA">Concluída</option>
            </select>
          </div>

          <div className="campo">
            <label htmlFor="prioridade">Prioridade</label>
            <select
              id="prioridade"
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
            >
              <option value="BAIXA">Baixa</option>
              <option value="MEDIA">Média</option>
              <option value="ALTA">Alta</option>
            </select>
          </div>
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <input
            id="categoria"
            type="text"
            placeholder="Ex: Estudos"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
        </div>

        <div className="acoes-formulario">
          <Link to="/" className="botao botao--secundario">
            Cancelar
          </Link>
          <button type="submit" className="botao botao--primario" disabled={enviando}>
            {enviando ? <span className="spinner" /> : "Salvar alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}
