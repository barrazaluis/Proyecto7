export default function ReturnsModal({ show, onClose }) {
  if (!show) return null;

  return (
    <>
      {/* Fondo oscuro */}
      <div
        className="modal-backdrop fade show"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h5 className="modal-title">Política de Devoluciones</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              />
            </div>

            <div className="modal-body">
              <p>
                En Nómada Outdoor buscamos que tengas la mejor experiencia de compra.
                Nuestra política de devoluciones se ajusta a la normativa vigente en Chile,
                especialmente a la Ley N° 19.496 sobre Protección de los Derechos de los
                Consumidores.
              </p>

              <h6 className="fw-bold mt-3">Derecho a retracto (compras online)</h6>
              <p>
                Si realizaste tu compra a través de nuestra tienda online, puedes ejercer
                tu derecho a retracto dentro de los <strong>10 días</strong> desde la recepción
                del producto, siempre que este no haya sido usado, conserve sus etiquetas,
                embalaje original y esté en perfectas condiciones.
              </p>

              <h6 className="fw-bold mt-3">Cambios de producto</h6>
              <p>
                Puedes solicitar cambios por talla o producto dentro de los{" "}
                <strong>30 días</strong> desde la recepción, sujeto a disponibilidad de stock.
                El producto debe estar sin uso, con etiquetas y en su empaque original.
              </p>

              <h6 className="fw-bold mt-3">Devolución por falla o defecto</h6>
              <p>
                Si el producto presenta fallas de fabricación, se aplicará la{" "}
                <strong>garantía legal de 6 meses</strong>, conforme a la legislación chilena.
                En estos casos podrás optar por:
              </p>
              <ul>
                <li>Reparación gratuita del producto</li>
                <li>Cambio por uno nuevo</li>
                <li>Devolución del dinero</li>
              </ul>

              <h6 className="fw-bold mt-3">Condiciones generales</h6>
              <ul>
                <li>No se aceptan devoluciones de productos usados o dañados por mal uso.</li>
                <li>Los costos de envío por cambios voluntarios pueden ser asumidos por el cliente.</li>
                <li>En caso de falla comprobada, los costos de envío serán cubiertos por la tienda.</li>
              </ul>

              <h6 className="fw-bold mt-3">Cómo solicitar una devolución</h6>
              <p className="mb-0">
                Para gestionar una devolución o cambio, contáctanos a través de la sección
                de Contacto indicando tu número de pedido, nombre del producto y motivo de la
                solicitud. Nuestro equipo evaluará el caso y te guiará en el proceso.
              </p>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}