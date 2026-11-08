# Historia y recorrido del juego: Invasión Alienígena

## De qué trata

En el año 2027 una invasión alienígena toma la Tierra y encierra a los humanos en centros de detención. El protagonista despierta encerrado en una celda sin equipo. Con la ayuda inicial de un aliado oculto logra escapar en una nave y llega a un laboratorio subterráneo donde conoce a **Babas**, un compañero alienígena que decide ponerse del lado humano.

Para detener la invasión hay que construir un portal temporal y viajar a tres años distintos (1957, 1998 y 2077) para conseguir tres piezas que juntas forman el **Cañón Bio-EMP**:

1. **Bobina de Alto Voltaje (1957)** — `resources/img/item-libro-bobina.jfif`
2. **Bio-Chip Orgánico (1998)** — `resources/img/item-biochip.jfif`
3. **Código Cuántico en USB (2077)** — `resources/img/item-usb.jfif`
4. **Cañón Bio-EMP ensamblado (2027)** — `resources/img/cañon.jfif`

El juego no usa movimiento lateral: toda la partida avanza conversando con los personajes, presionando **E** (o haciendo clic en pantalla), viendo las cinemáticas y resolviendo los acertijos de cada época.

---

## Recorrido paso a paso

### Inicio
- **Pantalla inicial (`#title-screen`):** se elige la dificultad (`Fácil`, `Medio` o `Difícil`), que define qué pregunta sale en los acertijos del portal, la fábrica de 1957 y el laboratorio de 1998.
- **Cinemática de apertura:** al pulsar **INICIAR JUEGO** se reproduce `resources/video/Invasion.mp4`.

---

### Acto 1: La celda (2027) — `SceneCelda.js`
- **Fondo:** `resources/img/envs/Celda.jfif` (vista en primera persona, sin mostrar el sprite del protagonista).
- **Qué ocurre:** el aliado en las sombras nos avisa que las celdas del pasillo van de 10 en 10 (`1080`, `1090`...), por lo que la nuestra es la `1100`. Para abrir la puerta hay que restar ese número al código de la consola central (`1832`):
  `1832 - 1100 = 732`.
- **Acertijo (`KeypadCelda.js`):** teclado numérico en pantalla donde se ingresa `732` (3 vidas; si se agotan, suena la alarma, se reinician las 3 vidas y el aliado repite la pista).
- **Salida:** al acertar el PIN aparece el diálogo de aviso y se reproduce `resources/video/nave escape.mp4`, pasando al laboratorio subterráneo.

---

### Acto 2: Laboratorio subterráneo y portal (2027) — `SceneLaboratorio.js`
- **Fondo:** `resources/img/envs/lab-portal.jfif`.
- **Personajes en escena:** el protagonista (`resources/img/protagonista.png`) y Babas (`resources/img/babas.png`).
- **Qué ocurre:** Babas se presenta y nos dice que para construir el portal primero debemos responder unas preguntas.
- **Acertijo (`PortalConstruction.js`):** pregunta de física según la dificultad elegida:
  - *Fácil:* frecuencia de resonancia (`f = 1 / T`, respuesta `20 Hz`).
  - *Medio:* Ley de Ohm (`V = I · R`, respuesta `120 V`).
  - *Difícil:* resistencia equivalente en paralelo y serie (respuesta `50 Ω`).
  - Si se elige la opción trampa, se activa la **Regla C** (pantalla roja y bloqueo de 5 segundos).
- **Salida:** al resolverlo se reproduce `resources/video/portal.mp4`. Luego Babas nos indica presionar **E** para viajar a 1957; al hacerlo se reproduce `resources/video/Fabrica.mp4` y pasamos a la fábrica.

---

### Misión 1: Fábrica industrial (1957) — `SceneFabrica1957.js`
- **Fondo:** `resources/img/envs/fabrica.jfif`.
- **Personajes en escena:** el protagonista y el ingeniero (`resources/img/ingeniero.png`).
- **Qué ocurre:** el ingeniero pide ayuda urgente para estabilizar la consola antes de que se funda la bobina.
- **Acertijo (`FabricaPuzzle.js`):**
  - *Fácil:* qué magnitud mide el flujo de electrones por unidad de tiempo (*Corriente eléctrica*).
  - *Medio:* qué material sirve como semiconductor en 1957 (*Germanio / Silicio*).
  - *Difícil:* qué pasa con la resistencia del cobre cuando sube mucho la temperatura (*Aumenta*).
