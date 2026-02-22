import { useEffect, useState } from "react";
import hero from "../assets/img/hero.png";
import ProductCard from "../components/ProductCard";

const API_BASE = import.meta.env.VITE_API_URL;

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        const res = await fetch(`${API_BASE}/api/product/readall`);
        if (!res.ok) throw new Error("No se pudieron cargar los productos");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setErrorMsg(err.message || "Error cargando productos");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <main>
      {/* HERO */}
      <section className="hero-section" id="Inicio">
        <div className="hero-content">
          <h1 className="hero-title">Comunica tu espíritu aventurero</h1>
          <p className="hero-subtitle">Descubre nuestra colección outdoor.</p>

          <a href="#Productos" className="btn btn-secondary">
            Ver productos
          </a>
        </div>

        <div className="hero-image-container">
          <img src={hero} className="hero-img" alt="Hero" />
        </div>
      </section>

      {/* PRODUCTOS */}
      <section id="Productos" className="productos-section">
        <h2 className="productos-title">Productos Nómada</h2>

        {loading && <p style={{ padding: "0 5%" }}>Cargando productos…</p>}
        {errorMsg && (
          <p style={{ padding: "0 5%", color: "crimson" }}>{errorMsg}</p>
        )}

        {!loading && !errorMsg && (
          <div className="productos-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}