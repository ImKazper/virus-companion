# Virus! Companion App

Una web app ligera diseñada para usarse en el celular durante las partidas del juego de mesa *Virus!*. Sirve para integrar cartas *homebrew* (personalizadas), comodines aleatorios y eventos globales o "emergencias" que cambian las reglas del juego en tiempo real.

## Características y Modos de Juego

La aplicación cuenta con dos mazos independientes (`Comodines` y `Emergencias Globales`) y 4 modos de juego adaptables a cualquier estilo de partida:

*    **Comodín: Manual:** Saca una carta personalizada a voluntad presionando el botón. Sin límite de tiempo.
*    **Comodín: Frenético:** Las reglas de la carta comodín cambian automáticamente cada cierto tiempo (configurable en segundos).
*    **Emergencia: Fija (Manual):** Establece una regla global para toda la mesa que se queda activa hasta que decidas cambiarla.
*    **Emergencia: Dinámica:** Caos total. Un evento global que afecta a todos los jugadores y cambia automáticamente al agotarse el tiempo (configurable).

*Incluye alertas sonoras 5 segundos antes de cada cambio y al revelar una nueva carta para no interrumpir la concentración en la mesa.*

##  Cómo usarlo

No necesitas instalar nada. Simplemente abre el enlace desde tu celular o tablet:
 **[Enlace a tu GitHub Pages aquí - Ej. https://ImKazper.github.io/virus-companion/]**

*Tip: Puedes "Añadir a la pantalla de inicio" desde el navegador de tu celular para que funcione y se vea como una app nativa a pantalla completa.*

##  Cómo agregar tus propias cartas

El catálogo de cartas es completamente personalizable y está separado del código de la aplicación. Para agregar, modificar o eliminar cartas, solo necesitas editar los archivos JSON ubicados en la carpeta `data/`.

**Formato para `data/comodines.json` y `data/globales.json`:**
```json
[
  {
    "titulo": "Nombre de tu carta",
    "descripcion": "El efecto que tendrá en el juego."
  },
  {
    "titulo": "Otra carta",
    "descripcion": "Otro efecto distinto."
  }
]
