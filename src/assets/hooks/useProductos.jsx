import { useContext } from "react";
import { ProductosContext } from "../contexts/productosContext";

export function useProductos () {
    const context = useContext(ProductosContext);

    if (context === null) {
        throw new Error ("Use Producto debe ser usado dentro de un ProductosProvider")
    }

    return context;
}