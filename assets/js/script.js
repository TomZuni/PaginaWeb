// =====================================================
// Semana 6 - Interactividad, DOM, eventos y Fetch API
// =====================================================

let productos = [];
let carrito = [];

function mostrarMensaje(contenedor, texto, tipo = "success") {
    if (!contenedor) return;
    contenedor.innerHTML = `<div class="alert alert-${tipo}">${texto}</div>`;
}

function actualizarCarrito() {
    const cantidad = document.getElementById("cantidadCarrito");
    const total = document.getElementById("totalCarrito");
    const contenedor = document.getElementById("carritoItems");
    if (!cantidad || !total || !contenedor) return;

    cantidad.textContent = carrito.length;
    const suma = carrito.reduce((acum, juego) => acum + juego.precioNumero, 0);
    total.textContent = `$${suma.toLocaleString("es-CL")}`;

    if (carrito.length === 0) {
        contenedor.innerHTML = `<p class="text-body-secondary">Aún no has agregado productos.</p>`;
        return;
    }

    contenedor.innerHTML = "";
    carrito.forEach((juego, indice) => {
        const fila = document.createElement("div");
        fila.className = "d-flex justify-content-between align-items-center border-bottom py-2 gap-3";
        fila.innerHTML = `<span>${juego.nombre}</span><strong>$${juego.precioNumero.toLocaleString("es-CL")}</strong>`;
        const boton = document.createElement("button");
        boton.className = "btn btn-sm btn-outline-danger";
        boton.textContent = "Quitar";
        boton.addEventListener("click", () => {
            carrito.splice(indice, 1);
            actualizarCarrito();
        });
        fila.appendChild(boton);
        contenedor.appendChild(fila);
    });
}

function renderizarProductos(lista) {
    const contenedor = document.getElementById("listaProductos");
    if (!contenedor) return;
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = `<div class="col-12"><div class="alert alert-warning">No se encontraron productos con esa búsqueda.</div></div>`;
        return;
    }

    lista.forEach((juego) => {
        const columna = document.createElement("div");
        columna.className = "col";
        const tarjeta = document.createElement("div");
        tarjeta.className = "card card-producto h-100";
        tarjeta.innerHTML = `
            <img src="${juego.imagen}" class="card-img-top producto-img" alt="${juego.nombre}">
            <div class="card-body d-flex flex-column">
                <span class="badge text-bg-secondary align-self-start mb-2">${juego.genero}</span>
                <h2 class="h5">${juego.nombre}</h2>
                <p class="precio mt-auto mb-3">$${juego.precioNumero.toLocaleString("es-CL")}</p>
                <button class="btn btn-gamer btn-agregar" type="button">Agregar al carrito</button>
            </div>`;
        tarjeta.querySelector(".btn-agregar").addEventListener("click", () => {
            carrito.push(juego);
            actualizarCarrito();
        });
        columna.appendChild(tarjeta);
        contenedor.appendChild(columna);
    });
}

async function cargarJuegos() {
    const contenedor = document.getElementById("listaProductos");
    if (!contenedor) return;
    const mensaje = document.getElementById("mensajeFetch");
    try {
        const respuesta = await fetch("juegos.json");
        if (!respuesta.ok) throw new Error("No se pudo cargar el archivo JSON.");
        const datos = await respuesta.json();
        productos = datos.map(juego => ({ ...juego, precioNumero: Number(juego.precioNumero ?? String(juego.precio).replace(/[^0-9]/g, "")) }));
        renderizarProductos(productos);
    } catch (error) {
        mostrarMensaje(mensaje, "No se pudieron cargar los productos. Intenta nuevamente más tarde.", "warning");
    }
}

function configurarBusqueda() {
    const formulario = document.getElementById("formBusqueda");
    if (!formulario) return;
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const termino = document.getElementById("busqueda").value.trim().toLowerCase();
        const resultados = productos.filter(juego => juego.nombre.toLowerCase().includes(termino) || juego.genero.toLowerCase().includes(termino));
        renderizarProductos(termino ? resultados : productos);
        const mensaje = document.getElementById("mensajeBusqueda");
        if (termino) mostrarMensaje(mensaje, `Resultados para: "${termino}"`, "info"); else mensaje.innerHTML = "";
    });
}

function configurarFormularioContacto() {
    const formulario = document.getElementById("formContacto");
    if (!formulario) return;
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();
        const respuesta = document.getElementById("respuestaFormulario");
        if (!nombre || !correo || !mensaje) {
            mostrarMensaje(respuesta, "Por favor, completa todos los campos.", "warning");
            return;
        }
        mostrarMensaje(respuesta, `Gracias, ${nombre}. Tu mensaje fue enviado correctamente.`);
        formulario.reset();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    cargarJuegos();
    configurarBusqueda();
    configurarFormularioContacto();
});
