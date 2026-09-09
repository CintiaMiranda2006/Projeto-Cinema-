package school.sptech.projeto_individual_back.controller;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;
import school.sptech.projeto_individual_back.model.Filme;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/filmes")
public class FilmeController {

    private boolean existePorId(Integer id){
        String sql = "Select count(*) from filmes where id = ?";

        Integer quantidade = jdbcTemplate.queryForObject(
                sql,
                Integer.class,
                id
        );

        return quantidade != null && quantidade > 0;
    }

    private final JdbcTemplate jdbcTemplate;

    public FilmeController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;

    }

    @GetMapping
    public ResponseEntity<List<Filme>> listarFilmes(){
        String sql = "Select * from filmes;";
        List<Filme> filmes = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Filme.class));

        return ResponseEntity.status(200).body(filmes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Filme> buscarFilmePorId(@PathVariable int id){

        String sql = "Select * from filmes where id = ?;";

        try{
            Filme filme =jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Filme.class), id);
            return  ResponseEntity.status(200).body(filme);
        }catch (EmptyResultDataAccessException e){
            return  ResponseEntity.status(404).build();
        }

    }

    @PostMapping
    public ResponseEntity<Filme> cadastrarFilme (@RequestBody Filme filme){

    if(filme.getTitulo() == null || filme.getTitulo().isBlank()
        || filme.getGenero() == null || filme.getGenero().isBlank()
        || filme.getDiretor() == null || filme.getDiretor().isBlank()
        || filme.getAno() == null || filme.getAno() <= 1887
        || filme.getDuracao() == null || filme.getDuracao() <=0
        || filme.getClassificacao() == null ||
            (filme.getClassificacao() != 0 &&
                    filme.getClassificacao() != 10 &&
                    filme.getClassificacao() != 12 &&
                    filme.getClassificacao() != 14 &&
                    filme.getClassificacao() != 16 &&
                    filme.getClassificacao() != 18)
        || filme.getSinopse() == null || filme.getSinopse().isBlank()){

        return ResponseEntity.status(400).build();
    }

    String sqlVerificacao =
            "Select Count(*) from filmes where lower(titulo) = lower(?) and lower(genero) = lower(?);";

    Integer quantidade =jdbcTemplate.queryForObject(
        sqlVerificacao,
            Integer.class,
            filme.getTitulo(),
            filme.getGenero()
    );

    if(quantidade > 0){
        return  ResponseEntity.status(409).build();
    }

    String sql =
        "Insert into filmes (titulo, genero, diretor, ano, duracao,classificacao,sinopse) values (?,?,?,?,?,?,?);";

    KeyHolder keyHolder = new GeneratedKeyHolder();

    jdbcTemplate.update(con -> {
        PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
        ps.setString(1,filme.getTitulo());
        ps.setString(2,filme.getGenero());
        ps.setString(3,filme.getDiretor());
        ps.setInt(4,filme.getAno());
        ps.setInt(5,filme.getDuracao());
        ps.setInt(6,filme.getClassificacao());
        ps.setString(7,filme.getSinopse());

        return ps;
    },keyHolder);

    Number chaveGerada = keyHolder.getKey();

    if (chaveGerada != null) {
            filme.setId(chaveGerada.intValue());
        }

    return ResponseEntity.status(201).body(filme);

    }

    @PutMapping("/{id}")
    public ResponseEntity<Filme> atualizar(@RequestBody Filme filme, @PathVariable Integer id){

        if (!existePorId(id)){
            return ResponseEntity.notFound().build();
        }

        if(filme.getTitulo() == null || filme.getTitulo().isBlank()
                || filme.getGenero() == null || filme.getGenero().isBlank()
                || filme.getDiretor() == null || filme.getDiretor().isBlank()
                || filme.getAno() == null || filme.getAno() <= 1887
                || filme.getDuracao() == null || filme.getDuracao() <=0
                || filme.getClassificacao() == null ||
                (filme.getClassificacao() != 0 &&
                        filme.getClassificacao() != 10 &&
                        filme.getClassificacao() != 12 &&
                        filme.getClassificacao() != 14 &&
                        filme.getClassificacao() != 16 &&
                        filme.getClassificacao() != 18)
                || filme.getSinopse() == null || filme.getSinopse().isBlank()){

            return ResponseEntity.status(400).build();
        }

        String sqlVerificacao =
                "SELECT COUNT(*) FROM filmes " +
                        "WHERE lower(titulo) = lower(?) " +
                        "AND lower(genero) = lower(?) " +
                        "AND id <> ?";

        Integer quantidade = jdbcTemplate.queryForObject(
                sqlVerificacao,
                Integer.class,
                filme.getTitulo(),
                filme.getGenero(),
                id
        );

        if (quantidade != null && quantidade > 0) {
            return ResponseEntity.status(409).build();
        }

        String sql = "update filmes set titulo = ?, genero = ?, diretor = ?, ano = ?, duracao = ?, classificacao = ?, sinopse = ? where id = ?";

        jdbcTemplate.update(
                sql,
                filme.getTitulo(),
                filme.getGenero(),
                filme.getDiretor(),
                filme.getAno(),
                filme.getDuracao(),
                filme.getClassificacao(),
                filme.getSinopse(),
                id
        );

        filme.setId(id);

        return ResponseEntity.status(200).body(filme);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(
            @PathVariable Integer id
    ) {
        if (!existePorId(id)) {
            return ResponseEntity.notFound().build();
        }

        String sql = """
            DELETE FROM filmes
            WHERE id = ?
            """;

        jdbcTemplate.update(sql, id);

        return ResponseEntity.noContent().build();
    }

}
