1. Información General
Modalidad: Individual.

Temática: Libre.

Objetivo: Desarrollar un videojuego web funcional e interactivo utilizando exclusivamente HTML, CSS y Vanilla JS, consolidando los fundamentos algorítmicos esenciales: manejo de variables, estructuras de datos (arreglos y objetos), funciones modulares, estructuras de control condicional y captura de eventos.

2. Requerimientos Técnicos Obligatorios
El código fuente en JavaScript debe evidenciar de forma obligatoria y documentada el uso de los siguientes componentes:

Variables y Tipos Primitivos: Declaración y manipulación adecuada de datos primitivos (string, number, boolean, etc.).

Estructuras de Control y Condiciones: Uso de bifurcaciones lógicas mediante sentencias if, else if, else o condicionales ternarios.

Arreglos (Arrays): Definición y operaciones sobre listas para gestionar elementos dinámicos del juego.

Objetos Literales: Modelado de entidades (jugador, estados, elementos, configuración) mediante estructuras clave-valor.

Funciones (Declaradas y/o Flecha): Modularización del código a través de funciones estándar y funciones flecha (() => {}).

Eventos del Navegador: Captura e integración de entradas del usuario (keydown, keyup, click, etc.).

Manipulación del DOM: Selección, creación, modificación de propiedades/estilos e inserción/eliminación de nodos en el árbol del documento.

3. Restricciones Técnicas Estrictas (Caja de Arena)
El proyecto debe cumplir con las siguientes prohibiciones absolutas:

PROHIBIDO el uso de <canvas>: Toda la interfaz y los gráficos deben construirse exclusivamente con etiquetas HTML estándar estilizadas con CSS.

PROHIBIDO el asincronismo y llamadas de red: No se permiten llamadas asíncronas externas, peticiones HTTP (fetch, XMLHttpRequest) ni dependencias en línea.

PROHIBIDO el almacenamiento en navegador o usar el DOM como base de datos: No usar localStorage, sessionStorage, IndexedDB ni apoyarse en atributos del DOM para mantener el estado lógico principal del juego (el estado debe vivir en variables y estructuras de JS en memoria).

PROHIBIDO el uso de librerías externas: Prohibido el uso de frameworks o librerías de terceros (como Phaser, Three.js, React, jQuery, etc.).

PROHIBIDO abusar de innerHTML: Priorizar métodos nativos seguros de manipulación del DOM (createElement, appendChild, classList, textContent, etc.).

4. Reglas Especiales de Jugabilidad
Para el desarrollo y funcionamiento del juego, se debe seleccionar e integrar al menos una de las siguientes reglas dentro de la lógica del sistema:

Regla A: En cada turno múltiplo de 3, el jugador activo pierde 1 vida o punto automáticamente si no realiza su jugada antes de que el marcador llegue a cierto valor.

Regla B: Cada 4 jugadas exitosas, dos elementos aleatorios del tablero se intercambian de posición en el arreglo lógico y se reflejan en el DOM.

Regla C: Debe existir un elemento dentro del arreglo que, si es seleccionado, no suma puntos sino que congela el siguiente turno del jugador activo y cambia el fondo de la pantalla a color rojo durante esa ronda.

Regla D: Al llegar a la mitad de los puntos o intentos, la condición de victoria se invierte (por ejemplo, gana quien tenga menos puntos o quien evite alinear tres elementos).