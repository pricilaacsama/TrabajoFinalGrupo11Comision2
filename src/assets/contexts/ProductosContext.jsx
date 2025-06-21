import { createContext, useState, useMemo, useCallback, useEffect } from "react";
// Si se quiere  mantener los datos locales como respaldo
import datosIproductos from "../data/productos.json";

export const ProductosContext = createContext(null);

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar productos desde la API
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        // Adaptar estructura al formato que estamos usando
        const productosAdaptados = data.map((item) => ({
          id: String(item.id),
          imagen: item.image,
          nombre: item.title,
          precio: item.price,
          descripcion: item.description,
          categoria: item.category,
          estado: true,
          favorito: false
        }));

        setProductos(productosAdaptados);
      } catch (error) {
        console.error("Error al cargar productos externos. Usando productos locales.");
        setProductos(datosIproductos); // Carga local si falla la API
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

  const agregarProducto = useCallback((nuevoProducto) => {
    setProductos((prevProductos) => {
      const nuevoId = String(
        prevProductos.length > 0
          ? Math.max(...prevProductos.map((p) => Number(p.id))) + 1
          : 1
      );
      return [...prevProductos, { ...nuevoProducto, id: nuevoId }];
    });
  }, []);

  const borrarProducto = useCallback((id) => {
    if (window.confirm("¿Seguro que querés eliminar al producto?")) {
      setProductos((prevProductos) =>
        prevProductos.map((p) =>
          p.id === id ? { ...p, estado: false } : p
        )
      );
    }
  }, []);

  const marcarFavorito = useCallback((id) => {
    setProductos((prevProductos) =>
      prevProductos.map((p) =>
        p.id === id ? { ...p, favorito: !p.favorito } : p
      )
    );
  }, []);

  const resetFavoritos = useCallback(() => {
  setProductos((prevProductos) =>
    prevProductos.map((p) => ({ ...p, favorito: false }))
  );
}, []);

  const modificarProducto = useCallback((productoNuevo) => {
    setProductos((prevProductos) =>
      prevProductos.map((p) =>
        p.id === productoNuevo.id ? { ...productoNuevo } : p
      )
    );
  }, []);

  const valorDeContexto = useMemo(() => ({
    productos,
    setProductos,
    agregarProducto,
    borrarProducto,
    modificarProducto,
    marcarFavorito,
    cargando,
    resetFavoritos
  }), [productos, agregarProducto, modificarProducto, borrarProducto, marcarFavorito, resetFavoritos]);

  return (
    <ProductosContext.Provider value={valorDeContexto}>
      {children}
    </ProductosContext.Provider>
  );
}
