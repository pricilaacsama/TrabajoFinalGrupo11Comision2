import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Error() {
  return (
    <Container className="text-center my-5">
      <h1 className="display-1 text-danger fw-bold">404</h1>
      <h2 className="mb-4">Pagina no encontrada</h2>
      <p className="text-muted mb-4">
        Lo sentimos, la pagina que estas buscando no existe o esta mal escrito.
      </p>
      <Button as={Link} to="/" variant="primary">
        Volver al inicio
      </Button>
    </Container>
  );
}

export default Error;