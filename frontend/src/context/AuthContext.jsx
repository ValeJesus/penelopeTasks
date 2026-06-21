import { createContext, useContext, useEffect, useState } from "react";
import { login as loginRequest, buscarUsuarioAtual } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function restaurarSessao() {
      const token = localStorage.getItem("token");
      if (!token) {
        setCarregando(false);
        return;
      }
      try {
        const dadosUsuario = await buscarUsuarioAtual();
        setUsuario(dadosUsuario);
      } catch {
        localStorage.removeItem("token");
      } finally {
        setCarregando(false);
      }
    }
    restaurarSessao();
  }, []);

  async function login(email, senha) {
    const { access_token } = await loginRequest(email, senha);
    localStorage.setItem("token", access_token);
    const dadosUsuario = await buscarUsuarioAtual();
    setUsuario(dadosUsuario);
  }

  function logout() {
    localStorage.removeItem("token");
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, carregando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth precisa ser usado dentro de um AuthProvider");
  }
  return context;
}
