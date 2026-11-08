import { gameState } from '../state.js';
import { BiochipPuzzle } from '../puzzles/BiochipPuzzle.js';

export class SceneLab1998 {
  constructor(game) {
    this.game = game;
    this.puzzleBiochip = new BiochipPuzzle(game, () => this.onBiochipSolved());
  }

  enter() {
    this.game.setBackground('resources/img/envs/lab biologia.jfif');
    this.game.setHudTitle('MISIÓN 2: LABORATORIO DE BIOLOGÍA (1998)');

    // Mostrar al protagonista en el laboratorio de 1998
    this.game.showPlayer(true);

    this.createElements();

    // Secuencia de diálogos iniciales
    this.iniciarConversacion();

    this.game.audio.playBGM('suspense');
  }

  createElements() {
    const container = this.game.sceneElements;
    if (!container) return;
    container.textContent = '';

    // NPC: Dra. Lewis destacada con mayor tamaño y aura luminosa
    const draLewis = document.createElement('img');
    draLewis.src = 'resources/img/cientifica2.png';
    draLewis.className = 'dra-lewis-sprite';
    draLewis.style.right = '240px';
    draLewis.style.bottom = '40px';
    draLewis.title = 'Hablar con la Dra. Lewis';

    draLewis.onclick = () => {
      if (!gameState.progress.lab1998Completado) {
        this.abrirAcertijo();
      }
    };

    // Placa indicadora sobre su cabeza para rápida localización
    const badge = document.createElement('div');
    badge.className = 'npc-name-badge';
    badge.textContent = '💬 Dra. Lewis';
    badge.style.right = '275px';
    badge.style.bottom = '365px';

    container.appendChild(draLewis);
    container.appendChild(badge);
  }

  iniciarConversacion() {
    // 1. Dra. Lewis pregunta
    this.game.showDialog(
      'Dra. Lewis',
      'Soy la Dra. Lewis, científica en biotecnología. ¿Quién eres y qué haces aquí?',
      () => {
        // 2. Respuesta del Protagonista
        this.game.showDialog(
          'Protagonista',
          'Soy del 2027, no me vas a creer si te digo que estoy viajando en el tiempo y necesito tu Bio-Chip para salvar la Tierra.',
          () => {
            // 3. Réplica de la Dra. Lewis antes del puzzle
            this.abrirAcertijo();
          }
        );
      }
    );
  }

  abrirAcertijo() {
    this.game.showDialog(
      'Dra. Lewis',
      '¿Viajero temporal del 2027?... Si de verdad entiendes el valor de esta tecnología y no vienes a robar mi investigación, demuéstralo resolviendo el protocolo de seguridad de la cápsula criogénica.',
      () => {
        this.puzzleBiochip.open();
      }
    );
  }

  interact() {
    if (!gameState.progress.lab1998Completado) {
      this.abrirAcertijo();
    }
  }

  onBiochipSolved() {
    gameState.progress.lab1998Completado = true;

    // Agregar el Bio-Chip a la Ranura 2 de la Hotbar (slot 1)
    gameState.addItemToSlot(1, {
      id: 'biochip',
      name: 'Bio-Chip Orgánico (1998)',
      icon: 'resources/img/item-biochip.jfif',
      desc: 'Bio-Chip con matriz molecular adaptativa recuperado en 1998.'
    });

    this.game.showDialog(
      'Dra. Lewis',
      '¡Impresionante! Has estabilizado el compuesto sin dañar los enlaces celulares. Te entrego el Bio-Chip. Si de verdad eres nuestra salvación en el futuro... haz que valga la pena.',
      () => {
        // Mensaje de Babas (por radio, sin aparecer físicamente)
        this.game.showDialog(
          'Babas',
          'Ahora te llevaré al 2077, prepárate',
          () => {
            this.game.playCinematic('resources/video/intro-2077.mp4', () => {
              this.game.changeScene('scene2077');
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

