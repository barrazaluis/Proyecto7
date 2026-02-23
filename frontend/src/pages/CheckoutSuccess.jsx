import { useEffect, useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/useCart";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function CheckoutSuccess() {
  const { isAuthenticated, token } = useAuth();
  const { clearCart } = useCart();
  const { search } = useLocation();

  const [status, setStatus] = useState("confirming"); // confirming | ok | error
  const [msg, setMsg] = useState("");

  if (!isAuthenticated) return <Navigate to="/" replace />;

  useEffect(() => {
    (async () => {
      try {
        const params = new URLSearchParams(search);

        // MP suele devolver payment_id y/o collection_id
        const payment_id = params.get("payment_id") || params.get("collection_id");

        if (!payment_id) {
          setStatus("error");
          setMsg("No llegó payment_id desde MercadoPago.");
          return;
        }

        const res = await fetch(`${API_URL}/api/order/confirm`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ payment_id })
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.message || data.msg || "No se pudo confirmar el pago");

        // ✅ Orden creada en backend, limpiamos carrito local
        clearCart();

        setStatus("ok");
        setMsg("Pago confirmado y orden creada ✅");
      } catch (e) {
        console.error(e);
        setStatus("error");
        setMsg(e.message || "Error confirmando pago");
      }
    })();
  }, [search, token, clearCart]);

  if (status === "confirming") {
    return (
      <div className="container py-5">
        <h2>Confirmando pago...</h2>
        <p className="text-muted">No cierres esta ventana.</p>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ maxWidth: 720 }}>
      {status === "ok" ? (
        <>
          <h2 className="fw-bold">Pago aprobado ✅</h2>
          <p className="text-muted">{msg}</p>
          <div className="d-flex gap-2">
            <Link className="btn btn-primary" to="/myaccount">
              Ir a mi cuenta
            </Link>
            <Link className="btn btn-outline-secondary" to="/">
              Seguir comprando
            </Link>
          </div>
        </>
      ) : (
        <>
          <h2 className="fw-bold">Problema con el pago</h2>
          <p className="text-muted">{msg}</p>
          <Link className="btn btn-primary" to="/checkout">
            Volver al checkout
          </Link>
        </>
      )}
    </div>
  );
}