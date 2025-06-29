import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // No verifico token
    return <Navigate to="/login" replace />;
  }

  if (!(!!user)) {
    // No se logueo
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(user.rol)) {
    // No tiene el rol correcto para esta ruta
    return <Navigate to="/home" replace />;
  }

  // Tiene permisos
  return children;
}

export default ProtectedRoute;
