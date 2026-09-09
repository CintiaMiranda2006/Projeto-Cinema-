import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home/Home";
import Cadastro from "./pages/Cadastro/Cadastro";
import Detalhes from "./pages/Detalhes/Detalhes";

const router = createBrowserRouter([
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
  }
]);

export default router;