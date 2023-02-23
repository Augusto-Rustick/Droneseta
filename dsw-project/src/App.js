import { Route, BrowserRouter, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React, {lazy} from "react";

const NavWrapper = lazy(() => import("./components/NavigationBar/NavigationBar"))
const Home = lazy(() => import("./pages/Home/Home"))
const Login = lazy(() => import("./pages/Login/Login"))

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavWrapper/>}>
            <Route path="/home" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/about" component={<p>Teste</p>} />
            <Route path="/offers" component={<p>Teste</p>} />
            <Route path="/products" component={<p>Teste</p>} />
            <Route path="/offers" component={<p>Teste</p>} />
            <Route path="/config" component={<p>Teste</p>} />
            <Route path="/recover" component={<p>Teste</p>} />
            <Route path="/orders" component={<p>Teste</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
