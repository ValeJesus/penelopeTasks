# Penelope Task Manager

Sistema web completo para gerenciamento de tarefas desenvolvido com **React**, **FastAPI** e **SQLite/PostgreSQL**.

O objetivo do projeto é permitir que usuários criem, visualizem, atualizem e removam tarefas de forma simples, rápida e organizada.

---

# Sobre o Projeto

O Penelope Task Manager é uma aplicação Full Stack baseada em arquitetura cliente-servidor.

O sistema oferece funcionalidades de gerenciamento de tarefas através de uma interface moderna desenvolvida em React e uma API REST construída com FastAPI.

---

# Funcionalidades

## Gerenciamento de Tarefas

- Criar tarefas
- Visualizar tarefas
- Editar tarefas
- Excluir tarefas
- Marcar tarefas como concluídas
- Filtrar tarefas por status
- Buscar tarefas por nome

## Gerenciamento de Usuários

- Cadastro de usuários
- Login
- Logout
- Atualização de perfil

## Segurança

- Autenticação JWT
- Senhas criptografadas
- Controle de acesso

---

# Tecnologias Utilizadas

## Frontend

- React
- Vite
- Axios
- React Router DOM
- CSS3

## Backend

- Python 3.12+
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

## Banco de Dados

- SQLite (desenvolvimento)
- PostgreSQL (produção)

## Controle de Versão

- Git
- GitHub

---

# Arquitetura do Projeto

```text
Penelope-Task-Manager
│
├── backend
│   ├── app
│   │   ├── models
│   │   ├── schemas
│   │   ├── routes
│   │   ├── services
│   │   ├── database
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── routes
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
