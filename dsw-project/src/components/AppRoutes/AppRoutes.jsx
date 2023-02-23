import { Route, BrowserRouter, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { lazy } from "react";
import NotLogged from "../../pages/Login/NotLogged";
import Register from "../../pages/Register/Register";
import useAuth from "../../hooks/useAuth";

const NavWrapper = lazy(() => import("../NavigationBar/NavigationBar"));
const Home = lazy(() => import("../../pages/Home/Home"));
const Login = lazy(() => import("../../pages/Login/Login"));
const DevMenu = lazy(() => import("../../pages/DevMenu/DevMenu"));

function AppRoutes() {
  const ComponentHandler = ({ comp }) => {
    const { signed } = useAuth();
    return signed ? comp : <NotLogged />;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavWrapper />}>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dev" element={<DevMenu />} />
            <Route
              path="/orders"
              element={<ComponentHandler comp={<p>Teste</p>} />}
            />
            <Route
              path="/about"
              element={<ComponentHandler comp={<p>Teste</p>} />}
            />
            <Route
              path="/offers"
              element={<ComponentHandler comp={<p>Teste</p>} />}
            />
            <Route
              path="/products"
              element={<ComponentHandler comp={<p>Teste</p>} />}
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/config"
              element={<ComponentHandler comp={<p>Teste</p>} />}
            />
            <Route
              path="/recover"
              element={<ComponentHandler comp={<p>Teste</p>} />}
            />
            <Route
              path="/orders"
              element={<ComponentHandler comp={<p>Teste</p>} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
