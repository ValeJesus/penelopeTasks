import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cadastrar } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(evento) {
    evento.preventDefault();
    setErro("");
    setEnviando(true);

    try {
      await cadastrar(nome, email, senha);
      await login(email, senha);
      navigate("/", { replace: true });
    } catch (erroRequisicao) {
      if (erroRequisicao.response?.status === 400) {
        setErro("Esse e-mail já está cadastrado.");
      } else if (erroRequisicao.response?.status === 422) {
        setErro("Verifique os dados informados.");
      } else {
        setErro("Não foi possível criar sua conta agora. Tente novamente.");
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="tela-auth">
      <div className="cartao-auth">
        <div className="marca-auth">
          <span className="marca-auth__simbolo">P</span>
          <span className="marca-auth__nome">Penélope</span>
        </div>
        <h1>Criar conta</h1>
        <p className="subtitulo">Comece a organizar suas tarefas hoje.</p>

        {erro && <div className="erro-formulario">{erro}</div>}

        <form onSubmit={handleSubmit}>
          <div className="campo">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="campo">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="botao botao--primario" disabled={enviando}>
            {enviando ? <span className="spinner" /> : "Criar conta"}
          </button>
        </form>

        <p className="rodape-auth">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
