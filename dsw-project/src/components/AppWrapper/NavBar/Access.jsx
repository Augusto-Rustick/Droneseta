import React from "react";
import Nav from "react-bootstrap/Nav";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Access = ({onClick}) => {
  const { signed, signout } = useAuth();
  const navigate = useNavigate();

  function handleSignOut(){
    signout()
    navigate("/login")
    onClick()
  }

  if (!signed) {
    return (
      <>
        <Nav.Link as={Link} to="/login" onClick={onClick}>
          Entrar
        </Nav.Link>
      </>
    );
  } else {
    return (
      <>
        <Nav.Link onClick={handleSignOut}>Sair</Nav.Link>
      </>
    );
  }
};

export default Access;
