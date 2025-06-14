import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './assets/components/NavBar';
import Home from './assets/pages/Home';
import Favoritos from './assets/pages/Favoritos';
import productosData from './assets/data/productos.json';
import Error from './assets/pages/Error';
import Acerca from './assets/pages/Acerca';
import Detalle from './assets/pages/Detalle';
import Formulario from './assets/components/Formulario';
import Login from './assets/pages/login'; // Asegúrate que el archivo se llame igual (Login.js o login.js)
import './App.css';
import { useState } from 'react';

function App() {
  const [productos, setProductos] = useState(productosData);

  return (
    <>
      {/* Podés ocultar NavBar cuando estás en Login si querés */}
      <NavBar />

      <Routes>
        {/* Redirige la raíz a login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Página de login */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas u otras páginas */}
    
        <Route path="/home" element={<Home />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/crear" element={<Formulario productos={productos} />} />
        <Route path="/editar/:id" element={<Formulario />} />
        <Route path="/acerca" element={<Acerca />} />
        <Route path="/detalle/:id" element={<Detalle />} />

        {/* Ruta por defecto para errores */}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;




/*
<Route path="/home" element={<Home productos={productos} />} />

import { Routes, Route } from 'react-router-dom';
import NavBar from './assets/components/NavBar';
import Home from './assets/pages/Home';
import Favoritos from './assets/pages/Favoritos';
import productosData from './assets/data/productos.json';
import Error from './assets/pages/Error';
import Acerca from './assets/pages/Acerca';
import Detalle from './assets/pages/Detalle'; // ✅ AÑADIR
import Formulario from './assets/components/Formulario'
import './App.css';
import { useState } from 'react';

import Login from './assets/pages/login'; // ✅

function App() {
  const [productos, setProductos] = useState(productosData);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/" element={<Home productos={productos} />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/crear" element={<Formulario productos={productos}/>} />
        <Route path="/editar/:id" element={<Formulario />} />
        <Route path="/acerca" element={<Acerca />} />
        <Route path="/detalle/:id" element={<Detalle />} /> 
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;*/
