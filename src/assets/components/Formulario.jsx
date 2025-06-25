import { useEffect, useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";

function Formulario() {

  const { productos, agregarProducto, modificarProducto } = useProductos();
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

  const [validated, setValidated] = useState(false);

  // Validación personalizada para URL (React-Bootstrap no la hace por defecto)
  const validarUrlImagen = (url) => {
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i;
    return urlPattern.test(url);
  };

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
    const form = e.currentTarget;

    // Previene submit si el formulario es inválido
    if (form.checkValidity() === false || !validarUrlImagen(formulario.imagen)) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }
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
    <Container className="my-5 form-container">
      <Card className="form-card" style={{ maxWidth: "720px" }}>
        <h2 className="form-title">
          {productoExistente ? "Editar Producto" : "Agregar Nuevo Producto"}
        </h2>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                <Form.Control.Feedback type="invalid">
                  Por favor ingrese el nombre del producto.
                </Form.Control.Feedback>
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
                  pattern="^[^\d]+$"
                  title="No puede contener números"
                  required
                  placeholder="Ej: Electrónica"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor ingrese una categoria válida sin números.
                </Form.Control.Feedback>
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
                  min="1"
                  step="0.01"
                  placeholder="Precio del producto"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor ingrese un precio válido mayor o igual a 0.
                </Form.Control.Feedback>
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
                  isInvalid={validated && !validarUrlImagen(formulario.imagen)}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor ingrese una URL válida de imagen (png, jpg, jpeg, gif, svg, webp).
                </Form.Control.Feedback>
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
              minLength={10}
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingrese una descripción de al menos 10 caracteres.
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex gap-3 justify-content-center mt-3">
            <Button
              variant="primary"
              type="submit"
              className="rounded-pill form-button"
            >
              {productoExistente ? "Guardar Cambios" : "Agregar Producto"}
            </Button>
            {productoExistente && (
              <Button
                variant="secondary"
                className="px-4 py-2 fs-5 rounded-pill shadow-sm"
                onClick={() => navigate("/home")}
                type="button" // importante para que no intente hacer submit
              >
                Cancelar
              </Button>)}
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