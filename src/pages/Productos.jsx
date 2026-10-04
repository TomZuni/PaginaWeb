// Catálogo: carga los juegos con useEffect, los filtra con la búsqueda
// y muestra mensajes según el estado (cargando, error, sin resultados).
import { useState, useEffect } from 'react'
import TarjetaProducto from '../components/TarjetaProducto.jsx'
import Carrito from '../components/Carrito.jsx'
import { formatoPrecio } from '../utils.js'

export default function Productos({ carrito, onAgregar, onQuitar, onVaciar }) {
  // ---------- Estados (useState) ----------
  const [productos, setProductos] = useState([]) // catálogo
  const [cargando, setCargando] = useState(true) // ¿se están cargando los datos?
  const [error, setError] = useState(null) // mensaje de error, si lo hay
  const [busqueda, setBusqueda] = useState('') // texto escrito en el buscador

  // ---------- Efecto (useEffect): carga de datos ----------
  // Se ejecuta una sola vez al montar el componente (arreglo de dependencias vacío).
  useEffect(() => {
    let activo = true // evita actualizar el estado si el componente ya se desmontó

    async function cargarJuegos() {
      try {
        const respuesta = await fetch(`${import.meta.env.BASE_URL}juegos.json`)
        if (!respuesta.ok) throw new Error('No se pudo cargar el archivo JSON.')
        const datos = await respuesta.json()
        // Se simula la espera de una API real (800 ms) para mostrar el estado "Cargando".
        await new Promise((resolver) => setTimeout(resolver, 800))
        if (activo) setProductos(datos.map((juego, i) => ({ ...juego, id: i + 1 })))
      } catch (e) {
        if (activo) setError('No se pudieron cargar los productos. Intenta nuevamente más tarde.')
      } finally {
        if (activo) setCargando(false)
      }
    }

    cargarJuegos()
    return () => { activo = false }
  }, [])

  // ---------- Datos derivados (no necesitan estado propio) ----------
  const termino = busqueda.trim().toLowerCase()
  const filtrados = productos.filter(
    (j) => j.nombre.toLowerCase().includes(termino) || j.genero.toLowerCase().includes(termino),
  )
  const total = carrito.reduce((suma, j) => suma + j.precioNumero, 0)

  // ---------- Contenido del catálogo según el estado (renderizado condicional) ----------
  let contenido
  if (cargando) {
    contenido = (
      <div className="text-center py-5">
        <div className="spinner-border text-warning" role="status"></div>
        <p className="mt-3 text-body-secondary">Cargando productos...</p>
      </div>
    )
  } else if (error) {
    contenido = <div className="alert alert-warning">{error}</div>
  } else if (filtrados.length === 0) {
    contenido = <div className="alert alert-warning">No se encontraron productos con esa búsqueda.</div>
  } else {
    contenido = (
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {filtrados.map((juego) => (
          <TarjetaProducto
            key={juego.id}
            juego={juego}
            enCarrito={carrito.some((c) => c.id === juego.id)}
            onAgregar={onAgregar}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <p className="eyebrow">Catálogo</p>
        <h1>Videojuegos destacados</h1>
        <p className="text-body-secondary">Los productos se cargan dinámicamente con useEffect desde juegos.json.</p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <form className="input-group" onSubmit={(e) => e.preventDefault()}>
            <label className="visually-hidden" htmlFor="busqueda">Buscar videojuego</label>
            {/* Input controlado: su valor vive en el estado "busqueda" */}
            <input
              id="busqueda"
              className="form-control"
              type="search"
              placeholder="Buscar por nombre o género..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <button className="btn btn-gamer" type="submit"><i className="bi bi-search"></i> Buscar</button>
          </form>
        </div>
        <div className="col-lg-4">
          <div className="carrito-resumen">
            <strong><i className="bi bi-cart3"></i> Carrito:</strong>&nbsp;{carrito.length} producto(s) · {formatoPrecio(total)}
          </div>
        </div>
      </div>

      {/* Mensaje de búsqueda: solo se muestra si hay texto escrito */}
      {termino && !cargando && !error && (
        <div className="alert alert-info mb-4">Resultados para: "{termino}"</div>
      )}

      {contenido}

      <Carrito carrito={carrito} onQuitar={onQuitar} onVaciar={onVaciar} />
    </div>
  )
}
