# Invasión Alienígena

## AUTOR: JHAN CORENA SEGURA

Videojuego de aventura y acertijos hecho solo con HTML, CSS y JavaScript, sin librerías ni `<canvas>`. Se avanza leyendo diálogos, viendo cinemáticas y resolviendo acertijos. No hay que mover al personaje: todo se hace con clics y con la tecla **E**.

## La historia, rápido

Es 2027 y los alienígenas invadieron la Tierra. Despiertas encerrado en una celda, escapas en una nave y llegas al refugio de **Babas**, que te ayuda a construir un portal en el tiempo. Con él viajas a tres épocas para conseguir las piezas de un cañón Bio-EMP:

1. **1957, la fábrica:** el ingeniero te da la bobina de alto voltaje.
2. **1998, el laboratorio de biología:** la Dra. Lewis te entrega el biochip.
3. **2077, la sala de servidores:** reparas una PC, hackeas el núcleo alienígena y te llevas el código en una USB.

Al final vuelves al refugio, se arma el cañón, Babas se despide y se lo lleva a su planeta para acabar con la invasión.

## Cómo abrirlo

El juego usa módulos de JavaScript (`import` / `export`), y el navegador no los carga si abres el `index.html` con doble clic. Hay que abrirlo con un servidor local. Lo más fácil es usar la extensión **Live Server** de VS Code: clic derecho sobre `index.html` y luego "Open with Live Server".

Controles:

- **Clic:** botones, personajes y zonas marcadas en naranja.
- **E:** pasar el diálogo o interactuar con lo que hay en la escena.
- **Espacio / Esc:** saltar una cinemática.

## Cómo está organizado

```
index.html
css/
  main.css          contenedor, capas, personajes, pantalla roja
  hud.css           todo lo que va encima: menú, vidas, diálogos, inventario, acertijos
js/
  main.js           la clase Game: cambia escenas, fondos, diálogos y cinemáticas
  state.js          el estado del juego en memoria (vidas, dificultad, inventario)
  services/
    AudioManager.js música de fondo y botón de silencio
  scenes/           una clase por escena
  puzzles/          una clase por acertijo
resources/
  img/              personajes e ítems del inventario
  img/envs/         fondos de cada escena
  video/            cinemáticas
  audio/            música
others/             requisitos del taller e historia del juego
```

### index.html

Es casi solo la estructura vacía. El juego vive dentro de `#game-container` y está hecho por capas que se apilan una sobre otra:

- `#scene-background`: el fondo de la escena (se cambia desde JS).
- `#scene-elements`: lo que cada escena pone encima, como Babas, la doctora o las zonas clicables. Se vacía cada vez que se cambia de escena.
- `#player-container`: la imagen del protagonista. Solo se muestra u oculta.
- `#puzzle-overlay`: donde aparecen los acertijos de preguntas y el teclado de la celda.
- `#title-screen`: el menú inicial con la dificultad.
- `#ui-layer`: el HUD de arriba (vidas, título, audio), la caja de diálogo y el inventario de abajo.
- `#cinematic-overlay`: el reproductor de video que tapa todo mientras corre una cinemática.

### main.js

Aquí está la clase `Game`, que es como el director del juego. Las escenas no tocan el HTML general directamente, sino que le piden cosas a `Game`:

- `changeScene('nombre')`: llama al `exit()` de la escena actual y al `enter()` de la siguiente.
- `setBackground(ruta)`: cambia la imagen de fondo.
- `setHudTitle(texto)`: cambia el título de arriba.
- `showPlayer(true / false)`: muestra u oculta al protagonista.
- `showDialog(quien, texto, alCerrar)`: abre la caja de diálogo. El tercer parámetro es una función que se ejecuta cuando el jugador cierra ese diálogo. Así encadenamos conversaciones: un diálogo abre el siguiente, y el último abre el acertijo o la cinemática.
- `playCinematic(ruta, alTerminar)`: pausa la música, pone el video encima de todo y cuando termina (o lo saltan) ejecuta `alTerminar`. Igual que con los diálogos, en ese callback va lo que pasa después.

Las escenas se crean recién cuando se pulsa **Iniciar juego** y no al cargar la página. Así, cuando los acertijos se arman, ya se sabe qué dificultad eligió el jugador.

La tecla **E** se escucha en un solo lugar (aquí). Si hay un diálogo abierto, lo cierra. Si no, llama a `interact()` de la escena actual.

### state.js

Un objeto literal `gameState` con todo lo que el juego necesita recordar: vidas, dificultad, si los controles están bloqueados, si el audio está silenciado, las 4 ranuras del inventario y un par de banderas de progreso para no repetir un acertijo ya resuelto. Todo vive en memoria. No se usa `localStorage` ni se guarda nada en atributos del HTML.

`addItemToSlot(ranura, item)` guarda el ítem en el arreglo y dibuja su imagen en la casilla del inventario.

### Las escenas (`js/scenes/`)

Cada escena es una clase con los mismos métodos:

- `enter()`: se ejecuta al llegar. Pone el fondo, el título, muestra u oculta al protagonista, agrega los personajes y lanza el primer diálogo.
- `interact()`: lo que pasa al presionar **E** en esa escena.
- `exit()`: limpia lo que la escena agregó.

Es decir, cada archivo de escena controla lo que pasa en ese lugar: qué fondo se ve, quién aparece, qué se dice, qué acertijo se abre, qué cinemática se reproduce al terminar y a qué escena se pasa después.

