// Componente raíz: guarda el estado del carrito (useState) y define las rutas.
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Inicio from './pages/Inicio.jsx'
import Productos from './pages/Productos.jsx'
import Contacto from './pages/Contacto.jsx'

const CLAVE_CARRITO = 'tienda-gamer-carrito'

// Lee el carrito guardado en el navegador (si existe y es válido).
function leerCarritoGuardado() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_CARRITO))
    return Array.isArray(guardado) ? guardado : []
  } catch {
    return []
  }
}

export default function App() {
  // Estado: productos seleccionados en el carrito.
  const [carrito, setCarrito] = useState(leerCarritoGuardado)

  // Efecto: cada vez que cambia el carrito, se guarda en el navegador.
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito))
    } catch {
      /* si el navegador bloquea el almacenamiento, la app sigue funcionando */
    }
  }, [carrito])

  // Agrega un juego solo si todavía no está en el carrito.
  const agregarAlCarrito = (juego) =>
    setCarrito((actual) => (actual.some((j) => j.id === juego.id) ? actual : [...actual, juego]))

  const quitarDelCarrito = (id) => setCarrito((actual) => actual.filter((j) => j.id !== id))
  const vaciarCarrito = () => setCarrito([])

  return (
    <>
      <Navbar cantidadCarrito={carrito.length} />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/productos"
            element={
              <Productos
                carrito={carrito}
                onAgregar={agregarAlCarrito}
                onQuitar={quitarDelCarrito}
                onVaciar={vaciarCarrito}
              />
            }
          />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
