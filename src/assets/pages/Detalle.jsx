import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, Card } from "react-bootstrap";
import productosData from "../data/productos.json";

function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const producto = productosData.find((p) => p.id === parseInt(id));

  if (!producto) {
    return (
      <Container className="py-5 text-center">
        <h2>Producto no encontrado</h2>
        <Button onClick={() => navigate("/")} className="mt-3">
          Volver al inicio
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card className="p-4 shadow" style={{ maxWidth: "600px", width: "100%" }}>
        <Card.Img
          variant="top"
          src={producto.imagen}
          alt={producto.nombre}
          style={{ height: "300px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title className="fs-3 fw-bold">{producto.nombre}</Card.Title>
          <Card.Subtitle className="text-muted mb-3">
            ${producto.precio}
          </Card.Subtitle>
          <Card.Text>{producto.descripcion}</Card.Text>
          <p className="text-muted">Categoría: {producto.categoria}</p>

          <div className="d-flex flex-wrap gap-2 justify-content-center mt-4">
            <Button variant="primary" onClick={() => navigate("/")}>
              ← Volver al inicio
            </Button>
            <Button variant="outline-success">
              Editar
            </Button>
            <Button variant="outline-warning">
              Favorito
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Detalle;
