// Formulario de contacto con campos controlados (useState) y validación.
import { useState } from 'react'

const FORMULARIO_VACIO = { nombre: '', correo: '', mensaje: '' }

export default function Contacto() {
  const [datos, setDatos] = useState(FORMULARIO_VACIO)
  const [respuesta, setRespuesta] = useState(null) // { tipo: 'success' | 'warning', texto }

  // Un solo manejador para los tres campos: usa el atributo "name" del input.
  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value })

  const enviar = (e) => {
    e.preventDefault()
    if (!datos.nombre.trim() || !datos.correo.trim() || !datos.mensaje.trim()) {
      setRespuesta({ tipo: 'warning', texto: 'Por favor, completa todos los campos.' })
      return
    }
    setRespuesta({ tipo: 'success', texto: `Gracias, ${datos.nombre.trim()}. Tu mensaje fue enviado correctamente.` })
    setDatos(FORMULARIO_VACIO)
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <p className="eyebrow">Contacto</p>
        <h1>¿Necesitas ayuda?</h1>
      </div>
      <div className="row g-4">
        <div className="col-md-5">
          <div className="card contact-card h-100">
            <div className="card-body p-4">
              <h2 className="h5 mb-4">Información</h2>
              <p><i className="bi bi-envelope-fill me-2"></i> contacto@tiendagamer.cl</p>
              <p><i className="bi bi-telephone-fill me-2"></i> +56 9 1234 5678</p>
              <p><i className="bi bi-clock-fill me-2"></i> Lunes a sábado, 10:00 - 20:00</p>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <div className="card contact-card">
            <div className="card-body p-4">
              <h2 className="h5 mb-3">Envíanos un mensaje</h2>
              <form onSubmit={enviar} noValidate>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input id="nombre" name="nombre" className="form-control" value={datos.nombre} onChange={cambiar} />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="correo" className="form-label">Correo</label>
                    <input id="correo" name="correo" type="email" className="form-control" value={datos.correo} onChange={cambiar} />
                  </div>
                  <div className="col-12">
                    <label htmlFor="mensaje" className="form-label">Mensaje</label>
                    <textarea id="mensaje" name="mensaje" className="form-control" rows="4" value={datos.mensaje} onChange={cambiar} />
                  </div>
                  <div className="col-12">
                    <button className="btn btn-gamer" type="submit">Enviar mensaje</button>
                  </div>
                  {/* Renderizado condicional: el aviso solo existe después de enviar */}
                  {respuesta && (
                    <div className="col-12">
                      <div className={`alert alert-${respuesta.tipo}`}>{respuesta.texto}</div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
