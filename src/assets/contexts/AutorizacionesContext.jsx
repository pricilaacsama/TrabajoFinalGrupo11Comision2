import { createContext, useState, useMemo, useCallback } from "react";
import usersData from "../data/usuarios.json";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback((credentials) => {
    setIsLoading(true);
    try {
      const usuarioEncontrado = usersData.find(
        (u) =>
          u.username === credentials.username &&
          u.password === credentials.password
      );

      if (usuarioEncontrado) {
        const { password, ...userWithoutPassword } = usuarioEncontrado;
        setUser(userWithoutPassword);
        setIsLoading(false);
        return { success: true };
      } else {
        setUser(null);
        setIsLoading(false);
        return { success: false, message: "Credenciales inválidas" };
      }
    } catch (error) {
      setUser(null);
      setIsLoading(false);
      return { success: false, message: "Ocurrió un error inesperado" };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const AuthContextValue = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  }), [user, isLoading, logout]);

  return (
    <AuthContext.Provider value={AuthContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
