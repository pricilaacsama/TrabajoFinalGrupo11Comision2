import { useContext } from "react";
import { AuthContext } from "../contexts/AutorizacionesContext"; // asegúrate que el nombre del archivo sea correcto



export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}

