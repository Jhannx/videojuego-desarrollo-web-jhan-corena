import { gameState } from '../state.js';

function crearElemento(tag, clase, texto = '') {
  const el = document.createElement(tag);
  if (clase) el.className = clase;
  if (texto) el.textContent = texto;
  return el;
}

export class KeypadCelda {
  constructor(game, onSuccess) {
    this.game = game;
    this.onSuccess = onSuccess;
    this.overlay = document.getElementById('puzzle-overlay');

    // Código de la celda: 1832 - 1100 = 732
    this.targetPin = '732';
    this.code = '';
    this.isOpen = false;

    this.displayEl = null;
    this.statusEl = null;
    this.handleKey = (e) => this.onKeyDown(e);
  }

  open() {
    if (!this.overlay) return;

    this.isOpen = true;
    this.code = '';
    this.render();

    this.overlay.classList.remove('hidden');
    gameState.isInputBlocked = true;
    window.addEventListener('keydown', this.handleKey);
  }

  close() {
    if (!this.isOpen) return;

    this.isOpen = false;
    this.overlay.classList.add('hidden');
    this.overlay.textContent = '';

    gameState.isInputBlocked = false;
    window.removeEventListener('keydown', this.handleKey);
  }

  render() {
    this.overlay.textContent = '';

    const modal = crearElemento('div', 'keypad-modal');
    const header = crearElemento('div', 'keypad-header');
    const title = crearElemento('span', 'keypad-title', 'TERMINAL SECTOR 1832');
    const closeBtn = crearElemento('button', 'keypad-btn-close', '✕');
    closeBtn.type = 'button';
    closeBtn.onclick = () => this.close();
    header.append(title, closeBtn);

    const screen = crearElemento('div', 'keypad-screen');
    this.displayEl = crearElemento('div', 'keypad-display', '---');
    this.statusEl = crearElemento('div', 'keypad-status-msg', 'INGRESE PIN DE ANULACIÓN');
    screen.append(this.displayEl, this.statusEl);

    const grid = crearElemento('div', 'keypad-grid');
    const botones = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'BORRAR', '0', 'ENTER'];

    botones.forEach((valor) => {
      const btn = crearElemento('button', 'keypad-btn', valor);
      btn.type = 'button';
      if (valor === 'BORRAR') btn.classList.add('keypad-btn-clear');
      if (valor === 'ENTER') btn.classList.add('keypad-btn-enter');

      btn.onclick = () => this.handleInput(valor);
      grid.appendChild(btn);
    });

    modal.append(header, screen, grid);
    this.overlay.appendChild(modal);
  }

  handleInput(valor) {
    if (valor === 'BORRAR') {
      this.code = this.code.slice(0, -1);
      this.displayEl.textContent = this.code || '---';
    } else if (valor === 'ENTER') {
      if (this.code.length > 0) this.checkCode();
    } else if (this.code.length < 4) {
      this.code += valor;
      this.displayEl.textContent = this.code;
    }
  }

  checkCode() {
    if (this.code === this.targetPin) {
      this.displayEl.classList.add('access-granted');
      this.statusEl.textContent = 'ACCESO CONCEDIDO';
      this.statusEl.className = 'keypad-status-msg success';

      setTimeout(() => {
        this.close();
        if (this.onSuccess) this.onSuccess();
      }, 800);
    } else {
      gameState.loseLife();
      this.code = '';
      this.displayEl.textContent = '---';

      if (gameState.lives <= 0) {
        this.statusEl.textContent = 'ALARMA ACTIVADA - REINICIANDO';
        this.statusEl.className = 'keypad-status-msg error';
        gameState.setLives(3);

        setTimeout(() => {
          this.close();
          this.game.showDialog(
            'Aliado en las sombras',
            'Sonó la alarma del sector. Recuerda: si las celdas van de 10 en 10 (1080, 1090...), esta es la 1100. Resta 1832 - 1100 e inténtalo de nuevo.'
          );
        }, 900);
      } else {
        this.statusEl.textContent = `PIN INCORRECTO (Intentos: ${gameState.lives})`;
        this.statusEl.className = 'keypad-status-msg error';
      }
    }
  }

  onKeyDown(e) {
    if (!this.isOpen) return;
    if (e.key >= '0' && e.key <= '9') this.handleInput(e.key);
    else if (e.key === 'Backspace') this.handleInput('BORRAR');
    else if (e.key === 'Enter') this.handleInput('ENTER');
    else if (e.key === 'Escape') this.close();
  }
}
