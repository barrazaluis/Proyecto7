import logo from "../assets/img/NomadaOutdoor.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import CartDrawer from "./CartDrawer";
import { useCart } from "../context/UseCart";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const { cart } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <>
      <header className="main-header">
        <Link to="/" className="logo">
          <img src={logo} alt="Logotipo" width="100" />
        </Link>

        <nav className="main-nav">
          <ul className="navbar-items">
            <li className="navbar-item">
              <Link to="/">Inicio</Link>
            </li>
            <li className="navbar-item">
              <Link to="/contact">Contacto</Link>
            </li>

            {isAuthenticated && (
              <li className="navbar-item">
                <Link to="/account">Mi cuenta</Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="auth-buttons">
          {!isAuthenticated ? (
            <>
              <Link to="/register" className="btn-auth">
                Registrarse
              </Link>

              <button
                type="button"
                className="btn-auth"
                onClick={() => setShowLogin(true)}
              >
                Iniciar sesión
              </button>
            </>
          ) : (
            <button type="button" className="btn-auth" onClick={logout}>
              Cerrar sesión{user?.username ? ` (${user.username})` : ""}
            </button>
          )}

          <button
            type="button"
            className="btn-auth"
            onClick={() => setShowCart(true)}
          >
            🛒 ({cart.length})
          </button>
        </div>
      </header>

      <LoginModal show={showLogin} onClose={() => setShowLogin(false)} />

      <CartDrawer show={showCart} onClose={() => setShowCart(false)} />
    </>
  );
}