// Resumen del carrito: lista de productos, total y botones para quitar.
import { formatoPrecio } from '../utils.js'

export default function Carrito({ carrito, onQuitar, onVaciar }) {
  return (
    <section className="mt-5">
      <div className="card carrito-card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="h4 mb-0">Resumen del carrito</h2>
            {carrito.length > 0 && (
              <button className="btn btn-sm btn-outline-secondary" type="button" onClick={onVaciar}>
                Vaciar carrito
              </button>
            )}
          </div>

          <div className="mt-3">
            {/* Renderizado condicional: mensaje si el carrito está vacío, lista si no */}
            {carrito.length === 0 ? (
              <p className="text-body-secondary">Aún no has agregado productos.</p>
            ) : (
              carrito.map((juego) => (
                <div key={juego.id} className="d-flex justify-content-between align-items-center border-bottom py-2 gap-3">
                  <span>{juego.nombre}</span>
                  <strong>{formatoPrecio(juego.precioNumero)}</strong>
                  <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => onQuitar(juego.id)}>
                    Quitar
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
