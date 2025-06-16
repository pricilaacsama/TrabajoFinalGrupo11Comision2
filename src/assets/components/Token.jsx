import { useEffect, useState } from "react";
import { generarToken, validoToken } from "../Utilities/usarToken"
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function ValidarToken () {
    const [token,setToken] = useState(generarToken);    //Se crea una variable de estado iniciado con operacion Genera el token
    const [ingresoToken,setIngresoToken] = useState ("");
    const [mensaje,setMensaje] = useState("")   //Mensaje
    const [intentos,setIntentos] =useState(0);
    const {user, autenticarToken,isAuthenticated } = useAuth();      // Para autenticar usuario si ingresa token correctamente
    const navigate = useNavigate();
    
    const validarToken = () => {
        const tiempoValido = 30000; //10000 milisegundos = 10 seg de tiempo para ingresar token
        
        if (intentos < 3) {
            const validacion = validoToken(tiempoValido,token,ingresoToken);    //validoToken devuelve [valido(true/false),mensaje]
            if(validacion[0]) {
                if(!!user) {
                autenticarToken(true);  //user autenticado
                navigate("/home");
                }
                else {
                    navigate("/login")
                }
            }
            else {
                setMensaje(validacion[1]);
                setIntentos(intentos+1)
            }
        }
        else{
            setMensaje("Se ha superado el numero de intentos permitidos ("+intentos+")")
        }
    }
    return (
        <div>
            <h1>{token[0]}</h1>
            <input type="number" name="tokenIngresado" id="" onChange={(e)=> setIngresoToken(e.target.value)} />
            <button onClick={ () => validarToken()} >Validar</button>
            <p className="text-danger">{mensaje}</p>
        </div>
    )
}