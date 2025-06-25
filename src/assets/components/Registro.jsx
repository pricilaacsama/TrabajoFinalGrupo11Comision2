import { useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//import "../App.css";


function Registro() {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [correoExistente, setCorreoExistente] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        const formElement = e.currentTarget;
        e.preventDefault();

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
        const contraseñaValida = form.password.length >= 6;
        const coincide = form.password === form.confirmPassword;

        if (formElement.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        // Verificamos si ya existe ese usuario en localStorage
        const usuariosGuardados = JSON.parse(localStorage.getItem("users")) || [];
        const existeCorreo = usuariosGuardados.some((u) => u.username === form.email);

        if (existeCorreo) {
            setCorreoExistente(true);
            return;
        } else {
            setCorreoExistente(false);
        }

        // Validaciones personalizadas
        if (form.password.length < 6 || form.password !== form.confirmPassword) {
            setValidated(true);
            return;
        }

        const nuevoUsuario = {
            id: Date.now().toString(),
            username: form.email,
            password: form.password,
            name: form.name,
            rol: "CLIENTE", // Por defecto
        };

        const nuevosUsuarios = [...usuariosGuardados, nuevoUsuario];
        localStorage.setItem("users", JSON.stringify(nuevosUsuarios));

        alert("¡Registro exitoso! Ahora podés iniciar sesión.");
        navigate("/login");
    };

    return (
        <Container className="my-5">
            <Card className="shadow border-0 rounded-4 p-4 mx-auto" style={{ maxWidth: "600px" }}>
                <h2 className="text-center mb-4 text-primary">Registro de Usuario</h2>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group controlId="formNombre" className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Tu nombre"
                            required
                            pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
                        />
                        <Form.Control.Feedback type="invalid">
                            El nombre no debe contener números ni caracteres especiales.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="ejemplo@email.com"
                            required
                            isInvalid={correoExistente}
                        />
                        <Form.Control.Feedback type="invalid">
                            {correoExistente
                                ? "Este correo ya está registrado."
                                : "Ingresá un correo válido."}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Mínimo 6 caracteres"
                                    required
                                    minLength={6}
                                />
                                <Form.Control.Feedback type="invalid">
                                    La contraseña debe tener al menos 6 caracteres.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="formConfirmPassword" className="mb-3">
                                <Form.Label>Confirmar Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    isInvalid={
                                        validated && form.password !== form.confirmPassword
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    Las contraseñas no coinciden.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="text-center mt-4">
                        <Button
                            type="submit"
                            variant="primary"
                            className="px-5 py-2 rounded-pill shadow-sm"
                        >
                            Registrarme
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
}
export default Registro;