import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  const [loadingAuth, setLoadingAuth] = useState(false);

  // Persistencia token
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // Persistencia user
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // ✅ Función para traer el user real desde el backend
  const refreshUser = useCallback(async () => {
    if (!token) return;

    try {
      setLoadingAuth(true);

      const res = await fetch(`${API_URL}/api/user/verifytoken`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // Token inválido o expirado -> cerramos sesión
        setToken("");
        setUser(null);
        return;
      }

      // data debería ser el user (sin password) con address incluida
      setUser(data);
    } catch (err) {
      // Si falla la red, no cerramos sesión, solo dejamos el user actual
      console.error("refreshUser error:", err);
    } finally {
      setLoadingAuth(false);
    }
  }, [token]);

  // ✅ Al iniciar app: si hay token, refrescar user desde BD
  useEffect(() => {
    if (token) refreshUser();
  }, [token, refreshUser]);

  // ✅ Login: guarda token, y opcionalmente guarda user si lo mandas desde backend
  // Recomendado: guardar token y luego refreshUser() para tener user completo
  const login = async ({ token: incomingToken, user: incomingUser }) => {
    setToken(incomingToken);

    // Si tu backend NO devuelve user en /login, esto igual sirve
    if (incomingUser) setUser(incomingUser);
    else setUser(null);

    // Traer user real con address
    // (esto corre con el nuevo token porque setToken dispara el useEffect)
  };

  const logout = () => {
    setToken("");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      setUser,
      isAuthenticated: !!token,
      loadingAuth,
      refreshUser,
      login,
      logout
    }),
    [token, user, loadingAuth, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);