export function generarToken () {
    const codigo = Math.floor((Math.random() * 900000))+100000;     //devuelve numeros entre 100.000 y 999.999
    return [codigo,Date.now()]
}

export function validoToken (tiempo,token,ingresoToken) {
    let mensaje = "";
    let valido = true
            if (ingresoToken === ""){   //vacio el imput ingreso del token
                mensaje="No ingreso Token"
                valido = false
            }
            else {
                if(Number(Date.now()) >= (token[1] + tiempo)) {   //ahora (10:11) >= tiempo limite (10:10)
                        mensaje="Su token no esta vigente, vuelva a logearse para generar uno nuevo"
                        valido = false
                    }
                else {
                    if(ingresoToken !== String(token[0])) {     //Compara token ingresado con token generado
                    mensaje="Token Incorrecto"
                    valido = false
                }
                }
            }
            // si todo es correcto, valido no cambia a false
            return [valido,mensaje];
}

