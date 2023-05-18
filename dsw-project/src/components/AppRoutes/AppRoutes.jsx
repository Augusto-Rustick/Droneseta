import { Route, BrowserRouter, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { lazy } from "react";
import NotLogged from "../../pages/Login/NotLogged";
import Register from "../../pages/Register/Register";
import useAuth from "../../hooks/useAuth";
import Seeder from "../../pages/Seeder/Seeder";
import Produto from "../../pages/Produto/Produto";
import Carrinho from "../../pages/Carrinho/Carrinho";
import Configuracoes from "../../pages/Configuracoes/Configuracoes";


const AppWrapper = lazy(() => import("../AppWrapper/AppWrapper"));
const Home = lazy(() => import("../../pages/Home/Home"));
const Login = lazy(() => import("../../pages/Login/Login"));
const DevMenu = lazy(() => import("../../pages/DevMenu/DevMenu"));

function AppRoutes() {
  const ComponentHandler = ({ comp }) => {
    const { signed } = useAuth();
    let user = localStorage.getItem("user_logged");
    return user ? comp : <NotLogged />;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppWrapper />}>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dev" element={<DevMenu />} />
            <Route path="/seeder" element={<Seeder />} />
            <Route path="/produto" element={<Produto />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            
            <Route
              path="/about"
              element={<ComponentHandler comp={<p>Teste</p>} />}
            />
            <Route
              path="/offers"
              element={<ComponentHandler comp={<p>Teste</p>} />}
            />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
