// Tarjeta de un videojuego del catálogo.
import { rutaPublica, formatoPrecio } from '../utils.js'

export default function TarjetaProducto({ juego, enCarrito, onAgregar }) {
  return (
    <div className="col">
      <div className="card card-producto h-100">
        <img src={rutaPublica(juego.imagen)} className="card-img-top producto-img" alt={juego.nombre} />
        <div className="card-body d-flex flex-column">
          <span className="badge text-bg-secondary align-self-start mb-2">{juego.genero}</span>
          <h2 className="h5">{juego.nombre}</h2>
          <p className="precio mt-auto mb-3">{formatoPrecio(juego.precioNumero)}</p>
          {/* Renderizado condicional: el botón cambia de texto, estilo y se desactiva si ya está en el carrito */}
          {enCarrito ? (
            <button className="btn btn-success" type="button" disabled>
              <i className="bi bi-check2-circle"></i> En el carrito
            </button>
          ) : (
            <button className="btn btn-gamer" type="button" onClick={() => onAgregar(juego)}>
              Agregar al carrito
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
