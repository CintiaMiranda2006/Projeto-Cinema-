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
    <div>
      <Header />

      <h1>Filmes</h1>

      {erro && <p>{erro}</p>}

      {filmes.map((filme) => (
        <div key={filme.id}>
          <h2>{filme.titulo}</h2>
          <p>Gênero: {filme.genero}</p>
          <p>Diretor: {filme.diretor}</p>

          <Link to={`/filmes/${filme.id}`}>
            Ver detalhes
          </Link>
        </div>
      ))}
    </div>
  );
}


export default Home;
