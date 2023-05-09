import { createContext, useEffect, useState } from "react";
import useNotification from "../hooks/useNotification";
import axios from 'axios';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const { showNotification } = useNotification();

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const userStorage = localStorage.getItem("user_db");

    if (userToken && userStorage) {
      const hasUser = JSON.parse(userStorage)?.filter(
        (user) => user.email === JSON.parse(userToken).email
      );

      if (hasUser) {
        setUser(hasUser[0]);
      }
    }
  }, []);

  const signin = async (usuario, senha) => {
    let response = null
    const url = 'http://localhost:8080/cliente/get/' + usuario;
    try {
      response = await axios.get(url);
    } catch (error) {
      response = error.response;
    }

    return response;
  };


  const signup = async (usuario, senha) => {
    let response = null
    const url = 'http://localhost:8080/cliente/insert';
    const data = { usuario, senha, is_admin: false };

    try {
      response = await axios.post(url, data);
    } catch (error) {
      response = error.response;
    }

    return response;
  };

  const signout = () => {
    showNotification({
      type: "info",
      title: "Sucesso!",
      description: "Você foi desconectado com sucesso",
    });
    setUser(null);
    localStorage.removeItem("user_logged");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
