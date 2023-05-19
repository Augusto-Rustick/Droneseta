import Access from "./Access";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { useState } from "react";

function NavBarOffCanvas() {
  const mode = "dark";
  const user = JSON.parse(localStorage.getItem("user_logged"));
  const [expand, setExpand] = useState("md");

  function handleDissmis() {
    setExpand(false);
    setTimeout(() => {
      setExpand("md");
    }, 25);
  }

  return (
    <>
      <Navbar
        fixed="top"
        key={expand}
        bg={mode}
        expand={expand}
        variant={mode}
        className="mb-3"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/home">
            Droneseta
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
            style={{ backgroundColor: "rgba(255,255,255)", borderLeft: '100px solid rgba(0,0,0,0)' }}
          >
            <Offcanvas.Header
              closeButton
              style={{ backgroundColor: "rgba(255,175,50)" }}
            >
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Opções
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "500px" }}
                navbarScroll
              >
                <Nav.Link
                  onClick={() => {
                    handleDissmis();
                  }}
                  as={Link}
                  to="/produto"
                >
                  Produtos
                </Nav.Link>
                <hr style={{ marginTop: '-3px', marginBottom: '-3px', backgroundColor: 'gray', height: '5px' }} />
                {(user && user.user.is_admin) && (
                  <>
                    <Nav.Link
                      onClick={() => {
                        handleDissmis();
                      }}
                      as={Link}
                      to="/orders"
                    >
                      Pedidos
                    </Nav.Link>
                  </>
                )}
                {(user && !user.user.is_admin) && (
                  <>
                    <Nav.Link
                      onClick={() => {
                        handleDissmis();
                      }}
                      as={Link}
                      to="/carrinho"
                    >
                      Carrinho
                    </Nav.Link>
                    <hr style={{ marginTop: '-3px', marginBottom: '-3px', backgroundColor: 'gray', height: '5px' }} />
                    <Nav.Link
                      onClick={() => {
                        handleDissmis();
                      }}
                      as={Link}
                      to="/configuracoes"
                    >
                      Configurações
                    </Nav.Link>
                    <hr style={{ marginTop: '-3px', marginBottom: '-3px', backgroundColor: 'gray', height: '5px' }} />
                    <Nav.Link
                      onClick={() => {
                        handleDissmis();
                      }}
                      as={Link}
                      to="/cartao"
                    >
                      Cartões
                    </Nav.Link>
                  </>
                )}
                <hr style={{ marginTop: '-3px', marginBottom: '-3px', backgroundColor: 'gray', height: '5px' }} />
                <Access
                  onClick={() => {
                    handleDissmis();
                  }}
                />
                <hr style={{ marginTop: '-3px', marginBottom: '-3px', backgroundColor: 'gray', height: '5px' }} />
                <br />
                <Nav.Link href="#" disabled></Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBarOffCanvas;
