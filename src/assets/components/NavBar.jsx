import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';
import { useProductos } from '../hooks/useProductos';
import "../../App.css"

function NavBar() {
const { login, user, isAuthenticated, logout} = useAuth();
const {resetFavoritos} = useProductos();

const navigate = useNavigate();

const manejarLogout = () => {
  logout();
  resetFavoritos();
  navigate("/");
}

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-aesthetic">
      <Container>
        <Navbar.Brand as={Link} to="/home" className="fw-bold">
          🚀 Click&Go
        </Navbar.Brand>
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
              <>
                <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
                <Nav.Link as={Link} to="/registrar">Registrarse</Nav.Link>
              </>
            )}
          </Nav>

          {isAuthenticated && (
            <div className="d-flex align-items-center gap-3 navbar-user-info">
              <Navbar.Text className="text-white user-welcome">
                Bienvenido, <strong>{user?.username}</strong>
              </Navbar.Text>
              <Navbar.Text className="text-white">
                Rol: <span className="badge user-rol bg-primary">{user?.rol}</span>
              </Navbar.Text>
              <Button variant="outline-light" onClick={manejarLogout} className="btn-logout">
                Cerrar Sesión
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;