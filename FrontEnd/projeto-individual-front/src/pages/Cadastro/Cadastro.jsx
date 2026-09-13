import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { cadastrarFilme } from "../../services/filmeService";
import styles from "./Cadastro.module.css";

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
    <div className={styles.container}>
      <Header />

      <main className={styles.conteudo}>
        <h1 className={styles.titulo}>Cadastrar Filme</h1>

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
              placeholder="Título"
              value={filme.titulo}
              onChange={alterarCampo}
            />
          </div>

          <div className={styles.campo}>
            <label className={styles.label}>Gênero</label>
            <input
              className={styles.input}
              name="genero"
              placeholder="Gênero"
              value={filme.genero}
              onChange={alterarCampo}
            />
          </div>

          <div className={styles.campo}>
            <label className={styles.label}>Diretor</label>
            <input
              className={styles.input}
              name="diretor"
              placeholder="Diretor"
              value={filme.diretor}
              onChange={alterarCampo}
            />
          </div>

          <div className={styles.campo}>
            <label className={styles.label}>Ano</label>
            <input
              className={styles.input}
              name="ano"
              type="number"
              placeholder="Ano"
              value={filme.ano}
              onChange={alterarCampo}
            />
          </div>

          <div className={styles.campo}>
            <label className={styles.label}>Duração</label>
            <input
              className={styles.input}
              name="duracao"
              type="number"
              placeholder="Duração em minutos"
              value={filme.duracao}
              onChange={alterarCampo}
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
              <option value="">Classificação</option>
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
              placeholder="Sinopse"
              value={filme.sinopse}
              onChange={alterarCampo}
            />
          </div>

          <button className={styles.botao} type="submit">
            Cadastrar
          </button>
        </form>
      </main>
    </div>
  );
}

export default Cadastro;