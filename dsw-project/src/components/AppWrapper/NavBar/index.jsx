import Access from "./Access";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { useState } from "react";

function NavBarOffCanvas() {
  const mode = "dark";

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
            style={{backgroundColor: "rgba(255,255,255)", borderLeft: '100px solid rgba(0,0,0,0)' }}
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
                  to="/products"
                >
                  Produtos
                </Nav.Link>
                <hr style={{marginTop:'-3px', marginBottom:'-3px', backgroundColor:'gray', height:'5px'}}/>
                <Nav.Link
                  onClick={() => {
                    handleDissmis();
                  }}
                  as={Link}
                  to="/offers"
                >
                  Ofertas
                </Nav.Link>
                <hr style={{marginTop:'-3px', marginBottom:'-3px', backgroundColor:'gray', height:'5px'}}/>
                <Nav.Link
                  onClick={() => {
                    handleDissmis();
                  }}
                  as={Link}
                  to="/orders"
                >
                  Pedidos
                </Nav.Link>
                <hr style={{marginTop:'-3px', marginBottom:'-3px', backgroundColor:'gray', height:'5px'}}/>
                <Nav.Link
                  // style={{ padding:'2px',border: '1px solid black', backgroundColor: 'grey', textAlign:'center', top: '50%', borderRadius: '5px', height:'35px' }}
                  onClick={() => {
                    handleDissmis();
                  }}
                  as={Link}
                  to="/config"
                >
                  Configurações
                </Nav.Link>
                <hr style={{marginTop:'-3px', marginBottom:'-3px', backgroundColor:'gray', height:'5px'}}/>
                <Access
                  onClick={() => {
                    handleDissmis();
                  }}
                />
                <hr style={{marginTop:'-3px', marginBottom:'-3px', backgroundColor:'gray', height:'5px'}}/>
                <br />
                {/* <Image
                  src="/images/user.png"
                  className="user"
                  roundedCircle={true}
                ></Image> */}
                <Nav.Link href="#" disabled></Nav.Link>
              </Nav>
              {/* <Form className="d-flex">
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
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </Button>
              </Form> */}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBarOffCanvas;
