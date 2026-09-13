import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import {
  buscarFilmePorId,
  atualizarFilme
} from "../../services/filmeService";
import styles from "./Editar.module.css";

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
    <div className={styles.container}>
      <Header />

      <main className={styles.conteudo}>
        <h1 className={styles.titulo}>Editar Filme</h1>

        {erro && (
          <p className={styles.mensagemErro}>
            {erro}
          </p>
        )}

        <form className={styles.formulario} onSubmit={enviarFormulario}>
          <div className={styles.campo}>
            <label className={styles.label}>Título</label>
            <input
              className={styles.input}
              name="titulo"
              value={filme.titulo}
              onChange={alterarCampo}
              placeholder="Título"
            />
          </div>

          <div className={styles.campo}>
            <label className={styles.label}>Gênero</label>
            <input
              className={styles.input}
              name="genero"
              value={filme.genero}
              onChange={alterarCampo}
              placeholder="Gênero"
            />
          </div>

          <div className={styles.campo}>
            <label className={styles.label}>Diretor</label>
            <input
              className={styles.input}
              name="diretor"
              value={filme.diretor}
              onChange={alterarCampo}
              placeholder="Diretor"
            />
          </div>

          <div className={styles.campo}>
            <label className={styles.label}>Ano</label>
            <input
              className={styles.input}
              name="ano"
              type="number"
              value={filme.ano}
              onChange={alterarCampo}
              placeholder="Ano"
            />
          </div>

          <div className={styles.campo}>
            <label className={styles.label}>Duração</label>
            <input
              className={styles.input}
              name="duracao"
              type="number"
              value={filme.duracao}
              onChange={alterarCampo}
              placeholder="Duração"
            />
          </div>

          <div className={styles.campo}>
            <label className={styles.label}>Classificação</label>
            <select
              className={styles.select}
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
          </div>

          <div className={styles.campo}>
            <label className={styles.label}>Sinopse</label>
            <textarea
              className={styles.textarea}
              name="sinopse"
              value={filme.sinopse}
              onChange={alterarCampo}
              placeholder="Sinopse"
            />
          </div>

          <button
            className={styles.botaoSalvar}
            type="submit"
          >
            Salvar alterações
          </button>

          <Link
            className={styles.botaoCancelar}
            to={`/filmes/${id}`}
          >
            Cancelar
          </Link>
        </form>
      </main>
    </div>
  );
}

export default Editar;