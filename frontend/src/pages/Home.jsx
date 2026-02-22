import hero from "../assets/img/hero.png";
import vestuario from "../assets/img/vestuario.png";
import accesorios from "../assets/img/accesorios.png";
import calzado from "../assets/img/calzado.png";

import ProductCard from "../components/ProductCard";

export default function Home() {

  // Productos para el carrito
  const products = [
    {
      id: 1,
      name: "Mochila Outdoor",
      price: 39990,
      image: vestuario
    },
    {
      id: 2,
      name: "Carpa 2 Personas",
      price: 89990,
      image: accesorios
    },
    {
      id: 3,
      name: "Zapatillas Trekking",
      price: 69990,
      image: calzado
    }
  ];

  return (
    <main>

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Comunica tu espíritu aventurero
          </h1>

          <p className="hero-subtitle">
            Descubre nuestra colección outdoor.
          </p>

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
        <h2 className="productos-title">Productos</h2>

        <div className="productos-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

    </main>
  );
}