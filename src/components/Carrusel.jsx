// Carrusel de la portada. Cambia de diapositiva solo cada 3 segundos.
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { rutaPublica } from '../utils.js'

const DIAPOSITIVAS = [
  { img: 'assets/img/portada.jpg', alt: 'Videojuegos destacados', etiqueta: 'Novedades', titulo: 'Los juegos que todo gamer está esperando' },
  { img: 'assets/img/sekiro.jpg', alt: 'Sekiro', etiqueta: 'Acción y sigilo', titulo: 'Sekiro: Shadows Die Twice' },
  { img: 'assets/img/fc27.jpg', alt: 'EA Sports FC 27', etiqueta: 'Fútbol', titulo: 'EA Sports FC 27' },
  { img: 'assets/img/eldenring.jpg', alt: 'Elden Ring', etiqueta: 'Mundo abierto', titulo: 'Elden Ring' },
]

export default function Carrusel() {
  // Estado: índice de la diapositiva que se muestra.
  const [actual, setActual] = useState(0)

  // Efecto: temporizador de avance automático. El return limpia el
  // intervalo cuando el componente se desmonta o se cambia de diapositiva.
  useEffect(() => {
    const id = setInterval(() => setActual((i) => (i + 1) % DIAPOSITIVAS.length), 3000)
    return () => clearInterval(id)
  }, [actual])

  const anterior = () => setActual((actual - 1 + DIAPOSITIVAS.length) % DIAPOSITIVAS.length)
  const siguiente = () => setActual((actual + 1) % DIAPOSITIVAS.length)

  return (
    <div className="carousel slide hero-carousel">
      <div className="carousel-indicators">
        {DIAPOSITIVAS.map((d, i) => (
          <button
            key={d.titulo}
            type="button"
            aria-label={`Ir a la diapositiva ${i + 1}`}
            className={i === actual ? 'active' : ''}
            onClick={() => setActual(i)}
          />
        ))}
      </div>
      <div className="carousel-inner">
        {DIAPOSITIVAS.map((d, i) => (
          // Renderizado condicional de estilo: solo la diapositiva actual es "active"
          <div key={d.titulo} className={`carousel-item ${i === actual ? 'active' : ''}`}>
            <img src={rutaPublica(d.img)} alt={d.alt} />
            <div className="carousel-caption">
              <p className="eyebrow">{d.etiqueta}</p>
              <h2>{d.titulo}</h2>
              <Link to="/productos" className="btn btn-gamer btn-lg">Ver catálogo</Link>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" aria-label="Anterior" onClick={anterior}>
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button className="carousel-control-next" type="button" aria-label="Siguiente" onClick={siguiente}>
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  )
}
