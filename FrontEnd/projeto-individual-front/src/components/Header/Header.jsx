import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <h2>Projeto Cinema</h2>

      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/cadastro">Cadastrar Filme</Link>
      </nav>
    </header>
  );
}

export default Header;