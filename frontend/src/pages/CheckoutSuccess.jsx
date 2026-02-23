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
  const [order, setOrder] = useState(null);

  if (!isAuthenticated) return <Navigate to="/" replace />;

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const params = new URLSearchParams(search);

        // ✅ Tu orderId viene porque lo pusiste en back_urls (success?orderId=...)
        const orderId = params.get("orderId");

        // ✅ MercadoPago puede devolver payment_id o collection_id
        const payment_id =
          params.get("payment_id") ||
          params.get("collection_id") ||
          params.get("paymentId") ||
          params.get("collectionId");

        if (!orderId) {
          setStatus("error");
          setMsg("No llegó orderId en la URL. Revisa tus back_urls en el backend.");
          return;
        }

        if (!payment_id) {
          setStatus("error");
          setMsg("No llegó payment_id/collection_id desde MercadoPago.");
          return;
        }

        const res = await fetch(`${API_URL}/api/order/confirm`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ orderId, payment_id })
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.message || data.msg || "No se pudo confirmar el pago");

        if (!cancelled) {
          // ✅ Orden pagada → limpiamos carrito local
          clearCart();
          setOrder(data.order || null);
          setStatus("ok");
          setMsg(data.message || "Pago confirmado y orden actualizada ✅");
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setStatus("error");
          setMsg(e.message || "Error confirmando pago");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [search, token, clearCart]);

  if (status === "confirming") {
    return (
      <div className="container py-5">
        <h2 className="fw-bold">Confirmando pago...</h2>
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

          {order && (
            <div className="alert alert-light border">
              <div className="d-flex justify-content-between">
                <span className="fw-semibold">Orden #{order?._id?.slice?.(-6)}</span>
                <span className="badge bg-success">{order?.status}</span>
              </div>
              <div className="small text-muted mt-1">
                Total: ${Number(order?.total || 0).toLocaleString("es-CL")}
              </div>
            </div>
          )}

          <div className="d-flex gap-2">
            <Link className="btn btn-primary" to="/account">
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
          <div className="d-flex gap-2">
            <Link className="btn btn-primary" to="/checkout">
              Volver al checkout
            </Link>
            <Link className="btn btn-outline-secondary" to="/account">
              Ir a mi cuenta
            </Link>
          </div>
        </>
      )}
    </div>
  );
}