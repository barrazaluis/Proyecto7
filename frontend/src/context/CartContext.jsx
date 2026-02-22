import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

  // ✅ cargar carrito desde localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // ✅ guardar carrito automáticamente
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // =========================
  // AGREGAR PRODUCTO
  // =========================
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === product.id);

      if (exist) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // =========================
  // ELIMINAR PRODUCTO
  // =========================
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // =========================
  // LIMPIAR CARRITO
  // =========================
  const clearCart = () => {
    setCart([]);
  };

  // =========================
  // TOTAL $
  // =========================
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado
export const useCart = () => useContext(CartContext);