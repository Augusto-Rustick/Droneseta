import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./App.css";

function NavigationBar({ content }) {
  const Clock = () => {
    const [date, setDate] = useState(new Date());

    function refreshClock() {
      setDate(new Date());
    }

    const timerId = setInterval(refreshClock, 1000);

    return <span>{date.toLocaleTimeString()}</span>;
  };

  return (
    <div>
      <Navbar bg="dark" variant={"dark"} expand="lg">
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
                <NavDropdown.Item as={Link} to="/Login">
                  Entrar
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                <Clock />
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Buscar"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Buscar</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {content}
    </div>
  );
}

export default NavigationBar;
