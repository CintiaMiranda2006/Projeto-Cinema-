import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import {
  buscarFilmePorId,
  excluirFilme
} from "../../services/filmeService";
import styles from "./Detalhes.module.css";

function Detalhes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarFilme() {
      try {
        const dados = await buscarFilmePorId(id);
        setFilme(dados);
      } catch (erro) {
        console.error(erro);
        setErro("Não foi possível carregar o filme.");
      }
    }

    carregarFilme();
  }, [id]);

  async function deletarFilme() {
    try {
      await excluirFilme(id);
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
        {erro && (
          <p className={styles.mensagemErro}>
            {erro}
          </p>
        )}

        {filme && (
          <div className={styles.cardDetalhes}>
            <h1 className={styles.titulo}>
              {filme.titulo}
            </h1>

            <p className={styles.informacao}>
              Gênero: {filme.genero}
            </p>

            <p className={styles.informacao}>
              Diretor: {filme.diretor}
            </p>

            <p className={styles.informacao}>
              Ano: {filme.ano}
            </p>

            <p className={styles.informacao}>
              Duração: {filme.duracao} minutos
            </p>

            <p className={styles.informacao}>
              Classificação: {filme.classificacao}
            </p>

            <p className={styles.sinopse}>
              Sinopse: {filme.sinopse}
            </p>

            <div className={styles.acoes}>
              <Link
                className={styles.botaoVoltar}
                to="/"
              >
                Voltar
              </Link>

              <Link
                className={styles.botaoEditar}
                to={`/filmes/${id}/editar`}
              >
                Editar filme
              </Link>

              <button
                className={styles.botaoExcluir}
                onClick={deletarFilme}
              >
                Excluir filme
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Detalhes;