import { useState } from "react";

function LoginModal({ show, onClose }) {

  // 👇 ESTADOS (AQUÍ VA LA VALIDACIÓN)
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!show) return null;

  // 👇 FUNCION QUE VALIDA
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!correo.trim() || !password.trim()) {
      setError("Debe completar todos los campos");
      return;
    }

    setError("");
    alert("Login correcto (ejemplo)");
  };

  return (
    <>
      {/* Fondo */}
      <div className="modal-backdrop fade show"></div>

      {/* Modal */}
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Iniciar sesión</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">

              {/* 👇 FORMULARIO CON VALIDACIÓN */}
              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">Correo</label>
                  <input
                    type="email"
                    className="form-control"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
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

                {/* 👇 MENSAJE DE ERROR */}
                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                <button type="submit" className="btn btn-primary w-100">
                  Iniciar sesión
                </button>

              </form>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default LoginModal;