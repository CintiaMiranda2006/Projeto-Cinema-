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
    throw new Error("400 - Dados inválidos");
  }

  if (resposta.status === 409) {
    throw new Error("409 - Esse filme já está cadastrado");
  }

  if (!resposta.ok) {
    throw new Error(`Erro ao cadastrar filme - HTTP ${resposta.status}`);
  }

  return resposta.json();
}

export async function excluirFilme(id) {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (resposta.status === 404) {
    throw new Error("Filme não encontrado");
  }

  if (!resposta.ok) {
    throw new Error(`Erro ao excluir filme - HTTP ${resposta.status}`);
  }
}

export async function atualizarFilme(id, filme) {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(filme)
  });

  if (resposta.status === 400) {
    throw new Error("Dados inválidos");
  }

  if (resposta.status === 404) {
    throw new Error("Filme não encontrado");
  }

  if (resposta.status === 409) {
    throw new Error("Já existe outro filme com esse título e gênero");
  }

  if (!resposta.ok) {
    throw new Error(`Erro ao atualizar filme - HTTP ${resposta.status}`);
  }

  return resposta.json();
}