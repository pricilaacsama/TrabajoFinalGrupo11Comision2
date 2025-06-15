import { useEffect, useState } from "react";
import { generarToken, validoToken } from "../Utilities/usarToken"

export function ValidarToken () {
    const [token,setToken] = useState(generarToken);
    const [ingresoToken,setIngresoToken] = useState ("");
    const [mensaje,setMensaje] = useState("")   //Mensaje
    const [intentos,setIntentos] =useState(0);
    
    const validarToken = () => {
        const tiempoValido = 20000; //20000 milisegundos = 20 seg
        
        if (intentos < 3) {
            const validacion = validoToken(tiempoValido,token,ingresoToken);    //validoToken devuelve [valido(true/false),mensaje]
            if(validacion[0]) {
                //Redireccion y cambio a autenticado
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
            <h1>{mensaje}</h1>
        </div>
    )
}