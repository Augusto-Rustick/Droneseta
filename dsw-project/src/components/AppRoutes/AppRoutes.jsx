import { Route, BrowserRouter, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { lazy } from "react";
import NotLogged from "../../pages/Login/NotLogged";
import Register from "../../pages/Register/Register";
import useAuth from "../../hooks/useAuth";

const AppWrapper = lazy(() => import("../AppWrapper/AppWrapper"));
const Home = lazy(() => import("../../pages/Home/Home"));
const Login = lazy(() => import("../../pages/Login/Login"));
const DevMenu = lazy(() => import("../../pages/DevMenu/DevMenu"));
const NewProduct = lazy(() => import("../../pages/Products/Form"));

function AppRoutes() {
  const ComponentHandler = ({ comp }) => {
    const { signed } = useAuth();
    let component;
    if (signed) {
      component = comp;
    } else {
      component = <NotLogged />;
    }
    return component;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppWrapper />}>
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
            <Route
              path="/products/new"
              element={<ComponentHandler comp={<NewProduct />} />}
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
