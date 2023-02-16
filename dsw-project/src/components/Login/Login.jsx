import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

import { useForm } from "react-hook-form";

const Login = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  let App = () => (
    <div className="container">
      <div className="login">
        <h1 className="text-center">Bem vindo!</h1>
        <form
          className="needs-validation"
          id="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group was-validated">
            <label className="form-label" htmlFor="username">
              Nome de Usúario
            </label>
            <input
              className="form-control"
              type="text"
              id="user"
              {...register("user")}
              required
            />
            <div className="invalid-feedback">Informe seu nome de Usuário</div>
          </div>
          <div className="form-group was-validated">
            <label className="form-label" htmlFor="password">
              Senha
            </label>
            <input
              className="form-control"
              type="password"
              security=""
              id="password"
              {...register("password")}
              required
            />
            <div className="invalid-feedback">Informe sua senha</div>
          </div>
          <div className="form-group form-check">
            <input className="form-check-input" type="checkbox" id="check" onClick={showPassword} />
            <label className="form-check-label" htmlFor="check">
              Mostrar senha
            </label>
          </div>
          <input
            className="btn btn-success w-100"
            type="submit"
            value="Entrar"
          />
        </form>
      </div>
    </div>
  );

  function showPassword(){
    let password = document.querySelector("#password");
    password.setAttribute("type", password.getAttribute("type") === "password" ? "text" : "password");
  }

  return (
    <>
      <App></App>
    </>
  );
};

export default Login;
