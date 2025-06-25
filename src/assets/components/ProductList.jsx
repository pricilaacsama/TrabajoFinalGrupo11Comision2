import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";
import { useAuth } from '../hooks/useAuth';
import "../../App.css"

function ProductList() {
  const { productos, borrarProducto, modificarProducto, marcarFavorito, cargando } = useProductos();
  const { user } = useAuth();

  const productosActivos = productos.filter((p) => p.estado);
  const esAdmin = user?.rol === "ADMINISTRATIVO";

  if (cargando) {
    return (
      <Container className="text-center mt-5">
        <p className="fs-4 text-muted">Cargando productos...</p>
      </Container>
    );
  }

  return (
    <Container className="productos-container">
      <h2 className="productos-titulo text-center mb-4">
        🛍️ Productos Disponibles
      </h2>

      {productosActivos.length === 0 ? (
        <p className="text-center fs-5 text-muted">No hay productos activos.</p>
      ) : (
        <Row>
          {productosActivos.map((producto) => (
            <Col key={producto.id} md={6} lg={4} className="mb-4">
              <Card className="producto-card shadow-sm border-0">
                <Card.Img
                  variant="top"
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="producto-img"
                />
                <Card.Body className="d-flex flex-column align-items-center">
                  <Card.Title className="producto-nombre text-center">
                    {producto.nombre}
                  </Card.Title>
                  <Card.Subtitle className="producto-precio mb-3 text-muted text-center">
                    ${producto.precio}
                  </Card.Subtitle>

                  <div className="d-flex flex-wrap justify-content-center gap-2 mt-auto">
                    {esAdmin && (
                      <>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="btn-accion"
                          onClick={() => borrarProducto(producto.id)}
                        >
                          Eliminar
                        </Button>
                        <Button
                          as={Link}
                          to={`/editar/${producto.id}`}
                          variant="outline-success"
                          size="sm"
                          className="btn-accion"
                        >
                          Modificar
                        </Button>
                      </>
                    )}

                    <Button
                      as={Link}
                      to={`/detalle/${producto.id}`}
                      variant="outline-primary"
                      size="sm"
                      className="btn-accion"
                    >
                      Detalles
                    </Button>

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
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default ProductList;
