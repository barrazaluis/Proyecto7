import logo from "../assets/img/NomadaOutdoor.png";
import { useState } from "react";
import LoginModal from "./LoginModal";
import CartDrawer from "./CartDrawer";
import { useCart } from "../context/CartContext";

export default function Navbar() {

  // ✅ estados dentro del componente
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);

  // ✅ contexto carrito
  const { cart } = useCart();

  return (
    <>
      <header className="main-header">

        <a href="/" className="logo">
          <img src={logo} alt="Logotipo" width="100" />
        </a>

        <nav className="main-nav">
          <ul className="navbar-items">
            <li><a href="/">Inicio</a></li>
            <li><a href="/contact">Contacto</a></li>
          </ul>
        </nav>

        <div className="auth-buttons">

          <a href="/register" className="btn-auth">
            Registrarse
          </a>

          {/* LOGIN */}
          <button
            className="btn-auth"
            onClick={() => setShowLogin(true)}
          >
            Iniciar sesión
          </button>

          {/* CARRITO */}
          <button
            className="btn-auth"
            onClick={() => setShowCart(true)}
          >
            🛒 ({cart.length})
          </button>

        </div>

      </header>

      {/* MODAL LOGIN */}
      <LoginModal
        show={showLogin}
        onClose={() => setShowLogin(false)}
      />

      {/* CARRITO */}
      <CartDrawer
        show={showCart}
        onClose={() => setShowCart(false)}
      />
    </>
  );
}