import { gameState } from '../state.js';

// Base compartida por los acertijos de opción múltiple (portal, fábrica y biochip).
// Cada hijo solo define sus preguntas en configurarAcertijo() y sus mensajes.
export class PuzzlePreguntas {
  constructor(game, onSuccess) {
    this.game = game;
    this.onSuccess = onSuccess;
    this.overlay = document.getElementById('puzzle-overlay');
    this.gameContainer = document.getElementById('game-container');

    this.bloqueado = false;
    this.statusEl = null;
    this.datos = null;
    this.mensajes = { exito: '', trampa: '', error: '', personaje: '', sinVidas: '' };
  }

  configurarAcertijo() {}

  open() {
    if (!this.overlay) return;
    this.bloqueado = false;
    // Se arma aquí y no en el constructor para leer la dificultad que eligió el jugador
    this.configurarAcertijo();
    this.render();
    this.overlay.classList.remove('hidden');
    gameState.isInputBlocked = true;
  }

  close() {
    if (this.overlay) {
      this.overlay.classList.add('hidden');
      this.overlay.textContent = '';
    }
    gameState.isInputBlocked = false;
  }

  render() {
    this.overlay.textContent = '';

    const modal = document.createElement('div');
    modal.className = 'puzzle-modal';

    const header = document.createElement('div');
    header.className = 'puzzle-header';

    const title = document.createElement('span');
    title.className = 'puzzle-title';
    title.textContent = this.datos.titulo;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'keypad-btn-close';
    closeBtn.type = 'button';
    closeBtn.textContent = '✕';
    closeBtn.onclick = () => {
      if (!this.bloqueado) this.close();
    };
    header.append(title, closeBtn);

    const body = document.createElement('div');
    body.className = 'puzzle-body';

    const pContexto = document.createElement('p');
    pContexto.textContent = this.datos.contexto;
    body.appendChild(pContexto);

    if (this.datos.formula) {
      const pFormula = document.createElement('p');
      pFormula.className = 'puzzle-formula';
      pFormula.textContent = this.datos.formula;
      body.appendChild(pFormula);
    }

    const pPregunta = document.createElement('p');
    pPregunta.className = 'puzzle-pregunta';
    pPregunta.textContent = this.datos.pregunta;
    body.appendChild(pPregunta);

    const optionsGrid = document.createElement('div');
    optionsGrid.className = 'puzzle-options';

    this.datos.opciones.forEach((opcion) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'puzzle-option-btn';
      btn.textContent = opcion.texto;
      btn.onclick = () => {
        if (!this.bloqueado) this.seleccionarOpcion(opcion, optionsGrid);
      };
      optionsGrid.appendChild(btn);
    });

    this.statusEl = document.createElement('div');
    this.statusEl.className = 'puzzle-status-msg';
    this.statusEl.textContent = 'SELECCIONE LA RESPUESTA CORRECTA';

    modal.append(header, body, optionsGrid, this.statusEl);
    this.overlay.appendChild(modal);
  }

  seleccionarOpcion(opcion, optionsGrid) {
    if (opcion.tipo === 'correcta') {
      this.statusEl.textContent = this.mensajes.exito;
      this.statusEl.className = 'puzzle-status-msg success';

      setTimeout(() => {
        this.close();
        if (this.onSuccess) this.onSuccess();
      }, 1200);
    } else if (opcion.tipo === 'trampa') {
      this.activarReglaC(optionsGrid);
    } else {
      gameState.loseLife();
      this.statusEl.textContent = `${this.mensajes.error} (Vidas: ${gameState.lives})`;
      this.statusEl.className = 'puzzle-status-msg error';

      if (gameState.lives <= 0) {
        gameState.setLives(3);
        this.close();
        this.game.showDialog(this.mensajes.personaje, this.mensajes.sinVidas);
      }
    }
  }

  // Regla C: la opción trampa no suma, congela 5 segundos y pone la pantalla en rojo
  activarReglaC(optionsGrid) {
    this.bloqueado = true;
    this.statusEl.textContent = this.mensajes.trampa;
    this.statusEl.className = 'puzzle-status-msg error';

    if (this.gameContainer) this.gameContainer.classList.add('screen-frozen-red');

    const botones = optionsGrid.querySelectorAll('button');
    botones.forEach((b) => (b.disabled = true));

    setTimeout(() => {
      if (this.gameContainer) this.gameContainer.classList.remove('screen-frozen-red');
      botones.forEach((b) => (b.disabled = false));
      this.bloqueado = false;
      this.statusEl.textContent = 'SISTEMA RESTABLECIDO. INTENTA NUEVAMENTE.';
      this.statusEl.className = 'puzzle-status-msg';
    }, 5000);
  }
}

