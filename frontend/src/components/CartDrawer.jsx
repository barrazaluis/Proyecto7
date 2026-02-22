import { useCart } from "../context/CartContext";

export default function CartDrawer({ show, onClose }) {
  const { cart, removeFromCart, total } = useCart();

  if (!show) return null;

  return (
    <>
      {/* Fondo oscuro */}
      <div className="cart-backdrop" onClick={onClose}></div>

      {/* Panel derecho */}
      <div className="cart-drawer">

        <div className="cart-header">
          <h4>🛒 Carrito</h4>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <h6>{item.name}</h6>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                </div>

                <button onClick={() => removeFromCart(item.id)}>
                  ❌
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <h5>Total: ${total}</h5>
          <button className="btn btn-primary w-100">
            Finalizar compra
          </button>
        </div>

      </div>
    </>
  );
}