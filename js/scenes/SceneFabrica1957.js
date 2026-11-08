import { gameState } from '../state.js';
import { FabricaPuzzle } from '../puzzles/FabricaPuzzle.js';

export class SceneFabrica1957 {
  constructor(game) {
    this.game = game;
    this.puzzleFabrica = new FabricaPuzzle(game, () => this.onBobinaSolved());
  }

  enter() {
    this.game.setBackground('resources/img/envs/fabrica.jfif');
    this.game.setHudTitle('MISIÓN 1: FÁBRICA INDUSTRIAL (1957)');

    // Mostrar al protagonista en la fábrica
    this.game.showPlayer(true);

    this.createElements();

    // Diálogo inicial del Ingeniero
    this.game.showDialog(
      'Ingeniero (1957)',
      '¡Por fin alguien viene a ayudar! Los circuitos de alto voltaje están al límite. Si no equilibramos la tensión de los transformadores, la Bobina Analógica se destruirá.',
      () => {
        this.iniciarAcertijoFabrica();
      }
    );

    this.game.audio.playBGM('tension');
  }

  createElements() {
    const container = this.game.sceneElements;
    if (!container) return;
    container.textContent = '';

    // NPC: Ingeniero de la fábrica
    const ingeniero = document.createElement('img');
    ingeniero.src = 'resources/img/ingeniero.png';
    ingeniero.className = 'npc-sprite';
    ingeniero.style.right = '220px';
    ingeniero.style.bottom = '60px';
    ingeniero.title = 'Hablar con el Ingeniero';

    ingeniero.onclick = () => {
      if (!gameState.progress.fabrica1957Completada) {
        this.iniciarAcertijoFabrica();
      }
    };

    container.appendChild(ingeniero);
  }

  iniciarAcertijoFabrica() {
    this.game.showDialog(
      'Ingeniero (1957)',
      'Rápido, acércate a la consola de control y calibra los parámetros eléctricos para desacoplar la bobina.',
      () => {
        this.puzzleFabrica.open();
      }
    );
  }

  interact() {
    if (!gameState.progress.fabrica1957Completada) {
      this.iniciarAcertijoFabrica();
    }
  }

  onBobinaSolved() {
    gameState.progress.fabrica1957Completada = true;

    // Agregar la Bobina de Alto Voltaje a la Ranura 0 de la Hotbar
    gameState.addItemToSlot(0, {
      id: 'bobina',
      name: 'Bobina de Alto Voltaje (1957)',
      icon: 'resources/img/item-libro-bobina.jfif',
      desc: 'Bobina electromagnética de cobre recuperada en 1957.'
    });

    this.game.showDialog(
      'Ingeniero (1957)',
      '¡Excelente trabajo! Desacoplamos la Bobina de Alto Voltaje intacta y ya está en tu inventario.',
      () => {
        // Mensaje de Babas (sin aparecer físicamente)
        this.game.showDialog(
          'Babas',
          'Perfecto, te redirigiré a 1998, necesitas conseguir el biochip',
          () => {
            this.game.playCinematic('resources/video/intro-lab-biologia.mp4', () => {
              this.game.changeScene('lab1998');
            });
          }
        );
      }
    );
  }

  exit() {
    if (this.game.sceneElements) {
      this.game.sceneElements.textContent = '';
    }
  }
}
