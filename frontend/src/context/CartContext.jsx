import { createContext, useCallback, useEffect, useMemo, useState } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const getItemKey = useCallback((item) => {
    return `${item.id}__${item.size ?? "no-size"}`;
  }, []);

  const addToCart = useCallback(
    (product) => {
      setCart((prev) => {
        const incomingKey = getItemKey(product);
        const exist = prev.find((p) => getItemKey(p) === incomingKey);

        if (exist) {
          return prev.map((p) =>
            getItemKey(p) === incomingKey
              ? { ...p, quantity: (p.quantity || 1) + 1 }
              : p
          );
        }

        return [...prev, { ...product, quantity: 1 }];
      });
    },
    [getItemKey]
  );

  const removeFromCart = useCallback((id, size = null) => {
    setCart((prev) =>
      prev.filter((p) => !(p.id === id && (p.size ?? null) === (size ?? null)))
    );
  }, []);

  const decreaseQty = useCallback(
    (id, size = null) => {
      setCart((prev) => {
        const key = `${id}__${size ?? "no-size"}`;
        const found = prev.find((p) => getItemKey(p) === key);
        if (!found) return prev;

        if ((found.quantity || 1) <= 1) {
          return prev.filter((p) => getItemKey(p) !== key);
        }

        return prev.map((p) =>
          getItemKey(p) === key ? { ...p, quantity: p.quantity - 1 } : p
        );
      });
    },
    [getItemKey]
  );

  const clearCart = useCallback(() => setCart([]), []);

  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      decreaseQty,
      clearCart,
      total
    }),
    [cart, addToCart, removeFromCart, decreaseQty, clearCart, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}