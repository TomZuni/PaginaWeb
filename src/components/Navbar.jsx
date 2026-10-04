// Barra de navegación. El botón hamburguesa usa useState para abrir/cerrar el menú.
import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Navbar({ cantidadCarrito }) {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const cerrarMenu = () => setMenuAbierto(false)

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={cerrarMenu}>
          Tienda<span>Gamer</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Abrir menú"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${menuAbierto ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end onClick={cerrarMenu}>Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/productos" onClick={cerrarMenu}>
                Productos
                {/* Renderizado condicional: la insignia solo aparece si hay productos */}
                {cantidadCarrito > 0 && (
                  <span className="badge rounded-pill text-bg-warning ms-2">{cantidadCarrito}</span>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contacto" onClick={cerrarMenu}>Contacto</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
