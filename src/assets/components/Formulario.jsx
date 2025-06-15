import { useEffect, useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";

function Formulario() {

    const {productos, agregarProducto,modificarProducto} = useProductos();
    const { id } = useParams();
    const navigate = useNavigate();

    //busca si existe el producto para editar;
  const productoExistente = productos?.find((p) => String(p.id) === id);


    const [formulario, setFormulario] = useState({
        id: '',
        nombre: '',
        descripcion: '',
        precio: '',
        categoria: '',
        imagen: '',
        //stock: '',
        estado: true,
        favorito: false,
    });

    //si es que existe precarga los datos del producto;
 useEffect(() => {
        if (productoExistente) {
            setFormulario(productoExistente);
        }
    }, [productoExistente]);

    //
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (productoExistente) {
            // si existe el producto, lo editamos
            modificarProducto(formulario);
        } else {
            // si no existe, lo creamos (asignamos un nuevo id)
           // const nuevoProducto = {
             //   ...formulario,
             //   id: Date.now(),
            //};
            agregarProducto(formulario);
        }

        // redirigimos al home
        navigate("/home");
    };


    return (
        <Container className="my-5">
      <Card className="shadow-lg border-0 rounded-4 p-4 mx-auto" style={{ maxWidth: "720px" }}>
        <h2 className="text-center mb-4 text-primary fw-bold">
          {productoExistente ? "Editar Producto" : "Agregar Nuevo Producto"}
        </h2>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  className="rounded-3 shadow-sm"
                  type="text"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Nombre del producto"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="categoria">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  className="rounded-3 shadow-sm"
                  type="text"
                  name="categoria"
                  value={formulario.categoria}
                  onChange={handleChange}
                  required
                  placeholder="Ej: Electrónica"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="precio">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  className="rounded-3 shadow-sm"
                  type="number"
                  name="precio"
                  value={formulario.precio}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="Precio del producto"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="imagen">
                <Form.Label>URL Imagen</Form.Label>
                <Form.Control
                  className="rounded-3 shadow-sm"
                  type="text"
                  name="imagen"
                  value={formulario.imagen}
                  onChange={handleChange}
                  required
                  placeholder="https://..."
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4" controlId="descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              className="rounded-3 shadow-sm"
              name="descripcion"
              value={formulario.descripcion}
              onChange={handleChange}
              rows={3}
              required
              placeholder="Descripción detallada del producto"
            />
          </Form.Group>

          <div className="text-center">
            <Button
              variant="primary"
              type="submit"
              className="px-5 py-2 fs-5 rounded-pill shadow-sm"
            >
              {productoExistente ? "Guardar Cambios" : "Agregar Producto"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>


    );

}
export default Formulario;
/*<Form.Group className="mb-3" controlId="stock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={formulario.stock}
              onChange={handleChange}
              required
              min="0"
              placeholder="Cantidad disponible"
            />
          </Form.Group>*/