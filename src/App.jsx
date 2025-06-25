import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './assets/components/NavBar';
import Home from './assets/pages/Home';
import Favoritos from './assets/pages/Favoritos';
import Error from './assets/pages/Error';
import Acerca from './assets/pages/Acerca';
import Detalle from './assets/pages/Detalle';
import Formulario from './assets/components/Formulario';
import Login from './assets/pages/login';
import './App.css';
import ProtectedRoute from './assets/components/ProtectedRoute';
import Footer from './assets/components/Footer';
import {ValidarToken} from './assets/components/Token'
import Registro from './assets/components/Registro';

function App() {

  return (
    <>
      <NavBar />

      <Routes>
        {/* Redirige la raíz a login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Página de login */}
        <Route path="/login" element={<Login />} />

        {/* Pagina de token */}
        <Route path="/token" element={<ValidarToken />} />
        {/*pagina de registrar usuario*/}
        <Route path="/registrar" element={<Registro/>} />

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
