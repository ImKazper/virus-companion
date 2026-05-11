let mazoComodines = [];
let mazoGlobales = [];
let mazoActivo = [];
let intervalo;
let tiempoRestante = 0;

const sonidoAviso = new Audio('audio/beep.mp3');
const sonidoCambio = new Audio('audio/cambio.mp3');

const tituloUI = document.getElementById('titulo-carta');
const descripcionUI = document.getElementById('descripcion-carta');
const cronometroUI = document.getElementById('cronometro');
const contenedorReloj = document.getElementById('contenedor-reloj');
const btnAccion = document.getElementById('btn-accion');
const selectorModo = document.getElementById('selector-modo');
const configTiempo = document.getElementById('config-tiempo');
const tiempoInput = document.getElementById('tiempo-input');

async function cargarDatos() {
    try {
        const noCache = '?v=' + new Date().getTime();
        const [resCom, resGlob] = await Promise.all([
            fetch('data/comodines.json' + noCache),
            fetch('data/globales.json' + noCache)
        ]);
        mazoComodines = await resCom.json();
        mazoGlobales = await resGlob.json();
    } catch (error) {
        console.error("Error cargando archivos JSON", error);
        tituloUI.innerText = "Error";
        descripcionUI.innerText = "Verifica los archivos JSON en /data";
    }
}

function actualizarInterfaz() {
    clearInterval(intervalo);
    cronometroUI.innerText = "--";
    tituloUI.innerText = "Preparado";
    descripcionUI.innerText = "Presiona el botón para empezar";
    btnAccion.innerText = "Iniciar / Revelar";

    const modo = selectorModo.value;

    // Mostrar u ocultar input de tiempo dinámico
    if (modo === 'emergencia_dinamica') {
        configTiempo.classList.remove('oculto');
    } else {
        configTiempo.classList.add('oculto');
    }

    // Mostrar u ocultar el reloj
    if (modo === 'comodin_frenetico' || modo === 'emergencia_dinamica') {
        contenedorReloj.classList.remove('oculto');
    } else {
        contenedorReloj.classList.add('oculto');
    }

    // Asignar el mazo correspondiente
    if (modo.includes('comodin')) {
        mazoActivo = mazoComodines;
    } else {
        mazoActivo = mazoGlobales;
    }
}

function obtenerCartaAleatoria() {
    if (mazoActivo.length === 0) return { titulo: "Vacío", descripcion: "No hay cartas en el mazo." };
    const indice = Math.floor(Math.random() * mazoActivo.length);
    return mazoActivo[indice];
}

function revelarCarta() {
    sonidoCambio.play().catch(() => { });
    const carta = obtenerCartaAleatoria();
    tituloUI.innerText = carta.titulo;
    descripcionUI.innerText = carta.descripcion;
}

function ejecutarModo() {
    const modo = selectorModo.value;
    revelarCarta();

    if (modo === 'comodin_manual' || modo === 'emergencia_fija') {
        // En modos manuales, el botón simplemente revela otra carta sin tiempo
        btnAccion.innerText = "Revelar siguiente";
        return;
    }

    // Modos con tiempo
    clearInterval(intervalo);
    btnAccion.innerText = "Siguiente carta / Reiniciar tiempo";

    if (modo === 'comodin_frenetico') {
        tiempoRestante = 60; // Fijo a 60s
    } else if (modo === 'emergencia_dinamica') {
        tiempoRestante = parseInt(tiempoInput.value) || 45; // Configurable
    }

    cronometroUI.innerText = tiempoRestante;

    intervalo = setInterval(() => {
        tiempoRestante--;
        cronometroUI.innerText = tiempoRestante;

        if (tiempoRestante === 5) {
            sonidoAviso.play().catch(() => { });
        }

        if (tiempoRestante <= 0) {
            ejecutarModo(); // Vuelve a ejecutar la lógica automáticamente
        }
    }, 1000);
}

// Eventos
selectorModo.addEventListener('change', actualizarInterfaz);
btnAccion.addEventListener('click', ejecutarModo);

// Inicializar
cargarDatos().then(actualizarInterfaz);