- **Recompensa y salida:** se guarda la **Bobina de Alto Voltaje** (`resources/img/item-libro-bobina.jfif`) en la ranura 1 del inventario. El ingeniero nos felicita, Babas nos habla por radio para enviarnos a 1998, se reproduce `resources/video/intro-lab-biologia.mp4` y pasamos al laboratorio de biología.

---

### Misión 2: Laboratorio de biología (1998) — `SceneLab1998.js`
- **Fondo:** `resources/img/envs/lab biologia.jfif`.
- **Personajes en escena:** el protagonista y la Dra. Lewis (`resources/img/cientifica2.png`).
- **Qué ocurre:** la Dra. Lewis pregunta quiénes somos; el protagonista le explica que viene del 2027 y necesita el Bio-Chip para salvar la Tierra. Ella nos pone a prueba con el protocolo de la cápsula criogénica.
- **Acertijo (`BiochipPuzzle.js`):**
  - *Fácil:* proceso con el que las plantas producen glucosa y liberan oxígeno (*Fotosíntesis*).
  - *Medio:* enlace químico donde los átomos comparten pares de electrones (*Enlace covalente*).
  - *Difícil:* principio cuántico de coexistencia de estados antes de medir (*Superposición cuántica*).
- **Recompensa y salida:** se guarda el **Bio-Chip Orgánico** (`resources/img/item-biochip.jfif`) en la ranura 2 del inventario. Babas nos avisa que nos llevará al 2077, se reproduce `resources/video/intro-2077.mp4` y llegamos a la sala de servidores.

---

### Misión 3: Sala de servidores (2077) — `Scene2077.js`
Esta misión tiene dos partes seguidas:

1. **Arreglar los cables de la PC:**
   - Empezamos en `resources/img/envs/2077-pc-apagada.jfif`. Al presionar **E** sobre la terminal se reproduce `resources/video/2077-arreglar-pc.mp4` y pasamos al primer plano de la caja eléctrica (`resources/img/envs/arreglar-pc.jfif`).
   - Babas nos muestra el acertijo de los cables (*"Tres hermanos deben abrazarse para encender la chispa, pero el cuarto trae la tormenta..."*).
   - **Acertijo (`Cables2077Puzzle.js`):** hay que unir `A1 Rojo` con `B1 Rojo`, `A3 Verde` con `B2 Verde` y `A4 Amarillo` con `B5 Amarillo`, dejando el cable azul sin conectar. Si se conecta azul con azul (`A2` con `B3`), salta el cortocircuito de la **Regla C** (pantalla roja y 5 segundos de bloqueo).

2. **Modificar el código del núcleo alienígena:**
   - Al activar el interruptor con los cables bien puestos, pasamos a la pantalla encendida (`resources/img/envs/2077-pc-encendida.webp`).
   - Babas nos da la pista sin decirnos la respuesta literal: hay que abrir el encapsulamiento del método que sintoniza la frecuencia y cambiar el valor de retorno del método que mantiene activo el control humano.
   - **Acertijo (`CodeTerminal2077Puzzle.js`):** en el editor de código de la clase `AlienCoreController` el jugador escribe directamente en el código para cambiar `private int sintonizarFrecuencia` a `public int sintonizarFrecuencia`, y en `isControlHumanoActivo()` cambiar `return true;` por `return false;`.
   - **Recompensa y salida:** al compilar el parche se reproduce `resources/video/toma-usb.mp4`, se agrega la **USB con el Código Cuántico** (`resources/img/item-usb.jfif`) a la ranura 3 del inventario y volvemos al laboratorio del 2027.

---

### Acto Final: Creación del Cañón Bio-EMP y cierre (2027) — `SceneFinal.js`
- **Fondo:** `resources/img/envs/lab-portal-apagado.PNG` con el protagonista y Babas.
- **Ensamblaje:** Babas dice *"Perfecto, hemos terminado el viaje, es hora de crear el cañón"*. Al presionar **E** se reproduce `resources/video/creacion-arma-cañon.mp4` y aparece el **Cañón Bio-EMP** (`resources/img/cañon.jfif`) en la ranura 4 del inventario.
- **Despedida:** volvemos al laboratorio con el portal encendido. El protagonista le da las gracias a Babas y Babas se despide diciendo que regresará a su planeta llevándose el cañón para volver todo a la normalidad.
- **Cinemáticas finales y victoria:** se reproduce `resources/video/destruccion - ganar juego.mp4`, seguida de `resources/video/babas-final.mp4`, y al terminar aparece en pantalla grande el mensaje **`FELICIDADES, HAS COMPLETADO EL VIDEOJUEGO`**.
