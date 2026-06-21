import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import AppShell from "./routes/AppShell";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";
import NovaTarefa from "./pages/NovaTarefa";
import EditarTarefa from "./pages/EditarTarefa";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          <Route
            element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/tarefas/nova" element={<NovaTarefa />} />
            <Route path="/tarefas/:id/editar" element={<EditarTarefa />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
