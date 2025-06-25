import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Form, Alert, Container } from "react-bootstrap";

function Recuperar() {
  const [email, setEmail] = useState("");
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const navigate = useNavigate();

  const buscarUsuario = (e) => {
    e.preventDefault();
    const usuarios = JSON.parse(localStorage.getItem("users")) || [];
    const usuario = usuarios.find((u) => u.username === email);

    if (usuario) {
      setFoundUser(usuario);
      setStep(2);
      setError("");
    } else {
      setError("No se encontró un usuario con ese correo.");
    }
  };

  const cambiarPassword = (e) => {
    e.preventDefault();
    if (nuevaPassword !== confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("users")) || [];
    const index = usuarios.findIndex((u) => u.username === foundUser.username);

    if (index !== -1) {
      usuarios[index].password = nuevaPassword;
      localStorage.setItem("users", JSON.stringify(usuarios));
      alert("Contraseña actualizada correctamente.");
      navigate("/login");
    } else {
      setError("Error al actualizar la contraseña.");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "100%", maxWidth: "400px" }} className="p-4 shadow">
        <Card.Body>
          <Card.Title className="mb-4 text-center">Recuperar Contraseña</Card.Title>

          {error && <Alert variant="danger">{error}</Alert>}

          {step === 1 && (
            <Form onSubmit={buscarUsuario}>
              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresá tu correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Buscar
              </Button>
            </Form>
          )}

          {step === 2 && (
            <>
              <Alert variant="info">
                <strong>Contraseña anterior:</strong> {foundUser.password}
              </Alert>
              <Form onSubmit={cambiarPassword}>
                <Form.Group className="mb-3">
                  <Form.Label>Nueva Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Nueva contraseña"
                    value={nuevaPassword}
                    onChange={(e) => setNuevaPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirmar Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirmar contraseña"
                    value={confirmarPassword}
                    onChange={(e) => setConfirmarPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="success" type="submit" className="w-100">
                  Actualizar Contraseña
                </Button>
              </Form>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Recuperar;
