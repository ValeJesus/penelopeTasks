import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AppShell() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="app-shell">
      <header className="topo">
        <Link to="/" className="topo__marca">
          PenélopeTasks
        </Link>
        <div className="topo__usuario">
          <span>{usuario?.nome}</span>
          <button className="botao botao--secundario botao--pequeno" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </header>

      <main className="conteudo">
        <Outlet />
      </main>
    </div>
  );
}
