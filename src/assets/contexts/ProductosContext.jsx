import { createContext,useState,useMemo,useCallback } from "react";

import datosIproductos from "../data/productos.json"

export const ProductosContext = createContext(null);

export function ProductosProvider({ children }) {

    const [productos,setProductos] = useState (datosIproductos);

    const agregarProducto = useCallback((nuevoProducto) => {
        setProductos((prevProductos) => {
            const nuevoId = prevProductos.length>0 ? Math.max(...prevProductos.map(p=>Number(p.id)))+1:1;
            return [...prevProductos,{...nuevoProducto,id:nuevoId}];
        
    });
    },[]);

    const borrarProducto = useCallback((id) => {
        if (window.confirm('¿Seguro que querés eliminar al producto?')) {
        setProductos((prevProductos) => {
            return prevProductos.map(p => p.id === id ? { ...p,estado:false} : p)
        })
    }
    },[]);

    const marcarFavorito = useCallback((id) => {
        setProductos((prevProductos) => {
            return prevProductos.map(p => p.id === id ? { ...p,favorito:!p.favorito} : p)
        })
    },[]);

    const modificarProducto = useCallback((productoNuevo) => {
        setProductos((prevProductos) => {
            return prevProductos.map(p => p.id === productoNuevo.id ? { ...productoNuevo} : p)
        });
    },[]);

    const valorDeContexto =useMemo (() =>({
        productos,
        setProductos,
        agregarProducto,
        borrarProducto,
        modificarProducto,
        marcarFavorito
    }),[productos,agregarProducto,modificarProducto,borrarProducto,marcarFavorito]);

    return (
        <ProductosContext.Provider value={valorDeContexto}>
            {children}
        </ProductosContext.Provider>
    )
}