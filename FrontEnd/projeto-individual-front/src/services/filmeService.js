const API_URL = "http://localhost:8080/filmes";

export async function listarFilmes() {
  const resposta = await fetch(API_URL);

  if (!resposta.ok) {
    throw new Error("Erro ao buscar os filmes");
  }

  return resposta.json();
}

export async function buscarFilmePorId(id) {
  const resposta = await fetch(`${API_URL}/${id}`);

  if (!resposta.ok) {
    throw new Error("Filme não encontrado");
  }

  return resposta.json();
}

export async function cadastrarFilme(filme) {
  const resposta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(filme)
  });

  if (resposta.status === 400) {
    throw new Error("Dados inválidos");
  }

  if (resposta.status === 409) {
    throw new Error("Esse filme já está cadastrado");
  }

  if (!resposta.ok) {
    throw new Error("Erro ao cadastrar filme");
  }

  return resposta.json();
}