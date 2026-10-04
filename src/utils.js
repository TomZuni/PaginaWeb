// Funciones de ayuda reutilizables.

// Convierte una ruta como "assets/img/x.jpg" en una ruta válida tanto en
// local ("/") como en GitHub Pages ("/PaginaWeb/").
export const rutaPublica = (ruta) => `${import.meta.env.BASE_URL}${ruta}`

// Da formato de peso chileno: 39990 -> "$39.990"
export const formatoPrecio = (numero) => `$${numero.toLocaleString('es-CL')}`
