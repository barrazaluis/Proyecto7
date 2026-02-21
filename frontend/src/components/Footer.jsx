export default function Footer() {
  return (
    <footer
      className="main-footer text-light py-5"
      style={{
        backgroundColor: "var(--color-black)",
        borderTop: "3px solid var(--color-forest)"
      }}
    >
      <div className="container">
        <div className="row">

          <div className="col-md-3 mb-4">
            <h5 className="mb-3">Síguenos</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-light">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-light">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-light">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>

          <div className="col-md-2 mb-4">
            <h5 className="mb-3">PRODUCTOS</h5>
            <ul className="list-unstyled">
              <li><a href="#Productos" className="text-light text-decoration-none">Catálogo</a></li>
              <li><a href="#" className="text-light text-decoration-none">Novedades</a></li>
              <li><a href="#" className="text-light text-decoration-none">Ofertas</a></li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="mb-3">GARANTÍA</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Garantía</a></li>
              <li><a href="#" className="text-light text-decoration-none">Devoluciones</a></li>
              <li><a href="#" className="text-light text-decoration-none">Envíos</a></li>
            </ul>
          </div>

          <div className="col-md-2 mb-4">
            <h5 className="mb-3">NOSOTROS</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Blog</a></li>
              <li><a href="#" className="text-light text-decoration-none">Trabaja con nosotros</a></li>
            </ul>
          </div>

          <div className="col-md-2 mb-4">
            <h5 className="mb-3">LEGAL</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Privacidad</a></li>
              <li><a href="#" className="text-light text-decoration-none">Términos</a></li>
            </ul>
          </div>

          <div className="text-center pt-4 border-top border-light mt-4">
            <p className="mb-0 fw-bold">
              © 2025 Nómada Outdoor. Todos los derechos reservados.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}