import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function MyAccount() {
  const { token, user, setUser, logout } = useAuth();

  const [profile, setProfile] = useState({
    username: user?.username || "",
    email: user?.email || ""
  });

  const [pwd, setPwd] = useState({
    password: "",
    confirmPassword: ""
  });

  const [address, setAddress] = useState({
    fullName: user?.address?.fullName || "",
    phone: user?.address?.phone || "",
    rut: user?.address?.rut || "",
    street: user?.address?.street || "",
    number: user?.address?.number || "",
    apartment: user?.address?.apartment || "",
    commune: user?.address?.commune || "",
    city: user?.address?.city || "",
    region: user?.address?.region || "",
    postalCode: user?.address?.postalCode || "",
    notes: user?.address?.notes || ""
  });

  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPwd, setLoadingPwd] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(false);

  const showMsg = (type, text) => {
    setMsg({ type, text });
    setTimeout(() => setMsg({ type: "", text: "" }), 2500);
  };

  const onProfileChange = (e) => {
    setProfile((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onPwdChange = (e) => {
    setPwd((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onAddressChange = (e) => {
    setAddress((a) => ({ ...a, [e.target.name]: e.target.value }));
  };

  // ✅ Actualiza username/email
  const saveProfile = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (!profile.username.trim() || !profile.email.trim()) {
      showMsg("danger", "Username y email son obligatorios.");
      return;
    }

    try {
      setLoadingProfile(true);

      const res = await fetch(`${API_URL}/api/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          username: profile.username.trim(),
          email: profile.email.trim().toLowerCase()
        })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.msg || data.message || "No se pudo actualizar.");

      const updatedUser = data.user || data || { ...user, ...profile };
      setUser(updatedUser);

      showMsg("success", "Datos actualizados ✅");
    } catch (err) {
      showMsg("danger", err.message || "Error actualizando usuario.");
    } finally {
      setLoadingProfile(false);
    }
  };

  // ✅ Cambia password usando mismo endpoint
  const changePassword = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (!pwd.password || !pwd.confirmPassword) {
      showMsg("danger", "Completa ambos campos de contraseña.");
      return;
    }

    if (pwd.password.length < 6) {
      showMsg("danger", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (pwd.password !== pwd.confirmPassword) {
      showMsg("danger", "Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoadingPwd(true);

      const res = await fetch(`${API_URL}/api/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          password: pwd.password
        })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.msg || data.message || "No se pudo cambiar la contraseña.");

      setPwd({ password: "", confirmPassword: "" });
      showMsg("success", "Contraseña actualizada ✅");
    } catch (err) {
      showMsg("danger", err.message || "Error cambiando contraseña.");
    } finally {
      setLoadingPwd(false);
    }
  };

  // ✅ Guarda dirección usando PUT /api/user/address
  const saveAddress = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    // Validación mínima (ajústala a gusto)
    if (!address.street.trim() || !address.number.trim() || !address.commune.trim()) {
      showMsg("danger", "Completa al menos Calle, Número y Comuna.");
      return;
    }

    try {
      setLoadingAddress(true);

      const res = await fetch(`${API_URL}/api/user/address`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          address: {
            fullName: address.fullName.trim(),
            phone: address.phone.trim(),
            rut: address.rut.trim(),
            street: address.street.trim(),
            number: address.number.trim(),
            apartment: address.apartment.trim(),
            commune: address.commune.trim(),
            city: address.city.trim(),
            region: address.region.trim(),
            postalCode: address.postalCode.trim(),
            notes: address.notes.trim()
          }
        })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.msg || data.message || "No se pudo actualizar la dirección.");

      // updateAddress devuelve { msg, user }
      const updatedUser = data.user || data;
      if (updatedUser) {
        setUser(updatedUser);
        setAddress({
          fullName: updatedUser?.address?.fullName || "",
          phone: updatedUser?.address?.phone || "",
          rut: updatedUser?.address?.rut || "",
          street: updatedUser?.address?.street || "",
          number: updatedUser?.address?.number || "",
          apartment: updatedUser?.address?.apartment || "",
          commune: updatedUser?.address?.commune || "",
          city: updatedUser?.address?.city || "",
          region: updatedUser?.address?.region || "",
          postalCode: updatedUser?.address?.postalCode || "",
          notes: updatedUser?.address?.notes || ""
        });
      }

      showMsg("success", data.msg || "Dirección actualizada ✅");
    } catch (err) {
      showMsg("danger", err.message || "Error actualizando dirección.");
    } finally {
      setLoadingAddress(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 980 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold mb-0">Mi cuenta</h2>
        <button className="btn btn-outline-danger" onClick={logout}>
          Cerrar sesión
        </button>
      </div>

      {msg.text && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

      <div className="row g-4">
        {/* PERFIL */}
        <div className="col-12 col-lg-6">
          <div className="card p-4 shadow-sm">
            <h5 className="fw-bold mb-3">Datos del usuario</h5>

            <form onSubmit={saveProfile}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  name="username"
                  className="form-control"
                  value={profile.username}
                  onChange={onProfileChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  value={profile.email}
                  onChange={onProfileChange}
                />
              </div>

              <button className="btn btn-primary w-100" disabled={loadingProfile}>
                {loadingProfile ? "Guardando..." : "Guardar datos"}
              </button>
            </form>
          </div>
        </div>

        {/* CAMBIAR CONTRASEÑA */}
        <div className="col-12 col-lg-6">
          <div className="card p-4 shadow-sm">
            <h5 className="fw-bold mb-3">Cambiar contraseña</h5>

            <form onSubmit={changePassword}>
              <div className="mb-3">
                <label className="form-label">Nueva contraseña</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={pwd.password}
                  onChange={onPwdChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirmar contraseña</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  value={pwd.confirmPassword}
                  onChange={onPwdChange}
                />
              </div>

              <button className="btn btn-primary w-100" disabled={loadingPwd}>
                {loadingPwd ? "Actualizando..." : "Actualizar contraseña"}
              </button>
            </form>
          </div>
        </div>

        {/* DIRECCIÓN */}
        <div className="col-12 col-lg-6">
          <div className="card p-4 shadow-sm">
            <h5 className="fw-bold mb-3">Dirección</h5>

            <form onSubmit={saveAddress}>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label">Nombre completo</label>
                  <input
                    name="fullName"
                    className="form-control"
                    value={address.fullName}
                    onChange={onAddressChange}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Teléfono</label>
                  <input
                    name="phone"
                    className="form-control"
                    value={address.phone}
                    onChange={onAddressChange}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">RUT (opcional)</label>
                  <input
                    name="rut"
                    className="form-control"
                    value={address.rut}
                    onChange={onAddressChange}
                  />
                </div>

                <div className="col-12 col-md-8">
                  <label className="form-label">Calle</label>
                  <input
                    name="street"
                    className="form-control"
                    value={address.street}
                    onChange={onAddressChange}
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label className="form-label">Número</label>
                  <input
                    name="number"
                    className="form-control"
                    value={address.number}
                    onChange={onAddressChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Depto/Casa</label>
                  <input
                    name="apartment"
                    className="form-control"
                    value={address.apartment}
                    onChange={onAddressChange}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Comuna</label>
                  <input
                    name="commune"
                    className="form-control"
                    value={address.commune}
                    onChange={onAddressChange}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Ciudad</label>
                  <input
                    name="city"
                    className="form-control"
                    value={address.city}
                    onChange={onAddressChange}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Región</label>
                  <input
                    name="region"
                    className="form-control"
                    value={address.region}
                    onChange={onAddressChange}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Código Postal</label>
                  <input
                    name="postalCode"
                    className="form-control"
                    value={address.postalCode}
                    onChange={onAddressChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Notas</label>
                  <textarea
                    name="notes"
                    className="form-control"
                    rows="3"
                    value={address.notes}
                    onChange={onAddressChange}
                  />
                </div>
              </div>

              <button className="btn btn-primary w-100 mt-3" disabled={loadingAddress}>
                {loadingAddress ? "Guardando..." : "Guardar dirección"}
              </button>
            </form>
          </div>
        </div>

        {/* HISTORIAL (placeholder) */}
        <div className="col-12 col-lg-6">
          <div className="card p-4 shadow-sm">
            <h5 className="fw-bold mb-2">Historial de compras</h5>
            <p className="text-muted mb-0">
              Aún no hay endpoint de órdenes. Cuando agregues
              <code> GET /api/order/myorders</code> lo mostramos aquí.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}