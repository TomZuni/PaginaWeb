// Pie de página compartido por todas las vistas.
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="py-4">
      <div className="container text-center">
        <p>Tienda de Videojuegos Gamer - 2026</p>
        <Link to="/">Inicio</Link> · <Link to="/productos">Productos</Link> · <Link to="/contacto">Contacto</Link>
      </div>
    </footer>
  )
}
