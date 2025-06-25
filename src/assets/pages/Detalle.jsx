import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Button, Card } from "react-bootstrap";
import { useProductos } from "../hooks/useProductos";
import {useAuth} from '../hooks/useAuth';
import "../../App.css"


function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { productos, marcarFavorito } = useProductos();
  const { user } = useAuth();

  const esAdmin = user?.rol === "ADMINISTRATIVO";


  //const producto = productos.find((p) => p.id === id);
  const producto = productos.find((p) => String(p.id) === id);


  if (!producto) {
    return (
      <Container className="py-5 text-center">
        <h2>Producto no encontrado</h2>
        <Button onClick={() => navigate("/home")} className="mt-3">
          Volver al inicio
        </Button>
      </Container>
    );
  }

  return (
    <Container className="detalle-container">
  <Card className="detalle-card">
    <Card.Img
      variant="top"
      src={producto.imagen}
      alt={producto.nombre}
      className="detalle-img"
    />
    <Card.Body>
      <Card.Title className="detalle-titulo">{producto.nombre}</Card.Title>
      <Card.Subtitle className="detalle-precio">
        ${producto.precio}
      </Card.Subtitle>
      <Card.Text className="detalle-descripcion">
        {producto.descripcion}
      </Card.Text>
      <p className="detalle-categoria">
        Categoría: <span>{producto.categoria}</span>
      </p>

      <div className="detalle-botones">
        <Button variant="primary" onClick={() => navigate("/home")}>
          ← Volver al inicio
        </Button>
        {esAdmin && (
          <Button
            as={Link}
            to={`/editar/${producto.id}`}
            variant="outline-success"
            size="sm"
            className="btn-accion"
          >
            Modificar
          </Button>
        )}
        <span
          onClick={() => marcarFavorito(producto.id)}
          className="favorito-icon"
          title="Marcar como favorito"
        >
          {producto.favorito ? "❤️" : "🤍"}
        </span>
      </div>
    </Card.Body>
  </Card>
</Container>
  );
}

export default Detalle;
