// Página de inicio: carrusel, estadísticas y bienvenida.
import { Link } from 'react-router-dom'
import Carrusel from '../components/Carrusel.jsx'
import { rutaPublica } from '../utils.js'

export default function Inicio() {
  return (
    <>
      <Carrusel />
      <section className="stat-strip py-4">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-4 stat"><h3>+50</h3><small>Títulos disponibles</small></div>
            <div className="col-4 stat"><h3>100%</h3><small>Productos originales</small></div>
            <div className="col-4 stat"><h3>24/7</h3><small>Soporte online</small></div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-md-6">
              <p className="eyebrow text-warning">Bienvenido</p>
              <h2>Todo lo que necesitas para jugar está aquí</h2>
              <p className="text-body-secondary">
                Explora nuestro catálogo de videojuegos, descubre novedades y agrega tus títulos favoritos al carrito.
              </p>
              <Link to="/productos" className="btn btn-outline-light">Explorar productos</Link>
            </div>
            <div className="col-md-6">
              <img src={rutaPublica('assets/img/portada.jpg')} className="img-fluid rounded-3 shadow" alt="Portada de videojuegos" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
