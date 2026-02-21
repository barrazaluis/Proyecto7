import logo from "../assets/img/NomadaOutdoor.png";

export default function Navbar() {
  return (
    <header className="main-header">

      <a href="/" className="logo">
        <img src={logo} alt="Logotipo" width="100" />
      </a>

      <nav className="main-nav">
        <ul className="navbar-items">
          <li><a href="#Inicio">Inicio</a></li>
          <li><a href="#Productos">Productos</a></li>
          <li><a href="#Nosotros">Nosotros</a></li>
          <li><a href="#Contacto">Contacto</a></li>
        </ul>
      </nav>

      <div className="auth-buttons">
        <a href="/register" className="btn-auth">Registrarse</a>
        <a href="/login" className="btn-auth">Iniciar sesión</a>
      </div>

    </header>
  );
}