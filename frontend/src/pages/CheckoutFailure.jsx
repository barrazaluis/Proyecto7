import { Link } from "react-router-dom";

export default function CheckoutPending() {
  return (
    <div className="container py-5">
      <h2 className="fw-bold">Pago pendiente ⏳</h2>
      <p className="text-muted">Tu pago quedó en revisión. Revisa más tarde.</p>
      <Link className="btn btn-primary" to="/account">
        Ir a mi cuenta
      </Link>
    </div>
  );
}