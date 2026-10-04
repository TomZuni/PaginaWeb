# Tienda Gamer – React (PFY2201 Semana 8)

Continuación de la Tienda de videojuegos (Bootstrap + JS) migrada a **React** con Vite.
Mismas páginas, mismos estilos y mismo `juegos.json`.

## Qué se implementó
| Requisito | Dónde está |
|---|---|
| `useState` – catálogo, carrito, elementos interactivos | `Productos.jsx` (productos, cargando, error, busqueda), `App.jsx` (carrito), `Navbar.jsx` (menú), `Carrusel.jsx` (diapositiva), `Contacto.jsx` (formulario) |
| `useEffect` – carga de datos y actualización de estado | `Productos.jsx` (fetch de `juegos.json` al montar), `App.jsx` (guarda carrito), `Carrusel.jsx` (temporizador con limpieza) |
| Renderizado condicional | Cargando / error / sin resultados (`Productos.jsx`), carrito vacío (`Carrito.jsx`), botón "Agregar al carrito" ⇄ "En el carrito" (`TarjetaProducto.jsx`), insignia del menú (`Navbar.jsx`), aviso del formulario (`Contacto.jsx`) |
| Buenas prácticas | Carpetas `components/`, `pages/`, `styles/`; comentarios en cada archivo; helpers en `utils.js` sin código duplicado |

## Estructura
```
public/            juegos.json y assets/img (se copian tal cual al build)
src/
  main.jsx         punto de entrada
  App.jsx          estado del carrito + rutas
  utils.js         rutaPublica() y formatoPrecio()
  components/      Navbar, Footer, Carrusel, TarjetaProducto, Carrito
  pages/           Inicio, Productos, Contacto
  styles/          estilos.css (el mismo de la tienda original)
```

## Ejecutar en local
```bash
npm install
npm run dev
```

## Publicar en GitHub Pages
1. En `vite.config.js`, `base` debe ser `'/NOMBRE-DEL-REPO/'` (ahora: `/PaginaWeb/`).
2. Sube el código a la rama `main` del repositorio público:
   ```bash
   git add .
   git commit -m "Semana 8: tienda con React"
   git push origin main
   ```
3. Despliega (compila y sube `dist/` a la rama `gh-pages`):
   ```bash
   npm run deploy
   ```
4. En GitHub: *Settings → Pages → Branch: gh-pages / (root)*.
5. URL final: `https://tomzuni.github.io/PaginaWeb/`

> Se usa `HashRouter` (URLs con `#`) para que al recargar una página interna GitHub Pages no entregue error 404.
