let mazo = [];
let intervalo;
let tiempoRestante = 0;
let cartaActual = null;

// Referencias a los audios (necesitas estos archivos en tu carpeta)
const sonidoAviso = new Audio('audio/beep.mp3');
const sonidoCambio = new Audio('audio/cambio.mp3');

// Elementos del DOM
const tituloUI = document.getElementById('titulo-carta');
const descripcionUI = document.getElementById('descripcion-carta');
const cronometroUI = document.getElementById('cronometro');
const btnIniciar = document.getElementById('btn-iniciar');
const btnSiguiente = document.getElementById('btn-siguiente');
const selectorModo = document.getElementById('modo-juego');
const inputAviso = document.getElementById('tiempo-aviso');

// Cargar cartas al iniciar
async function cargarCartas() {
    try {
        const respuesta = await fetch('data/cartas.json');
        mazo = await respuesta.json();
    } catch (error) {
        console.error("Error cargando el JSON", error);
        tituloUI.innerText = "Error";
        descripcionUI.innerText = "No se pudo cargar cartas.json";
    }
}

function obtenerCartaAleatoria() {
    const indice = Math.floor(Math.random() * mazo.length);
    return mazo[indice];
}

function mostrarNuevaCarta() {
    // Reproducir sonido de cambio
    sonidoCambio.play().catch(() => { }); // El catch evita errores si el navegador bloquea el autoplay

    cartaActual = obtenerCartaAleatoria();
    tituloUI.innerText = cartaActual.titulo;
    descripcionUI.innerText = cartaActual.descripcion;

    tiempoRestante = cartaActual.tiempoSegundos;
    actualizarReloj();

    btnSiguiente.classList.add('oculto');
    iniciarTemporizador();
}

function actualizarReloj() {
    cronometroUI.innerText = tiempoRestante;
}

function iniciarTemporizador() {
    clearInterval(intervalo);

    intervalo = setInterval(() => {
        tiempoRestante--;
        actualizarReloj();

        const tiempoAviso = parseInt(inputAviso.value);

        // Sonido de aviso
        if (tiempoRestante === tiempoAviso) {
            sonidoAviso.play().catch(() => { });
        }

        // Cuando el tiempo llega a cero
        if (tiempoRestante <= 0) {
            clearInterval(intervalo);
            console.log("El contador llegó a cero. El modo actual es:", selectorModo.value);
            if (selectorModo.value === 'auto') {
                mostrarNuevaCarta();
            } else {
                // Modo manual: Mostrar botón y esperar
                btnSiguiente.classList.remove('oculto');
                tituloUI.innerText = "¡Tiempo terminado!";
                descripcionUI.innerText = "Resuelve la mesa y revela el siguiente evento.";
            }
        }
    }, 1000);
}

// Eventos de botones
btnIniciar.addEventListener('click', () => {
    btnIniciar.classList.add('oculto');
    mostrarNuevaCarta();
});

btnSiguiente.addEventListener('click', mostrarNuevaCarta);

// Inicializar
cargarCartas();