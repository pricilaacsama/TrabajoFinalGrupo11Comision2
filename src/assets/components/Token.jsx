import { useEffect, useState } from "react";
import { generarToken, validoToken } from "../Utilities/usarToken"
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {Card, Button,Container, Alert} from 'react-bootstrap'
import "../../App.css"

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
        <Container className="form-container">
      {/* Notificación tipo "email enviado" */}
      <div className="token-mensaje-flotante">
        <strong className="text-primary">📩 Código enviado:</strong>
        <div className="token-codigo">{token[0]}</div>
      </div>

      <Card className="form-card">
        <Card.Body>
          <h4 className="token-titulo">Validar Código de Seguridad</h4>

          <div className="mb-3">
            <label htmlFor="tokenInput" className="form-label">Ingrese el token recibido</label>
            <input
              type="number"
              className="form-control token-input"
              placeholder="Ej: 123456"
              value={ingresoToken}
              onChange={(e) => setIngresoToken(e.target.value)}
              disabled={intentos >= 3}
            />
          </div>

          <Button
            variant="primary"
            className="token-boton"
            onClick={validarToken}
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