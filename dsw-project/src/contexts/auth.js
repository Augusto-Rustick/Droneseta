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

  const signin = (email, password) => {
    const userStorage = localStorage.getItem("user_db");

    const hasUser = JSON.parse(userStorage)?.filter(
      (user) => user.email === email
    );

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser({ email, password });
        showNotification({
          type: "success",
          title: "Sucesso!",
          description:
            "Autenticação realizada com sucesso! \n Bem vindo!",
        });
        return;
      } else {
        showNotification({
          type: "danger",
          title: "Fracassou!",
          description: "A senha inserida está incorreta",
        });
        return 401; // incorreto
      }
    } else {
      showNotification({
        type: "danger",
        title: "Não encontrado!",
        description: "O usuário inserido não existe",
      });
      return 404; // não existente
    }
  };

  async function createUser(usuario, senha) {
    const url = 'http://localhost:8080/cliente/insert';
    const data = { usuario, senha, is_admin: false };
  
    try {
      const response = await axios.post(url, data);
      return response;
    } catch (error) {
      return error;
    }
  }
  
  const signup = async (user, password) => {
    const response = await createUser(user, password);
    localStorage.setItem("cliente_logado", JSON.stringify(response.data));
    return response;
  };

  const signout = () => {
    showNotification({
      type: "info",
      title: "Sucesso!",
      description: "Você foi desconectado com sucesso",
    });
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
