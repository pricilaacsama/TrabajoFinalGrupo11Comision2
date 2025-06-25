import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import "../../App.css"; // Asegurate de importarlo


function Login() {
  const { login, isLoading, user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const [error, setError] = useState("");

  useEffect(() => {
    logout();
  }, [])

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;

    e.preventDefault();

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }


    const result = await login(credentials);
    if (result.success) {
      navigate("/token");
    } else {
      setError(result.message || "Error de autenticación");
      setValidated(true);
    }
  };

  return (
    <Container className="py-5 d-flex justify-content-center form-container">
      <Card className="form-card">
        <h2 className="form-title">Iniciar Sesión</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="email"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              placeholder="Ingrese su usuario"
              isInvalid={validated && !credentials.username}
            />
            <Form.Control.Feedback type="invalid">
              Ingresá un correo válido.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="Ingrese su contraseña"
              minLength={6}
              isInvalid={validated && credentials.password.length < 6}
            />
            <Form.Control.Feedback type="invalid">
              La contraseña debe tener al menos 6 caracteres.
            </Form.Control.Feedback>
          </Form.Group>

          {error && <p className="text-danger">{error}</p>}

          <div className="text-center">
            <Button type="submit" variant="primary" className="form-button" disabled={isLoading}>
              {isLoading ? "Cargando..." : "Ingresar"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default Login;
