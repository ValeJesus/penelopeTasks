import api from "./api";

export async function login(email, senha) {
  // O backend usa OAuth2PasswordRequestForm: precisa ser form-urlencoded,
  // com "username" carregando o e-mail
  const params = new URLSearchParams();
  params.append("username", email);
  params.append("password", senha);

  const response = await api.post("/login", params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return response.data; // { access_token, token_type }
}

export async function cadastrar(nome, email, senha) {
  const response = await api.post("/users/", { nome, email, senha });
  return response.data;
}

export async function buscarUsuarioAtual() {
  const response = await api.get("/me");
  return response.data;
}
