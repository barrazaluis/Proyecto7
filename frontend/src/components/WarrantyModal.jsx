export default function WarrantyModal({ show, onClose }) {
  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show" onClick={onClose}></div>

      {/* Modal */}
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Garantía y Ley del Consumidor (Chile)</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <p className="mb-3">
                En Nómada Outdoor respetamos los derechos de las personas consumidoras conforme a la
                Ley 19.496. A continuación, te explicamos nuestra política de garantía:
              </p>

              <ul>
                <li>
                  <strong>Garantía legal (6 meses):</strong> Si el producto presenta una <strong>falla de fabricación</strong>
                  o no cumple con lo prometido, tienes derecho a la garantía legal por <strong>6 meses</strong> desde la
                  recepción. Puedes elegir entre: <strong>reparación gratuita</strong>, <strong>cambio</strong> o
                  <strong> devolución del dinero</strong>, según corresponda.
                </li>
                <li>
                  <strong>Qué se considera falla:</strong> defectos de fabricación o materiales (costuras, cierres,
                  suelas, terminaciones) y/o funcionamiento no atribuible al uso normal.
                </li>
                <li>
                  <strong>Qué no cubre:</strong> daños por mal uso, desgaste normal, accidentes, modificaciones,
                  uso fuera del propósito del producto o falta de cuidados recomendados.
                </li>
                <li>
                  <strong>Cómo solicitarla:</strong> contáctanos indicando <strong>número de pedido</strong>, nombre,
                  y adjunta <strong>foto/video</strong> de la falla con una breve descripción.
                </li>
                <li>
                  <strong>Revisión del producto:</strong> en algunos casos podremos solicitar evaluación para
                  confirmar que la falla corresponde a fabricación.
                </li>
                <li>
                  <strong>Tus derechos:</strong> esta política <strong>no limita</strong> los derechos establecidos por
                  la Ley 19.496.
                </li>
              </ul>

              <p className="mb-0">
                Si necesitas ayuda, escríbenos desde la sección <strong>Contacto</strong>.
              </p>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}