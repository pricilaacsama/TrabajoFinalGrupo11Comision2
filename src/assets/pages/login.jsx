import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import {useAuth} from "../hooks/useAuth";

function Login() {
  const { login, isLoading, user, isAuthenticated} = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(credentials);
    if (result.success) {
      navigate("/home");
    } else {
      setError(result.message || "Error de autenticación");
    }
  };

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card className="p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              placeholder="Ingrese su usuario"
            />
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
            />
          </Form.Group>

          {error && <p className="text-danger">{error}</p>}

          <div className="text-center">
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? "Cargando..." : "Ingresar"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default Login;
