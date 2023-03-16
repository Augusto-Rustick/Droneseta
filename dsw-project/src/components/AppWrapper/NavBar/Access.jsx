import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Access = () => {
  const { signed, signout } = useAuth();
  const navigate = useNavigate();

  function handleSignOut(){
    signout()
    navigate("/login")
  }

  if (!signed) {
    return (
      <>
        <NavDropdown.Item as={Link} to="/login">
          Entrar
        </NavDropdown.Item>
      </>
    );
  } else {
    return (
      <>
        <NavDropdown.Item onClick={handleSignOut}>Sair</NavDropdown.Item>
      </>
    );
  }
};

export default Access;
