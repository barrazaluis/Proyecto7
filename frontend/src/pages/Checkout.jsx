import { useCart } from "../context/useCart";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Checkout() {
  const { cart, total } = useCart();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-3">Checkout</h2>
      <p className="text-muted">Aquí irá la pasarela de pago.</p>

      <div className="card p-3">
        <h5>Resumen</h5>
        {cart.map((i) => (
          <div key={`${i.id}-${i.size || "no-size"}`} className="d-flex justify-content-between">
            <span>{i.name} x {i.quantity}</span>
            <span>${i.price * i.quantity}</span>
          </div>
        ))}
        <hr />
        <div className="d-flex justify-content-between fw-bold">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>
    </div>
  );
}