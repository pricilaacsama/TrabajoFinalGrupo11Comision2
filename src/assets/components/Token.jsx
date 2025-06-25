import { useEffect, useState } from "react";
import { generarToken, validoToken } from "../Utilities/usarToken"
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {Card, Button,Container, Alert} from 'react-bootstrap'

export function ValidarToken() {
    const [token, setToken] = useState(generarToken);    //Se crea una variable de estado iniciado con operacion Genera el token
    const [ingresoToken, setIngresoToken] = useState("");
    const [mensaje, setMensaje] = useState("")   //Mensaje
    const [intentos, setIntentos] = useState(0);
    const { user, autenticarToken, isAuthenticated, logout } = useAuth();      // Para autenticar usuario si ingresa token correctamente
    const navigate = useNavigate();

    useEffect(() => {
    if (intentos >= 3) {
      logout();
      setTimeout(() => navigate("/login"), 3000); //lo redirecciona a login despues de 3 intentos
    }
  }, [intentos, navigate]);


    const validarToken = () => {
        const tiempoValido = 30000; //10000 milisegundos = 10 seg de tiempo para ingresar token

        
        if (intentos < 3) {
            const validacion = validoToken(tiempoValido, token, ingresoToken);    //validoToken devuelve [valido(true/false),mensaje]
            if (validacion[0]) {
                if (!!user) {
                    autenticarToken(true);  //user autenticado
                    navigate("/home");
                }
                else {
                    navigate("/login")
                }
            }
            else {
                setMensaje(validacion[1]);
                setIntentos(intentos + 1)
            }
        }
        else {
            setMensaje("Se ha superado el numero de intentos permitidos (" + intentos + ")")
        }
    }
    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light position-relative">
      {/* Notificación tipo correo del token */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        backgroundColor: '#f8f9fa',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        maxWidth: '250px',
        borderLeft: '5px solid #0d6efd'
      }}>
        <strong className="text-primary">📩 Código enviado:</strong>
        <div className="mt-2 text-muted fs-5 fw-bold">{token[0]}</div>
      </div>

      <Card className="shadow p-4 border-0 w-100" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h4 className="mb-4 text-center">Validar Código de Seguridad</h4>

          <div className="mb-3">
            <label htmlFor="tokenInput" className="form-label">Ingrese el token recibido</label>
            <input
              type="number"
              className="form-control rounded-3 shadow-sm"
              placeholder="Ej: 123456"
              value={ingresoToken}
              onChange={(e) => setIngresoToken(e.target.value)}
              disabled={intentos >= 3}
            />
          </div>

          <Button
            variant="primary"
            className="w-100 rounded-3"
            onClick={() => validarToken()}
            disabled={intentos >= 3}
          >
            Validar
          </Button>

          {mensaje && (
            <Alert variant={intentos >= 3 ? "danger" : "warning"} className="mt-3 text-center">
              {mensaje}
              {intentos >= 3 && <div>Redirigiendo al login...</div>}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
    )
}