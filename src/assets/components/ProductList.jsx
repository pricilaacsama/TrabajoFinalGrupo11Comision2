import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useProductos } from "../hooks/useProductos"

function ProductList() {

  const { productos, borrarProducto, agregarProductos, modificarProductos, marcarFavorito } = useProductos();
  const productosActivos = productos.filter((p) => p.estado);

  return (
    <Container>
      <h2 className="text-center mb-4 display-7 fw-bold text-dark">
        🛒 Lista de Productos
      </h2>
      {productosActivos.length === 0 ? (
        <p className="text-center fs-5 text-muted">No hay productos activos.</p>
      ) : (
        <Row>
          {productosActivos.map((producto) => (
            <Col key={producto.id} md={6} lg={4} className="mb-4">
              <Card className="shadow-sm border-0 card-hover h-100">
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
                    <Button variant="outline-danger" size="sm" onClick={() => borrarProducto(producto.id)}>
                      Eliminar
                    </Button>
                    <Button
                      as={Link}
                      to={`/editar/${producto.id}`}
                      variant="outline-success"
                      size="sm"
                    >
                      Modificar
                    </Button>
                    {/* ✅ Botón Detalles con Link */}
                    <Button
                      as={Link}
                      to={`/detalle/${producto.id}`}
                      variant="outline-primary"
                      size="sm"
                    >
                      Detalles
                    </Button>
                    <Button variant="outline-warning" size="sm" onClick={() => marcarFavorito(producto.id)}>
                      Favorito
                    </Button>
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
