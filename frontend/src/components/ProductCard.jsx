import { useMemo, useState } from "react";
import { useCart } from "../context/useCart";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  // Si no hay tallas, quedará vacío
  const variants = useMemo(() => product?.variants || [], [product]);
  const hasSizes =
    product?.sizeType && product.sizeType !== "none" && variants.length > 0;

  const [selectedSize, setSelectedSize] = useState("");

  // Imagen: si viene desde backend, típicamente en images[0]
  // Si tu backend guarda rutas tipo "/img/products/xxx.jpg", Vite las servirá desde public si existen.
  const imageSrc =
    (product?.images && product.images.length > 0 && product.images[0]) ||
    product?.image ||
    "";

  const handleAdd = () => {
    // Si el producto requiere talla y no eligió, no agregamos
    if (hasSizes && !selectedSize) {
      alert("Debes seleccionar una talla antes de agregar al carrito.");
      return;
    }

    addToCart({
      id: product._id, // Mongo usa _id
      name: product.name,
      price: product.price,
      image: imageSrc,
      size: hasSizes ? selectedSize : null
    });
  };

  return (
    <div className="product-card">
      {imageSrc ? (
        <img src={imageSrc} alt={product.name} />
      ) : (
        <div
          style={{
            width: "100%",
            height: 200,
            background: "#eee",
            borderRadius: 8
          }}
        />
      )}

      <h5 className="product-name">{product.name}</h5>
      <p>${product.price}</p>

      {/* ✅ Selector de talla solo si corresponde */}
      {hasSizes && (
        <div className="mb-2">
          <label className="form-label">Talla</label>
          <select
            className="form-select"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="">Selecciona una talla</option>
            {variants.map((v) => (
              <option key={v.size} value={v.size} disabled={v.stock <= 0}>
                {v.size} {v.stock <= 0 ? "(Sin stock)" : ""}
              </option>
            ))}
          </select>
        </div>
      )}

      <button className="btn btn-primary w-100" onClick={handleAdd}>
        Agregar al carrito
      </button>
    </div>
  );
}