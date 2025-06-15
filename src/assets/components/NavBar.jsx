import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';

function NavBar() {
const { login, user, isAuthenticated, logout} = useAuth();

const navigate = useNavigate();

const manejarLogout = () => {
  logout();
  navigate("/");
}

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/home">Programacion Visual</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/favoritos">Favoritos</Nav.Link>
                {user?.rol === "ADMINISTRATIVO" && (
                  <Nav.Link as={Link} to="/crear">Crear Producto</Nav.Link>
                )}
                <Nav.Link as={Link} to="/acerca">Acerca del Grupo</Nav.Link>
              </>
            )}

            {!isAuthenticated && (
              <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
            )}
          </Nav>

          {isAuthenticated && (
            <Button variant="outline-light" onClick={manejarLogout}>
              Cerrar Sesión
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;