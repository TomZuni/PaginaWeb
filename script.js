// =====================================================
// JavaScript - Interactividad Tienda Gamer
// Semana 5: DOM, eventos y Fetch API.
// =====================================================

// Muestra un mensaje dinámico utilizando createElement y appendChild.
function mostrarMensaje(contenedor, texto, tipo = "success") {
    if (!contenedor) return;

    contenedor.innerHTML = "";
    const alerta = document.createElement("div");
    alerta.className = `alert alert-${tipo} mb-0`;
    alerta.textContent = texto;
    contenedor.appendChild(alerta);
}

// Evento CLICK: cambia el botón y muestra un mensaje al agregar un producto.
function configurarBotonesAgregar() {
    const botones = document.querySelectorAll(".btn-agregar");
    const mensaje = document.getElementById("mensajeInteraccion");
    let cantidad = 0;

    botones.forEach((boton) => {
        boton.addEventListener("click", () => {
            cantidad++;
            const producto = boton.dataset.producto;
            boton.textContent = "Agregado ✓";
            boton.classList.remove("btn-gamer");
            boton.classList.add("btn-success");

            mostrarMensaje(mensaje, `${producto} fue agregado al carrito. Productos agregados: ${cantidad}.`);
        });
    });
}

// Evento MOUSEOVER: destaca la tarjeta cuando el usuario pasa el mouse.
function configurarMouseover() {
    const tarjetas = document.querySelectorAll(".card-producto");

    tarjetas.forEach((tarjeta) => {
        tarjeta.addEventListener("mouseover", () => tarjeta.classList.add("producto-destacado"));
        tarjeta.addEventListener("mouseout", () => tarjeta.classList.remove("producto-destacado"));
    });
}

// Evento SUBMIT: valida el formulario sin recargar la página.
function configurarFormulario() {
    const formulario = document.getElementById("formContacto");
    const respuesta = document.getElementById("respuestaFormulario");
    if (!formulario) return;

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        if (!nombre || !correo || !mensaje) {
            mostrarMensaje(respuesta, "Por favor, completa todos los campos.", "warning");
            return;
        }

        mostrarMensaje(respuesta, `Gracias, ${nombre}. Tu mensaje fue enviado correctamente.`);
        formulario.reset();
    });
}

// FETCH API: obtiene datos desde un archivo JSON y los agrega al DOM.
async function cargarJuegos() {
    const contenedor = document.getElementById("datosFetch");
    if (!contenedor) return;

    try {
        const respuesta = await fetch("juegos.json");
        if (!respuesta.ok) throw new Error("No fue posible cargar los datos.");

        const juegos = await respuesta.json();
        juegos.forEach((juego) => {
            const columna = document.createElement("div");
            columna.className = "col";

            const tarjeta = document.createElement("div");
            tarjeta.className = "card card-producto h-100";

            const cuerpo = document.createElement("div");
            cuerpo.className = "card-body";

            const titulo = document.createElement("h3");
            titulo.className = "card-title h5";
            titulo.textContent = juego.nombre;

            const genero = document.createElement("p");
            genero.className = "card-text text-body-secondary small";
            genero.textContent = juego.genero;

            const precio = document.createElement("p");
            precio.className = "precio mb-0";
            precio.textContent = juego.precio;

            cuerpo.appendChild(titulo);
            cuerpo.appendChild(genero);
            cuerpo.appendChild(precio);
            tarjeta.appendChild(cuerpo);
            columna.appendChild(tarjeta);
            contenedor.appendChild(columna);
        });
    } catch (error) {
        mostrarMensaje(contenedor, "No se pudieron cargar las novedades. Si abriste el HTML directamente, ejecútalo con Live Server o publícalo en GitHub Pages.", "warning");
    }
}

// Inicializa las funciones cuando el documento está listo.
document.addEventListener("DOMContentLoaded", () => {
    configurarBotonesAgregar();
    configurarMouseover();
    configurarFormulario();
    cargarJuegos();
});
