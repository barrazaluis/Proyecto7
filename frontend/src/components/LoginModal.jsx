import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function LoginModal({ show, onClose }) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Debe completar todos los campos");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password
        })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Credenciales inválidas");

      // ✅ Ajusta esto a lo que devuelva tu backend:
      // Ideal: { token, user: { username, email, ... } }
      const token = data.token;
      const user = data.user || { email: email.trim().toLowerCase() };

      if (!token) throw new Error("El backend no devolvió token.");

      login({ token, user }); // ✅ ahora sí existe
      onClose();
    } catch (err) {
      setError(err.message || "Error iniciando sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Iniciar sesión</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Correo</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@ejemplo.com"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Ingresando..." : "Iniciar sesión"}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}