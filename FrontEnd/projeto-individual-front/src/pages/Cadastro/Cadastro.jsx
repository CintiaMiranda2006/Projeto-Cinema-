import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { cadastrarFilme } from "../../services/filmeService";

function Cadastro() {
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
      await cadastrarFilme({
        ...filme,
        ano: Number(filme.ano),
        duracao: Number(filme.duracao),
        classificacao: Number(filme.classificacao)
      });

      navigate("/");
    } catch (erro) {
      console.error(erro);
      setErro(erro.message);
    }
  }

  return (
    <div>
      <Header />

      <h1>Cadastrar Filme</h1>

      {erro && <p>{erro}</p>}

      <form onSubmit={enviarFormulario}>
        <input
          name="titulo"
          placeholder="Título"
          value={filme.titulo}
          onChange={alterarCampo}
        />

        <input
          name="genero"
          placeholder="Gênero"
          value={filme.genero}
          onChange={alterarCampo}
        />

        <input
          name="diretor"
          placeholder="Diretor"
          value={filme.diretor}
          onChange={alterarCampo}
        />

        <input
          name="ano"
          type="number"
          placeholder="Ano"
          value={filme.ano}
          onChange={alterarCampo}
        />

        <input
          name="duracao"
          type="number"
          placeholder="Duração em minutos"
          value={filme.duracao}
          onChange={alterarCampo}
        />

        <select
          name="classificacao"
          value={filme.classificacao}
          onChange={alterarCampo}
        >
          <option value="">Classificação</option>
          <option value="0">Livre</option>
          <option value="10">10 anos</option>
          <option value="12">12 anos</option>
          <option value="14">14 anos</option>
          <option value="16">16 anos</option>
          <option value="18">18 anos</option>
        </select>

        <textarea
          name="sinopse"
          placeholder="Sinopse"
          value={filme.sinopse}
          onChange={alterarCampo}
        />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;