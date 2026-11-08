import { gameState } from '../state.js';

export class Cables2077Puzzle {
  constructor(game, onSuccess) {
    this.game = game;
    this.onSuccess = onSuccess;
    this.container = document.getElementById('scene-elements');
    this.uiLayer = document.getElementById('ui-layer');
    this.gameContainer = document.getElementById('game-container');

    // Columna A (izquierda) y columna B (derecha), ubicadas sobre las puntas de cobre del fondo
    this.cablesA = [
      { id: 'A1', nombre: 'Rojo (Brasa)', color: '#ff4757', top: 195, left: 370 },
      { id: 'A2', nombre: 'Azul (Lluvia)', color: '#1e90ff', top: 265, left: 370 },
      { id: 'A3', nombre: 'Verde (Hoja)', color: '#2ed573', top: 345, left: 370 },
      { id: 'A4', nombre: 'Amarillo (Oro)', color: '#ffa502', top: 420, left: 370 }
    ];

    this.cablesB = [
      { id: 'B1', nombre: 'Rojo', color: '#ff4757', top: 205, left: 810 },
      { id: 'B2', nombre: 'Verde', color: '#2ed573', top: 260, left: 810 },
      { id: 'B3', nombre: 'Azul', color: '#1e90ff', top: 310, left: 810 },
      { id: 'B4', nombre: 'Gris', color: '#747d8c', top: 360, left: 810 },
      { id: 'B5', nombre: 'Amarillo', color: '#ffa502', top: 420, left: 810 }
    ];

    this.conexiones = {};
    this.selectedA = null;
    this.bloqueado = false;
    this.riddleCard = null;
    this.riddleToggleBtn = null;
    this.statusTextEl = null;
    this.botones = {};
  }

  open() {
    this.bloqueado = false;
    this.selectedA = null;
    this.conexiones = { A1: null, A2: null, A3: null, A4: null };
    this.render();
  }

  close() {
    this.quitarTarjeta();
    if (this.container) this.container.textContent = '';
  }

  // La tarjeta vive en ui-layer (por encima del HUD), por eso se quita aparte
  quitarTarjeta() {
    if (this.riddleCard) this.riddleCard.remove();
    if (this.riddleToggleBtn) this.riddleToggleBtn.remove();
    this.riddleCard = null;
    this.riddleToggleBtn = null;
  }

  render() {
    if (!this.container) return;
    this.close();
    this.crearTarjetaAcertijo();

    this.cablesA.forEach((c) => this.crearNodo(c, () => this.seleccionarCableA(c.id)));
    this.cablesB.forEach((c) => this.crearNodo(c, () => this.conectarConB(c.id)));

    // Zona clicable sobre la palanca ON/OFF del fondo
    const palanca = document.createElement('div');
    palanca.className = 'switch-center-hotspot';
    palanca.title = 'Accionar Interruptor ON/OFF';
    palanca.onclick = () => this.accionarInterruptor();
    this.container.appendChild(palanca);

    const bar = document.createElement('div');
    bar.className = 'cables-control-bar';

    this.statusTextEl = document.createElement('div');
    this.statusTextEl.className = 'cables-status-text';
    this.statusTextEl.textContent = 'Selecciona un cable de la izquierda (A1..A4) para iniciar el empalme.';

    const btnGroup = document.createElement('div');
    btnGroup.className = 'cables-btn-group';

    const switchBtn = document.createElement('button');
    switchBtn.type = 'button';
    switchBtn.className = 'cables-btn-switch';
    switchBtn.textContent = '⚡ ACCIONAR INTERRUPTOR';
    switchBtn.onclick = () => this.accionarInterruptor();

    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'cables-btn-reset';
    resetBtn.textContent = '↺ Reiniciar Cables';
    resetBtn.onclick = () => this.reiniciarCables();

    btnGroup.append(switchBtn, resetBtn);
    bar.append(this.statusTextEl, btnGroup);
    this.container.appendChild(bar);
  }

  crearNodo(cable, alHacerClic) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cable-node';
    btn.style.top = `${cable.top}px`;
    btn.style.left = `${cable.left}px`;
    btn.style.borderColor = cable.color;
    btn.textContent = `${cable.id}: ${cable.nombre}`;
    btn.onclick = alHacerClic;

