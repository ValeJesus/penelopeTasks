import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { criarTarefa } from "../services/taskService";

export default function NovaTarefa() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("MEDIA");
  const [categoria, setCategoria] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(evento) {
    evento.preventDefault();
    setErro("");
    setEnviando(true);

    try {
      await criarTarefa({
        titulo,
        descricao: descricao || null,
        prioridade,
        categoria: categoria || null,
      });
      navigate("/", { replace: true });
    } catch {
      setErro("Não foi possível criar a tarefa. Verifique os dados e tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div>
      <div className="cabecalho-pagina">
        <div>
          <h1>Nova tarefa</h1>
          <p>Descreva o que precisa ser feito.</p>
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
            autoFocus
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
        </div>

        <div className="acoes-formulario">
          <Link to="/" className="botao botao--secundario">
            Cancelar
          </Link>
          <button type="submit" className="botao botao--primario" disabled={enviando}>
            {enviando ? <span className="spinner" /> : "Criar tarefa"}
          </button>
        </div>
      </form>
    </div>
  );
}
