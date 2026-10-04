// Punto de entrada: carga los estilos y monta la aplicación React.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './styles/estilos.css'
import App from './App.jsx'

// HashRouter usa rutas con "#" (ej: /#/productos), así GitHub Pages
// no devuelve error 404 al recargar la página.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
