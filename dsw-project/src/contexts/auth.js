import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

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
        return;
      } else {
        return 401; // incorreto
      }
    } else {
      return 404; // não existente
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
    console.log("adnsqudhsyg")
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
