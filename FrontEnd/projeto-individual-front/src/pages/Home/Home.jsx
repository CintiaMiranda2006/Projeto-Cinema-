import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import { listarFilmes } from "../../services/filmeService";

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarFilmes() {
      try {
        const dados = await listarFilmes();
        setFilmes(dados);
      } catch (erro) {
        console.error(erro);
        setErro("Não foi possível carregar os filmes.");
      }
    }

    carregarFilmes();
  }, []);

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.conteudo}>
        <h1 className={styles.titulo}>Filmes</h1>

        {erro && (
          <p className={styles.mensagemErro}>
            {erro}
          </p>
        )}

        {filmes.length === 0 && !erro && (
          <p className={styles.semFilmes}>
            Nenhum filme cadastrado.
          </p>
        )}

        <div className={styles.listaFilmes}>
          {filmes.map((filme) => (
            <div className={styles.card} key={filme.id}>
              <h2 className={styles.cardTitulo}>
                {filme.titulo}
              </h2>

              <p className={styles.informacao}>
                Gênero: {filme.genero}
              </p>

              <p className={styles.informacao}>
                Diretor: {filme.diretor}
              </p>

              <Link
                className={styles.linkDetalhes}
                to={`/filmes/${filme.id}`}
              >
                Ver detalhes
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;