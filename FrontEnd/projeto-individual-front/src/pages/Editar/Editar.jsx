import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import {
  buscarFilmePorId,
  atualizarFilme
} from "../../services/filmeService";

function Editar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState({
    titulo: "",
    genero: "",
    diretor: "",
    ano: "",
    duracao: "",
    classificacao: "",
    sinopse: ""
  });

  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarFilme() {
      try {
        const dados = await buscarFilmePorId(id);
        setFilme(dados);
      } catch (erro) {
        setErro(erro.message);
      }
    }

    carregarFilme();
  }, [id]);

  function alterarCampo(event) {
    const { name, value } = event.target;

    setFilme({
      ...filme,
      [name]: value
    });
  }

  async function enviarFormulario(event) {
    event.preventDefault();

    try {
      await atualizarFilme(id, {
        ...filme,
        ano: Number(filme.ano),
        duracao: Number(filme.duracao),
        classificacao: Number(filme.classificacao)
      });

      navigate(`/filmes/${id}`);
    } catch (erro) {
      setErro(erro.message);
    }
  }

  return (
    <div>
      <Header />

      <h1>Editar Filme</h1>

      {erro && <p>{erro}</p>}

      <form onSubmit={enviarFormulario}>
        <input
          name="titulo"
          value={filme.titulo}
          onChange={alterarCampo}
          placeholder="Título"
        />

        <input
          name="genero"
          value={filme.genero}
          onChange={alterarCampo}
          placeholder="Gênero"
        />

        <input
          name="diretor"
          value={filme.diretor}
          onChange={alterarCampo}
          placeholder="Diretor"
        />

        <input
          name="ano"
          type="number"
          value={filme.ano}
          onChange={alterarCampo}
          placeholder="Ano"
        />

        <input
          name="duracao"
          type="number"
          value={filme.duracao}
          onChange={alterarCampo}
          placeholder="Duração"
        />

        <select
          name="classificacao"
          value={filme.classificacao}
          onChange={alterarCampo}
        >
          <option value="0">Livre</option>
          <option value="10">10 anos</option>
          <option value="12">12 anos</option>
          <option value="14">14 anos</option>
          <option value="16">16 anos</option>
          <option value="18">18 anos</option>
        </select>

        <textarea
          name="sinopse"
          value={filme.sinopse}
          onChange={alterarCampo}
          placeholder="Sinopse"
        />

        <button type="submit">
          Salvar alterações
        </button>
      </form>
    </div>
  );
}

export default Editar;