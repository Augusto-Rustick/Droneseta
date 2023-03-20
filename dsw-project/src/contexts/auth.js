import { createContext, useEffect, useState } from "react";
import useNotification from "../hooks/useNotification";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const { showNotification, NotificationsType } = useNotification();

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
          type: NotificationsType.success,
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
        return 401;
      }
    } else {
      showNotification({
        type: "danger",
        title: "Não encontrado!",
        description: "O usuário inserido não existe",
      });
      return 404;
    }
  };

  const signup = (email, password) => {
    const userStorage = localStorage.getItem("user_db");

    const hasUser = JSON.parse(userStorage)?.filter(
      (user) => user.email === email
    );

    if (hasUser?.length) {
      return 401; // já existe
    }

    let newUser;

    if (userStorage) {
      newUser = [...userStorage, { email, password }];
    } else {
      newUser = [{ email, password }];
    }

    localStorage.setItem("user_db", JSON.stringify(newUser));

    return;
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
