import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {

  const { addToCart } = useCart();

  return (
    <div className="product-card">

      <img src={product.image} alt={product.name} />

      <h5 className="product-name">{product.name}</h5>

      <p>${product.price}</p>

      <button
        className="btn btn-primary"
        onClick={() => addToCart(product)}
      >
        Agregar al carrito
      </button>

    </div>
  );
}