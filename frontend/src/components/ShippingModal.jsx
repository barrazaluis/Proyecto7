export default function ShippingModal({ show, onClose }) {
  if (!show) return null;

  return (
    <>
      {/* Fondo oscuro */}
      <div className="modal-backdrop fade show" onClick={onClose} />

      {/* Modal */}
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h5 className="modal-title">Envíos a todo Chile</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>

            <div className="modal-body">
              <p className="mb-3">
                Realizamos envíos a todo Chile. Los plazos son estimados y pueden variar según
                disponibilidad de stock, eventos de alta demanda (Cyber, Navidad) y tiempos del operador logístico.
              </p>

              <h6 className="fw-bold">Costo de envío</h6>
              <ul>
                <li>
                  <strong>Envío gratis</strong> en compras desde <strong>$90.000 CLP</strong> (mismo pedido).
                </li>
                <li>
                  En compras menores a <strong>$90.000 CLP</strong>, el costo se calcula al finalizar la compra
                  según comuna y peso/volumen del pedido.
                </li>
              </ul>

              <h6 className="fw-bold mt-3">Tiempos de entrega estimados</h6>
              <div className="table-responsive">
                <table className="table table-sm table-bordered align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Zona</th>
                      <th>Regiones</th>
                      <th>Plazo estimado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Zona Centro</strong></td>
                      <td>RM, Valparaíso, O’Higgins</td>
                      <td>2 a 5 días hábiles</td>
                    </tr>
                    <tr>
                      <td><strong>Zona Centro-Sur</strong></td>
                      <td>Maule, Ñuble, Biobío, La Araucanía</td>
                      <td>3 a 7 días hábiles</td>
                    </tr>
                    <tr>
                      <td><strong>Zona Sur</strong></td>
                      <td>Los Ríos, Los Lagos, Aysén</td>
                      <td>5 a 10 días hábiles</td>
                    </tr>
                    <tr>
                      <td><strong>Zona Norte</strong></td>
                      <td>Coquimbo, Atacama, Antofagasta, Tarapacá, Arica y Parinacota</td>
                      <td>4 a 9 días hábiles</td>
                    </tr>
                    <tr>
                      <td><strong>Zonas Extremas / Especiales</strong></td>
                      <td>Magallanes y localidades aisladas</td>
                      <td>7 a 14 días hábiles</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h6 className="fw-bold mt-3">Seguimiento del pedido</h6>
              <p className="mb-2">
                Una vez despachado tu pedido, recibirás información de seguimiento (cuando aplique) para revisar el estado del envío.
              </p>

              <h6 className="fw-bold mt-3">Consideraciones importantes</h6>
              <ul className="mb-0">
                <li>Los días hábiles se consideran de lunes a viernes, excluyendo feriados.</li>
                <li>Si ingresas una dirección incompleta o incorrecta, el envío puede retrasarse.</li>
                <li>Si el producto está sin stock o requiere validación, te contactaremos antes del despacho.</li>
              </ul>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}