import logo from "../assets/img/NomadaOutdoor.png";
import { useState } from "react";
import LoginModal from "./LoginModal";

export default function Navbar() {

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <header className="main-header">

        <a href="/" className="logo">
          <img src={logo} alt="Logotipo" width="100" />
        </a>

        <nav className="main-nav">
          <ul className="navbar-items">
            <li><a href="#Inicio">Inicio</a></li>
            <li><a href="#Productos">Productos</a></li>
            <li><a href="#Nosotros">Nosotros</a></li>
            <li><a href="/contact">Contacto</a></li>
          </ul>
        </nav>

        <div className="auth-buttons">
          <a href="/register" className="btn-auth">Registrarse</a>

          {/* ✅ botón React */}
          <button
            className="btn-auth"
            onClick={() => setShowLogin(true)}
          >
            Iniciar sesión
          </button>
        </div>

      </header>

      {/* ✅ Modal */}
      <LoginModal
        show={showLogin}
        onClose={() => setShowLogin(false)}
      />
    </>
  );
}