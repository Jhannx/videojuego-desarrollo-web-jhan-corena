import { gameState } from '../state.js';
import { PortalConstruction } from '../puzzles/PortalConstruction.js';

export class SceneLaboratorio {
  constructor(game) {
    this.game = game;
    this.puzzlePortal = new PortalConstruction(game, () => this.onPortalSolved());
    this.portalListoParaViajar = false;
  }

  enter() {
    this.portalListoParaViajar = false;
    this.game.setBackground('resources/img/envs/lab-portal.jfif');
    this.game.setHudTitle('ACTO 2: REFUGIO SUBTERRÁNEO');

    // Mostrar al protagonista en el laboratorio
    this.game.showPlayer(true);

    this.createElements();

    // Diálogo inicial de llegada y presentación de Babas
    this.game.showDialog(
      'Babas',
      '¡Por aquí, rápido! Soy Babas, tu guía. Logré interceptar las comunicaciones de la nave para traerte hasta este refugio seguro.',
      () => {
        // Siguiente diálogo antes de abrir el acertijo
        this.iniciarAcertijoPortal();
      }
    );

    this.game.audio.playBGM('suspense');
  }

  createElements() {
    const container = this.game.sceneElements;
    if (!container) return;
    container.textContent = '';

    // Compañero y guía: Babas
    const babas = document.createElement('img');
    babas.src = 'resources/img/babas.png';
    babas.className = 'companion-sprite';
    babas.style.left = '330px';
    babas.style.bottom = '70px';
    babas.title = 'Hablar con Babas';

    babas.onclick = () => {
      if (this.portalListoParaViajar) {
        this.viajarA1957();
      } else if (!gameState.progress.portalConstruido) {
        this.iniciarAcertijoPortal();
      }
    };

    container.appendChild(babas);
  }

  // Diálogo que prepara al jugador y luego despliega el acertijo
  iniciarAcertijoPortal() {
    this.game.showDialog(
      'Babas',
      'Bien, construyamos el portal, necesitas responder algunas preguntas para ello.',
      () => {
        this.puzzlePortal.open();
      }
    );
  }

  onPortalSolved() {
    gameState.progress.portalConstruido = true;

    // Reproducir cinemática del portal abriéndose
    this.game.playCinematic('resources/video/portal.mp4', () => {
      this.game.audio.playBGM('suspense');
      this.activarViaje1957();
    });
  }

  // Se activa después de la cinemática de portal.mp4
  activarViaje1957() {
    this.portalListoParaViajar = true;

    this.game.showDialog(
      'Babas',
      '¡El vórtice temporal está abierto y sintonizado con el pasado! Presiona [E] para viajar a 1957.'
    );

    const container = this.game.sceneElements;
    if (!container) return;

    // Zona interactiva del portal activado
    const portalHotspot = document.createElement('div');
    portalHotspot.className = 'interactive-hotspot';
    portalHotspot.style.left = '490px';
    portalHotspot.style.bottom = '110px';
    portalHotspot.style.width = '300px';
    portalHotspot.style.height = '260px';

    const badge = document.createElement('span');
    badge.className = 'hotspot-badge';
    badge.textContent = '[E] Viajar a 1957';
    portalHotspot.appendChild(badge);

    portalHotspot.onclick = () => this.viajarA1957();
    container.appendChild(portalHotspot);
  }

  viajarA1957() {
    if (!this.portalListoParaViajar) return;
    this.portalListoParaViajar = false;

    this.game.playCinematic('resources/video/Fabrica.mp4', () => {
      this.game.changeScene('fabrica1957');
    });
  }

  interact() {
    if (this.portalListoParaViajar) {
      this.viajarA1957();
    } else if (!gameState.progress.portalConstruido) {
      this.iniciarAcertijoPortal();
    }
  }

  exit() {
    if (this.game.sceneElements) {
      this.game.sceneElements.textContent = '';
    }
  }
}
