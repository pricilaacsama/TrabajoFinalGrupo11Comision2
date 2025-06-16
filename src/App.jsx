import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './assets/components/NavBar';
import Home from './assets/pages/Home';
import Favoritos from './assets/pages/Favoritos';
import Error from './assets/pages/Error';
import Acerca from './assets/pages/Acerca';
import Detalle from './assets/pages/Detalle';
import Formulario from './assets/components/Formulario';
import Login from './assets/pages/login'; // Asegúrate que el archivo se llame igual (Login.js o login.js)
import './App.css';
import ProtectedRoute from './assets/components/ProtectedRoute';
import Footer from './assets/components/Footer';

function App() {

  return (
    <>
      <NavBar />

      <Routes>
        {/* Redirige la raíz a login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Página de login */}
        <Route path="/login" element={<Login />} />
        {/*acceso para ambos roles */}
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={["CLIENTE", "ADMINISTRATIVO"]}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favoritos"
          element={
            <ProtectedRoute allowedRoles={["CLIENTE", "ADMINISTRATIVO"]}>
              <Favoritos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/acerca"
          element={
            <ProtectedRoute allowedRoles={["CLIENTE", "ADMINISTRATIVO"]}>
              <Acerca />
            </ProtectedRoute>
          }
        />
        <Route
          path="/detalle/:id"
          element={
            <ProtectedRoute allowedRoles={["CLIENTE", "ADMINISTRATIVO"]}>
              <Detalle />
            </ProtectedRoute>
          }
        />
        {/* Solo ADMINISTRATIVO */}
        <Route
          path="/crear"
          element={
            <ProtectedRoute allowedRoles={["ADMINISTRATIVO"]}>
              <Formulario />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editar/:id"
          element={
            <ProtectedRoute allowedRoles={["ADMINISTRATIVO"]}>
              <Formulario />
            </ProtectedRoute>
          }
        />

        {/* Ruta por defecto para errores */}
        <Route path="*" element={<Error />} />
      </Routes>
        <Footer />
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
