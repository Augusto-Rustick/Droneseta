import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const NotLogged = () => {
  return (
    <div className="container blocked">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        fill="currentColor"
        class="bi bi-person-lock"
        viewBox="0 0 16 16"
      >
        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 5.996V14H3s-1 0-1-1 1-4 6-4c.564 0 1.077.038 1.544.107a4.524 4.524 0 0 0-.803.918A10.46 10.46 0 0 0 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h5ZM9 13a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2Zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1Z" />
      </svg>
      <div>Você deve estar logado para acessar essa seção!</div>
      <Link to="/login"> Entrar </Link>
    </div>
  );
};

export default NotLogged;