    this.botones[cable.id] = btn;
    this.container.appendChild(btn);
  }

  crearTarjetaAcertijo() {
    const capa = this.uiLayer || this.container;

    const card = document.createElement('div');
    card.className = 'riddle-note-card';

    const header = document.createElement('div');
    header.className = 'riddle-note-header';

    const title = document.createElement('span');
    title.className = 'riddle-note-title';
    title.textContent = 'PROTOCOLO DE EMPALME (2077)';

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'riddle-note-close';
    closeBtn.textContent = '✕ Minimizar / Cerrar';
    header.append(title, closeBtn);

    const body = document.createElement('div');
    body.className = 'riddle-note-body';

    const intro = document.createElement('p');
    intro.textContent = 'Tres hermanos deben abrazarse para encender la chispa, pero el cuarto trae la tormenta:';

    const lista = document.createElement('ul');
    const versos = [
      '• El primero quema como la brasa.',
      '• El segundo brota como la hoja.',
      '• El tercero brilla como el oro.'
    ];
    versos.forEach((verso) => {
      const li = document.createElement('li');
      li.textContent = verso;
      lista.appendChild(li);
    });

    const aviso = document.createElement('p');
    aviso.style.color = '#ff6b81';
    aviso.textContent = 'Al que llora como la lluvia profunda, déjalo dormir en el frío. Si lo despiertas y toca a su gemelo, la furia del voltaje los consumirá a todos.';

    body.append(intro, lista, aviso);
    card.append(header, body);

    // Botón para volver a abrir la tarjeta cuando se minimiza
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'riddle-open-btn hidden';
    toggleBtn.textContent = '📜 Ver Acertijo';

    closeBtn.onclick = () => {
      card.classList.add('hidden');
      toggleBtn.classList.remove('hidden');
    };
    toggleBtn.onclick = () => {
      card.classList.remove('hidden');
      toggleBtn.classList.add('hidden');
    };

    this.riddleCard = card;
    this.riddleToggleBtn = toggleBtn;
    capa.append(card, toggleBtn);
  }

  mostrarEstado(texto, tipo = '') {
    this.statusTextEl.className = `cables-status-text ${tipo}`;
    this.statusTextEl.textContent = texto;
  }

  seleccionarCableA(idA) {
    if (this.bloqueado) return;

    // Clic sobre el mismo cable: se suelta (y se desconecta si ya estaba empalmado)
    if (this.selectedA === idA) {
      if (this.conexiones[idA]) {
        this.conexiones[idA] = null;
        this.mostrarEstado(`Cable ${idA} desconectado.`);
      }
      this.selectedA = null;
    } else {
      this.selectedA = idA;
      this.mostrarEstado(`Cable ${idA} seleccionado. Elige un borne de destino (B1..B5).`);
    }
    this.actualizarUI();
  }

  conectarConB(idB) {
    if (this.bloqueado || !this.selectedA) return;

    // Un borne B solo admite un cable: si ya tenía uno, se libera
    Object.keys(this.conexiones).forEach((idA) => {
      if (this.conexiones[idA] === idB) this.conexiones[idA] = null;
    });

    this.conexiones[this.selectedA] = idB;
    this.mostrarEstado(`Empalme realizado: ${this.selectedA} ➔ ${idB}.`);
    this.selectedA = null;
    this.actualizarUI();
  }

  reiniciarCables() {
    if (this.bloqueado) return;
    this.selectedA = null;
    this.conexiones = { A1: null, A2: null, A3: null, A4: null };
    this.mostrarEstado('Cables reiniciados. Selecciona un cable de la izquierda (A1..A4).');
    this.actualizarUI();
  }

  actualizarUI() {
    this.cablesA.forEach((c) => {
      const destino = this.conexiones[c.id];
      const btn = this.botones[c.id];
      btn.textContent = destino ? `${c.id}: ${c.nombre} ⚡ ${destino}` : `${c.id}: ${c.nombre}`;
      btn.classList.toggle('connected', Boolean(destino));
      btn.classList.toggle('selected', this.selectedA === c.id);
    });

    this.cablesB.forEach((c) => {
      const origen = Object.keys(this.conexiones).find((idA) => this.conexiones[idA] === c.id);
      const btn = this.botones[c.id];
      btn.textContent = origen ? `${c.id}: ${c.nombre} ⚡ ${origen}` : `${c.id}: ${c.nombre}`;
      btn.classList.toggle('connected', Boolean(origen));
    });
  }

  accionarInterruptor() {
    if (this.bloqueado) return;

    // Trampa: el azul (el que llora) tocando a su gemelo azul
    if (this.conexiones.A2 === 'B3') {
      this.activarReglaC();
      return;
    }

    // Los tres hermanos: rojo con rojo, verde con verde y amarillo con amarillo
    const rojoOk = this.conexiones.A1 === 'B1';
    const verdeOk = this.conexiones.A3 === 'B2';
    const amarilloOk = this.conexiones.A4 === 'B5';

    if (rojoOk && verdeOk && amarilloOk) {
      this.bloqueado = true;
      this.mostrarEstado('¡CIRCUITO COMPLETO! El interruptor sube a ON. La terminal enciende.', 'success');

      setTimeout(() => {
        this.close();
        if (this.onSuccess) this.onSuccess();
      }, 1000);
    } else {
      this.mostrarEstado('Circuito incompleto o desfasado. La corriente no fluye. Revisa el acertijo.', 'error');
    }
  }

  // Regla C: congelamiento de 5 segundos y pantalla en rojo
  activarReglaC() {
    this.bloqueado = true;
    gameState.isInputBlocked = true;
    gameState.loseLife();

    if (this.gameContainer) this.gameContainer.classList.add('screen-frozen-red');
    this.mostrarEstado('¡CORTOCIRCUITO! El cable azul tocó a su gemelo. Sistema bloqueado 5 segundos.', 'error');

    setTimeout(() => {
      if (this.gameContainer) this.gameContainer.classList.remove('screen-frozen-red');
      this.bloqueado = false;
      gameState.isInputBlocked = false;
      this.reiniciarCables();
      this.mostrarEstado('Disyuntor restablecido. Recuerda: deja al que llora dormir en el frío.');
    }, 5000);
  }
}
