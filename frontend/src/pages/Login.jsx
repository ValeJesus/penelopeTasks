import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
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
      await login(email, senha);
      navigate("/", { replace: true });
    } catch (erroRequisicao) {
      if (erroRequisicao.response?.status === 401) {
        setErro("E-mail ou senha incorretos.");
      } else {
        setErro("Não foi possível entrar agora. Tente novamente.");
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
        <h1>Entrar</h1>
        <p className="subtitulo">Organize seu dia com clareza.</p>

        {erro && <div className="erro-formulario">{erro}</div>}

        <form onSubmit={handleSubmit}>
          <div className="campo">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
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
            />
          </div>

          <button type="submit" className="botao botao--primario" disabled={enviando}>
            {enviando ? <span className="spinner" /> : "Entrar"}
          </button>
        </form>

        <p className="rodape-auth">
          Ainda não tem conta? <Link to="/cadastro">Criar conta</Link>
        </p>
      </div>
    </div>
  );
}
