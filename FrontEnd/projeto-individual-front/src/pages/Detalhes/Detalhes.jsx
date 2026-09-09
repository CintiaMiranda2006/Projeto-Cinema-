import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import {
  buscarFilmePorId,
  excluirFilme
} from "../../services/filmeService";

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
    <div>
      <Header />

      {erro && <p>{erro}</p>}

      {filme && (
        <div>
          <h1>{filme.titulo}</h1>

          <p>Gênero: {filme.genero}</p>
          <p>Diretor: {filme.diretor}</p>
          <p>Ano: {filme.ano}</p>
          <p>Duração: {filme.duracao} minutos</p>
          <p>Classificação: {filme.classificacao}</p>
          <p>Sinopse: {filme.sinopse}</p>

          <button onClick={deletarFilme}>
            Excluir filme
          </button>

          <Link to="/">Voltar</Link>
          <Link to={`/filmes/${id}/editar`}>
            Editar filme
          </Link>
        </div>
      )}
    </div>
  );
}

export default Detalhes;