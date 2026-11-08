import { gameState } from '../state.js';
import { Cables2077Puzzle } from '../puzzles/Cables2077Puzzle.js';
import { CodeTerminal2077Puzzle } from '../puzzles/CodeTerminal2077Puzzle.js';

export class Scene2077 {
  constructor(game) {
    this.game = game;
    this.pcInspeccionada = false;
    this.puzzleCables = new Cables2077Puzzle(game, () => this.onCablesSolved());
    this.puzzleCode = new CodeTerminal2077Puzzle(game, () => this.onCodeSolved());
  }

  enter() {
    this.pcInspeccionada = false;
    this.game.setBackground('resources/img/envs/2077-pc-apagada.jfif');
    this.game.setHudTitle('MISIÓN 3: SALA DE SERVIDORES (2077)');

    this.game.showPlayer(true);

    this.createElements();

    this.game.showDialog(
      'Sistema',
      'Llegamos a la sala de servidores del 2077. La terminal central está completamente apagada y desconectada. Inspecciona el equipo para intentar encenderlo.'
    );

    this.game.audio.playBGM('tension');
  }

  createElements() {
    const container = this.game.sceneElements;
    if (!container) return;
    container.textContent = '';

    if (!this.pcInspeccionada) {
      const hotspot = document.createElement('div');
      hotspot.className = 'interactive-hotspot';
      hotspot.style.left = '480px';
      hotspot.style.bottom = '120px';
      hotspot.style.width = '320px';
      hotspot.style.height = '240px';

      const badge = document.createElement('span');
      badge.className = 'hotspot-badge';
      badge.textContent = '[E] Inspeccionar Terminal';
      hotspot.appendChild(badge);

      hotspot.onclick = () => this.inspeccionarPC();
      container.appendChild(hotspot);
    }
  }

  inspeccionarPC() {
    if (this.pcInspeccionada) return;
    this.pcInspeccionada = true;

    if (this.game.dialogOpen) {
      this.game.hideDialog();
    }

    this.game.playCinematic('resources/video/2077-arreglar-pc.mp4', () => {
      this.game.audio.playBGM('tension');
      this.game.setBackground('resources/img/envs/arreglar-pc.jfif');
      this.game.showPlayer(false);

      if (this.game.sceneElements) {
        this.game.sceneElements.textContent = '';
      }

      // Diálogo de Babas con el aviso del acertijo de cables
      this.game.showDialog(
        'Babas',
        'Hackeé el sistema de ellos, pero... solo puedo ver un acertijo para encender la PC. Descífralo, ten cuidado que no te descubran.',
        () => {
          this.puzzleCables.open();
        }
      );
    });
  }

  onCablesSolved() {
    // Al encender los cables, pasamos a la pantalla de la PC encendida para el hackeo de código
    this.game.setBackground('resources/img/envs/2077-pc-encendida.webp');
    this.game.showPlayer(false);

    if (this.game.sceneElements) {
      this.game.sceneElements.textContent = '';
    }

    // Diálogo de Babas con las pistas pedagógicas sin ser literal
    this.game.showDialog(
      'Babas',
      '¡La terminal está online! Tenemos acceso al núcleo alienígena en pantalla, pero sus defensas están activas. Para vulnerarlo necesitamos dos ajustes: primero, esa función de sintonización está oculta por su nivel de encapsulamiento... cámbialo para que podamos invocarla libremente desde el exterior. Segundo, el método que comanda el control humano no puede seguir afirmativo... desactívalo alterando su retorno lógico. ¡Ajusta el código e inyecta el parche!',
      () => {
        this.puzzleCode.open();
      }
    );
  }

  onCodeSolved() {
    // Al superar el hackeo de código, reproducimos toma-usb.mp4 y regresamos al laboratorio final
    this.game.playCinematic('resources/video/toma-usb.mp4', () => {
      // Otorgar el Código Cuántico en la ranura 2 (Slot 3 visual)
      gameState.addItemToSlot(2, {
        id: 'usb',
        name: 'Código Cuántico (2077)',
        icon: 'resources/img/item-usb.jfif',
        desc: 'Unidad USB con el Código de Resonancia Cuántica y el exploit del núcleo alienígena.'
      });

      this.game.changeScene('final');
    });
  }

  interact() {
    if (!this.pcInspeccionada) {
      this.inspeccionarPC();
    }
  }

  exit() {
    this.puzzleCables.close();
    this.puzzleCode.close();
    if (this.game.sceneElements) {
      this.game.sceneElements.textContent = '';
    }
  }
}
