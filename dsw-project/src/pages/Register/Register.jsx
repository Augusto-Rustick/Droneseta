import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Register = () => {

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = (data) => {
    const res = signup(data.email, data.password);

    if (res) {
      if (res === 401){
        setFieldState({"user" : errorTypes.UserAlreadyExists})
      }
      return;
    }

    alert("usuário cadastrado com sucesso!")
    navigate("/home");
  };


  const errorTypes = {
    PasswordUnmatch: "Senhas não são iguais!",
    PasswordInvalid: "",
    PasswordTooshort: "A senha deve ter no minímo 6 caractéres!",
    UserInvalid: "O nome de usuário deve conter um email válido!",
    UserAlreadyExists : "O usuário informado já foi cadastrado!",
    None: "",
  };

  const [fieldStates, setFieldState] = useState({
    user: "",
    "password-group original": "",
    "password-group repeat": "",
  });

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    let isValid = checkData(data);
    if (isValid){
      handleSignup(data)
    }
  };

  let App = () => (
    <div className="container unblocked">
      <div className="login">
        <h1 className="text-center">Novo usuário</h1>
        <form id="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group" id="user-group">
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
          <div className="form-group" id="password-group original">
            <label className="form-label" htmlFor="password">
              Senha
            </label>
            <input
              className="form-control"
              type="password"
              name="new-password"
              autocomplete="new-password"
              security=""
              id="password"
              {...register("password")}
              required
            />
            <div className="text-danger text-sm-left">
              {fieldStates["password-group original"]}
            </div>
          </div>
          <div className="form-group" id="password-group repeat">
            <label className="form-label" htmlFor="password">
              Repita a senha
            </label>
            <input
              className="form-control"
              type="password"
              security=""
              autoComplete="new-password"
              {...register("passwordRepeat")}
              required
            />
            <div className="text-danger text-sm-left">
              {fieldStates["password-group repeat"]}
            </div>
          </div>
          <input
            className="btn btn-success w-100"
            type="submit"
            value="Cadastrar"
          />
        </form>
      </div>
    </div>
  );

  function checkData(data) {
    let isValid = true;
    if (!data.user.includes("@")) {
      setFieldState({ user: errorTypes.UserInvalid });
      isValid = false;
    } else if (data.password.length < 6) {
      setFieldState({ "password-group original": errorTypes.PasswordTooshort });
      isValid = false;
    } else if (data.password !== data.passwordRepeat) {
      setFieldState({ "password-group repeat": errorTypes.PasswordUnmatch });
      isValid = false;
    } else {
      setFieldState({
        user: "",
        "password-group original": "",
        "password-group repeat": "",
      });
    }

    return isValid;
  }

  return (
    <>
      <App />
    </>
  );
};

export default Register;
