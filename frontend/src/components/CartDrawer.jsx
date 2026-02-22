import { useState } from "react";
import { useCart } from "../context/useCart";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router-dom";

export default function CartDrawer({ show, onClose }) {
  const { cart, removeFromCart, total } = useCart();
  const { isAuthenticated } = useAuth();

  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  if (!show) return null;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowLogin(true);
      return;
    }

    onClose?.();
    navigate("/checkout"); // ✅ crea esta ruta luego
  };

  return (
    <>
      <div className="cart-backdrop" onClick={onClose}></div>

      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h4>🛒 Carrito</h4>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.size || "no-size"}`} className="cart-item">
                <div>
                  <h6>{item.name}</h6>
                  <p>${item.price} x {item.quantity}</p>
                </div>

                <button onClick={() => removeFromCart(item.id, item.size)}>
                  ❌
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <h5>Total: ${total}</h5>

          <button
            className="btn btn-primary w-100"
            disabled={cart.length === 0}
            onClick={handleCheckout}
          >
            Finalizar compra
          </button>
        </div>
      </div>

      {/* Login obligatorio para checkout */}
      <LoginModal
        show={showLogin}
        onClose={() => setShowLogin(false)}
        onSuccess={() => {
          setShowLogin(false);
          onClose?.();
          navigate("/checkout");
        }}
      />
    </>
  );
}