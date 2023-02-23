import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Access = () => {
  const { signed, signout } = useAuth();

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
        <NavDropdown.Item onClick={signout}>Sair</NavDropdown.Item>
      </>
    );
  }
};

export default Access;