| Archivo | Qué pasa |
|---|---|
| `SceneCelda.js` | Celda en primera persona. El aliado da la pista y se abre el teclado. Al acertar: video de escape y pasa al laboratorio. |
| `SceneLaboratorio.js` | Llegada al refugio con Babas. Acertijo del portal, video del portal y, con **E**, viaje a 1957. |
| `SceneFabrica1957.js` | El ingeniero, acertijo de electricidad, se gana la bobina y Babas te manda a 1998. |
| `SceneLab1998.js` | La Dra. Lewis, la conversación, el acertijo del biochip y el viaje a 2077. |
| `Scene2077.js` | PC apagada, video de arreglarla, acertijo de cables, PC encendida con el código Java, video de la USB y vuelta al refugio. |
| `SceneFinal.js` | Refugio con el portal apagado, video del cañón, despedida de Babas, videos finales y pantalla de "FELICIDADES". |

### Los acertijos (`js/puzzles/`)

**Los de preguntas con dificultad** (`PortalConstruction.js`, `FabricaPuzzle.js`, `BiochipPuzzle.js`)

Los tres funcionan igual, así que la parte común está en `PuzzlePreguntas.js`: armar la ventana, mostrar las opciones, quitar vidas al fallar y la Regla C. Cada uno de los tres hereda de ahí (`extends PuzzlePreguntas`) y solo tiene sus preguntas y sus mensajes.

Siempre importan la clase `Dificultad`, porque la pregunta cambia según la dificultad elegida. En `configurarAcertijo()` hay un `if / else if / else` que pregunta `esFacil()`, `esDificil()` o, si no, usa la media. Ese método se llama dentro de `open()` y no en el constructor, para que lea la dificultad en el momento en que se abre el acertijo.

Cada pregunta es un objeto con título, contexto, pregunta y un arreglo de opciones. Cada opción dice si es `correcta`, `error` o `trampa`:

- **correcta:** cierra el acertijo y la escena sigue.
- **error:** quita una vida. Si llegas a cero, se reinician las vidas y un personaje te da un consejo.
- **trampa:** activa la Regla C.

**Los otros**

- `KeypadCelda.js`: el teclado numérico de la celda. El PIN es 1832 − 1100 = **732**. Acepta clics y el teclado físico.
- `Cables2077Puzzle.js`: los cables de la PC. Se hace clic en un cable de la izquierda (A1 a A4) y luego en uno de la derecha (B1 a B5) para unirlos. El acertijo de "los tres hermanos" se puede minimizar para ver bien los cables. Hay que unir rojo con rojo, verde con verde y amarillo con amarillo, y no tocar el azul. Si unes azul con azul, salta la Regla C.
- `CodeTerminal2077Puzzle.js`: un `<textarea>` dentro del monitor con una clase Java que se puede editar de verdad. Babas solo da pistas: hay que pasar `sintonizarFrecuencia` de `private` a `public` y hacer que `isControlHumanoActivo()` devuelva `false`. Al compilar se revisa el texto con expresiones regulares, y si falla te dice qué parte está mal.

### La Regla C

De las reglas especiales del taller elegimos la C. En cada acertijo de preguntas hay una opción trampa dentro del arreglo de opciones, y en el de cables la trampa es unir los azules. Si la eliges:

- no avanzas,
- el juego se congela 5 segundos (los botones se desactivan),
- y la pantalla se pone roja agregando la clase `.screen-frozen-red` a `#game-container`.

Pasados los 5 segundos se quita la clase y puedes volver a intentarlo.

### Los CSS

- **main.css:** lo básico. Centra el juego en 1280×720, define las capas con su `z-index` para que cada una quede donde va, el estilo del video de las cinemáticas, la clase `.hidden` que usamos en todos lados para mostrar y ocultar cosas, la pantalla roja de la Regla C y el tamaño y la sombra de los personajes (el protagonista, Babas, el ingeniero y la Dra. Lewis, que lleva un brillo extra para que se distinga del fondo).
- **hud.css:** todo lo que es interfaz: el menú inicial, la barra de vidas, la caja de diálogo, el inventario, los botones, las zonas clicables naranjas, las ventanas de los acertijos, el teclado, los cables, el editor de código, el vórtice del portal del final y la pantalla de victoria.

En JS casi nunca se cambian estilos a mano. Lo normal es agregar o quitar clases con `classList`. Solo se usa `style` para posiciones puntuales, como dónde va un personaje o un cable.

## Requisitos del taller

- **Tipos primitivos:** vidas (number), dificultad (string), bloqueos (boolean).
- **Condicionales:** la dificultad, el tipo de cada opción, la validación de cables y del código.
- **Arreglos:** opciones de cada pregunta, inventario, cables, botones del teclado, versos del acertijo.
- **Objetos literales:** `gameState`, cada pregunta, cada ítem del inventario, cada cable.
- **Funciones declaradas y flecha:** métodos de las clases y callbacks como `() => this.changeScene('celda')`.
- **Eventos:** `click`, `keydown` (tecla E, teclado de la celda, Tab en el editor) y `ended` del video.
- **DOM:** todo se crea con `createElement`, `append` / `appendChild`, `textContent` y `classList`. No hay `innerHTML`.
- **Prohibido y no usado:** `<canvas>`, `fetch`, `localStorage` y librerías externas.