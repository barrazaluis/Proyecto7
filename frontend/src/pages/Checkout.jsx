import { useState } from "react";
import { useCart } from "../context/useCart";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Checkout() {
  const { cart, total } = useCart();
  const { isAuthenticated, token } = useAuth();
  const [loadingPay, setLoadingPay] = useState(false);

  if (!isAuthenticated) return <Navigate to="/" replace />;

  const handlePay = async () => {
    try {
      if (!token) {
        alert("Sesión expirada. Inicia sesión nuevamente.");
        return;
      }

      if (!cart.length) {
        alert("Tu carrito está vacío");
        return;
      }

      setLoadingPay(true);

      const items = cart.map((i) => ({
        id: i.id,
        quantity: i.quantity
      }));

      const res = await fetch(`${API_URL}/api/order/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ items })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || data.msg || "No se pudo iniciar el pago");
      }

      window.location.href = data.sandbox_init_point || data.init_point;
    } catch (e) {
      console.error(e);
      alert(e.message || "Error iniciando pago");
    } finally {
      setLoadingPay(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-3">Checkout</h2>
      <p className="text-muted">Paga de forma segura con MercadoPago.</p>

      <div className="card p-3">
        <h5>Resumen</h5>

        {cart.map((i) => (
          <div
            key={`${i.id}-${i.size || "no-size"}`}
            className="d-flex justify-content-between"
          >
            <span>
              {i.name} {i.size ? `(${i.size})` : ""} x {i.quantity}
            </span>
            <span>${(i.price * i.quantity).toLocaleString("es-CL")}</span>
          </div>
        ))}

        <hr />

        <div className="d-flex justify-content-between fw-bold">
          <span>Total</span>
          <span>${Number(total).toLocaleString("es-CL")}</span>
        </div>

        <button
          className="btn btn-success w-100 mt-3"
          onClick={handlePay}
          disabled={loadingPay || !cart.length}
        >
          {loadingPay ? "Redirigiendo..." : "Pagar con MercadoPago"}
        </button>
      </div>
    </div>
  );
}