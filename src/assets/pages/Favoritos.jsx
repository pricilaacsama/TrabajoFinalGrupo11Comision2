import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useProductos } from "../hooks/useProductos"
import {useAuth} from '../hooks/useAuth'
import "../../App.css"


function Favoritos(){
const {productos,borrarProducto,agregarProductos,modificarProductos,marcarFavorito} = useProductos();
const {user} = useAuth();
  const productosList = productos.filter((producto) => producto.estado);
  const productosActivos = productosList.filter((p) => p.favorito);

    const esAdmin = user?.rol === "ADMINISTRATIVO";


  return (
    <Container className="productos-container">
      <h2 className="productos-titulo">
        🛒 Lista de Favoritos
      </h2>
      {productosActivos.length === 0 ? (
        <p className="text-center fs-5 text-muted">No hay productos favoritos.</p>
      ) : (
        <Row>
          {productosActivos.map((producto) => (
            <Col key={producto.id} md={6} lg={4} className="mb-4">
              <Card className="producto-card">
                <Card.Img
                  variant="top"
                  src={producto.imagen}
                  alt={producto.nombre}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="fs-5 fw-semibold text-dark mb-3 text-center">
                    {producto.nombre}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted text-center">
                    ${producto.precio}
                  </Card.Subtitle>
                  <div className="d-flex flex-wrap gap-2 justify-content-center mt-3">
                    {esAdmin && (
                    <Button variant="outline-danger" size="sm" onClick={()=>borrarProducto(producto.id)}>
                      Eliminar
                    </Button>
                    )}
                    {/* ✅ Botón Detalles con Link */}
                    <Button
                      as={Link}
                      to={`/detalle/${producto.id}`}
                      variant="outline-primary"
                      size="sm"
                    >
                      Detalles
                    </Button>
                    <span
                      onClick={() => marcarFavorito(producto.id)}
                      style={{ cursor: "pointer", fontSize: "1.5rem" }}
                      title="Marcar como favorito"
                      className="favorito-icon"
                    >
                      {producto.favorito ? "❤️" : "🤍"}
                    </span>

                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
export default Favoritos;
