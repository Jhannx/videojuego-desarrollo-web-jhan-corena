import { KeypadCelda } from '../puzzles/KeypadCelda.js';

export class SceneCelda {
  constructor(game) {
    this.game = game;
    this.keypadHotspot = null;
    this.keypad = new KeypadCelda(game, () => this.onEscapeSuccess());
  }

  enter() {
    this.game.setBackground('resources/img/envs/Celda.jfif');
    this.game.setHudTitle('ACTO 1: CELDA DE AISLAMIENTO');

    // Vista en primera persona: ocultamos al personaje
    this.game.showPlayer(false);

    this.createHotspot();

    this.game.showDialog(
      'Aliado en las sombras',
      'No fuerces la cerradura o sonará la alarma. Mira el pasillo: las celdas suben de 10 en 10 (1080, 1090...). Resta el número de tu celda al código de la consola central (1832) y márcalo en el teclado.'
    );

    this.game.audio.playBGM('tension');
  }

  createHotspot() {
    const container = this.game.sceneElements;
    if (!container) return;

    container.textContent = '';

    const hotspot = document.createElement('div');
    hotspot.className = 'interactive-hotspot';
    hotspot.style.left = '1020px';
    hotspot.style.bottom = '160px';
    hotspot.style.width = '140px';
    hotspot.style.height = '160px';

    const badge = document.createElement('span');
    badge.className = 'hotspot-badge';
    badge.textContent = '[E] Teclado PIN';

    hotspot.appendChild(badge);
    hotspot.addEventListener('click', () => this.interact());

    this.keypadHotspot = hotspot;
    container.appendChild(hotspot);
  }

  interact() {
    if (this.game.dialogOpen) return;
    this.keypad.open();
  }

  onEscapeSuccess() {
    if (this.keypadHotspot) {
      this.keypadHotspot.classList.add('hidden');
    }

    this.game.showDialog(
      'Aliado en las sombras',
      '¡Lograste abrir el cerrojo! El hangar exterior está enfrente, sube a la nave antes de que despeguen los drones.',
      () => {
        this.game.playCinematic('resources/video/nave escape.mp4', () => {
          this.game.audio.playBGM('suspense');
          this.game.changeScene('laboratorio');
        });
      }
    );
  }

  exit() {
    if (this.game.sceneElements) {
      this.game.sceneElements.textContent = '';
    }
  }
}
