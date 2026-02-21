import hero from "../assets/img/hero.png";
import vestuario from "../assets/img/vestuario.png";
import accesorios from "../assets/img/accesorios.png";
import calzado from "../assets/img/calzado.png";

export default function Home() {
  return (
    <main>

      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Comunica tu espíritu aventurero
          </h1>

          <p className="hero-subtitle">
            Descubre nuestra colección outdoor.
          </p>

          <a href="/products" className="btn btn-secondary">
            Ver productos
          </a>
        </div>

        <div className="hero-image-container">
          <img src={hero} className="hero-img" />
        </div>
      </section>

      <section id="Productos">
        <h2 className="productos-title">Productos</h2>

        <div className="productos-grid">

          <div className="product-card">
            <img src={vestuario} />
            <h3>Vestuario</h3>
          </div>

          <div className="product-card">
            <img src={accesorios} />
            <h3>Accesorios</h3>
          </div>

          <div className="product-card">
            <img src={calzado} />
            <h3>Calzado</h3>
          </div>

        </div>
      </section>

    </main>
  );
}