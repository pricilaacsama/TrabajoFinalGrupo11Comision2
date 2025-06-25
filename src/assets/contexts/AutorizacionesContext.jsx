import { createContext, useState, useMemo, useCallback, useEffect } from "react";
import usersData from "../data/usuarios.json";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated,setIsAuthentificated] = useState (false);

  useEffect(()=> {
    if(!(!!localStorage.getItem("users")))
    {
      localStorage.setItem("users",JSON.stringify(usersData))
    }
  })

  const login = useCallback((credentials) => {
    setIsLoading(true);
    try {
      const usuarioEncontrado = JSON.parse(localStorage.getItem("users")) .find(
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
    setIsAuthentificated(false);
    setUser(null);
  }, []);

  const autenticarToken = useCallback((correcto) => {
    setIsAuthentificated(correcto);
  })

  const AuthContextValue = useMemo(() => ({
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    autenticarToken
  }), [user, isLoading, logout,isAuthenticated]);

  return (
    <AuthContext.Provider value={AuthContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
