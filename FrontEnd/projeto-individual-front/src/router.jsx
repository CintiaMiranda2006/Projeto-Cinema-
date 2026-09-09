import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cadastro from "./pages/Cadastro/Cadastro";
import Detalhes from "./pages/Detalhes/Detalhes";
import Editar from "./pages/Editar/Editar";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>Erro</div>
  },
  {
    path: "/cadastro",
    element: <Cadastro />
  },
  {
    path: "/filmes/:id",
    element: <Detalhes />
  },
  {
  path: "/filmes/:id/editar",
  element: <Editar />
}
]);

export default router;