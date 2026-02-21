import React from "react";

function Contact() {
  return (
    <main className="container py-5">

      {/* Título */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">Contáctanos</h1>
        <p className="text-muted">
          ¿Tienes dudas o consultas? Escríbenos y te responderemos pronto.
        </p>
      </div>

      <div className="row">

        {/* Formulario */}
        <div className="col-md-7">
          <form className="p-4 shadow rounded bg-white">

            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Asunto</label>
              <input
                type="text"
                className="form-control"
                placeholder="Motivo del contacto"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Mensaje</label>
              <textarea
                className="form-control"
                rows="5"
                placeholder="Escribe tu mensaje..."
                required
              ></textarea>
            </div>

            <button className="btn btn-primary w-100">
              Enviar mensaje
            </button>

          </form>
        </div>

        {/* Información */}
        <div className="col-md-5 mt-4 mt-md-0">
          <div className="p-4 shadow rounded bg-light h-100">

            <h4 className="mb-3">Información de contacto</h4>

            <p>
              <i className="bi bi-geo-alt-fill me-2"></i>
              Melipilla, Región Metropolitana
            </p>

            <p>
              <i className="bi bi-envelope-fill me-2"></i>
              contacto@nomadaoutdoor.cl
            </p>

            <p>
              <i className="bi bi-telephone-fill me-2"></i>
              +56 9 1234 5678
            </p>

            <hr />

            <h5>Síguenos</h5>

            <div className="d-flex gap-3 fs-4">
              <i className="bi bi-facebook"></i>
              <i className="bi bi-instagram"></i>
              <i className="bi bi-youtube"></i>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}

export default Contact;