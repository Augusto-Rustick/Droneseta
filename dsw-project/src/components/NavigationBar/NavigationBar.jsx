import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, Outlet } from "react-router-dom";
import "./NavigationBar.css";
import React, { Suspense } from "react";
import Image from "react-bootstrap/Image";
import Footer from "../Footer/Footer";
import GlobalStyle from "../styles/GlobalStyle";
import Access from "./Access";

function NavigationBar() {
  const mode = "dark";

  const NavBar = () => (
    <>
      <Navbar fixed="top" bg={mode} variant={mode} expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/home">
            Droneseta
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/products">
                Produtos
              </Nav.Link>
              <Nav.Link as={Link} to="/offers">
                Ofertas
              </Nav.Link>
              <NavDropdown title="Perfil" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/orders">
                  Meus Pedidos
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/config">
                  Configurações
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <Access />
              </NavDropdown>
              <Image
                src="./user.png"
                className="user"
                roundedCircle={true}
              ></Image>
              <Nav.Link href="#" disabled></Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );

  return (
    <>
      <NavBar />
      <Suspense fallback={<p>Aguardando resposta do servidor</p>}>
        <Outlet />
      </Suspense>
      <Footer />
      <GlobalStyle />
    </>
  );
}

export default NavigationBar;
