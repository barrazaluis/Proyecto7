import { Link } from "react-router-dom";

export default function CheckoutFailure() {
  return (
    <div className="container py-5">
      <h2 className="fw-bold">Pago rechazado ❌</h2>
      <p className="text-muted">Intenta nuevamente o usa otro medio de pago.</p>
      <Link className="btn btn-primary" to="/checkout">
        Volver al checkout
      </Link>
    </div>
  );
}