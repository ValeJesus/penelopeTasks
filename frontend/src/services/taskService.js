import api from "./api";

export async function listarTarefas(statusFiltro) {
  const params = statusFiltro ? { status_filtro: statusFiltro } : {};
  const response = await api.get("/tasks/", { params });
  return response.data;
}

export async function buscarTarefa(id) {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
}

export async function criarTarefa(dados) {
  const response = await api.post("/tasks/", dados);
  return response.data;
}

export async function atualizarTarefa(id, dados) {
  const response = await api.put(`/tasks/${id}`, dados);
  return response.data;
}

export async function excluirTarefa(id) {
  await api.delete(`/tasks/${id}`);
}
