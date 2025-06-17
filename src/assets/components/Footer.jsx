import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


import logo from "../../img/facu.png";

function Footer() {
  return (
    <footer className="footer bg-dark text-light py-4 mt-auto">
      <Container>
        <Row className="mb-4 text-center text-md-start">
         
          <Col md={4} className="mb-3 mb-md-0 d-flex flex-column align-items-center align-items-md-start">
            <img
              src={logo}
              alt="Logo Facultad de Ingeniería UNJu"
              width="250"
              height="80"
              className="mb-2 rounded shadow-sm"
            />
            <h6 className="mb-1 text-uppercase fw-bold">Facultad de Ingeniería - UNJu</h6>
            <small className="fst-italic">Analista Programador Universitario</small>
            <small className="fst-italic">Comisión 2 - Grupo 11</small>
          </Col>

          <Col md={4} className="mb-3 mb-md-0">
            <h6 className="text-uppercase fw-bold">Integrantes</h6>
            <ul className="list-unstyled">
              <li>Juan Eduardo Lamas</li>
              <li>Delia Maribel Cusipuma</li>
              <li>Pricila Acsama</li>
            </ul>
            <small className="d-block fst-italic mt-2">  
               Proyecto Final de Programación Visual - Desarrollo de una SPA en React + Vite para la gestión de productos con uso de estado global, enrutamiento y consumo de API externa.
            </small>
          </Col>

         
          <Col md={4}>
            <h6 className="text-uppercase fw-bold">Enlaces</h6>
            <ul className="list-unstyled">
              <li><Link to="/home" className="footer-link text-decoration-none text-light">Inicio</Link></li>
              <li><Link to="/acerca" className="footer-link text-decoration-none text-light">Acerca</Link></li>
              <li><Link to="/favoritos" className="footer-link text-decoration-none text-light">Favoritos</Link></li>
            </ul>
          </Col>
        </Row>

        <hr className="border-light" />
        <p className="text-center small mb-0">
          &copy; {new Date().getFullYear()} Proyecto Final APU - Comisión 2 Grupo 11. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;