import { useEffect, useMemo, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function MyAccount() {
  const { token, user, setUser, logout } = useAuth();

  // -------------------------
  // PERFIL
  // -------------------------
  const [profile, setProfile] = useState({
    username: user?.username || "",
    email: user?.email || ""
  });

  // -------------------------
  // PASSWORD
  // -------------------------
  const [pwd, setPwd] = useState({
    password: "",
    confirmPassword: ""
  });

  // -------------------------
  // DIRECCIÓN
  // -------------------------
  const emptyAddress = useMemo(
    () => ({
      fullName: "",
      phone: "",
      rut: "",
      street: "",
      number: "",
      apartment: "",
      commune: "",
      city: "",
      region: "",
      postalCode: "",
      notes: ""
    }),
    []
  );

  const [address, setAddress] = useState({
    ...emptyAddress,
    ...(user?.address || {})
  });

  const [editingAddress, setEditingAddress] = useState(false);

  // -------------------------
  // HISTORIAL ÓRDENES
  // -------------------------
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // -------------------------
  // UI states
  // -------------------------
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPwd, setLoadingPwd] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(false);

  const showMsg = (type, text) => {
    setMsg({ type, text });
    setTimeout(() => setMsg({ type: "", text: "" }), 2500);
  };

  // ✅ Si cambia user, refrescamos profile y address
  useEffect(() => {
    setProfile({
      username: user?.username || "",
      email: user?.email || ""
    });

    setAddress({
      ...emptyAddress,
      ...(user?.address || {})
    });
  }, [user, emptyAddress]);

  // -------------------------
  // Handlers
  // -------------------------
  const onProfileChange = (e) => {
    setProfile((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onPwdChange = (e) => {
    setPwd((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onAddressChange = (e) => {
    setAddress((a) => ({ ...a, [e.target.name]: e.target.value }));
  };

  // -------------------------
  // API: Perfil
  // -------------------------
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

  // -------------------------
  // API: Password
  // -------------------------
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
        body: JSON.stringify({ password: pwd.password })
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

  // -------------------------
  // API: Dirección
  // -------------------------
  const saveAddress = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

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

      const updatedUser = data.user || data;
      if (updatedUser) setUser(updatedUser);

      setEditingAddress(false);
      showMsg("success", data.msg || "Dirección actualizada ✅");
    } catch (err) {
      showMsg("danger", err.message || "Error actualizando dirección.");
    } finally {
      setLoadingAddress(false);
    }
  };

  // -------------------------
  // Resumen dirección
  // -------------------------
  const hasAddress = Object.values(user?.address || {}).some(
    (v) => String(v || "").trim().length > 0
  );

  const addressSummary = () => {
    if (!hasAddress) return "Aún no has configurado una dirección.";

    const a = user?.address || {};
    const line1 = `${a.street || ""} ${a.number || ""}`.trim();
    const line2 = [a.apartment, a.commune, a.city].filter(Boolean).join(", ");
    const line3 = [a.region, a.postalCode].filter(Boolean).join(" · ");

    return [a.fullName, line1, line2, line3, a.phone].filter(Boolean).join("\n");
  };

  // -------------------------
  // ✅ API: Órdenes
  // -------------------------
  const loadOrders = useCallback(async () => {
    if (!token) return;

    try {
      setLoadingOrders(true);

      const res = await fetch(`${API_URL}/api/order/myorders`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json().catch(() => []);
      if (!res.ok) throw new Error(data.message || "No se pudieron cargar las órdenes.");

      setOrders(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  }, [token]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // -------------------------
  // Render
  // -------------------------
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

        {/* PASSWORD */}
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

        {/* DIRECCIÓN: VISTA vs EDITAR */}
        <div className="col-12 col-lg-6">
          <div className="card p-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h5 className="fw-bold mb-1">Dirección</h5>
                {!editingAddress && (
                  <small className="text-muted">
                    {hasAddress ? "Dirección configurada" : "Sin dirección"}
                  </small>
                )}
              </div>

              {!editingAddress ? (
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => setEditingAddress(true)}
                >
                  {hasAddress ? "Cambiar" : "Agregar"}
                </button>
              ) : (
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => {
                    setEditingAddress(false);
                    setAddress({ ...emptyAddress, ...(user?.address || {}) });
                  }}
                >
                  Cancelar
                </button>
              )}
            </div>

            {!editingAddress ? (
              <pre className="mb-0" style={{ whiteSpace: "pre-wrap" }}>
                {addressSummary()}
              </pre>
            ) : (
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
            )}
          </div>
        </div>

        {/* HISTORIAL */}
        <div className="col-12 col-lg-6">
          <div className="card p-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="fw-bold mb-0">Historial de compras</h5>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={loadOrders}
                disabled={loadingOrders}
              >
                {loadingOrders ? "Cargando..." : "Recargar"}
              </button>
            </div>

            {loadingOrders ? (
              <p className="text-muted mb-0">Cargando órdenes...</p>
            ) : orders.length === 0 ? (
              <p className="text-muted mb-0">Aún no tienes compras registradas.</p>
            ) : (
              <div className="d-flex flex-column gap-3">
                {orders.map((o) => (
                  <div key={o._id} className="border rounded p-3">
                    <div className="d-flex justify-content-between">
                      <span className="fw-semibold">Orden #{o._id.slice(-6)}</span>
                      <span
                        className={`badge ${
                          o.status === "paid" ? "bg-success" : "bg-warning text-dark"
                        }`}
                      >
                        {o.status}
                      </span>
                    </div>

                    <div className="text-muted small mt-1">
                      Total: ${Number(o.total || 0).toLocaleString("es-CL")}
                    </div>

                    <div className="mt-2">
                      {o.products?.map((p, idx) => (
                        <div key={idx} className="d-flex justify-content-between small">
                          <span>
                            {p.product?.name || "Producto"} x {p.quantity}
                          </span>
                          <span>
                            ${Number((p.price || 0) * (p.quantity || 1)).toLocaleString("es-CL")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}