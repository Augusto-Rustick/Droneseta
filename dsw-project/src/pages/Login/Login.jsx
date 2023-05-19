import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { signin  } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    handleLogin(data);
  };

  const handleLogin = async (data) => {
    const res = await signin(data.user, data.password);

    // if (res.status === 400 || res.data.senha !== data.password) {
    //   setFieldState({ "user": 'Usuário ou senha incorretas' })
    //   return;
    // }

    const token = Math.random().toString(36).substring(2);
    localStorage.setItem("user_logged", JSON.stringify({ user: res.data, token }));
    navigate("/home");
  };


  function showPassword() {
    let password = document.querySelector("#password");
    password.setAttribute(
      "type",
      password.getAttribute("type") === "password" ? "text" : "password"
    );
  }

  const [fieldStates, setFieldState] = useState({
    user: "",
    password: "",
  });

  let App = () => (
    <div className="container unblocked">
      <div className="login">
        <h1 className="text-center">Bem vindo!</h1>
        <form
          className="needs-validation"
          id="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group is-validated" id="user-group">
            <label className="form-label" htmlFor="user">
              Nome de Usúario
            </label>
            <input
              className="form-control"
              type="text"
              id="user"
              {...register("user")}
              required
            />
            <div className="text-danger text-sm-left">{fieldStates["user"]}</div>
          </div>
          <div className="form-group is-validated" id="password-group">
            <label className="form-label" htmlFor="password">
              Senha
            </label>
            <input
              className="form-control"
              type="password"
              security=""
              id="password"
              {...register("password")}
              // required
            />
          </div>
          <div className="form-group form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="check"
              onClick={showPassword}
            />
            <label className="form-check-label" htmlFor="check">
              Mostrar senha
            </label>
          </div>
          <input
            className="btn btn-success w-100"
            type="submit"
            value="Entrar"
          />
          <div className="form-group">
            <br />
            <Link to="/register" htmlFor="username">
              <p className="form-label text-center">Não tem uma conta ainda?</p>
            </Link>
            <div className="invalid-feedback">Informe seu nome de Usuário</div>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <App />
    </>
  );
};

export default Login;
