import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";

export default function Footer() {
  return (
    <MDBFooter bgColor="dark" className="text-center text-lg-start text-muted">
      <section className="">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"/>
        <MDBContainer className="text-center text-md-start mt-5 h-auto text-light bg-dark">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto py-5">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                Descrição
              </h6>
              <p>
              Somos uma empresa especializada em soluções tecnológicas para o seu negócio. 
              Oferecemos serviços de desenvolvimento web, mobile e desktop, além de consultoria em TI. 
              Nossa equipe é formada por profissionais experientes e apaixonados pelo que fazem. Juntos, 
              podemos transformar a sua ideia em realidade.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto py-5">
              <h6 className="text-uppercase fw-bold mb-4">Veja também</h6>
              <p>
                <a href="/products" className="text-reset">
                  Produtos
                </a>
              </p>
              <p>
                <a href="/offers" className="text-reset">
                  Ofertas
                </a>
              </p>
              <p>
                <a href="/about" className="text-reset">
                  Sobre
                </a>
              </p>
              <p>
                <a href="/suport" className="text-reset">
                  Suporte
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 py-5">
              <h6 className="text-uppercase fw-bold mb-4">Contato</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Cidade, UF Nº0000, BR
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@example.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> +00 (00)00000-0000
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2023:
        <a className="text-reset fw-bold" href="/home">
          Droneseta
        </a>
      </div>
    </MDBFooter>
  );
}
